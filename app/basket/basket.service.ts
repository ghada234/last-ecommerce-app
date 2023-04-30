import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBasket, IBasketTotal } from '../shared/Models/Basket';
import { Basket } from '../shared/Models/Basket';
import { IBasketItem } from '../shared/Models/Basket';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/Models/Iproduct';
import { BasketComponent } from './basket.component';
import { DeliveryMehod } from '../shared/Models/DeliveryMehod';
import { ToastrService } from 'ngx-toastr';
import { ISelectValue } from '../shared/Models/ISelectAttrbuitet';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  //null is initial vlaue
  private basketSource = new BehaviorSubject<IBasket>(null);
  //public prop using it outside service to subscribe it $ is observable
  basket$ = this.basketSource.asObservable();
  private BasketTotalSoure = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$ = this.BasketTotalSoure.asObservable();
  shipping: number = 0;
  constructor(private http: HttpClient,private toastr:ToastrService) {}

  //set shipping
  setShipping(deliverymethod: DeliveryMehod) {
    this.shipping = deliverymethod.price;
 
    //we want when choose delivery method with price shipping and return tobasket and change any thing
    //in the basket and return again to deliverymethod componet we populate the delivery method we choose
    //first i want to gett basket
    const basket: IBasket = this.getCurrentBaskeValue();
    basket.deliveryMethodId = deliverymethod.id;
    basket.shippingPrice=deliverymethod.price;
    //set the basket with updated informations that we add deliverymethod id
    this.SetBasket(basket);
    this.CalculatetTotal();
    
  }
  //get basket method
  getBasket(id: string) {
    return this.http.get<IBasket>(`${this.baseUrl}basket?id=${id}`).pipe(
      map((response: IBasket) => {
        //  this.CalculatetTotal();
        this.shipping=response.shippingPrice;
        //add response to basketsource

        this.basketSource.next(response);
        this.CalculatetTotal();
      })
    );
  }

  //set Baskett add and update

  SetBasket(basket: IBasket) {
    return this.http.post<IBasket>(`${this.baseUrl}basket`, basket).subscribe(
      (response: IBasket) => {
        //add anew value of basket to our observable
        this.basketSource.next(response);
        this.CalculatetTotal();
   
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /////

  //delete basket from client
  DeleteBasketClient() {
    this.basketSource.next(null);
    this.BasketTotalSoure.next(null);
    localStorage.removeItem('basket-id');
  }

  //deletebasket  from api

  DeleteBasket(id: string) {
    return this.http.delete(`${this.baseUrl}basket?id=${id}`).subscribe(
      (res) => {
        //delete basket from basket source
        this.basketSource.next(null);
        this.BasketTotalSoure.next(null);
        localStorage.removeItem('basket-id');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //additremtobasket
  AddIemToBasket(productItem: IProduct, quantity = 1) {
   
    //map from productitem to basket item
    const BasketItemToAdd: IBasketItem = mapFromProductToBasketItem(
      productItem,
      quantity
    );
 

    console.log(BasketItemToAdd);
    //if getbasketcurrentvalue returns null cretae new basket

    const Basket = this.getCurrentBaskeValue() ?? this.CreateNewBaket();
    //we need to increase quantity if item that we want to add is already exsist in basket items
    Basket.items = this.addOrUpdateItems(
      Basket.items,
      BasketItemToAdd,
      quantity
    );

    this.SetBasket(Basket);
    this.toastr.success("تم اضافه المنتج الي السله")
  }
  //increment quantity  method
  IncrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBaskeValue();
    const index = basket.items.findIndex((x) => x.id == item.id);
    basket.items[index].quantity++;
    this.SetBasket(basket);
  }
  //decrement quantity method
  DecrementBasketItem(item: IBasketItem) {
    const basket = this.getCurrentBaskeValue();
    const index = basket.items.findIndex((x) => x.id === item.id);
    if (basket.items[index].quantity > 1) {
      basket.items[index].quantity--;
      this.SetBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBaskeValue();

    //some return true if item exist or false if item don't exist
    if (basket.items.some((x) => x.id === item.id)) {
      //get all items that don't equal to item so it remove it
      basket.items = basket.items.filter( x=>{ return x.identifier!==item.identifier||x.identifierSpec!==item.identifierSpec});
      if (basket.items.length > 0) {
        this.SetBasket(basket);
      } else {
        this.DeleteBasket(basket.id);
        this.DeleteBasketClient();
      }
    }
  }

  /////////////////

  public getCurrentBaskeValue() {
    return this.basketSource.value;
  }
  private addOrUpdateItems(
    items: IBasketItem[],
    BasketItemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    console.log("BasketItemToAdd")
    console.log(BasketItemToAdd);
    console.log("items");
    console.log(items)
    var index = items.findIndex(x =>{ return x.identifier===BasketItemToAdd.identifier && x.identifierSpec===BasketItemToAdd.identifierSpec&&x.id===BasketItemToAdd.id});

    console.log("index");
    console.log(index)
 
   
    if (index===-1) {
      //  BasketItemToAdd.quantity=quantity;
      items.push(BasketItemToAdd);
    } else {
      // items[index].quantity += quantity;
      items[index].quantity +=quantity
    }
    return items;
  }

  private CreateNewBaket(): IBasket {
    const Baskett = new Basket();
    //we want to restore basket id in local storage
    localStorage.setItem('basket-id', Baskett.id);

    return Baskett;
  }


  //calculate the total price of items in basket to put it in summary of order

  private CalculatetTotal() {
    const basket = this.getCurrentBaskeValue();
    //a is index and b is Ibasketitem
    const subTotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    console.log(subTotal);
    const shipping = this.shipping;
    const total = subTotal + shipping;
    this.BasketTotalSoure.next({ shipping, subTotal, total });
  }

  //create paymentintent  it called when click payment button in stepper
  createPaymentIntent() {
 return   this.http
      .post(`${this.baseUrl}payment/${this.getCurrentBaskeValue().id}`, {})
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          console.log(this.getCurrentBaskeValue());
        })
      );
  }
}

function mapFromProductToBasketItem(
  productItem: IProduct,
  quantity: number
): IBasketItem {
  return {
    id: productItem.id,
    productName: productItem.name,
    quantity: quantity,
    price: productItem.price,
    pictureUrl: productItem.pictureUrl,
    type: productItem.productType,
    brand: productItem.productBrand,
    color:productItem.productColor,
    selectedAttrbuiteValue:productItem.selecedValues,
    identifier:productItem.identifier,
    selectedSpecAttValues:productItem.selectedSpecAttValues,
    identifierSpec:productItem.identifierSpec,

 
   
  };
}

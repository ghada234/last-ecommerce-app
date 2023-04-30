import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { IProduct } from '../shared/Models/Iproduct';
import { IWishList, IWishListItem, Wishlist } from '../shared/Models/WishList';

@Injectable({
  providedIn: 'root'
})
export class WishListServiceService {

  private WishListSource = new BehaviorSubject<IWishList>(null);
  WishList$=this.WishListSource.asObservable();
  userId:string;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,private toastr:ToastrService,private accountservice:AccountService) {



   }

   //Add item to wishlist
   AddItemToWishList(productItem:IProduct){


     var user=this.accountservice.getCurrentUserValue();
     if(!user){
      this.toastr.error("يجب ان تسجل الدخول اولا ");
      console.log("hi")
    
     }
     else{
      const wishlistitemToAdd:IWishListItem=MapFromProductItmToWishlistItem(productItem);




      const WishList=this.getCurrentWishListValue()??this.CreateNewWishList();
      console.log("wishlist");
      console.log(WishList);
  
  
      var index=WishList.wishListItems.findIndex(x=>x.id===wishlistitemToAdd.id)
      if(index===-1){
        WishList.wishListItems.push(wishlistitemToAdd);
        this.toastr.success("تم اضافه المنتج لقائمه الرغبات ")
        this.SetWishList(WishList);
      }
      else{
        this.toastr.error("المنتج بالفعل موجود في قائمه الرغبات")
      }

     }





   }

   getWishList() {
    return this.http.get<IWishList>(`${this.baseUrl}WishList`).pipe(
      map((response: IWishList) => {
        //  this.CalculatetTotal();
      
        //add response to basketsource

        this.WishListSource.next(response);
     
      })
    );
  }
 getCurrentWishListValue(){
  return this.WishListSource.value;
 }
 CreateNewWishList(){

  return new Wishlist();

 }

 SetWishList(wishlist:IWishList){
  return this.http.post<IWishList>(`${this.baseUrl}wishlist`, wishlist).subscribe(
    (response: IWishList) => {
      //add anew value of basket to our observable
      this.WishListSource.next(response);
   
 
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );

 }
 //delete item from wishlist
 DeleteItemFromWishList(item:IWishListItem)
 {
  var wishlist=this.getCurrentWishListValue();
  if(wishlist.wishListItems.some(x=>x.id==item.id)){
    wishlist.wishListItems=wishlist.wishListItems.filter(x=>x.id!==item.id);
    if(wishlist.wishListItems.length>0){
    this.SetWishList(wishlist)
    }
    else{
      this.DeleteWishList();
    }
  }

 }

 //delete wish list
 DeleteWishList(){
  return this.http.delete(`${this.baseUrl}wishlist`).subscribe(res=>{
    this.WishListSource.next(null);
  });
 }
 
}




function MapFromProductItmToWishlistItem(productitem:IProduct):IWishListItem{

  return{
    id:productitem.id,
    productName: productitem.name,
    price:productitem.price,
    pictureUrl:productitem.pictureUrl,
    isDiscount:productitem.discountEnabled,
    priceAfterDiscount:productitem.priceAfterDiscount
  };
  
     }


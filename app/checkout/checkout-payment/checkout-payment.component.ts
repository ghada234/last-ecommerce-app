import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/Models/Basket';
import { Order, OrderToCreate } from 'src/app/shared/Models/Order';
import { PaymentToCreate } from 'src/app/shared/Models/PaymentToCreate';
import { CheckoutService } from '../checkout.service';



@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css'],
})
export class CheckoutPaymentComponent implements AfterViewInit{
  @Input() checkoutForm: FormGroup;
  isPayment:boolean;
  loading = false;


  //validation of strpe
 
  constructor(
    private basketservice: BasketService,
    private toastr: ToastrService,
    private chckoutservice: CheckoutService,
    private router: Router
  ) {}
  Order$=this.chckoutservice.order$;
  order:Order
  iframeUrl:string='https://accept.paymob.com/api/acceptance/iframes/375202?payment_token='


  ngAfterViewInit() {
 

  }

  paymentfalse(){
    this.isPayment=false
  }

  paymenttrue(){
    this.isPayment=true;
  }

 
 createOrderwithoutpayment() {
  var basket = this.basketservice.getCurrentBaskeValue();

  var ordertocreate=this.getorderToCreate(basket);

    
    try {
      console.log(ordertocreate)
  
      const CreatedOrder = this.createOrder( ordertocreate);

  
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  ////////////////////////////
 
 

   createOrder( OrderToCreate) {
    this.loading=true;
 
    return this.chckoutservice.CreateOrder(OrderToCreate).subscribe(res=>{
      console.log(res);
      this.basketservice.DeleteBasketClient();
      const navigationExtra: NavigationExtras = { state: res };
        this.router.navigate(['checkout/success'], navigationExtra);
    },error=>{console.log(error)})
  }






  createOrderPayment(ordertocreate:OrderToCreate){

 
    return this.chckoutservice.CreateOrder(ordertocreate).subscribe(res=>{



    

    })


  }



  createorderwithpayment(){
    this.loading=true;

    var basket = this.basketservice.getCurrentBaskeValue();
    var ordertocreate=this.getorderToCreate(basket);
    this.createOrderPayment(ordertocreate);

    this.Order$.subscribe(res=>{
this.order=res;

var paymenttocreate= this.getpaymentToCreate(basket,this. order);
      
this.createPayment(paymenttocreate);


    });
 
  
 
 
    
     
     
 

           


  }


  

 
  createPayment(paymenttocreate:PaymentToCreate){
    this.chckoutservice.CreatePayment(paymenttocreate).subscribe((token)=>{
      console.log(token);
      this.loading=false
      window.location.href =this.iframeUrl+token;

    },
    error=>{console.log(error)}
    
    );


  }




  //////////////////////////////////////



  private getorderToCreate(basket:IBasket){
    

    var basketId = basket.id;
   
    var Address = this.checkoutForm.get('AddressForm').value;
    var DeliveryId = +this.checkoutForm.get('DeliveryForm').get('DeliveryMehod')
      .value;

     var OrderToCreate: OrderToCreate = {
        basketId: basketId,
        deliveryMethodId: DeliveryId,
        shipToAddress: Address,
      };
      return OrderToCreate;
  

  }
  private getpaymentToCreate(basket,order){
    var basketId = basket.id;
    var OrderId=order.id;
    var Address = this.checkoutForm.get('AddressForm').value;
    var DeliveryId = +this.checkoutForm.get('DeliveryForm').get('DeliveryMehod')
      .value;
  

     var paymentToCreate: PaymentToCreate = {
        basketId: basketId,
        deliveryMethodId: DeliveryId,
        shipToAddress: Address,
        orderId:OrderId,
      };
      console.log(paymentToCreate)
      return paymentToCreate;


  }

}

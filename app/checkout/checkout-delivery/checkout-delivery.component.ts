import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { DeliveryMehod } from 'src/app/shared/Models/DeliveryMehod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css'],
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: DeliveryMehod[];
  constructor(private chekoutservive: CheckoutService,private  basketservice:BasketService) {}

  ngOnInit(): void {
    this.chekoutservive.getDeliveryMethods().subscribe(
      (res:DeliveryMehod[]) => {
        this.deliveryMethods = res;
      },
      (error) => {
        console.log(error);
      }
    );


  }

  //set shipping price method
  setShippingPrice(dm:DeliveryMehod){
this.basketservice.setShipping(dm);
console.log(this.checkoutForm.get('DeliveryForm').value);
  }

}

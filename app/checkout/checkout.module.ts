import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewtComponent } from './checkout-reviewt/checkout-reviewt.component';
import { CheckoutSucessComponent } from './checkout-sucess/checkout-sucess.component';
import { BasketModule } from '../basket/basket.module';
import { AccountModule } from '../account/account.module';


@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    CheckoutReviewtComponent,
    CheckoutSucessComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    BasketModule,
    AccountModule

  ]

  ,exports:[]
})

export class CheckoutModule { }

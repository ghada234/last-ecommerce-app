import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutSucessComponent } from './checkout-sucess/checkout-sucess.component';

const routes:Routes=[
  {path:"" ,component:CheckoutComponent},
  {path:"success",component:CheckoutSucessComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],

  //alaways forget export router module
  exports:[RouterModule]
})
export class CheckoutRoutingModule { }

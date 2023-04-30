import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket.component';
 const routes:Routes=[{
  path:"",component:BasketComponent,data: {
    title: 'basket',
    breadcrumb: [
      {
        label: 'السله',
        url: ''
      }
    ]
  },


 }]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ],
  exports:[RouterModule]
})
export class BasketRoutingModule { }

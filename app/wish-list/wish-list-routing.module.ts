import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WishListComponent } from './wish-list/wish-list.component';

const routes:Routes=[{
  path:"",component:WishListComponent,data: {
    title: 'قائمه الرغبات',
    breadcrumb: [
      {
        label:'قائمه الرغبات',
        url: ''
      }
    ]
  },


 }]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
  ],
  exports:[RouterModule]
  
})


export class WishListRoutingModule { }

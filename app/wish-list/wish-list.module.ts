import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishListRoutingModule } from './wish-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../account/account.module';



@NgModule({
  declarations: [
    WishListComponent
  ],
  imports: [
    CommonModule,
    WishListRoutingModule,
    SharedModule,
    AccountModule
  ]
})
export class WishListModule { }

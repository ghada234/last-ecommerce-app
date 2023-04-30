import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { RouterModule } from '@angular/router'
import { ButtonModule } from "primeng/button";


import {CarouselModule} from 'primeng/carousel';
import { SwiperModule } from 'swiper/angular';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';





@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopModule,
    RouterModule,
    CarouselModule,
    ButtonModule,
    SwiperModule,
    AnimateOnScrollModule.forRoot() 

   
  ],
  exports:[HomeComponent]
})
export class HomeModule { }

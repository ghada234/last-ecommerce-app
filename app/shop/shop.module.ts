import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductsItemComponent } from './products-item/products-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { ShopRoutingModule } from './shop-routing.module';

import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CategoryShopComponent } from './category-shop/category-shop.component';

import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from "primeng/button";
import {OrderListModule} from 'primeng/orderlist';
import {AccordionModule} from 'primeng/accordion';
import {GalleriaModule} from 'primeng/galleria';
// import { NgxImageZoomModule } from 'ngx-image-zoom';
// import { RedZoomModule } from 'ngx-red-zoom';

import { SwiperModule } from 'swiper/angular';
import { DiscountShopComponent } from './discount-shop/discount-shop.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";

import {MatSliderModule} from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSliderModule } from '@angular-slider/ngx-slider';






@NgModule({
  declarations: [
    ShopComponent,
    ProductsItemComponent,
    ProductDetailComponent,
    SubCategoriesComponent,
    CategoryShopComponent,
    DiscountShopComponent,
    

  ],

  //common module resonsible for ngfor and mgif and so on
  imports: [
    CommonModule,
    // in need to usepagination in shared module here in my shop module
    SharedModule,

 
    SidebarModule,
    ButtonModule,
    OrderListModule,
    AccordionModule,
    GalleriaModule,
    // NgxImageZoomModule,
    // RedZoomModule,
    SwiperModule ,
    MatExpansionModule,
    AnimateOnScrollModule.forRoot() ,
    NgDynamicBreadcrumbModule,
    MatSliderModule,
    MatNativeDateModule,


  

    
   

    //lazyloading
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule 
  

 
    


 
  
    
  
  ],
  exports:[ProductDetailComponent ]
})
export class ShopModule { }

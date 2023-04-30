import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
// import { ShopModule } from './shop/shop.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/Intercepors/error.interceptor';
 import { NgxSpinnerModule } from "ngx-spinner";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoadingSpinnerInterceptor } from './core/Intercepors/loading-spinner.interceptor';
import { JwtInterceptorInterceptor } from './core/Intercepors/jwt-interceptor.interceptor';
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
import { SharedModule } from './shared/shared.module';












@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    //release shop module because app module not reesponsible tto load itt
    // ShopModule,
    HomeModule,
     NgxSpinnerModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    NgDynamicBreadcrumbModule,SharedModule
 

  

 
    
  ],

  providers: [ 
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingSpinnerInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorInterceptor,multi:true}
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

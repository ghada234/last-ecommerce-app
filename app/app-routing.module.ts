import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorTestComponent } from './core/error-test/error-test.component';
import { AuthGuard } from './core/Guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
{path:'home',component:HomeComponent,
data: {
  title: 'الرئيسيه',
  breadcrumb: [
    {
      label: 'الرئيسيه',
      url: '/',
     
    }
  ]
},},

{path:'errortest',component:ErrorTestComponent,data: { breadcrumb: 'اختبار الاخطاء' }},

{path:'notfound',component:NotFoundComponent,data: { breadcrumb: 'غير موجود' }},
{path:'servererror',component:ServerErrorComponent,data: { breadcrumb: 'خطأ في الخادم' }},


//load shop module onlyy when use the path /shop
{path:"shop",loadChildren:()=>import('./shop/shop.module').then(mod=>mod.ShopModule),data: { breadcrumb: 'تسوق' } },
//load  basket module only when use path basket

{path:"basket",loadChildren:()=>import('./basket/basket.module').then(mod=>mod.BasketModule),data: { breadcrumb: 'السلة' } },
{path:"wishlist",canActivate:[AuthGuard], loadChildren:()=>import('./wish-list/wish-list.module').then(mod=>mod.WishListModule),data: { breadcrumb: 'قائمه الرغبات' } },
{path:"checkout",canActivate:[AuthGuard],loadChildren:()=>import('./checkout/checkout.module').then(mod=>mod.CheckoutModule),data: { breadcrumb: 'انهاء الطلب' } },
{path:"order",loadChildren:()=>import('./order/order.module').then(mod=>mod.OrderModule),data: { breadcrumb: 'الطلبات' } },

{path:"account",loadChildren:()=>import('./account/account.module').then(mod=>mod.AccountModule),data: { breadcrumb: {skip:true}} },

{path:"**",redirectTo:"notfound",pathMatch:"full"},




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

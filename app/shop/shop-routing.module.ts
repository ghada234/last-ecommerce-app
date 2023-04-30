import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CategoryShopComponent } from './category-shop/category-shop.component';
import { DiscountShopComponent } from './discount-shop/discount-shop.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShopComponent } from './shop.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';

   

const routes:Routes=


[

  {path:"",component:ShopComponent,data:{breadcrumb: {alias:"Shop"}}},


{path:"category/:id" ,component:SubCategoriesComponent,




data: {
  title: 'page1',
  breadcrumb: [
    {
      label: 'page',
      url: '/shop/category/:id'
    }
  ]
},


},

{path:"category/:id/categoryshop/:shopid",component:CategoryShopComponent,


data: {
  title: 'page2', 
  breadcrumb: [
    {
      label: 'category{{id}}',// pageOneID Parameter value will be add 
      url: '/shop/category/:id'
    },
    {
      label: 'subcategory{{shopid}}',// pageTwoID Parameter value will be add 
      url: ''
    }
  ]
},




},




////////////////////////////////////////////
// {path:"categoryshop/:id",component:CategoryShopComponent,


// data:{breadcrumb: {alias:"SubCategory"} }},
//we use alias to get the product name in breadcrum we use it in breadcrumb services
//handle it in productdetail component after get product 
{path:"category/:catid/categoryshop/:sid/product/:id" ,component:ProductDetailComponent,

// <button type="button" class="btn  btn-primary w-40" routerLink="/shop/category/{{product?.categoryParentId}}/categoryshop/{{product?.categoryId}}/product/{{product?.id}}">نفاصيل المنتج</button>


data: {
  title: 'category', 
  breadcrumb: [
    {
      label: 'category{{id}}',// pageOneID Parameter value will be add 
      url: '/shop/category/:id'
    },
    {
      label: 'subcategory{{shopid}}',// pageTwoID Parameter value will be add 
      url: '/shop/category/:id/categoryshop/:shopid'
    },

    {
      label: 'product{{productid}}',// pageTwoID Parameter value will be add 
      url: ''
    }

  ]
},

},
  
{path:"discount",component:DiscountShopComponent,data: {
  title: 'discount',
  breadcrumb: [
    {
      label: 'خصومات',
      url: ''
    }
  ]
},
}




]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes) 
  ],
  exports:[ RouterModule]
})
export class ShopRoutingModule { }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { IPagination, Pagination } from '../shared/Models/IPagination';
import { ProductBrand } from '../shared/Models/ProductBrand';
import { ProductTypes } from '../shared/Models/ProductTypes';
import { Category } from '../shared/Models/Category';

import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/Models/ShopParams';
import { IProduct } from '../shared/Models/Iproduct';
import {  IColor } from '../shared/Models/Color';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISpecAtttrbuiteType } from '../shared/Models/ISpecAtttrbuiteType';
import { IcategorySpecAttrbuite } from '../shared/Models/IcategorySpecAttrbuite';

//we don't nedd to add  services to  providers in app.moduls because of providein:'root
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  //we use those props in improving perforamance
  products: IProduct[] = [];
  types: ProductTypes[] = [];
  brands: ProductBrand[] = [];

  //for caching

  pagination = new Pagination();
  discountedPagination= new Pagination();
  shopParams = new ShopParams();
  discountedShopParams=new ShopParams();
  
  //created new map{key and value pair}
  productCashed = new Map();

  constructor(private http: HttpClient) {}
  //we don't use shopparams as parameter but we savE it in he service
  getProducts(useCash: boolean) {
    if (useCash === false) {
      //initialize  productcashed and delete any result been in this cash
      this.productCashed = new Map();
    }

    //search if cashe is exist or not to use has(key)
    //.has(1-2-fromlowtohight-1-6)
    if (
      this.productCashed.has(Object.values(this.shopParams).join('-')) &&
      useCash == true
    ) {
      //gett data from map and return it tocomponent
      this.pagination.data = this.productCashed.get(
        Object.values(this.shopParams).join('-')
      );
      //return observable of pagination
      return of(this.pagination);
    }

    let params = new HttpParams();

    if (this.shopParams.selectedBrand !== 0) {
      params = params.append(
        'brandId',
        this.shopParams.selectedBrand.toString()
      );
    }
    if (this.shopParams.selectedType !== 0) {
      params = params.append('typeId', this.shopParams.selectedType.toString());
    }
    //discount amount if nott equla 0 we send it as shopparams
  

    //////category
    if(this.shopParams.categoryid!==0){
      params = params.append('categoryId', this.shopParams.categoryid.toString());
    }
    ///

    if (this.shopParams.SelectedSort) {
      params = params.append('sort', this.shopParams.SelectedSort);
    }
    params = params.append('pageIndex', this.shopParams.pageIndex.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    if (this.shopParams.searchTerm!=="") {
      params = params.append('search', this.shopParams.searchTerm);
    }
 
    // if(this.shopParams.optionid!=0){
    //   params = params.append('optionid', this.shopParams.optionid);

    // }
      
        if(this.shopParams.selectedOptions.length!=0){
          params=params.append('optionsToFilter',this.shopParams.selectedOptions.join(','));
       }

       if(this.shopParams.maxPrice!=0 && this.shopParams.minPrice!=0){
        params = params.append('minPrice', this.shopParams.minPrice);
        params = params.append('maxPrice', this.shopParams.maxPrice);

       }


   
    // `${this.baseUrl}product`
    //when use observe:response we get observable<httpresponse<Ipagination>> body and header of response
    return this.http
      .get<IPagination>(`${this.baseUrl}product`, {
        observe: 'response',
        params,
      })

      .pipe(
        map((response) => {
          //we want to append the data we returned to alist of the products
          // this.products=response.body.data;
          //this.products+=respone.body.data
          // this.products=[...this.products,...response.body.data]
          //set the data to the cach map and use the requestt the map if we don/t find data in productcashed
          this.productCashed.set(
            Object.values(this.shopParams).join('-'),
            response.body.data
          );
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }
  //
  getProductsTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<ProductTypes[]>(`${this.baseUrl}product/types`).pipe(
      map((response) => {
        this.types = response;
        return response;
      })
    );
  }

  getProductsBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<ProductBrand[]>(`${this.baseUrl}product/brands`).pipe(
      map((response) => {
        this.brands = response;
        return response;
      })
    );
  }

  getProduct(id: number) {
    //we use that to get product directtley and not go again to api and that improve performance
    // const product=this.products.find(p=>p.id==id);
    // if(product){
    //   //return obsreavableof product
    //   return of(product);
    // }
    //search for  product in value of productcashed
    // let product: IProduct;
    // this.productCashed.forEach((products: IProduct[]) => {
    //   product = products.find((p) => p.id == id);
    // });
    // if (product) {
    //   return of(product);
    // }
    return this.http.get<IProduct>(`${this.baseUrl}product/${id}`);
  }
  //for cahching

  /////for productst by cattegory

  //set shopparams
  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  //getshopaprams
  getShopParams() {
    return this.shopParams;
  }
  ////for discounted products

  setDiscountedShopParams(params: ShopParams) {
    this.discountedShopParams = params;
  }
  //getshopaprams
  getDiscountedShopParams() {
    return this.discountedShopParams;
  }

  //get product color
  getProductColor( id:number){
  return this.http.get<IColor[]>(`${this.baseUrl}product/color/${id}`);

  }
//ge last products metthod

getLastProducts(){
  return this.http.get<IProduct[]>(`${this.baseUrl}product/lastproducts`);

}
getFirsttDiscountedProduct(){
  let params = new HttpParams();
  if(this.discountedShopParams.amount!==0){
    params = params.append('amount', this.discountedShopParams.amount.toString());
  }
 
  return this.http.get<IProduct[]>(`${this.baseUrl}product/lastdiscounted`, {
    observe: 'response',
    params,
  }).pipe(map(res=>{
    return res.body;
  }));
}

getRelatedProducts( id:number){
  let params = new HttpParams();
  params=params.append('catid',id.toString());
  return this.http.get<IProduct[]>(`${this.baseUrl}product/relatedproducts`, {
    observe: 'response',
    params,
  }).pipe(map(res=>{
    return res.body;
  }));


}
//get discounted products accordion tto discountt amount
getDiscuntedProducts(){
  let params = new HttpParams();
  if(this.discountedShopParams.amount!==0){
    params = params.append('amount', this.discountedShopParams.amount.toString());

  }
  //categoryid
  if(this.discountedShopParams.categoryid!==0){
    params = params.append('categoryId', this.discountedShopParams.categoryid.toString());
  }
  ///brand
  if (this.discountedShopParams.selectedBrand !== 0) {
    params = params.append(
      'brandId',
      this.discountedShopParams.selectedBrand.toString()
    );
  }
  //for sort

  if (this.discountedShopParams.SelectedSort) {
    params = params.append('sort', this.shopParams.SelectedSort);
  }

  params = params.append('pageIndex', this.discountedShopParams.pageIndex.toString());
  params = params.append('pageSize', this.discountedShopParams.pageSize.toString());

  return this.http.get<Pagination>(`${this.baseUrl}product/discountedproducts`, {
    observe: 'response',
    params,
  }).pipe(map(res=>{
    this.discountedPagination=res.body;
    return this.discountedPagination;
  }));

}

//get category

getCategory(id:number)
{
  return this.http.get<Category>(`${this.baseUrl}product/getcategory/${id}`);
}
//get categories with sub categories 
getCategoriesWithSubCategory(){
  return this.http.get<Category[]>(`${this.baseUrl}product/getcategories`);

}
//get spec attrbuite trpe with spec attrbuite type option to use it in filter
getSpecAttrbuiteType(id:number){
  return this.http.get<ISpecAtttrbuiteType[]>(`${this.baseUrl}product/specattrtypewithoption/${id}`)
}





}

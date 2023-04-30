import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Pagination } from '../shared/Models/IPagination';
import { IProduct } from '../shared/Models/Iproduct';
import { ProductBrand } from '../shared/Models/ProductBrand';
import { ProductTypes } from '../shared/Models/ProductTypes';
import { ShopParams } from '../shared/Models/ShopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  productBrands: ProductBrand[] = [];
  productTypes: ProductTypes[] = [];
  // shopParams=new ShopParams();
  shopParams:ShopParams;

  
  //
  sortingList=[{name:"ترتيب ابجدى",value:"name"},{name:"من اقل لأعلى سعرا ",value:"priceAsc"},{name:"من اعلي لأقل سعرا",value:"priceDesc"}];

  //
  totalCount:number=0;

  @ViewChild("searchElement", { static: false })
  searchTerm!: ElementRef; 
  //

  constructor(private shopservice: ShopService) {
    //get shop params when initialized component
    this.shopParams=this.shopservice.getShopParams();
    this.shopParams.categoryid=0;
    this.shopservice.setShopParams(this.shopParams)
  }

  ngOnInit(): void {
this.getProducts(true);
this.getProductBrands();
this.getProductTypes();
  }
  getProducts(useCashe=false){
    this.shopservice.getProducts(useCashe).subscribe(
      (response:Pagination) => {
        this.products = response.data;
        // this.shopParams.pageIndex=response.pageIndex;
        // this.shopParams.pageSize=response.pageSize;
        //we need total count in pagination
        this.totalCount=response.count;
      },

      (error) => {
        console.log(error);
      }
    );
  }
/////
  getProductBrands(){

    this.shopservice.getProductsBrands().subscribe(
      (res) => {
        this.productBrands = [{id:0,name:"كل البراندات"},...res];
      },

      (error) => {
        console.log(error);
      }
    );
  }
/////
  getProductTypes(){

    this.shopservice.getProductsTypes().subscribe(
      (res) => {
        this.productTypes =  [{id:0,name:"كل الانواع"},...res];
      },

      (error) => {
        console.log(error);
      }
    );
  }



  //////


  onSelectType(typeId:number){
    const params=this.shopservice.getShopParams();
    params.selectedType=typeId;
    params.pageIndex=1;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }

  ///////

  onSelectBrand(brandId:number){
    const params=this.shopservice.getShopParams();
    params.selectedBrand=brandId;
    params.pageIndex=1;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }

  ////

  onSelectedSort(sort:string){
    const params=this.shopservice.getShopParams();
    params.SelectedSort=sort;
    this.shopParams.SelectedSort=sort;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }

  ////

  
  pageChanged(event: PageChangedEvent): void {
     const params=this.shopservice.getShopParams();
    //  console.log('Page changed to: ' + event');
    //  console.log('Number items per page: ' + event');
    console.log(event.page)
 
    params.pageIndex=event.page;
  
   
    this.shopservice.setShopParams(params);
this.getProducts();
  }

  ////

  onSearch(){
    const params=this.shopservice.getShopParams();
    params.searchTerm=this.searchTerm.nativeElement.value;
    params.pageIndex=1;
    this.shopservice.setShopParams(params);
    this.getProducts();
  }
  ///
  onReset(){
   this.searchTerm.nativeElement.value="";
   this.shopParams=new ShopParams();
   this.shopservice.setShopParams(this.shopParams);
   
    this.getProducts();
  }

}

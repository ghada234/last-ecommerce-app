import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Category } from 'src/app/shared/Models/Category';
import { IProduct } from 'src/app/shared/Models/Iproduct';
import { ProductBrand } from 'src/app/shared/Models/ProductBrand';
import { ShopParams } from 'src/app/shared/Models/ShopParams';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-discount-shop',
  templateUrl: './discount-shop.component.html',
  styleUrls: ['./discount-shop.component.scss']
})
export class DiscountShopComponent implements OnInit {


  //subCategories
  discountAmount:number;
  discountedshopParams:ShopParams;
  discountedproducts:IProduct[];
  Categories:Category[];
  brands:ProductBrand[];
  visibleSidebar1;
  totalcount:number;
  sortingList=[{name:"ترتيب ابجدى",value:"name"},{name:"من اقل لأعلى سعرا ",value:"priceAsc"},{name:"من اعلي لأقل سعرا",value:"priceDesc"}];

  constructor(private route:ActivatedRoute,private shopservice:ShopService,private ngDynamicBreadcrumbService:NgDynamicBreadcrumbService) {
    this.discountedshopParams=this.shopservice.getDiscountedShopParams();
   }

  ngOnInit(): void {
    //get discount amount  from url and set shopparams discount amount tto equal this value from url
    this.discountAmount=+this.route.snapshot.paramMap.get("discountamount");
    this.discountedshopParams.amount=this.discountAmount;
    this.shopservice.setDiscountedShopParams(this.discountedshopParams);
    this.getDiscountedProducts();
    this.GetCategories();
    this.GetBrands();
    this.updateBreadcrumb();
  }

  getDiscountedProducts(){
    this.shopservice.getDiscuntedProducts().subscribe(res=>{
      console.log(res);
      this.discountedproducts=res.data;
      this.totalcount=res.count;
    },error=>{
      console.log(error);
    })
  }
  //get categories

  GetCategories(){
    this.shopservice.getCategoriesWithSubCategory().subscribe(res=>{

      if(res)
      {
        this.Categories=res;
      }
    }, error=>{
      console.log(error);
    })
  }

  //get brans

  GetBrands(){
    this.shopservice.getProductsBrands().subscribe(res=>{
      if(res){
        this.brands=res;

      }
    },error=>{
      console.log(error);
    })
  }
  onSelectedBrand(brandid:number,brandName:string){
    const params=this.shopservice.getDiscountedShopParams();
    params.selectedBrand=brandid;
    this.discountedshopParams.selectedBrand=brandid;
    this.discountedshopParams.selecedBrandName=brandName;
    this.shopservice.setDiscountedShopParams(params);
    this.getDiscountedProducts();
  }

  removeSelectedBrand(){
    const params=this.shopservice.getDiscountedShopParams();
    params.selectedBrand=0;
    this.discountedshopParams.selectedBrand=0;
    this.discountedshopParams.selecedBrandName="";

    this.shopservice.setDiscountedShopParams(params);
    this.getDiscountedProducts();
      
  }

  onSelectedCategory(categoryid:number,categoryName:string){
    const params=this.shopservice.getDiscountedShopParams();
    params.categoryid=categoryid;
    this.discountedshopParams.categoryid=categoryid;
    this.discountedshopParams.selecedCategoryName=categoryName;
    this.shopservice.setDiscountedShopParams(params);
    this.getDiscountedProducts();
  }
 

  onSelectedSort(sort:string){
    const params=this.shopservice.getDiscountedShopParams();
    params.SelectedSort=sort;
    this.discountedshopParams.SelectedSort=sort;
    this.shopservice.setDiscountedShopParams(params);
    this.getDiscountedProducts();
  }

  removeSelecetdCategory(){
    const params=this.shopservice.getDiscountedShopParams();
    params.categoryid=0;
    this.discountedshopParams.categoryid=0;
    this.discountedshopParams.selecedCategoryName="";
    this.shopservice.setDiscountedShopParams(params);
    this.getDiscountedProducts();

  }

  pageChanged(event: PageChangedEvent){
    
    const params=this.shopservice.getDiscountedShopParams();
    //  console.log('Page changed to: ' + event');
    //  console.log('Number items per page: ' + event');
  
 
    params.pageIndex=event.page;
  
   
    this.shopservice.setDiscountedShopParams(params);
      this.getDiscountedProducts();
  }

  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: `خصومات`,
        url: ''
      },
    
    
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

}

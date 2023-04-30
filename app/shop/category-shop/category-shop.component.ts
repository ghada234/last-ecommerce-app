import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IcategorySpecAttrbuite } from 'src/app/shared/Models/IcategorySpecAttrbuite';
import { IProduct } from 'src/app/shared/Models/Iproduct';
import { ISelectValue } from 'src/app/shared/Models/ISelectAttrbuitet';
import { ISpecAtttrbuiteType } from 'src/app/shared/Models/ISpecAtttrbuiteType';
import { ShopParams } from 'src/app/shared/Models/ShopParams';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-category-shop',
  templateUrl: './category-shop.component.html',
  styleUrls: ['./category-shop.component.scss']
})
export class CategoryShopComponent implements OnInit {

  id:number;
  categoryName:string;
  shopCategoryName:string

  categoryid:number;
  visibleSidebar1;
  shopparams:ShopParams;
  products:IProduct[];
  specAttrbuitType: any[];
  sortingList=[{name:"ترتيب ابجدى",value:"name"},{name:"من اقل لأعلى سعرا ",value:"priceAsc"},{name:"من اعلي لأقل سعرا",value:"priceDesc"}];
  selectedOption:number;
  CategorySpecAttrbuiteType:ISpecAtttrbuiteType[];

  totalCount:number;
  panelOpenState = true;
  SelectedSpecAttrObject:any={};

  ///// for filter by option or value of attrbuite <<id >>
  SelectedSpecAttValues:ISelectValue[]=[];
  value=20;
  enabled=true;
  minValue: number = 1;
  maxValue: number = 10000;
  minValue2: number = 1;
  maxValue2: number = 10000;

  options: Options = {
    floor: 1,
    ceil: 10000,
    step: 10,
   
  };


  ////
  selectedOptions:string[]=[];
  constructor(private shopservice:ShopService,private route:ActivatedRoute,private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService) { 
 
     this.shopparams=this.shopservice.getShopParams();
     this.shopparams.selectedOptions=[];
     this.shopservice.setShopParams(this.shopparams);
  
  }

  ngOnInit(): void {

  
    this.setshopparams()



this.getProduct();
this.getCategory();

this.getSpecAtttrbuiteTypeWithOptions();

//  this.breadcrumbService.addFriendlyNameForRouteRegex('^/shop/category/[0-10000]$',  this.categoryid.toString());
// this.breadcrumbService.addFriendlyNameForRouteRegex('/shop/category/' + this.categoryid + '/categoryshop/' + this.id, this.id.toString())

// this.breadcrumbService.addFriendlyNameForRouteRegex('/category/' + this.categoryid, this.categoryid.toString());
// this.breadcrumbService.addFriendlyNameForRouteRegex('/category/' + this.categoryid + '/categoryshop/' + this.id, this.id.toString());

  
  }

  getProduct(){
    this.shopservice.getProducts(false).subscribe(res=>{
   
      this.products=res.data;
      console.log(this.products)
      this.totalCount=res.count
    
      
 
    },error=>{
      console.log(error);
    })
  
  }

  setshopparams(){
    /////for breadcrumbs
    //get subcategory id
    this.id=+this.route.snapshot.paramMap.get("shopid");
  
   this.shopparams.categoryid=this.id;
    /////for breadcrumbs
   //get category id
   this.shopparams.searchTerm="";
   this.categoryid=+this.route.snapshot.paramMap.get("id");


this.shopservice.setShopParams(this.shopparams);
  }

  getCategory(){
    var categoryName;
    var ShopCatName;
    //فساتين
    this.shopservice.getCategory(+this.route.snapshot.paramMap.get("shopid")).subscribe(res=>{
      if(res){
        console.log(" categoryshop")
        console.log(res);
       this.shopCategoryName=res.name
       this.categoryName=res.parentName;
       this.updateBreadcrumb()
      }
  

      
    })
    // this.shopservice.getCategory(+this.route.snapshot.paramMap.get("id")).subscribe(res=>{
    //   if(res){
    //     console.log("category")
    //     console.log(res);
    //   this.categoryName=res.name;
    //   this.updateBreadcrumb()
    //   }

      
    // })

 
  
  }
  onSelectedSort(sort:string){
    const params=this.shopservice.getShopParams();
    params.SelectedSort=sort;
    this.shopparams.SelectedSort=sort;
    this.shopservice.setShopParams(params);
    this.getProduct();
  }
  //pagedchanged event

  ////////////
  pageChanged(event: PageChangedEvent){
    
    const params=this.shopservice.getShopParams();
    //  console.log('Page changed to: ' + event');
    //  console.log('Number items per page: ' + event');
 
 
    params.pageIndex=event.page;
    
  
   
    this.shopservice.setShopParams(params);
      this.getProduct();
  }

  getSpecAtttrbuiteTypeWithOptions(){
    this.shopservice.getSpecAttrbuiteType(+this.route.snapshot.paramMap.get("shopid")).subscribe(res=>{
    
      if(res){
        this.CategorySpecAttrbuiteType=res;
     
      }
   
    }),error=>{console.log(error)}
  }
  //get filter product wehn click in save in sidebar
  // getFilteredProducts(){
  //  const params=this.shopservice.getShopParams();
  //  params.optionid=this.selectedOption;
  //  this.shopparams.optionid=this.selectedOption;
  //  this.shopservice.setShopParams(params);
  //  this.getProduct();

  // }

  // selectOption(selectedoption:number){
  //   this.selectedOption=selectedoption;
  //   console.log(this.selectedOption)


  // }

  ////////////////////////////

  //selected opttion to filter productts accordion to options

  selectSpecAttrbuitesValuesToFilter(attrbname:string,optionName:string,optionId:number){
    this.SelectedSpecAttrObject[attrbname]=optionName;
    var params=this.shopservice.getShopParams();
    params.selectedOptions=[];

    var index=this.SelectedSpecAttValues.findIndex(x=>x.attrbuiteName===attrbname)

    if(index!==-1){
    
    this. SelectedSpecAttValues= this. SelectedSpecAttValues.filter(x=>x.attrbuiteName!==attrbname);

  

  
  }
  var selectedValue:ISelectValue={attrbuiteName:attrbname,attrbuiteValue:optionName,valueid:optionId};

     this.SelectedSpecAttValues.push(selectedValue);
   
     
     for(var i=0;i<this.SelectedSpecAttValues.length;i++){
    
      params.selectedOptions[i]=this.SelectedSpecAttValues[i].valueid.toString();
     }
     this.shopservice.setShopParams(params);
     this.getProduct();
  

    //  this.SelectedSpecAttValues.forEach(function (value) {
    //   console.log(value);
    //   const params=this.shopservice.getShopParams();
    //  params.optionId=value.valueid;
    //  this.shopservice.setShopParams(params);
    //  this.getProduct();
    // }); 
    // for(var i=0;i<this.SelectedSpecAttValues.length;i++){
    //   const params=this.shopservice.getShopParams();
    //     params.optionid=this.SelectedSpecAttValues[i].valueid;
    //    this.shopservice.setShopParams(params);
    //     this.getProduct();
     
    // }

     

  }
  

  ///////////////////

  removeOption(option:string,valueid:number){
    const params=this.shopservice.getShopParams();

     params.selectedOptions=[];
     this.SelectedSpecAttrObject={};
 

 ;
    this.SelectedSpecAttValues=this.SelectedSpecAttValues.filter(x=>x.attrbuiteValue!==option);

    for(var i=0;i<this.SelectedSpecAttValues.length;i++){

      params.selectedOptions[i]=this.SelectedSpecAttValues[i].valueid.toString();
      this.SelectedSpecAttrObject[this.SelectedSpecAttValues[i].attrbuiteName]=this.SelectedSpecAttValues[i].attrbuiteValue;
      
    }
    this.shopservice.setShopParams(params);

    this.getProduct();


  }



  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: `${this.categoryName}`,
        url: `/shop/category/${this.categoryid}`
      },
      {
         label: `${this.shopCategoryName}`,
        url: ''
      },
    
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    console.log("min is")
   console.log(changeContext.value);
   console.log("max is")
   console.log(changeContext.highValue);
   const params=this.shopservice.getShopParams();
   params.minPrice=changeContext.value;
   params.maxPrice=changeContext.highValue;
   this.shopservice.setShopParams(params);
   this.getProduct();

  }

  }
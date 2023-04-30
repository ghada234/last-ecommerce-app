import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IColor } from 'src/app/shared/Models/Color';
import { IProduct } from 'src/app/shared/Models/Iproduct';
import { Photo } from 'src/app/shared/Models/Photo';

import { ShopService } from '../shop.service';
// import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
// import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import 'hammerjs';
// import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { IValue } from 'src/app/shared/Models/IValue';
import { IAttrbuite } from 'src/app/shared/Models/IAttrbuite';
import { ISelectValue } from 'src/app/shared/Models/ISelectAttrbuitet';
import * as _ from 'underscore';
import { ISpecificationAttrbuite } from 'src/app/shared/Models/ISpecificationAttrbuite';
import SwiperCore, { Pagination, SwiperOptions,Autoplay, Thumbs,FreeMode,Zoom} from 'swiper';
import { SwiperComponent } from "swiper/angular";
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';



SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay])
SwiperCore.use([Thumbs]);
SwiperCore.use([FreeMode]);
SwiperCore.use([Zoom]);



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  quanity:number=1;
   colors:IColor[];
   selectedColorId:number;
   selectedColorName:string;
  photos:Photo[];
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  valuee:IValue;
  attrbuitee:IAttrbuite;
  // selectedValues:{attrbuiteName:string,value:string}[]=[];
  atttrbuites:IAttrbuite[];
  specattrbuites:ISpecificationAttrbuite[]
  selectedValue:string;
  SelectedValueColor:string;
  SelectedValues:ISelectValue[]=[];
  SelectedSpecAttValues:ISelectValue[]=[];
  SelectedAttrbuite:string;
  arryKeys:string[]=[];
  groupSpecificationOptions:any=[]
  //forspecofication attrbuite
  SelectedSpecAttrObject:any={};
  SelectedSpecAttrObjectLength:number=0;

  //for attrbuite
  SelectedAttrObject:any={};
  SelectedAttrObjectLength:number=0;

  //this length with condition length of array >1
  SpecAttrbuiteObjectLentgh:number
  images:any;
  thumbsSwiper: any;
  categoryid:number;
  RelatedProducts:IProduct[];
  productId:number;
  // index:number=0;

  /////
  cateroryName:string;
  parentCategoryName:string;
  productName:string;
 
responsiveOptions:any[] = [
  {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 3
  }
];
  



  constructor(
    private shopservice: ShopService,
    private activatedRoute: ActivatedRoute,
 
   private basketservice:BasketService,
   private ngDynaimcBreadcrumService:NgDynamicBreadcrumbService
   
  ) {

    //make the title empty before loading the product so it don't show number of id or the previous name
    //note there is space
  
    
  }

  ngOnInit():void {
   
    //  this.loadProduct();
    // this.loadProduct()
    // this.loadProductColor();
    this.activatedRoute.params.subscribe(params => {
      if(params){
        this.productId = params['id'];
        this.loadProduct();
       // reset and set based on new parameter this time

      }
      
  });

    
    
  }


  

  loadProduct() {
    this.shopservice
      .getProduct(this.productId)
      .subscribe(
        product => {
          if(product){

            this.product = product;
            console.log(this.product);
         
             this.product.identifier=product.id.toString();
             this.product.identifierSpec=product.id.toString();
            this.photos=product.photos;
            this.images=product.photos;
             this.atttrbuites=product.attrbuites;
             this.specattrbuites=product.specifactionAttrbuittes;
             this.cateroryName=product.categoryName;
             this.parentCategoryName=product.categoryParentName;
             this.productName=product.name;
            
             this.updateBreadcrumb();
             this.getRelatetdProducts(product.categoryId)





        //  this.groupSpecificationOptions=  this.specattrbuites.reduce(function (r, a) {
        //       r[a.specificationAttrbuiteTypeName] = r[a.specificationAttrbuiteTypeName] || [];
        //       r[a.specificationAttrbuiteTypeName].push(a);
        //       return r;
        //   }, Object.create(null));
          this.groupSpecificationOptions=this.groupArray(this.specattrbuites)
          //get length of object that hasn't length of 1
     
   

     this.getLengthOfObjectWithCondition(this.groupSpecificationOptions)
    
  
        const keys = Object.keys( this.groupSpecificationOptions);
      
        this.arryKeys=keys;
    
        // this.settSelectedSpecValuedDefault();
            //  this.setSelectedValuesDefault();
            //  console.log(this.atttrbuites)
          }
          

          // this.galleryOptions = [
          //   {
          //     width: '500px',
          //     height: '500px',
          //     imagePercent: 100,
          //     thumbnailsColumns: 4,
          //     imageAnimation: NgxGalleryAnimation.Slide,
          //     preview: false
              
              
          //   }
          // ]

          // this.galleryImages =this.getImages();
            
        
    
          //handle bc service
         
       

           
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //load product color

  loadProductColor(){
    this.shopservice.getProductColor(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(colors=>{
      this.colors=colors;
      
    },error=>{console.log(error)})


  }


  addItemToBasket(){
    if(this.product.discountEnabled==true){
      this.product.price=this.product.priceAfterDiscount;
    }
    this.basketservice.AddIemToBasket(this.product,this.quanity);
  }
  incrementQuantity(){
    this.quanity++;
  }
  decrementQuantity(){
    if(this.quanity>1){
         this.quanity --;
  
  }else{this.quanity=1}
}



selectColor(id:number,name:string){
  this.selectedColorId=id;
  this.selectedColorName=name;
  this.product.productColor=name;


}
// getImages(): NgxGalleryImage[] {
  
//   const imagesUrl =[];


//   for (let i=0;i <this.product.photos.length;i++){
  
//     imagesUrl.push({
//       small:this.product.photos[i].photoUrl,
//       medium:this.product.photos[i].photoUrl,
//        big:this.product.photos[i].photoUrl,
    
//     });
   

//   }
//   return imagesUrl;

// }
// setSelectedValuesDefault(){
//   if( this.atttrbuites?.length!==0){
  
// for(var i=0;i<this.product.attrbuites.length;i++){
//   this.SelectedValues[i]={attrbuiteName:this.product.attrbuites[i].attrbuiteType.name,attrbuiteValue:this.product.attrbuites[i].values[0].name}
// console.log( this.SelectedValues[i])

// }

//   }
// }


//sett selected specvalue default
settSelectedSpecValuedDefault(){

  
  var keys,i;
for( i=0;i<Object.keys(this.groupSpecificationOptions).length;i++){
  
  let [key, value] = Object.entries(this.groupSpecificationOptions)[i];
  var values:any[];

  
 

if(value){
  this.SelectedSpecAttValues[i]={attrbuiteName:key,attrbuiteValue:value[0]?.specificationAttrbuiteTypeoptionName}
}
 
  
    
  }
 
}


//selected values for attrbuites
//we want to set active color to selected attrbuites that has alues more than one value
////////////////////////////////
selectvalues(attrbname:string,valname:string,valid:number,isSpec:boolean){
 
    this.selectedValue=valname;
    this.SelectedAttrbuite=attrbname;


  
//  var index=this.selectvalues.findIndex(x=>x.attrbuiteName===attrbname);
 var index=this.SelectedValues.findIndex(x=>x.attrbuiteName===attrbname)

 if(index!==-1){

 this.SelectedValues= this.SelectedValues.filter(x=>x.attrbuiteName!==attrbname)


 }
//  array.sort(function (a, b) { return order[a.id] - order[b.id]; });

var selectedValue:ISelectValue={attrbuiteName:attrbname,attrbuiteValue:valname,valueid:valid};



 this.SelectedValues.push(selectedValue);



 if(this.SelectedValues.length>1){

  this.SelectedValues=_.sortBy( this.SelectedValues,['attrbuiteName']);


  /////
  this.SelectedAttrObject[attrbname]=valname;
  this.SelectedAttrObjectLength=Object.keys(this.SelectedSpecAttrObject).length;


 }

 //set values of selected object




 var x:string=this.product.id.toString();
 for(var  i=0;i<this.SelectedValues.length;i++){

  x=x+this.SelectedValues[i].valueid

 }


 this.product.selecedValues=this.SelectedValues;
 this.product.identifier=x;


}

///////////////////////////////////////////
//selectedvalues for spec attrbuites

selectvaluesSpecAttrbuite(attrbname:string,optionName:string,optionId:number){
 
  
//  var index=this.selectvalues.findIndex(x=>x.attrbuiteName===attrbname);
var index=this.SelectedSpecAttValues.findIndex(x=>x.attrbuiteName===attrbname)

if(index!==-1){

this. SelectedSpecAttValues= this. SelectedSpecAttValues.filter(x=>x.attrbuiteName!==attrbname)


}
//  array.sort(function (a, b) { return order[a.id] - order[b.id]; });


var selectedValue:ISelectValue={attrbuiteName:attrbname,attrbuiteValue:optionName,valueid:optionId};



this.SelectedSpecAttValues.push(selectedValue);



if(this.SelectedSpecAttValues.length>1){

this.SelectedSpecAttValues=_.sortBy(this.SelectedSpecAttValues,['attrbuiteName']);


}



var x:string=this.product.id.toString();
for(var i=0;i<this.SelectedSpecAttValues.length;i++){

x=x+this.SelectedSpecAttValues[i].valueid

}

//selectedSpecAttrbuiteObject

this.SelectedSpecAttrObject[attrbname]=optionName;

this.SelectedSpecAttrObjectLength=Object.keys(this.SelectedSpecAttrObject).length;



this.product.selectedSpecAttValues=this.SelectedSpecAttValues;
this.product.identifierSpec=x;


}

//method to group array
 groupArray(array:any[]){
  return  array.reduce(function (r, a) {
    r[a.specificationAttrbuiteTypeName] = r[a.specificationAttrbuiteTypeName] || [];
    r[a.specificationAttrbuiteTypeName].push(a);
    return r;
}, Object.create(null));

}





getLengthOfObjectWithCondition(groupObject){

  let objectlength = 0
  for (var key in groupObject) {
    // console.log(key, groupObject[key].length);

    if(groupObject[key].length>1){
      objectlength+=1;
    }

  

}
console.log(objectlength)
this.SpecAttrbuiteObjectLentgh=objectlength;


}
//get related products
getRelatetdProducts(catid){
  this.shopservice.getRelatedProducts(catid).subscribe(res=>{
    if(res){
      this.RelatedProducts=res.filter(x=>x.id!=this.productId);
    }
  });
}

updateBreadcrumb(): void {
  const breadcrumbs  =  [
    {
      label: `${this.product.categoryParentName}`,// pageOneID Parameter value will be add 
      url: `/shop/category/${this.product.categoryParenitId}`
    },
    {
      label: `${this.product.categoryName}`,// pageTwoID Parameter value will be add 
      url: `/shop/category/${this.product.categoryParenitId}/categoryshop/${[this.product.categoryId]}`
    },

    {
      label: `${this.product.name}`,// pageTwoID Parameter value will be add 
      url: ''
    }
  
  ];
  this.ngDynaimcBreadcrumService.updateBreadcrumb(breadcrumbs);
}






}


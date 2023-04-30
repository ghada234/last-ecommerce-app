import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/Models/Iproduct';
import { ShopService } from '../shop/shop.service';
// import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
// import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import 'hammerjs';
// import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { HomeService } from './home.service';
import { Category } from '../shared/Models/Category';
import SwiperCore, { Pagination, SwiperOptions,Autoplay} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ShopParams } from '../shared/Models/ShopParams';
import { Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  animationInProgress = false;

  itemsPerSlide = 5;
  //for ngprime
  responsiveOptions;
 

  products:IProduct[];
  discountetdProducts:IProduct[];
  shopparams:ShopParams;
  discountedShopParams:ShopParams;
  slidesStore:any=[{src:"assets/images/6.jpg",alt:"picture1",id:"first",title:"thefirst"},{src:"assets/images/5.jpg",alt:"picture2",id:"second",title:"thesecond"},{src:"assets/images/4.jpg",alt:"picture3",id:"third",title:"thethird"}]

  categories:Category[];
  config: SwiperOptions = {
 
    spaceBetween:30,
    centeredSlides:true,

    
    pagination: { clickable: true },
  
    autoplay:{delay:1500,disableOnInteraction:false},
   
    breakpoints:{300:{slidesPerView:2},1024:{slidesPerView:4},
    768:{slidesPerView:3}
  
  },
  

  
   
  };
  
  constructor(private shopservice:ShopService,private homeservice:HomeService,private router:Router,private dynamicservice:NgDynamicBreadcrumbService){ 

///
    this.shopparams=this.shopservice.getShopParams();
    this.discountedShopParams=this.shopservice.getDiscountedShopParams();
    
    ///

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    this.getlastproducts();
    this.getParentCategories();
    this.getFirstDiscountedProducts();
    this.updateBreadcrumb()
  

  }

  getlastproducts(){
    this.shopservice.getLastProducts().subscribe((res)=>{

     
      if(res){
        this.products=res;
        console.log("last")
         console.log(this.products)
      }
    


    },error=>{console.log(error)});
  }
  /////
  getFirstDiscountedProducts(){
    //get product with discount 50%
    this.discountedShopParams.amount=50;
    this.shopservice.setDiscountedShopParams(this.discountedShopParams);
    this.shopservice.getFirsttDiscountedProduct().subscribe(res=>{
      if(res){
        this.discountetdProducts=res;
        // console.log("discounted");
        // console.log(res)

      }
   
    },error=>{
      console.log(error);
    })


  }

  getParentCategories(){
    this.homeservice.getParentCategories().subscribe(res=>{
      this.categories=res;
     

    },error=>{console.log(error)})
  }
  onSwiper([swiper]) {
    // console.log(swiper);
  }
  onSlideChange() {
    // console.log('slide change');
  }
  startAnimation() {
    if(this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiper.swiperRef.slideNext(1000);
      this.animationInProgress = false;
      this.startAnimation();
    }, 1000);
  }

  navigateTo(){
    const params=this.shopservice.getDiscountedShopParams();
    var DiscountAmount=params.amount;
    this.router.navigate(["/shop/discount",{discountamount:DiscountAmount}]);

  }
  updateBreadcrumb(): void{
    const breadcrumbs=[
      {
        label: "الرئيسيه",
        url: ''
      },
    ]
    this.dynamicservice.updateBreadcrumb(breadcrumbs);

    

  }

}


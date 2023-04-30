import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { HomeService } from 'src/app/home/home.service';
import { IBasket } from 'src/app/shared/Models/Basket';
import { Category } from 'src/app/shared/Models/Category';
import { IProduct } from 'src/app/shared/Models/Iproduct';
import { IUser } from 'src/app/shared/Models/user';
import { ShopService } from 'src/app/shop/shop.service';





@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  basket$:Observable<IBasket>;
  currentUser$:Observable<IUser>;
  categories:Category[];
  isScrolled = false;
  @ViewChild("searchElement", { static: false })
  searchTerm!: ElementRef; 
  products:IProduct[];

  constructor(private basketservice:BasketService,private accountService:AccountService,private homeservice:HomeService,private router:Router,private shopservice:ShopService) { }


  ngOnInit(): void {
    this.basket$=this.basketservice.basket$;
    this.currentUser$=this.accountService.currentUser$;
    this.getCattegories()

  }
  ngAfterViewInit() {

    window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {

    document.getElementById("nav").classList.add("navbar-scrolled");
    document.getElementById("nav").classList.remove("navbar-scroll");

 
  } else {
 
    document.getElementById("nav").classList.add("navbar-scroll");
    document.getElementById("nav").classList.remove("navbar-scrolled");
 
   

  }
}
  
  }
  logOut(){
    this.accountService.logOut();
  
  }
  //get catageories method
  getCattegories(){
    this.homeservice.getParentCategories().subscribe(res=>{
      if(res){
        this.categories=res;


      }
    },error=>{
      console.log(error);
    });
  }

//   scrollEvent() {
//     console.log("scrolled")
//     window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
// }

onWindowScroll() {
  let element = document.querySelector('.navbar') as HTMLElement;
  if (window.pageYOffset > element.clientHeight) {
    element.classList.remove('navbar-default');
    element.classList.add('navbar-scrolled');
   
  } else {
    element.classList.remove('navbar-scrolled');
  }
}
getProducts(){
  this.shopservice.getProducts(false).subscribe(res=>{
    console.log(res);
    this.products=res.data;
  })

}
onSearch(){
  const params=this.shopservice.getShopParams();
  params.searchTerm=this.searchTerm.nativeElement.value;
  params.pageIndex=1;
  this.shopservice.setShopParams(params);
  this.getProducts();
}
onSearchChange(searchValue: string): void {  
  console.log(searchValue);
  if(searchValue===""){
    this.products=[];
    return;
  }
  const params=this.shopservice.getShopParams();
  params.searchTerm=searchValue;
  
  params.pageIndex=1;
  params.categoryid=0;
  this.shopservice.setShopParams(params);
  this.getProducts();
}
 
}

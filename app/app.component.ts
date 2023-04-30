import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/Models/IPagination';
import { IProduct } from './shared/Models/Iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'ng-dynamic-breadcrumb/lib/breadcrumb.model';
import { WishListServiceService } from './wish-list/wish-list-service.service';
//this the component we do any inaliztions in it
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SkyNetApp';
  checkHome=false;
  breadCrumbs$:Observable<Breadcrumb[]>
  breadcrumbs:Breadcrumb[]
  

  constructor(private http: HttpClient, private basketservice: BasketService, private accountservice: AccountService,public router: Router,private route:ActivatedRoute,private bsservice:NgDynamicBreadcrumbService
    
   ,private wishistservice:WishListServiceService
    ) {
   
    
    this.breadCrumbs$=this.bsservice.newBreadcrumb;
    console.log(this.breadCrumbs$)
  
    
  }
  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
    this.loadWishlIst()
  
   
   


  
  }

  ngAfterViewInit(): void{

   
  

  }
  ngAfterContentChecked(){


  }
 


  loadBasket(){
    const basketId = localStorage.getItem('basket-id');
    if (basketId) {
      //here when refresh the page we itialize this component so call get basket that add the basket to basketsource with next .so when return
      //basket value we return the value in the local storage ==> behaviour subject time scope until refresh
      this.basketservice.getBasket(basketId).subscribe(
        (response) => {
          console.log('inizalize basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  /// load user

  loadUser(){
    const token=localStorage.getItem("token-skynet");
    if(token){
      this.accountservice.LoadCurrrentUser(token).subscribe(()=>{
        console.log("loaded user");
        

      },error=>{console.log(error)});
    }

  }

  loadWishlIst(){
    const token=localStorage.getItem("token-skynet");
    if(token){
      this.wishistservice.getWishList().subscribe(res=>{
        console.log("initalize wishlist when login")
      },error=>{
        console.log(error);
      })

    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/Models/Iproduct';
import { WishListServiceService } from 'src/app/wish-list/wish-list-service.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  
  constructor(private basketservice:BasketService,private ngDynaimcBreadcrumService:NgDynamicBreadcrumbService,private wishlistservice:WishListServiceService) { }
  @Input() product!: IProduct;

  ngOnInit(): void {
   
  }
  addItemToBasket(){
    this.basketservice.AddIemToBasket(this.product);
    
  }
  AddItemToWishList(product:IProduct){
    this.wishlistservice.AddItemToWishList(product);

  }
}

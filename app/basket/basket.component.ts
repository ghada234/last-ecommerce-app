import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotal } from '../shared/Models/Basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basketTotal$:Observable<IBasketTotal>;
  basket$:Observable<IBasket>;
  constructor(private basketservice:BasketService,private ngDynamicBreadcrumbService:NgDynamicBreadcrumbService) { }

  ngOnInit(): void {
    this.basketTotal$=this.basketservice.basketTotal$;
    this.basket$=this.basketservice.basket$;
    this.updateBreadcrumb()
    
  }
  RemoveBasketItem(item:IBasketItem){
    this.basketservice.removeItemFromBasket(item);
    
  }

  incrementBasketItemQuantity(item:IBasketItem){
  
    
    this.basketservice.IncrementItemQuantity(item);
  }

  decrementBasketItemQuantity(item:IBasketItem){
    this.basketservice.DecrementBasketItem(item);
  }

  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: `السله`,
        url: ''
      },
    
    
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

}

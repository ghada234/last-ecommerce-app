import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, IBasketItem } from '../../Models/Basket';
import { OrderItem } from '../../Models/Order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit {

  @Input() basket$:Observable<Basket>;
  @Input()items:any=[];
  // @Input()orderItems:OrderItem[]=[];
  
  constructor() { }

  ngOnInit(): void {
   
   
  }

}

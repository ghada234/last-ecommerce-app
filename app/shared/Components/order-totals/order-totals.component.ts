import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotal } from '../../Models/Basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {

  @Input() shippingPrice:number;
  @Input() subTotal:number;
  @Input() total:number;
  @Input() isOrder:boolean;
 basketTotal$:Observable<IBasketTotal>;

  constructor(private basketservice:BasketService) { }

  ngOnInit(): void {
    this.basketTotal$=this.basketservice.basketTotal$;
  }

}

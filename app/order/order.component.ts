import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/Models/Order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  orders:Order[];
  constructor(private orderservice:OrderService) { }

  ngOnInit(): void {
    this.getorders();
    
  }
  getorders(){
    this.orderservice.GetOrdersUser().subscribe((order:Order[])=>{
      this.orders=order;
    },error=>{console.log(error)});
  }

}

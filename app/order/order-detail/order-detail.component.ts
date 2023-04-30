import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/Models/Order';

// import { BreadcrumbComponent, BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order:Order;


  constructor(private orderservice:OrderService,private route:ActivatedRoute) { 

    // this.breadcrumbs.set('@OrderDetails',' ');
  }


  ngOnInit(): void {
    this.LoadOrder();
  }

  LoadOrder(){
    console.log(+this.route.snapshot.paramMap.get('id'));
  this.orderservice.GetOrderUser(+this.route.snapshot.paramMap.get('id')).subscribe((order:Order)=>{
    this.order=order;
    console.log(this.order)
    // this.breadcrumbs.set('@OrderDetails',`#Order${order.id}-${order.status}`)

  },error=>{console.log(error)} );
  }

}


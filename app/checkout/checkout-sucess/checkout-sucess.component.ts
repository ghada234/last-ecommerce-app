import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/Models/Order';

@Component({
  selector: 'app-checkout-sucess',
  templateUrl: './checkout-sucess.component.html',
  styleUrls: ['./checkout-sucess.component.css']
})
export class CheckoutSucessComponent implements OnInit {
 order:Order;
  constructor(private router:Router) {
    //note we handle navigation extras in constructor to get data throught routing
    //get the currentt navigattion when the router is navigated
    const navigation=this.router.getCurrentNavigation();
    const state=navigation&&navigation.extras&&navigation.extras.state;
    if(state){
       this.order=state as Order;
    }

   }

  ngOnInit(): void {
  }

}

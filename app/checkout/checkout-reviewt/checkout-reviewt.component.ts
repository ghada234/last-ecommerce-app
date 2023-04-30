import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/Models/Basket';

@Component({
  selector: 'app-checkout-reviewt',
  templateUrl: './checkout-reviewt.component.html',
  styleUrls: ['./checkout-reviewt.component.css']
})
export class CheckoutReviewtComponent implements OnInit {

  constructor(private basketservice:BasketService,private toastr:ToastrService) { }
    basket$:Observable<Basket>;
    items:any[];
    @Input() appStepper:CdkStepper;

  ngOnInit(): void {
     this.basket$=this.basketservice.basket$;
     this.getBasketItems();
     
  }
  CreateBaymentIntent(){
    return this.basketservice.createPaymentIntent().subscribe((basket:any)=>{
      // this.toastr.success("payment intent created successfuly");
      this.appStepper.next();

    },error=>{this.toastr.error(error.message)});
  }

  getBasketItems(){
    this.basket$.subscribe(res=>{
      if(res){
        this.items=res.items;
      }
 
    })
  }

}

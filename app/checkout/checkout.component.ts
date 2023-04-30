import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IAddress } from '../shared/Models/Address';
import { IBasketTotal } from '../shared/Models/Basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  basketTotal$:Observable<IBasketTotal>;
  constructor(private fb: FormBuilder,private accountservice:AccountService,private basketService:BasketService) {}

  ngOnInit(): void {
    this.createCheckForm();
    this.GetAddressFormValue();
    this.PopulatedeliverymethodValue();
    this.basketTotal$=this.basketService.basketTotal$;

  }

  createCheckForm() {
    //adress form is form inide checkout form
    this.checkoutForm = this.fb.group({
      AddressForm: this.fb.group({
        first_name: [null, Validators.required],
 last_name: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        postal_code: [null, Validators.required],
        country: [null, Validators.required],
        phone_number: [null, Validators.required],
        email: [null, Validators.required],
      
      }),
      DeliveryForm:this.fb.group({
        DeliveryMehod:[null,Validators.required]
      }),
      PaymentForm:this.fb.group({
        nameOnCard:[null,Validators.required]
      })
    
    }
    
    );
  }
  //get address for userand patch values to form

  GetAddressFormValue(){

    this.accountservice.getUserAddress().subscribe((address:IAddress)=>{
      if(address){
        this.checkoutForm.get('AddressForm.first_name').patchValue(address.first_name);
        this.checkoutForm.get('AddressForm.last_name').patchValue(address.last_name);
        this.checkoutForm.get('AddressForm.street').patchValue(address.street);
        this.checkoutForm.get('AddressForm.city').patchValue(address.city);
        this.checkoutForm.get('AddressForm.country').patchValue(address.country);
        this.checkoutForm.get('AddressForm.postal_code').patchValue(address.postal_code);
        this.checkoutForm.get('AddressForm.phone_number').patchValue(address.phone_number);
        this.checkoutForm.get('AddressForm.email').patchValue(address.email);
        console.log(address);
      }
     
    },error=>{console.log(error)});

  }

  //getdeliverymethod when press checkout and that we do to populate deliverymethod after updationg basket and return agian to checkout

  PopulatedeliverymethodValue(){
    const basket=this.basketService.getCurrentBaskeValue();
    //it equal null before choose delivery method
    if(basket.deliveryMethodId!==null){
     this.checkoutForm.get("DeliveryForm").get("DeliveryMehod").patchValue(basket.deliveryMethodId.toString());
    }
  }
}

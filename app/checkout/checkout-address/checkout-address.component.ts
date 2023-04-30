import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/Models/Address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css'],
})
export class CheckoutAddressComponent implements OnInit {
  //from parent checkout component to child checkout address

  @Input() checkoutForm: FormGroup;
  constructor(
    private accountservice: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  SaveUserAddressApi() {
    this.accountservice
      .updateUserAddress(this.checkoutForm.get('AddressForm').value)
      .subscribe(
        (address: IAddress) => {
          console.log(address);
          this.toastr.success('Address saved Successfully');
          this.checkoutForm
            .get('AddressForm.first_name')
            .reset(address.first_name);
          this.checkoutForm.get('AddressForm.last_name').reset(address.last_name);
          this.checkoutForm.get('AddressForm.street').reset(address.street);
      
          this.checkoutForm.get('AddressForm.city').reset(address.city);
          this.checkoutForm.get('AddressForm.postal_code').reset(address.postal_code);
          this.checkoutForm.get('AddressForm.phone_number').reset(address.phone_number);
          this.checkoutForm.get('AddressForm.country').reset(address.country);
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }
}

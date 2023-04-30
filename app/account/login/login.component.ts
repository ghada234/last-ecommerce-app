import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { WishListServiceService } from 'src/app/wish-list/wish-list-service.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private accountservice: AccountService ,private router:Router,private activatedroute:ActivatedRoute,private ngDynamicBreadcrumbService:NgDynamicBreadcrumbService
    ,private wishlistservice:WishListServiceService
    ) {}
  //get current user
  currentUser$ = this.accountservice.currentUser$;
  //create login form of type formgroup
  loginForm: FormGroup;
  returnUrl:string;

  ngOnInit(): void {
    this.returnUrl=this.activatedroute.snapshot.queryParams['returnUrl'] ||'/'
    this.createLoginForm();
    this.updateBreadcrumb();
  }

  //formcontrol in angular is an entity that track vlaue and validation statue
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required),
    });
  }

  onsubmit() {
    console.log(this.loginForm.value);
    console.log('hi');
    this.accountservice.login(this.loginForm.value).subscribe(
      (res) => {
        console.log('login sucessfully');
        this.wishlistservice.getWishList();

        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: `تسجيل الدخول`,
        url: ''
      },
    
    
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}

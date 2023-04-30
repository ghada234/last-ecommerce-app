import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];
  constructor(
    private fb: FormBuilder,
    private accountservice: AccountService,
    private router: Router,
    private ngDynamicBreadcrumbService:NgDynamicBreadcrumbService
  ) {}

  ngOnInit(): void {
    this.CreateRegisterForm();
    this.updateBreadcrumb()
  }

  onsubmit() {
    this.accountservice.register(this.registerForm.value).subscribe(
      (res) => {
      
        
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log(error);
        this.errors = error.errors;
      }
    );
  }
  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
        [this.validateEmailExist()]
      ],
      password: [null,
        [Validators.required,
        Validators.pattern('(?:(?=[^A-Za-z]*[A-Za-z])(?=\\D*\\d)[A-Za-z\\d]{6,16})?')
    ]
     ],
    });
  }

  //
  validateEmailExist(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountservice.checkEmialExist(control.value).pipe(
            map((res) => {
              return res ? { emailExist: true } : null;
            })
          );
        })
      );
    };
  }





  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: `حساب جديد`,
        url: ''
      },
    
    
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }


}

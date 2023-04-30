import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "login", component: LoginComponent,data: {
    title: 'login',
    breadcrumb: [
      {
        label: 'تسجيل الدخول',
        url: ''
      }
    ]
  }, },

{ path: 'register', component: RegisterComponent
,data: {
  title: 'register',
  breadcrumb: [
    {
      label: 'حساب جديد',
      url: ''
    }
  ]
},

},
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

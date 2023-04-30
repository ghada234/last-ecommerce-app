import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private accountservice: AccountService, private router: Router,private toatr:ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    //we don't need to subscribe because the router functionality will subscribe and unsubscribe to us
  //  return  this.accountservice.currentUser$.pipe(map((auth)=>{
  //       if(auth){
       
  //        return true;

  //       }
  //       this.router.navigate([''], {queryParams: {returnUrl: state.url}});
  //        console.log("hi from guard");
         
    
  //      return false;
       
      

  //    }));
  //  var token=localStorage.getItem('token')
  //  if(token){
  //    return true;
  //  }
  //  this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
  //  this.toatr.error("قم بتسجيل الدخول اولا");
  //  return false
  var user=this.accountservice.getCurrentUserValue();
  if(user){
    return true;
  }
  this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
    this.toatr.error("قم بتسجيل الدخول اولا");
   return false
}
  
}

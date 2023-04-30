import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//catch any error from htttp response coming from api
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,private toastr:ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //next is htttpresponse we want to catch error from that
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {

          if(error.status==400){
            //in case of validation error throw error to component
            if(error.error.errors){
              throw error.error;
            }
            else{
              this.toastr.error(error.error.message,error.error.statusCode);
            }
          
          }
          if(error.status==401){
            this.toastr.error(error.error.message,error.error.statusCode);
          }
          if (error.status == 404) {
            this.router.navigate(['/notfound']);
            console.log("hi")
          }

          //we want to pass exceptin informations to servererror component and we will send it wih navigate
          if (error.status == 500) {

            //in state  we creatte new object with error prop that equal to errot that we catch it and .error object that has values
            //ad now new error has statuscode and details and so on
            const navigationExtras:NavigationExtras={state:{error:error.error}}
            this.router.navigate(['/servererror'],navigationExtras);
          }
         
        }
        return throwError(error);
      })
    );
  }
}

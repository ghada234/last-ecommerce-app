import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private busyservice: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if(request.method==="POST" && request.url.includes('order')){
 ///mashy ya m3lm
    return next.handle(request);
    }
    if(request.method==="POST" && request.url.includes('payment')){
      ///mashy ya m3lm
         return next.handle(request);
         }
    if(request.url.includes('emailexist')){
      // this.busyservice.busy();
      return next.handle(request);
    }
    if(request.method==="DELETE"){
      return next.handle(request);
    }
    this.busyservice.busy();
   
    return next.handle(request).pipe(
      // delay(20),

      //after request end
      finalize(() => {
        this.busyservice.idle();
      })
    );
  }
}

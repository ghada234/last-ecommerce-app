import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount=0;
  constructor(private ngxspinner:NgxSpinnerService) 
  
  {
   

   }

   //busy method that call when request continue
   busy(){
     this.busyRequestCount++;
    // this.ngxspinner.show("myspinner",
    // {
    //   type: "line-scale-party",
    //   size: "large",
    //   bdColor: "rgba(0, 0, 0, 1)",
     
    // });
    this.ngxspinner.show();
   }

   //idle metthod hide the spinner
   idle(){
     this.busyRequestCount --;
     if(this.busyRequestCount <=0){
       this.busyRequestCount=0;
       this.ngxspinner.hide();
     }
   }
}

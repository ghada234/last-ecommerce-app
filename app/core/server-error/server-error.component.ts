import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
 error:any;
  constructor(private router:Router) {

    //we can just get data from router <<navigationextras>> in constructor
   const navigation= this.router.getCurrentNavigation();

   //if we have navigation && navigation.extras&&navigation.extras.state <make error equal> navigation.extras.state.error
   this.error=navigation && navigation.extras&&navigation.extras.state&&navigation.extras.state['error'];
   

   }

  ngOnInit(): void {
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.css'],
})
export class ErrorTestComponent implements OnInit {
  baseUrl = environment.apiUrl;
  Validationerror:any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  //get product that not found in our products
  get404NotFound() {
    return this.http.get<object>(`${this.baseUrl}product/500`).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if(error)
        console.log(error);
      }
    );
  }

  get500ServerError() {
    return this.http.get<object>(`${this.baseUrl}buggy/servererror`).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if(error)
        console.log(error);
      }
    );
  }

  get400Error() {
    return this.http.get<object>(`${this.baseUrl}buggy/badrequest`).subscribe(
      (res) => {
        console.log(res);
      },

      (error) => {
        if(error){  console.log(error);
    
      }
      
      }
    );
  }

  get400ErrorValidation() {
    return this.http.get<object>(`${this.baseUrl}product/five`).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if(error)
        console.log(error);
        //we throw error.error in iterceotpr in case in validation
        this.Validationerror=error.errors;
      }
    );
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/Models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order:Order[];
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  GetOrdersUser(){

return this.http.get(`${this.baseUrl}order`);

    
  }
  GetOrderUser(id:number){
    return this.http.get(`${this.baseUrl}order/${id}`);
  }
}

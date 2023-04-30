import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeliveryMehod } from '../shared/Models/DeliveryMehod';
import { Order, OrderToCreate } from '../shared/Models/Order';
import { PaymentToCreate } from '../shared/Models/PaymentToCreate';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  deliveryMethods: DeliveryMehod[];
  baseUrl = environment.apiUrl;
  private OrderSource = new ReplaySubject<Order>(1);
  //public prop using it outside service to subscribe it $ is observable
  order$ = this.OrderSource.asObservable();

  constructor(private http: HttpClient) {}

;
  //get delivery method method
  getDeliveryMethods() {
    return this.http
      .get<DeliveryMehod[]>(`${this.baseUrl}order/deliverymethod`)
      .pipe(map((dm: DeliveryMehod[]) => {

        return dm.sort((a,b)=>a.price-b.price);
      }));
  }
  //create order method
  CreateOrder(order:OrderToCreate){
    return this.http.post<Order>(`${this.baseUrl}order`,order).pipe(map((order)=>{
      this.OrderSource.next(order);
      return order;
    }))
   
  }

  CreatePayment(payment:PaymentToCreate){

    return this.http.post(`${this.baseUrl}payment`,payment,{responseType: 'text'});
  }
  //behaviour subjec
  public getCurrentorderValue() {
 
  }
}

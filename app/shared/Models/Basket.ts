
import {v4 as uuidv4 } from 'uuid';
import { ISelectValue } from './ISelectAttrbuitet';
export interface IBasket {
    id: string
    items: IBasketItem[]
    deliveryMethodId?:number;
    clientSecret?:string;
    paymentIntentId?:string;
    shippingPrice?:number;
  }
  
  export interface IBasketItem {
    id: number
    productName: string
    quantity: number
    price: number
    pictureUrl: string
    type: string
    brand: string
     color:string
    selectedAttrbuiteValue:ISelectValue[];
    identifier:string;
    selectedSpecAttValues?:ISelectValue[];


    identifierSpec?:string;
  }

  export class Basket implements IBasket{
      //new identifier when create new instance of basket
      id: string=uuidv4();
      items: IBasketItem[]=[];
   
      
  }


  export interface IBasketTotal{
    shipping:number;
    subTotal:number;
    total:number;
    
   
  }
  
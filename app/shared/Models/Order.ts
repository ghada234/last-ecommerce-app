import { IAddress } from "./Address";
import { DeliveryMehod } from "./DeliveryMehod";






export interface OrderItem {
    productId: number;
    productMame: string;
    pictureUrl: string;
    price: number;
    quantity: number;
    selectedAttrbuiteValue?:string[];
    selectedSpecAttValues?:string[];



}

export interface Order {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IAddress;
    shippingPrice: number;
    deliveryMethod: string;
    orderItems: OrderItem[];
    status: string;
    totalPrice: number;
    subTotal: number;
}


export interface OrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}






import { IAddress } from "./Address";

export interface PaymentToCreate {


    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
    orderId:number;

}



import {v4 as uuidv4 } from 'uuid';
export interface IWishList {


    id:string;

    appUserId:string;
    wishListItems:IWishListItem[];
}

export class Wishlist implements IWishList{
    id: string=uuidv4();
    appUserId: string;
    wishListItems: IWishListItem[]=[];
    
}

export interface IWishListItem{
    id:number;
    productName:string;
    price:number;
    pictureUrl:string;
    isDiscount:boolean;
    priceAfterDiscount:number;

}




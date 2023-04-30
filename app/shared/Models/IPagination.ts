import { IProduct } from "./Iproduct";

export interface IPagination {

        pageIndex: number
        pageSize: number
        count: number
        data: IProduct[]
    
}

//to use cachinga and improve performance

export class Pagination{

        pageIndex: number
        pageSize: number
        count: number
        data: IProduct[]=[];
}

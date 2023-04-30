import { IAttrbuite } from "./IAttrbuite"
import { ISelectValue } from "./ISelectAttrbuitet"
import { ISpecificationAttrbuite } from "./ISpecificationAttrbuite"
import { Photo } from "./Photo"

export interface IProduct {

        id:number
        name: string
        description: string
        price: number
      
        productType: string
        productBrand: string
        productColor:string;
        photos:Photo[];
        pictureUrl:string;
        quanityInStock:number;
        attrbuites :IAttrbuite[];
        ///////
        specifactionAttrbuittes:ISpecificationAttrbuite[];
        selecedValues?:ISelectValue[];
        selectedSpecAttValues?:ISelectValue[];

        identifier:string|null;

        identifierSpec:string|null;

        discountEnabled:boolean;
        priceAfterDiscount:number;
        amoutWithPercentage:number;
        categoryId :number;
        categoryName:string;
        categoryParentName:string;
        categoryParenitId:number;



    
      
}

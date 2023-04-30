
import { IValue } from "./IValue";
import { IAttrbuiteType } from "./IAttrbuiteType";

export interface IAttrbuite {
    id:number;
    textPrompt:string;
    isColor:boolean;
    attrbuiteTypeId:number;
    // attrbuiteTypeName:string;
    values:IValue[];
    attrbuiteType:IAttrbuiteType;
    
    
}


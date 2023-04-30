import { ISelectValue } from "./ISelectAttrbuitet";

export class ShopParams {


  selectedType:number=0;
  selectedBrand:number=0;
  selecedBrandName:string;
  SelectedSort:string="name";
  pageIndex:number=1;
  pageSize:number=8;
  searchTerm:string;
  categoryid?:number=0;
  selecedCategoryName:string;


  optionid?:number=0;
  amount:number=0;
 selectedOptions?:string[]=[];
 //max and min price params

 maxPrice?:number=0;
 minPrice?:number=0;

}

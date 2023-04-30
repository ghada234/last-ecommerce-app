import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { ToastrService } from 'ngx-toastr';
import { count, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IWishList } from 'src/app/shared/Models/WishList';
import { ShopService } from 'src/app/shop/shop.service';
import { WishListServiceService } from '../wish-list-service.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
   WishList$:Observable<IWishList>;

  constructor(private ngDynamicBreadcrumbService:NgDynamicBreadcrumbService,private wishlistservice:WishListServiceService,private basketservice:BasketService
    ,private shopservice:ShopService,private toastr:ToastrService,private router:Router
    ) { }

  ngOnInit(): void {
     this.updateBreadcrumb()
    // this.wishlistservice.WishList$.subscribe(res=>{
    //   console.log(res);
    // })
    this.WishList$=this.wishlistservice.WishList$;
  }



  AddItemToBasket(ProductId:number){

 this.shopservice.getProduct(ProductId).subscribe(res=>{
  if(res){
    console.log(res);
    res.identifier=res.id.toString();
    res.identifierSpec=res.id.toString();
    if(res.specifactionAttrbuittes.length<1 && res.attrbuites.length<1){
      this.basketservice.AddIemToBasket(res);
    }
    //check for specfication attrbuites
    if(res.specifactionAttrbuittes.length>=1){
      const idCounts = res.specifactionAttrbuittes
      .reduce((counts, attr) => {
        const id = attr.specificationAttrbuiteTypeId;
        counts[id] = (counts[id] || 0) + 1;
        return counts;
      }, {});
   

      
    //check if there are more than one specifatioattrbuiteid
    const hasValueGreaterThanOne = Object.values(idCounts).some(value => value > 1);
    if(hasValueGreaterThanOne){
      this.toastr.error("يجب ان تختار مةاصفات المنتج اولا !!");
         this.router.navigate([`/shop/category/${res.categoryParenitId}/categoryshop/${res.categoryId}/product/${res.id}`]);
         return;
    }
    else{
      this.basketservice.AddIemToBasket(res);
      return;
    }
 
      
    }
    let AttrbuiteHasMoreValue=false;
    if(res.attrbuites.length>=1){
      
   AttrbuiteHasMoreValue= res.attrbuites.some(x=>x.values.length>1);
   if(AttrbuiteHasMoreValue){
    this.toastr.error("يجب ان تختار مةاصفات المنتج اولا !!");
    this.router.navigate([`/shop/category/${res.categoryParenitId}/categoryshop/${res.categoryId}/product/${res.id}`]);
    return;

   }
   else{
    this.basketservice.AddIemToBasket(res);
    return;

   }


 
     
    }

  


    

    // if(res.specifactionAttrbuittes.length>1 || res.attrbuites.length>1){
    //   this.toastr.error("يجب ان تختار مةاصفات المنتج اولا !!");
    //   // this.router.navigate(["/shop/category/{{product.categoryParenitId
    //   // }}/categoryshop/{{product?.categoryId}}/product/{{product?.id}}"']);
      
    //   this.router.navigate([`/shop/category/${res.categoryParenitId}/categoryshop/${res.categoryId}/product/${res.id}`]);
    // }
    // else{
    //   this.basketservice.AddIemToBasket(res);

    // }
    

  }

 })
  }

  DeleteItemFromBasket(item){
    this.wishlistservice.DeleteItemFromWishList(item);

  

  }
  

  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: `قائمه الرغبات`,
        url: ''
      },
    
    
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

}

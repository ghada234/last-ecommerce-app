import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Category } from 'src/app/shared/Models/Category';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {
  [x: string]: any;

  id:number;
  category:Category[];
  params:any;
  constructor(private shopeservice:ShopService,private route:ActivatedRoute,private router:Router,private vps:ViewportScroller,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
    ) {

    // this.bcservice.set('@Category',' ');
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    
    // this.id=+this.route.snapshot.paramMap.get('id');
    // this.getCategory()

    
    this.route.params.subscribe(params => {
      if(params){
        this.id = params['id'];
      
    
      this.getCategory(); // reset and set based on new parameter this time

      this.vps.scrollToPosition([0,0])

      }
      
  });

 
  }
  ngAfterViewInit() {
 
 }


  getCategory(){
    this.shopeservice.getCategory(this.id).subscribe(res=>{
   
      if(res){
        this.category=res.subCategories;
    
        // this.bcservice.set('@Category',res.name);
        this.updateBreadcrumb(res.name)
        console.log("category is")
        console.log(res)
        
      }
    
    },error=>{
      console.log(error)
    })
  }


  updateBreadcrumb(category): void{
    const breadcrumbs=[
      {
        label: `${category}`,
        url: `/shop/category/${this.id}`
      },
    ]
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
    

  }

}

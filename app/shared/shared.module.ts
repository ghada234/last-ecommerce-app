import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { PagerComponent } from './Components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import{CdkStepperModule} from '@angular/cdk/stepper';

import { BasketSummaryComponent } from './Components/basket-summary/basket-summary.component'
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { TextInputComponent } from './Components/text-input/text-input.component';
import { StepperComponent } from './Components/stepper/stepper.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
    SectionHeaderComponent,
 
  ],
  imports:[
    CommonModule,

    CarouselModule.forRoot(),
    ReactiveFormsModule,
 FormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    PaginationModule.forRoot(),
    NgDynamicBreadcrumbModule,

    
  ],
  //export paging header so can use it in any component 
  exports:[PagingHeaderComponent,PagerComponent,CarouselModule,OrderTotalsComponent,ReactiveFormsModule,BsDropdownModule, TextInputComponent,  CdkStepperModule,StepperComponent,BasketSummaryComponent,FormsModule,SectionHeaderComponent],
})

export class SharedModule { }

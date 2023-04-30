import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ErrorTestComponent } from './error-test/error-test.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SectionHesderComponent } from './section-hesder/section-hesder.component';


import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../shared/shared.module';
// import {BreadcrumbModule} from 'xng-breadcrumb';
import {MatExpansionModule} from '@angular/material/expansion';
import { FooterComponent } from './footer/footer.component';
import { AccountModule } from '../account/account.module';
import { HomeModule } from '../home/home.module';
import { AppSectionHeaderComponent } from './app-section-header/app-section-header.component';
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";



//

//responsible for singletones in our  application like navbar component

@NgModule({
  declarations: [NavBarComponent, ErrorTestComponent, NotFoundComponent, ServerErrorComponent, FooterComponent, AppSectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
     BrowserAnimationsModule ,
    // BreadcrumbModule,
    MatExpansionModule,
    
    SharedModule,
    AccountModule,
    HomeModule,
    NgDynamicBreadcrumbModule,


  ],
  exports:[NavBarComponent,ErrorTestComponent,FooterComponent,AppSectionHeaderComponent]
})
export class CoreModule {}

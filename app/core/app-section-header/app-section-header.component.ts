import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-section-header',
  templateUrl: './app-section-header.component.html',
  styleUrls: ['./app-section-header.component.css']
})
export class AppSectionHeaderComponent implements OnInit {
  labels:string[];
  breadCrumbs$:Observable<any[]>

  constructor(private breadcrumbs:NgDynamicBreadcrumbService) { }

  ngOnInit(): void {
   this.breadCrumbs$= this.breadcrumbs.breadcrumbLabels;
   console.log(this.breadCrumbs$)

  }

}

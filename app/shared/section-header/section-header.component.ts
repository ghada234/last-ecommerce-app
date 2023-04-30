import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Breadcrumb } from 'ng-dynamic-breadcrumb/lib/breadcrumb.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit {


  breadCrumbs$:Observable<Breadcrumb[]>
  constructor(private brservice:NgDynamicBreadcrumbService) { }

  ngOnInit(): void {
    this.breadCrumbs$=this.brservice.newBreadcrumb;
    console.log("bcis")
    console.log(this.breadCrumbs$)
  }

}

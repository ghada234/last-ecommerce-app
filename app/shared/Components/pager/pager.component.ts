import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
@Input() totalCount:number;
@Input() pageSize:number;
@Input() pageIndex:number;
@Output() pageChangedChild=new EventEmitter<PageChangedEvent>();
  constructor() { }

  ngOnInit(): void {
  }
  ///
  OnPageChange(event){
    //when change oage or in pagechanged event emitt the evenpage
this.pageChangedChild.emit(event);
  }


}

import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
//controlvalueaceesor an interface that act as abridge between the angular forms and native element in tthe dom
//and the native element is the input
export class TextInputComponent implements OnInit,ControlValueAccessor {

  @ ViewChild('input',{static:true}) input:ElementRef;
  @Input() type="text";
  @Input() label:string;
  @Input() placeholder:string;
  onChange(event){}
  onTouched(){}

  constructor(@Self() public controlDir:NgControl) {
//bind valueacessors to our class and now we get acess to controldir in componetn
     this.controlDir.valueAccessor=this
     
   }
  ngOnInit(): void {
     const control =this.controlDir.control;
     const validator=control.validator?[control.validator]:[];
     //async validators use to check something in api
     const asyncValidators=control.asyncValidator?[control.asyncValidator]:[]
     control.setValidators(validator);
     control.setAsyncValidators(asyncValidators);
     //try and validate our form in inializations
     control.updateValueAndValidity()
  }
  writeValue(obj: any): void {
this.input.nativeElement.value=obj || '';
  }
  registerOnChange(fn: any): void {
 this.onChange=fn;
  }
  registerOnTouched(fn: any): void {
  this.onTouched=fn
  }


 

}

import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],

  //note addproviders here
  providers:[{provide:CdkStepper,useExisting:StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {

  @Input() LinearModeSelected:boolean=false;

  ngOnInit(): void {
    this.linear=this.LinearModeSelected;
  }

  onClick(index){
    console.log(index);
    this.selectedIndex =index;
    
    
    
  }

}

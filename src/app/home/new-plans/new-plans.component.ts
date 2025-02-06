import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-plans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-plans.component.html',
  styleUrl: './new-plans.component.css',
})
export class NewPlansComponent {
  planForm!: FormGroup;
  plans:any[] = [];
  selectedPlan!:any;
  showSummary:boolean = false;

  constructor( private router: Router, private commonService: CommonService, private fb: FormBuilder) {
    this.getPlans();
  }

  ngOnInit() {
    this.planForm = this.fb.group({
      threeMonth: [''], // Default value
      sixMonth: [''], // Default value
    });
  }

  // onSubcribeClick(id: any) {
  //   // this.isSubcribeOpen = true;
  //   // console.log(plan)
  //   // this.selectPlan = plan;
  //   // this.planCrossAmount = this.selectPlan?.monthsno*830;
  //   // this.gstAmount = (this.planCrossAmount*18)/100;
  //   // this.totalAmount = this.planCrossAmount + this.gstAmount;
  //   this.router.navigateByUrl(`/checkout/${id}`);
  // }

  // onSubcribeClick() {
  //   this.showSummary = true;
  //   this.planCost = (
  //     Number(this.plan?.locationPrice?.month_fee) * Number(this.months)
  //   ).toFixed(2);
  //   this.tax = ((Number(this.planCost) / 100) * 18).toFixed(2);
  //   this.planTotal = (
  //     Number(this.planCost) +
  //     Number(this.tax) +
  //     Number(this.processingFee)
  //   ).toFixed(2);
  //   this.processingFee = Number(this.processingFee).toFixed(2);
  // }

  // onClick(id: any) {
  //   this.months = id;
  // }

  // onContinueClick(id: any) {
  //   this.router.navigateByUrl(`/checkout/${this.months}`);
  // }


  choosePlan(index:number):void{
    this.selectedPlan = this.plans.at(index);
  }

  subscribe(){
    this.showSummary = true;
    this.choosePlan(0);
  }

  getPlans() {
    // const payload = {};
    // this.commonService.getPlans(payload).subscribe((res: any) => {
    //   if (res) {
    //     this.plans = res?.data[0];
    //     console.log(this.plans);
    //   }
    // });
    this.plans = [
      {
        code:'plan1',
        currencyCode:'INR',
        currencySymbol:'₹',
        planFee:599,
        duration:1,
        period:'month',
        hasValidity:false,
        gstPercent:18,
        processingFee:33
      },
      {
        code:'plan2',
        currencyCode:'INR',
        currencySymbol:'₹',
        duration:6,
        planFee:599,
        period:'month',
        hasValidity:true,
        validityDuration:1,
        validityPeriod:'month',
        gstPercent:18,
        processingFee:83
      },
      {
        code:'plan3',
        currencyCode:'INR',
        currencySymbol:'₹',
        duration:10,
        planFee:599,
        period:'month',
        hasValidity:true,
        validityDuration:2,
        validityPeriod:'month',
        gstPercent:18,
        processingFee:142
      },
    ]
  }
}

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
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './new-plans.component.html',
  styleUrl: './new-plans.component.css',
})
export class NewPlansComponent {
  planForm!: FormGroup;
  public isPercentage: boolean = false;
  public months: number = 1;
  public planCost: any;
  public tax: any;
  public planTotal: any;
  public processingFee: any = 33;
  public showSummary: boolean = false;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder
  ) {
    this.getPlans();
  }

  ngOnInit() {
    this.planForm = this.fb.group({
      threeMonth: [''], // Default value
      sixMonth: [''], // Default value
    });
  }
  public plan: any;
  // onSubcribeClick(id: any) {
  //   // this.isSubcribeOpen = true;
  //   // console.log(plan)
  //   // this.selectPlan = plan;
  //   // this.planCrossAmount = this.selectPlan?.monthsno*830;
  //   // this.gstAmount = (this.planCrossAmount*18)/100;
  //   // this.totalAmount = this.planCrossAmount + this.gstAmount;
  //   this.router.navigateByUrl(`/checkout/${id}`);
  // }

  onSubcribeClick() {
    this.showSummary = true;
    this.planCost = (Number(this.plan?.locationPrice?.month_fee) * Number(this.months)).toFixed(
      2
    );
    this.tax = ((Number(this.planCost) / 100) * 18).toFixed(2);
    this.planTotal = (Number(this.planCost) + Number(this.tax) + Number(this.processingFee)).toFixed(2);
  }

  onClick(id: any) {
    this.months = id;
  }

  onContinueClick(id: any) {
    this.router.navigateByUrl(`/checkout/${this.months}`);
  }

  getPlans() {
    const payload = {};
    this.commonService.getPlans(payload).subscribe((res: any) => {
      if (res) {
        this.plan = res?.data[0];
      }
    });
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  CommonService,
  SelectedPlan,
} from '../../core/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanTransformPipe } from '../plan-transform.pipe';
import { PlanTransformnewPipe } from '../plan-transformnew.pipe';
import { SelectedPlanNew } from '../../core/interfaces/selectedplannew';
declare var bootstrap: any;

@Component({
  selector: 'app-new-plans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-plans.component.html',
  styleUrl: './new-plans.component.css',
  providers: [PlanTransformPipe, PlanTransformnewPipe],
})
export class NewPlansComponent implements OnInit {
  planForm!: FormGroup;
  showSummary: boolean = false;
  selectedPlan!: SelectedPlan;
  // plans: SelectedPlan[] = [];
  plans = [];
  plansNew: SelectedPlanNew[] = [];
  selectedPlanNew!: SelectedPlanNew;
  feeValue!: number;
  locationPlanPrice: any = [];
  @ViewChild('subscribeSection') subscribeSection!: ElementRef;
  // startDate: Date;
  // endDate: Date;
  // nextRenewalDate: Date;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder,
    private planTransformPipe: PlanTransformPipe,
    private planTransformnewPipe: PlanTransformnewPipe
  ) {
    // this.startDate = new Date(); // 10-March-2025 (Month is 0-based)
    // console.log(this.startDate);
    // this.endDate = new Date(this.startDate);
    // this.endDate.setMonth(this.endDate.getMonth() + 1); // Adds 1 month to the start date

    // this.nextRenewalDate = new Date(this.endDate);
    // console.log(this.endDate);
    // console.log(this.nextRenewalDate);
    // this.nextRenewalDate.setDate(this.nextRenewalDate.getDate() + 5); // Adds 5 days
    this.getPlans();
  }

  ngOnInit() {
    this.planForm = this.fb.group({
      threeMonth: [''], // Default value
      sixMonth: [''], // Default value
    });
  }

  planType: string = '';
  planDetailsData: { [key: string]: string } = {};
  popUpPlanHeadingData: { [key: string]: string } = {};
  openModal(plan: any) {
    this.planType = plan?.code;
    const modal = new bootstrap.Modal(
      document.getElementById('planDetailsModal')!
    );
    modal.show();
  }

  //Once confirmed with Live need to remove
  // planDetailsData: { [key: string]: string } = {
  //   "monthly": `
  //     <p>10-March-2025 to 10-April-2025</p>
  //     <p>Your next renewal date is <strong>15-April-2025</strong></p>
  //     <p>✅ Includes: All updates</p>
  //   `,
  //   "referral": `
  //     <p>✔ Refer a friend & get 6 months of subscription free.</p>
  //     <p>✔ Validity will add-on to your account.</p>
  //     <p>✔ Refer your friend after joining.</p>
  //     <p>✔ You can refer one person within your subscription period.</p>
  //     <p>✅ Includes: All updates</p>
  //   `,
  //   "licensed": `
  //     <p>✔ Validity: 3 years</p>
  //     <p>✔ Number of users: 2</p>
  //     <p>✅ Includes: All updates</p>
  //   `
  // };

  // popUpPlanHeadingData: { [key: string]: string } = {
  //   "monthly": `
  //     Plan Details
  //   `,
  //   "referral": `
  //     Benefits of a Referral
  //   `,
  //   "licensed": `
  //     Plan Details
  //   `
  // };

  get planDetails(): string {
    return this.planDetailsData[this.planType] || 'Details not available.';
  }

  get popUpPlanHeading(): string {
    return this.popUpPlanHeadingData[this.planType] || 'Details not available.';
  }

  choosePlan(index: number): void {
    this.selectedPlan = this.plans[index];
    this.commonService.setSelectedPlan(this.selectedPlan);
  }

  choosePlanNew(index: number): void {
    // console.log(this.plansNew);
    this.selectedPlanNew = this.plansNew[index];
    this.commonService.setSelectedPlanNew(this.selectedPlanNew);
    console.log(this.selectedPlanNew);
    this.feeValue = parseFloat(
      (
        this.selectedPlanNew[this.selectedPlanNew.code + '_fee'] ?? '0'
      ).toString()
    );
    // const feeValue = parseFloat(fee.toString());
    console.log(typeof this.feeValue);
    // this.commonService.setSelectedPlan(this.selectedPlanNew);
  }

  subscribe(index: number) {
    this.showSummary = true;
    this.choosePlan(index);
    // const element = document.getElementById("subscribeSection");
    if (this.subscribeSection) {
      this.subscribeSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }

  subscribeNew(index: number) {
    console.log(index);
    this.showSummary = true;
    this.choosePlanNew(index);
    // const element = document.getElementById("subscribeSection");
    if (this.subscribeSection) {
      this.subscribeSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }

  onContinueClick() {
    this.router.navigate(['/checkout']);
  }

  getPlans() {
    const payload = {};
    // this.commonService.getPlans(payload).subscribe((res: any) => {
    //   if (res && res.data) {
    //     this.plans = res.data.map((plan: any) => this.planTransformPipe.transform(plan));
    //   }
    // });

    this.commonService.getPlanPrice(payload).subscribe((res: any) => {
      if (res && res.data) {
        this.locationPlanPrice = res.data;
        console.log(this.locationPlanPrice);
        this.locationPlanPrice.forEach((location: any) => {
          location.plans.forEach((plan: any) => {
            // this.pushplanDetails(plan);
            // this.pushPopUpHeading(plan);

            console.log(plan);

            // var duration  = plan.duration;
            // var additionalDays = plan.period === 'month' ? 5 : 1;
            // this.nextRenewalDate.setDate(this.nextRenewalDate.getDate() + additionalDays); // Additional days
          });
        });

        const transformRes = res.data.map((location: any) =>
          this.planTransformnewPipe.transform(location)
        );
        this.plansNew = transformRes[0];
        console.log(this.plansNew);
      }
    });
  }

  pushplanDetails(plan: any) {
    const textWithBr = plan.details.split('\n').join('<br>');
    this.planDetailsData[`${plan?.code}`] = textWithBr;
  }

  pushPopUpHeading(plan: any) {
    this.popUpPlanHeadingData[`${plan?.code}`] = plan.popUpHeading;
  }
}

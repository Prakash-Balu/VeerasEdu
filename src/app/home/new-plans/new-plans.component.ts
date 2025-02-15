import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, SelectedPlan } from '../../core/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanTransformPipe } from '../plan-transform.pipe';
declare var bootstrap: any;

@Component({
  selector: 'app-new-plans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-plans.component.html',
  styleUrl: './new-plans.component.css',
  providers: [PlanTransformPipe]
})
export class NewPlansComponent implements OnInit {
  planForm!: FormGroup;
  showSummary: boolean = false;
  selectedPlan!: SelectedPlan;
  plans: SelectedPlan[] = [];
  planSelect: string = '';
  @ViewChild('subscribeSection') subscribeSection!: ElementRef;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder,
    private planTransformPipe: PlanTransformPipe
  ) {
    this.getPlans();
  }

  ngOnInit() {
    this.planForm = this.fb.group({
      threeMonth: [''], // Default value
      sixMonth: [''], // Default value
    });
  }

  planType: string = '';
  openModal(plan: string) {
    this.planSelect = plan;
    this.planType = plan;
    const modal = new bootstrap.Modal(document.getElementById('planDetailsModal')!);
    modal.show();
  }

  planDetailsData: { [key: string]: string } = {
    "monthly": `
      <p>10-March-2025 to 10-April-2025</p>
      <p>Your next renewal date is <strong>15-April-2025</strong></p>
      <p>✅ Includes: All updates</p>
    `,
    "referral": `
      <p>✔ Refer a friend & get 6 months of subscription free.</p>
      <p>✔ Validity will add-on to your account.</p>
      <p>✔ Refer your friend after joining.</p>
      <p>✔ You can refer one person within your subscription period.</p>
      <p>✅ Includes: All updates</p>
    `,
    "licensed": `
      <p>✔ Validity: 3 years</p>
      <p>✔ Number of users: 2</p>
      <p>✅ Includes: All updates</p>
    `
  };

  popUpPlanHeadingData: { [key: string]: string } = {
    "monthly": `
      Plan Details
    `,
    "referral": `
      Benefits of a Referral
    `,
    "licensed": `
      Plan Details
    `
  };

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

  subscribe(index: number) {
    this.showSummary = true;
    this.choosePlan(index);
    // const element = document.getElementById("subscribeSection");
    if (this.subscribeSection) {
      this.subscribeSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "start" });
    }
  }

  onContinueClick() {
    this.router.navigate(['/checkout']);
  }

  getPlans() {
    const payload = {};
    this.commonService.getPlans(payload).subscribe((res: any) => {
      if (res && res.data) {
        this.plans = res.data.map((plan: any) => this.planTransformPipe.transform(plan));
      }
    });
  }
}

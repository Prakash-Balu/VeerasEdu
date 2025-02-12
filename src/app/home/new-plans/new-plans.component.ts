import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, SelectedPlan } from '../../core/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanTransformPipe } from '../plan-transform.pipe';

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

  choosePlan(index: number): void {
    this.selectedPlan = this.plans[index];
    this.commonService.setSelectedPlan(this.selectedPlan);
  }

  subscribe() {
    this.showSummary = true;
    this.choosePlan(0);
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

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-plans',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './new-plans.component.html',
  styleUrl: './new-plans.component.css',
})
export class NewPlansComponent {
  constructor(private router: Router) {}

  onSubcribeClick(id: any) {
    // this.isSubcribeOpen = true;
    // console.log(plan)
    // this.selectPlan = plan;
    // this.planCrossAmount = this.selectPlan?.monthsno*830;
    // this.gstAmount = (this.planCrossAmount*18)/100;
    // this.totalAmount = this.planCrossAmount + this.gstAmount;
    this.router.navigateByUrl(`/checkout/${id}`);
  }
}
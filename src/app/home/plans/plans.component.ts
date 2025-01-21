import { Component } from "@angular/core";
import { CommonService } from "../../core/services/common.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-plans",
  standalone: true,
  imports: [],
  templateUrl: "./plans.component.html",
  styleUrl: "./plans.component.css",
})
export class PlansComponent {
  public plans: any;
  public isSubcribeOpen: boolean = false;
  public selectPlan:any;
  public planCrossAmount: number = 0;
  public gstAmount: number = 0;
  public totalAmount: number = 0;

  constructor(
    private commonService: CommonService,
    private router: Router
  ) {
    this.getPlans();
  }

  getPlans() {
    const payload = {};
    this.commonService.getPlans(payload).subscribe((res: any) => {
      if (res) console.log(res);
      this.plans = res?.data;
      console.log(this.plans);
    });
  }

  onSubcribeClick(id:any){
    // this.isSubcribeOpen = true;
    // console.log(plan)
    // this.selectPlan = plan;
    // this.planCrossAmount = this.selectPlan?.monthsno*830;
    // this.gstAmount = (this.planCrossAmount*18)/100;
    // this.totalAmount = this.planCrossAmount + this.gstAmount;
    this.router.navigateByUrl(`/checkout/${id}`)
  }
}

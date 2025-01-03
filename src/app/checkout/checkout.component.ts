import { Component, OnInit } from '@angular/core';
import { CommonService } from '../core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  public plan: any;
  public regForm!: FormGroup;
  public planCrossAmount: number = 0;
  public gstAmount: number = 0;
  public totalAmount: number = 0;
  public isIndia: boolean = true;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.regForm = this.fb.group({
      fullName: [null, Validators.required],
      phoneNo: [null, Validators.required],
      whatsappNo: [null],
      email: [null, Validators.required],
      country: [''],
      state: [''],
      city: [null],
      zipcode: [null],
      isCompanyAdd: [false],
      companyName: [null],
      gst: [null],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param['id'];
      let plan = this.commonService.plans;
      plan = typeof plan === 'string' ? JSON.parse(plan) : plan;
      this.plan = plan?.filter((item: any) => item?.code === id)[0];
      console.log(this.plan);
      this.planCrossAmount = this.plan?.monthsno * 830;
      this.gstAmount = (this.planCrossAmount * 18) / 100;
      this.totalAmount = this.planCrossAmount + this.gstAmount;
    });

    this.commonService.getLocation().subscribe((resp) => {
      if (resp) {
        if (resp.data.country !== 'India') {
          this.isIndia = false;
          this.regForm.patchValue({
            country: resp.data.country,
          });
        } else {
          this.regForm.patchValue({
            country: resp.data.country,
            state: resp.data.region,
            city: resp.data.city,
            zipcode: resp.data.postal,
          });
        }
      }
    });
  }

  getControl(controlName: string) {
    return this.regForm.get(controlName) as FormControl;
  }

  get isCompanyAdd(): boolean {
    return this.regForm.get('isCompanyAdd')?.value;
  }

  onOptionSelected(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected country ID:', selectedValue);
  }
  onContinueToPayment() {
    console.log('regForm,', this.regForm);
    console.log(this.regForm.valid)
    if (!this.regForm.valid) {
      console.log("test")
      return;
    }
  }
}

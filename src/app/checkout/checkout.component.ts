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
import { AuthService } from '../core/services/auth.service';
import codes from 'country-calling-code';

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
  public planCost: any;
  public tax: any;
  public planTotal: any;
  public isIndia: boolean = true;
  public months: number = 1;
  public processingFee: any = 33;
  public currencyCode: any;
  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.regForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      whatsapp: [null],
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
      this.months = Number(param['id']);
    });

    this.commonService.getLocation().subscribe((resp) => {
      if (resp) {
        this.currencyCode = resp?.data?.countryCurrency?.code;
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

    this.getPlans();
  }

  getPlans() {
    const payload = {};
    this.commonService.getPlans(payload).subscribe((res: any) => {
      if (res) {
        this.plan = res?.data[0];
        this.onSubcribeClick();
      }
    });
  }

  onSubcribeClick() {
    this.planCost = (
      Number(this.plan?.locationPrice?.month_fee) * Number(this.months)
    ).toFixed(2);
    this.tax = ((Number(this.planCost) / 100) * 18).toFixed(2);
    this.planTotal = (
      Number(this.planCost) +
      Number(this.tax) +
      Number(this.processingFee)
    ).toFixed(2);
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
    if (!this.regForm.valid) {
      return;
    }
    console.log('reg', this.regForm.value);
    let phCode: any = codes.find(
      (e: any) => e.country === this.regForm.value.country
    );
    phCode = phCode?.countryCodes[0];

    const payload = {
      user: { ...this.regForm.value, phoneCode: `+${phCode}` },
      planId: this.plan._id,
      currencyCode: this.currencyCode,
      amount: this.planTotal,
      duration: this.months,
    };
    console.log('payload::', payload);
    this.authService.checkout(payload).subscribe((resp) => {
      if(resp.meta.code === 200){
        window.location.href = resp?.data;
      }
    });
  }
}

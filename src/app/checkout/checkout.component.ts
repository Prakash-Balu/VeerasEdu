import { Component, OnInit } from '@angular/core';
import { CommonService, SelectedPlan } from '../core/services/common.service';
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
import { SelectedPlanNew } from '../core/models/selectedplannew';

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
  public feeValue: any;
  public tax: any;
  public planTotal: any;
  public isIndia: boolean = true;
  public formsubmitted: boolean = true;
  public months: number = 1;
  public processingFee: any = 33.0;
  public currencyCode: any;
  public country: any;

  // public selectedPlan!:SelectedPlan;
  public selectedPlanNew!:SelectedPlanNew;

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.regForm = this.fb.group({
      fullName: [null, Validators.required],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      whatsapp_no: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      mailId: [null, [Validators.required, Validators.email]],
      country: [{ value: '', disabled: true }],
      state: [''],
      city: [null],
      pincode: [null],
      isCompany: [false],
      companyName: [null],
      gst: [null],
    });
  }

  ngOnInit(): void {
    // this.selectedPlan = this.commonService.getSelectedPlan();
    this.selectedPlanNew = this.commonService.getSelectedPlanNew();
    if(!this.selectedPlanNew){
      this.router.navigateByUrl('home');
    }
    this.months = (this.selectedPlanNew?.duration ?? 0);
    // this.planCost = this.selectedPlanNew.duration * this.selectedPlanNew[];
    this.feeValue = parseFloat((this.selectedPlanNew[this.selectedPlanNew.code + '_fee'] ?? '0').toString())
    this.planCost = this.feeValue ;
    this.tax = this.planCost * (this.selectedPlanNew.gstPercent / 100);
    this.planTotal = this.tax + this.planCost;
    console.log(this.selectedPlanNew);
    this.commonService.getLocation().subscribe((resp) => {
      if (resp) {
        this.currencyCode = resp?.data?.countryCurrency?.code;
        this.country = resp.data.country;
        if (resp.data.country !== 'India') {
          this.isIndia = false;
          this.regForm.patchValue({
            country: resp.data.country,
          });
        } else {
          this.regForm.patchValue({
            country: resp.data.country,
          });
        }
      }
    });
  }

  getControl(controlName: string) {
    return this.regForm.get(controlName) as FormControl;
  }

  private markAllAsTouched() {
    Object.keys(this.regForm.controls).forEach((controlName) => {
      const control = this.getControl(controlName);
      control.markAsTouched();
    });
  }
  get isCompany(): boolean {
    return this.regForm.get('isCompany')?.value;
  }

  onOptionSelected(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected country ID:', selectedValue);
  }
  onContinueToPayment() {
    this.formsubmitted = true;
    if (this.regForm.invalid) {
      this.markAllAsTouched();
      return;
    }
    let phCode: any = codes.find((e: any) => e.country === this.country);
    console.log(phCode, this.regForm.value.country, codes);
    phCode = phCode?.countryCodes[0];
    // return;

    const payload = {
      user: {
        ...this.regForm.value,
        phoneCode: `+${phCode}`,
        country: this.country,
      },
      planId: this.selectedPlanNew._id,
      currencyCode: this.currencyCode,
      amount: this.planTotal,
      duration: this.selectedPlanNew.duration,
    };
    console.log('payload::', payload);
    this.authService.checkout(payload).subscribe((resp) => {
      if (resp.meta.code === 200) {
        window.location.href = resp?.data;
      }
    });

    this.formsubmitted = false;
  }
}

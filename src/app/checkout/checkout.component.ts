import { Component, OnInit } from '@angular/core';
import { CommonService } from '../core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  public plan: any;
  public regForm!: FormGroup;
  public planCrossAmount: number = 0;
  public gstAmount: number = 0;
  public totalAmount: number = 0;

 countrys: any[] = [
    { id: 1, name: 'India' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'Canada' }
  ];

 states: any[] = [
    { id: 1, name: 'Tamilnadu' },
    { id: 2, name: 'Kerala' },
    { id: 3, name: 'Karnataka' }
  ];

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.regForm = this.fb.group({
      fullName: [null],
      phoneNo: [null],
      whatsappNo: [null],
      email: [null],
      country: [''],
      state: [''],
      city: [null],
      zipcode: [null],
      isCompanyAdd: [true],
      companyName: [null],
      gst: [null],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = param['id']
      let plan = this.commonService.plans;
      plan = typeof plan === 'string' ? JSON.parse(plan): plan;
      this.plan = plan?.filter((item: any) => item?.code === id)[0];
      console.log(this.plan)
    this.planCrossAmount = this.plan?.monthsno*830;
    this.gstAmount = (this.planCrossAmount*18)/100;
    this.totalAmount = this.planCrossAmount + this.gstAmount;
    })
  }

  getControl(controlName: string) {
    return this.regForm.get(controlName) as FormControl;
  }

  onOptionSelected(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected country ID:', selectedValue);
  }
}

import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { SelectedPlanNew } from '../core/interfaces/selectedplannew';

interface Price {
  _id: string;
  locationId: string;
  locationPlanId: string;
  gstPercent: number;
  // monthly_fee?: string;
  // referral_fee?: string;
  // licensed_fee?: string;
  // student_fee?: string;
  [key: string]: string | number;
  // ... other fields if necessary
}

interface Plan {
  _id: string;
  code: string;
  name: string;
  desc: string;
  details: string;
  popUpHeading: string;
  note: string;
  subBtnText: string;
  viewDtlBtnText: string;
  feeFieldName: string;
  duration: number;
  period: string;
  hasValidity: boolean;
  validityDuration: number;
  validityPeriod: string;
  // ... other fields if necessary
}

interface Location {
  _id: string;
  countryName: string;
  countryCode: string;
  phoneCode: string;
  countryFlag: string;
  currencySymbol: string;
  currencyName: string;
  price: Price[];
  plans: Plan[];
}

type FeeKeys = 'monthly_fee' | 'referral_fee' | 'licensed_fee' | 'student_fee';

@Pipe({
  name: 'planTransformnew',
})
@Injectable()
export class PlanTransformnewPipe implements PipeTransform {
  transform(location: Location): SelectedPlanNew[] {
    if (!location || !location.plans || !location.price) {
      return [];
    }

    // Create a lookup for price by locationPlanId (assuming one price per plan)
    const priceLookup = location.plans.reduce((acc, plan) => {
      acc[plan._id] = location.price[0];
      return acc;
    }, {} as { [planId: string]: Price });

    // console.log(priceLookup)

    // Map each plan into the new structure
    return location.plans.map((plan) => {
      // console.log(priceLookup[plan._id]);
      const correspondingPrice = priceLookup[plan._id] || ({} as Price);

      // Build dynamic fee property based on feeFieldName in the plan.
      // For example, if feeFieldName is 'monthly_fee', then set that key with value from correspondingPrice.
      const feeValue = correspondingPrice[plan?.feeFieldName] as
        | string
        | number;

      const startDate = new Date(); // 10-March-2025 (Month is 0-based)
      console.log('start', startDate);
      const endDate = new Date(startDate);
      plan.period === 'month'
        ? endDate.setMonth(endDate.getMonth() + 1)
        : endDate.setFullYear(endDate.getFullYear() + 1); // Adds period of renewal to the start date
      console.log('end', endDate);
      const nextRenewalDate = new Date(endDate);

      console.log('renewal', nextRenewalDate);
      nextRenewalDate.setDate(
        nextRenewalDate.getDate() + (plan.period === 'month' ? 5 : 1)
      ); // Add Renewal days

      // Build the resulting transformed object.
      return {
        _id: plan._id,
        code: plan.code,
        name: plan.name,
        currencyCode: location.countryCode, // assuming countryCode is used as currency code; adjust if needed
        currencySymbol: location.currencySymbol,
        [plan.feeFieldName]: feeValue, // dynamic property for fee
        duration: plan.duration,
        period: plan.period,
        hasValidity: plan.hasValidity,
        gstPercent: correspondingPrice.gstPercent,
        validityDuration: plan.validityDuration,
        validityPeriod: plan.validityPeriod,
        validFrom: startDate.toString(),
        vaildTo: endDate.toString(),
        renewal: nextRenewalDate.toString(),
      };
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { SelectedPlan } from '../../shared/services/common.service';

@Pipe({
  name: 'planTransform',
  standalone: true,
})
export class PlanTransformPipe implements PipeTransform {
  transform(value: any): SelectedPlan {
    return {
      _id: value._id,
      code: value.code,
      currencyCode: value.locationInfo.currency_code,
      currencySymbol: value.locationInfo.currency_symbol,
      planFee: value.locationPrice.planFee,
      duration: value.duration,
      period: value.period,
      hasValidity: value.hasValidity,
      gstPercent: value.locationPrice.gstPercent,
      processingFee: value.processingFee,
      validityDuration: parseInt(value.validityDuration),
      validityPeriod: value.validityPeriod,
    };
  }
}

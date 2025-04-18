export interface SelectedPlanNew {
    _id:string;
    code:string;
    name: string;
    currencyCode:string;
    currencySymbol:string;
    duration:number;
    period:string;
    hasValidity:boolean;
    validityDuration:number;
    validityPeriod:string;
    validFrom: string;
    vaildTo: string;
    renewal: string;
    gstPercent:number;
    [key: string]:  string | boolean | number;
  }
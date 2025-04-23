export interface Price {
    _id: string;
    locationId: string;
    locationPlanId: string;
    gstPercent: number;
    // monthly_fee?: string;
    // referral_fee?: string;
    // licensed_fee?: string;
    // student_fee?: string;
    [key: string] : string | number;
  }
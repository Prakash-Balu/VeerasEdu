export interface Plan {
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
  }
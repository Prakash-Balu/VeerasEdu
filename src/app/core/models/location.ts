import { Plan } from "./plan";
import { Price } from "./price";

export interface Location {
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
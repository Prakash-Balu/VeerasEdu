import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { API_URL } from '../constants/apiUrls';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

export interface SelectedPlan{
  _id:string,
  code:string,
  currencyCode:string,
  currencySymbol:string,
  planFee:number,
  duration:number,
  period:string,
  hasValidity:boolean,
  validityDuration?:number,
  validityPeriod?:string,
  gstPercent:number,
  processingFee:number
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private planSubject!: BehaviorSubject<any>;
  public selectedPlan!: SelectedPlan;
  plan$!: Observable<any>;

  constructor(private http: HttpClient) {
    this.planSubject = new BehaviorSubject<any>(localStorage.getItem('plan'));
  }

  public get plans(): any {
    return this.planSubject.value;
  }


  public setSelectedPlan(plan: SelectedPlan) {
    this.selectedPlan = plan;
  }

  public getSelectedPlan():SelectedPlan {
    return this.selectedPlan;
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Error', error);
    return throwError(error);
  }

  getPlans(payload: any) {
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.GET_PLAN_DETAILS}`, payload)
      .pipe(
        map((res: any) => {
          localStorage.setItem('plan', JSON.stringify(res?.data));
          this.planSubject.next(res?.data);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  getLocation() {
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.GET_LOCATION}`)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
}

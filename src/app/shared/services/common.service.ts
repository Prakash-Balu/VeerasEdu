import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { API_URL } from '../../core/constants/apiUrls';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { SelectedPlanNew } from '../../core/interfaces/selectedplannew';

export interface SelectedPlan {
  _id: string;
  code: string;
  currencyCode: string;
  currencySymbol: string;
  planFee: number;
  duration: number;
  period: string;
  hasValidity: boolean;
  validityDuration?: number;
  validityPeriod?: string;
  gstPercent: number;
  processingFee: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private planSubject!: BehaviorSubject<any>;
  public selectedPlan!: SelectedPlan;
  public selectedPlanNew!: SelectedPlanNew;
  plan$!: Observable<any>;
  // Category Subject variables
  private subjectSource = new BehaviorSubject<any>(null);
  selectedSubject$ = this.subjectSource.asObservable();

  constructor(private http: HttpClient) {
    this.planSubject = new BehaviorSubject<any>(localStorage.getItem('plan'));
  }

  public get plans(): any {
    return this.planSubject.value;
  }

  public setSelectedPlan(plan: SelectedPlan) {
    this.selectedPlan = plan;
  }

  public getSelectedPlan(): SelectedPlan {
    return this.selectedPlan;
  }

  public setSelectedPlanNew(plan: SelectedPlanNew) {
    this.selectedPlanNew = plan;
  }

  public getSelectedPlanNew(): SelectedPlanNew {
    return this.selectedPlanNew;
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

  generateAgoraToken() {
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.GENERATE_AGORA_TOKEN}`)
      .pipe(
        map((res: any) => {
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

  getPlanPrice(payload: any) {
    return this.http
      .get<any>(
        `${environment.baseURL}${API_URL.GET_PLAN_DETAILS_NEW}`,
        payload
      )
      .pipe(
        map((res: any) => {
          localStorage.setItem('plan', JSON.stringify(res?.data));
          this.planSubject.next(res?.data);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  setSubject(subject: any) {
    this.subjectSource.next(subject);
  }
}

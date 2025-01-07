import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { API_URL } from '../constants/apiUrls';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  token$!: Observable<string | null>;

  private userObj: BehaviorSubject<string | null>;
  user$!: Observable<string | null>;

  private mobileSub: BehaviorSubject<string | null>;
  isMobile$!: Observable<string | null>;

  private userDataSubject!: BehaviorSubject<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token')
    );
    this.userObj = new BehaviorSubject<string | null>(
      localStorage.getItem('user')
    );
    this.mobileSub = new BehaviorSubject<string | null>(
      localStorage.getItem('isMobile')
    );

    this.userDataSubject = new BehaviorSubject<any>(
      localStorage.getItem('userData')
    );
    this.userDataSubject.asObservable();
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  private handleError(error: HttpErrorResponse) {
    // console.log("Error", error);
    return throwError(error);
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token);
      this.tokenSubject.next(token);
    }
  }

  setIsMobile(isMobile: string | null): void {
    if (isMobile) {
      localStorage.setItem('isMobile', isMobile);
      this.mobileSub.next(isMobile);
    }
  }

  get isMobile(): string | null {
    return this.mobileSub.value;
  }

  public get mobileValue(): string | null {
    return this.mobileSub.value;
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getQrCode() {
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.GET_QR_CODE}`)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  userMeApi() {
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.USER_ME}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          this.setUserObj(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  userAttendance(payload: any) {
    const { start, end } = payload;
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.GET_ATTENDANCE}?start=${start}&end=${end}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  recordSession() {
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.RECORD_SESSION}`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getLocation() {
    return this.http
      .get<any>(`${environment.baseURL}${API_URL.RECORD_SESSION}`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getUserData() {
    return JSON.parse(this.userDataSubject.value);
  }

  checkout(payload: any) {
    return this.http
      .post<any>(`${environment.baseURL}${API_URL.CHECK_OUT}`, payload)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(JSON.stringify(userData));
  }

  setUserObj(userObj: any) {
    localStorage.setItem('user', JSON.stringify(userObj));
    this.userObj.next(JSON.stringify(userObj));
  }

  clearLocalStorage() {
    localStorage.clear();
    this.tokenSubject.next(null);
    this.userObj.next(null)
  }
}

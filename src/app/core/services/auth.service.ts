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
    return this.http.get<any>(`${environment.baseURL}${API_URL.USER_ME}`).pipe(
      map((response) => {
        localStorage.setItem('user', response.data);
        this.userObj.next(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }


}

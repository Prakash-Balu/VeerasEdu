import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/apiUrls';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Segment {
  _id: string;
  name: string;
  description: string;
  video_url: string;
  iconName: string;
  routeUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  private url = environment.baseURL;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getSegmentList(): Observable<Segment[]> {
    return this.http
      .get<Segment[]>(`${this.url}${API_URL.GET_SEGMENTS}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  viewNotification(): Observable<Segment[]> {
    return this.http
      .get<Segment[]>(`${this.url}${API_URL.VIEW_NOTIFICATIONS}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.url}/user/web-logout`;
    const headers = new HttpHeaders({
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get(url, {
        headers: headers,
      })
      .pipe(catchError(this.handleError));
  }
}

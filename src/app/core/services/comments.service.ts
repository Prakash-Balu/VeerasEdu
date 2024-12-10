import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private url = environment.baseURL;
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    Accept: '*/*',
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  addComments(payload: {}): Observable<any> {
    const uploadCommentsAPIUrl = '/comments/addComment';
    return this.http.post(this.url + uploadCommentsAPIUrl, payload, {
      headers: this.headers,
    });
  }

  uploadAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', file);

    const uploadUrl = `${this.url}/chat/upload/audio`;

    const headers = new HttpHeaders({
      Accept: '*/*',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(uploadUrl, formData, {
      headers: headers,
    });
  }

  viewComments(segmentId: any): Observable<any> {
    const viewCommentsAPIUrl = `/comments/viewComment?segmentId=${segmentId}`;
    return this.http.get(this.url + viewCommentsAPIUrl, {
      headers: this.headers,
    });
  }
}

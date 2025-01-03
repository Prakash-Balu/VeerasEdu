import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private baseUrl = environment.baseURL;
  private token = localStorage.getItem("token");

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    Accept: "*/*",
    "access-control-allow-origin": "*",
  });

  private httpOptions = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}
  getComments(): Observable<any> {
    const url = `${this.baseUrl}/chat/common-chat/list`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError((error) => {
        console.error("Error fetching comments:", error);

        return throwError(() => error);
      })
    );
  }

  insertComments(messageData: { message: string; isAudio: boolean }) {
    const url = `${this.baseUrl}/chat/common-chat`;
    const body = {
      message: messageData.message,
      isAudio: messageData.isAudio,
    };
    // console.log("sendmessageapiurl::", url);
    // console.log("sendmessagepayload::", body);
    return this.http.post(url, body, this.httpOptions).pipe(
      catchError((error) => {
        console.log("Error in send message::", error);
        return throwError(() => error);
      })
    );
  }

  replyComments(replyData: {
    parentId: number;
    message: string;
    isAudio: boolean;
  }) {
    const url = `${this.baseUrl}/chat/common-chat/reply`;
    const payload = {
      parentId: replyData.parentId,
      message: replyData.message,
      isAudio: replyData.isAudio,
    };
    // console.log("replyurl::", url);
    // console.log("replypayload::", payload);
    return this.http.post(url, payload, this.httpOptions).pipe(
      catchError((error) => {
        console.log("Error in reply message::", error);
        return throwError(() => error);
      })
    );
  }

  uploadAudio(audioData: FormData): Observable<any> {
    const url = `${this.baseUrl}/chat/upload/audio`;

    // console.log({ url });

    return this.http.post<any>(url, audioData, this.httpOptions).pipe(
      catchError((error) => {
        console.log("Error in audio upload", error);
        return throwError(() => error);
      })
    );
  }
}

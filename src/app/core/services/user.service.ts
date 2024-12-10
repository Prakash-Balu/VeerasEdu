import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { API_URL } from "../constants/apiUrls";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private handleError(error: HttpErrorResponse) {
    console.log("Error", error);
    return throwError(error);
  }
}

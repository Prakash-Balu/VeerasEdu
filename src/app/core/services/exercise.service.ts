import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(
    private http: HttpClient,
  ) { }
  
  fetchData(id:string): Observable<any> {
    return this.http.get<any>(environment.baseURL+`/api/getqa/${id}`);
  }
  
  fetchsegments():Observable<any>{
    return this.http.get<any>(environment.baseURL+'/api/segments');
  }
}

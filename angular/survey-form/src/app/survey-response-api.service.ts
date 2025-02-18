import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyDetail } from './models/survey-detail.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyResponseApiService {

  baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  
  deleteSurveyResponseById(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/api/survey-responses/delete/${id}`);
  }
}

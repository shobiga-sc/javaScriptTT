import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyDetail } from './models/survey-detail.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyApiService {

  baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getSurvey(): Observable<SurveyDetail[]>{
    console.log("api fetch success");
     return this.http.get<SurveyDetail[]>(`${this.baseUrl}/api/surveys/surveyList`);
  }

  putStatus(id: string, active: boolean): Observable<SurveyDetail> {
    return this.http.put<SurveyDetail>(`${this.baseUrl}/api/surveys/${id}/status`, { active });
}

  deleteSurveyById(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/api/surveys/delete/${id}`);
  }



}

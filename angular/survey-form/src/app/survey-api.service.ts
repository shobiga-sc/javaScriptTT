import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyDetail } from './models/survey-detail.model';
import { Survey } from './models/surveys.model';
import { environment } from '../environments/environment.development'; 

@Injectable({
  providedIn: 'root'
})
export class SurveyApiService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSurvey(): Observable<SurveyDetail[]>{
     return this.http.get<SurveyDetail[]>(`${this.baseUrl}/api/surveys/surveyList`);
  }

  putStatus(id: string, active: boolean): Observable<SurveyDetail> {
    return this.http.put<SurveyDetail>(`${this.baseUrl}/api/surveys/${id}/status`, { active });
}

  deleteSurveyById(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/api/surveys/delete/${id}`);
  }

  getSurveyById(id: string): Observable<Survey>{
    return this.http.get<Survey>(`${this.baseUrl}/api/surveys/${id}`);
  }

  postSurvey(survey: Survey): Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/api/surveys`, survey);
  }

  getSurveyName(name: string): Observable<Record<string, boolean>>{
    return this.http.get<Record<string, boolean>>(`${this.baseUrl}/api/surveys/check-name/${name}`);
  }



}

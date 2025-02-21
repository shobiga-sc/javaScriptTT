import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyDetail } from './models/survey-detail.model';
import { SurveyResponse } from './models/survey-responses.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SurveyResponseApiService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSurveyResponseBySurveyId(surveyId: string): Observable<SurveyResponse[]>{
    return this.http.get<SurveyResponse[]>(`${this.baseUrl}/api/survey-responses/survey/${surveyId}`);
  }
  deleteSurveyResponseById(surveyId: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/api/survey-responses/delete/${surveyId}`);
  }


  updateResponseStatus(responseId: string, newStatus: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/api/survey-responses/${responseId}/status?status=${newStatus}`, {});
  }

  getStatusCount(surveyId: string): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/api/survey-responses/${surveyId}/status-counts`);
  }

  postResponse(response:SurveyResponse): Observable<void>{
    console.log("Submitting response:", response);
    return this.http.post<void>(`${this.baseUrl}/api/survey-responses`, response);
  }

}

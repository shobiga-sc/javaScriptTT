import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleModule } from '../../role/role.module';
import { SurveyDetail } from '../../models/survey-detail.model';
import { SurveyApiService } from '../../survey-api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-survey-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-survey-dashboard.component.html',
  styleUrl: './user-survey-dashboard.component.css'
})
export class UserSurveyDashboardComponent {

  data: SurveyDetail[] = [];

  constructor(private surveyApiService: SurveyApiService) { }

  ngOnInit() {
    this.surveyApiService.getSurvey().subscribe((data: SurveyDetail[]) => {
      this.data = data.filter(survey => survey.active !== false);
    }
    );
  }

  
}

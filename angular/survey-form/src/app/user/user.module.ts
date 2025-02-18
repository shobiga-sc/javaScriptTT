import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSurveyDashboardComponent } from './user-survey-dashboard/user-survey-dashboard.component';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, UserSurveyDashboardComponent,
    RouterModule.forChild([
      {path: '', component: UserSurveyDashboardComponent}
    ])
  ],
  exports: [UserSurveyDashboardComponent]
})
export class UserModule { }

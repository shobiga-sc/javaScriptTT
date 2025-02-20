import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSurveyDashboardComponent } from './user-survey-dashboard/user-survey-dashboard.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RespondComponent } from './respond/respond.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, UserSurveyDashboardComponent,RespondComponent, 
    RouterModule.forChild([
      {path: '', component: UserSurveyDashboardComponent},
      {path: 'respond/:id', component: RespondComponent }
    ])
  ],
  exports: [UserSurveyDashboardComponent]
})
export class UserModule { }

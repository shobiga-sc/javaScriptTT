import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSurveyDashboardComponent } from './admin-survey-dashboard/admin-survey-dashboard.component';
import { RouterModule } from '@angular/router';
import { CreateSurveyComponent } from './creation/create-survey/create-survey.component';
import { AdminFormPreviewComponent } from './admin-form-preview/admin-form-preview.component';
import { ResponsesComponent } from './responses/responses.component';

@NgModule({
  imports: [
    CommonModule, AdminSurveyDashboardComponent, CreateSurveyComponent, AdminFormPreviewComponent,
    ResponsesComponent,
    RouterModule.forChild([{path: '', component: AdminSurveyDashboardComponent},
      {path: 'create-survey', component: CreateSurveyComponent},
      {path: 'form-preview/:id', component: AdminFormPreviewComponent},
      {path: 'form-preview/:id/responses', component: ResponsesComponent}
    ])
  ],
  exports: [AdminSurveyDashboardComponent, CreateSurveyComponent, AdminFormPreviewComponent, ResponsesComponent]

})

export class AdminModule {

 }

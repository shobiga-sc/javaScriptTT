import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSurveyComponent } from './create-survey/create-survey.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, CreateSurveyComponent
  ],
  exports: [CreateSurveyComponent]
})
export class CreationModule { }

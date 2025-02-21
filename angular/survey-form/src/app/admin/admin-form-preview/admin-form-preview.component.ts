import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Survey } from '../../models/surveys.model';
import { SurveyApiService } from '../../survey-api.service'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-form-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-form-preview.component.html',
  styleUrl: './admin-form-preview.component.css'
})
export class AdminFormPreviewComponent {
  surveyForm: FormGroup;
  surveyId: string = '';
  survey: Survey | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private surveyApiService: SurveyApiService,
  
  ) {
    this.surveyForm = this.fb.group({ });
  }

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';

    this.surveyApiService.getSurveyById(this.surveyId).subscribe((data: Survey) => {
      this.survey = data;
    });
  }

 

  getOptions(question: any): string[] {
    return (question.additionalProperties && typeof question.additionalProperties === 'object' && 'options' in question.additionalProperties)
      ? question.additionalProperties.options
      : [];
  }





  
}
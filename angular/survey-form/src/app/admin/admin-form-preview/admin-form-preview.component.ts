import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Survey } from '../../models/surveys.model';
import { SurveyApiService } from '../../survey-api.service'; 
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-admin-form-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-form-preview.component.html',
  styleUrl: './admin-form-preview.component.css'
})
export class AdminFormPreviewComponent {
  surveyId: string = '';
  survey: Survey | null = null;


  constructor(private route: ActivatedRoute, private surveyApiService: SurveyApiService) {}

  ngOnInit() {
    
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    this.surveyApiService.getSurveyById(this.surveyId).subscribe((data: Survey) => {
       this.survey  = data;
    })
  }
}

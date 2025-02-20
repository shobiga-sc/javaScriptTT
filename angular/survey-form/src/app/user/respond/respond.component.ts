import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Survey } from '../../models/surveys.model'; 
import { SurveyApiService } from '../../survey-api.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-respond',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './respond.component.html',
  styleUrl: './respond.component.css'
})
export class RespondComponent {
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

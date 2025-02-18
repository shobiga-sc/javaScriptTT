import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreateSurveyComponent } from '../creation/create-survey/create-survey.component';
import { SurveyApiService } from '../../survey-api.service';
import { SurveyResponseApiService } from '../../survey-response-api.service';
import { SurveyDetail } from '../../models/survey-detail.model';
import { CommonModule } from '@angular/common';
import Swal from "sweetalert2";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-survey-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CreateSurveyComponent],
  templateUrl: './admin-survey-dashboard.component.html',
  styleUrl: './admin-survey-dashboard.component.css',

})
export class AdminSurveyDashboardComponent {

  data: SurveyDetail[] = [];

  constructor(private surveyApiService: SurveyApiService,
    private surveyResponseApiService: SurveyResponseApiService) {

  }

  ngOnInit() {
    this.surveyApiService.getSurvey().subscribe((data: SurveyDetail[]) => {
      this.data = data;
    }
    );
  }

  updateStatus(id: string, active: boolean, name: string) {
    let activate: string = active ? 'Activate' : 'Deactivate';
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${activate} this survey named ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: `Yes, ${activate} it!`,
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyApiService.putStatus(id, active).subscribe(updatedSurvey => {
          const survey = this.data.find(s => s.id === id);
          if (survey) {
            Swal.fire({
              title: "Status Updated",
              text: `Survey is now ${updatedSurvey.active ? "Active" : "Inactive"}.`,
              icon: "success",
              confirmButtonText: "OK"
          });
            survey.active = updatedSurvey.active;

          }
        });
      }

    });
  }

  deleteSurvey(id: string, name: string) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the survey named ${name} along with its responses?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {

        this.surveyResponseApiService.deleteSurveyResponseById(id).subscribe(() => {

          this.surveyApiService.deleteSurveyById(id).subscribe(() => {

            this.data = this.data.filter(survey => survey.id !== id);

            Swal.fire({
              title: "Survey Deleted",
              text: `Survey named ${name} has been deleted along with its responses.`,
              icon: "success",
              confirmButtonText: "OK"
            });
          });
        });
      }
    });
  }



}

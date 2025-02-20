import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { SurveyApiService } from '../../survey-api.service';
import { SurveyResponseApiService } from '../../survey-response-api.service';
import { SurveyResponse } from '../../models/survey-responses.model';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, FormsModule],
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent {
  surveyId: string = '';
  responses: SurveyResponse[] = [];
  surveyTitle: string = '';
  ceil = Math.ceil;
  totalResponses:  number = 0;
  noActionResponses: number = 0;
  acceptedResponses: number = 0;
  rejectedResponses: number = 0;

  currentPage = 1;
  responsesPerPage = 5;
  totalPages = Math.ceil(this.totalResponses / this.responsesPerPage);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private surveyResponseService: SurveyResponseApiService,
    private surveyApiService: SurveyApiService
  ) { }

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';

    this.surveyApiService.getSurveyById(this.surveyId).subscribe((data) => {
      this.surveyTitle = data.name;
    }

    )
    if (this.surveyId) {
      this.fetchResponses();
    }
  }

  fetchResponses() {
    this.surveyResponseService.getSurveyResponseBySurveyId(this.surveyId).subscribe(
      (data: SurveyResponse[]) => {
        this.responses = data;
        this.updateCounters();
      },
      (error) => {
        console.error('Error fetching survey responses:', error);
      }
    );
  }

  getAnswer(answer: string | number | string[] | number[] | null): string {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    return answer !== null ? answer.toString() : 'NA';
  }

  updateCounters() {
    this.surveyResponseService.getStatusCount(this.surveyId).subscribe(
      (data) => {
        this.noActionResponses = data['NO_ACTION'] || 0;
        this.acceptedResponses = data['ACCEPTED'] || 0;
        this.rejectedResponses = data['REJECTED'] || 0;
        this.totalResponses = this.noActionResponses + this.acceptedResponses + this.rejectedResponses;
        this.totalPages = Math.ceil(this.totalResponses / this.responsesPerPage);
      },
      (error) => {
        console.error('Error fetching response counts:', error);
      }
    );
  }



  updateStatus(responseId: string, status: string) {

    this.surveyResponseService.updateResponseStatus(responseId, status).subscribe(
      () => {
        const response = this.responses.find(r => r.id === responseId);
        if (response) {
          response.status = status;
        }
        this.updateCounters();
      },
      (error) => {
        console.error('Error updating response status:', error);
        return;
      }
    );
    Swal.fire({
      icon: "success",
      title: "Status Updated",
      text: "The status has been changed successfully.",
      confirmButtonColor: "#3085d6"
    });
  }

  updateStatusFromEvent(event: Event, responseId: string) {
    let checked = (event.target as HTMLInputElement).checked;
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status to ${checked ? 'ACCEPTED' : 'REJECTED'}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, change status!"
    }).then((result) => {

      if (result.isConfirmed) {

        this.updateStatus(responseId, checked ? 'ACCEPTED' : 'REJECTED');
      }
      else
        (event.target as HTMLInputElement).checked = !checked;
    });
  }


  paginateResponses(): SurveyResponse[] {
    const startIndex = (this.currentPage - 1) * this.responsesPerPage;
    return this.responses.slice(startIndex, startIndex + this.responsesPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.ceil(this.responses.length / this.responsesPerPage)) {
      this.currentPage++;
    }
  }

  back() {
    this.location.back();
  }
}

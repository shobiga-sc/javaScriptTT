import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Survey } from '../../models/surveys.model';
import { SurveyApiService } from '../../survey-api.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SurveyResponseApiService } from '../../survey-response-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-respond',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './respond.component.html',
  styleUrl: './respond.component.css'
})

export class RespondComponent {
  surveyForm: FormGroup;
  surveyId: string = '';
  survey: Survey | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private surveyApiService: SurveyApiService,
    private surveyResponseApiService: SurveyResponseApiService,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      surveyId: [`${this.surveyId}`],
      responses: this.fb.array([])
    });
  }

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';

    this.surveyApiService.getSurveyById(this.surveyId).subscribe((data: Survey) => {
      this.survey = data;
      this.initForm();
    });
  }

  get responses(): FormArray {
    return this.surveyForm.get('responses') as FormArray;
  }

  getOptions(question: any): string[] {
    return (question.additionalProperties && typeof question.additionalProperties === 'object' && 'options' in question.additionalProperties)
      ? question.additionalProperties.options
      : [];
  }

  onFileUpload(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const maxSize = this.survey?.questions?.[index]?.maxSize || 5; // Default 5MB
  
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size exceeds the maximum limit of ${maxSize}MB.`);
        inputElement.value = ''; 
        return;
      }
  
     
      this.responses.at(index).patchValue({ answer: file });
      this.responses.at(index).get('answer')?.setErrors(null);
    }
  }
  

  onCheckboxChange(event: any, index: number) {
    const selectedValues = this.responses.at(index).get('answer')?.value || [];

    if (event.target.checked) {
      selectedValues.push(event.target.value);
    } else {
      const indexToRemove = selectedValues.indexOf(event.target.value);
      if (indexToRemove !== -1) {
        selectedValues.splice(indexToRemove, 1);
      }
    }

    this.responses.at(index).patchValue({ answer: selectedValues });
  }

  initForm() {
    if (!this.survey) return;
  
    this.surveyForm.patchValue({ surveyId: this.surveyId });
  
    const responseArray = this.survey.questions.map((question, index) => {
      const validators = [];
  
      if (question.required) {
        validators.push(Validators.required);
      }
  
      if (question.type === 'Paragraph') {
        if (question.minSize) validators.push(Validators.minLength(question.minSize));
        if (question.maxSize) validators.push(Validators.maxLength(question.maxSize));
        else validators.push(Validators.maxLength(1000));
      }
  
      if (question.type === 'Number') {
        let minVal = question.minSize ?? 0;
        let maxVal = question.maxSize ?? 1000000;
        validators.push(Validators.min(minVal), Validators.max(maxVal));
      }
  
      if (question.type === 'Email') {
        validators.push(Validators.email);
      }
  
      return this.fb.group({
        questionId: [`question-${index}`],
        questionValue: [question.questionValue],
        answer: ['', validators],
        required: [question.required]
      });
    });
  
    this.surveyForm.setControl('responses', this.fb.array(responseArray));
  }
  
  
  onSubmit() {

    if (this.surveyForm.valid) {
      this.surveyResponseApiService.postResponse(this.surveyForm.value).subscribe();
      console.log(this.surveyForm.value);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Survey response saved successfully!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(() => {
        this.router.navigate(['/user']);
      });
  
    }
  }

  cancelResponse(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/user']);
      }
    });


  }
}
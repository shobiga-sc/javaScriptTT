import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Survey } from '../../../models/surveys.model';
import { SurveyApiService } from '../../../survey-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-survey',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent {

  questionForm!: FormGroup;

  constructor(private surveyApiService: SurveyApiService,
    private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      active: [true],
      questions: this.formBuilder.array([])
    });
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionGroup = this.formBuilder.group({
      questionValue: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      type: ['RadioButton'],
      required: [false],
      additionalProperties: this.formBuilder.group({
        options: this.formBuilder.array([])
      }),
    });

    this.questions.push(questionGroup);
  }

  getOptions(index: number): FormArray {
    const question = this.questions.at(index) as FormGroup;

    if (!question.get('additionalProperties')) {
      question.setControl(
        'additionalProperties',
        this.formBuilder.group({ options: this.formBuilder.array([]) })
      );
    }

    const optionsArray = question.get('additionalProperties.options') as FormArray;


    while (optionsArray.length < 2) {
      optionsArray.push(new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]));
    }

    return optionsArray;


  }

  addOption(index: number) {
    this.getOptions(index).push(new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]));
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const optionsArray = this.getOptions(questionIndex);

    if (optionsArray.length <= 2) {
      Swal.fire("Error", "A question must have at least 2 options!", "error");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the Option no: ${optionIndex + 1} for Question: ${questionIndex + 1} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.getOptions(questionIndex).removeAt(optionIndex);
        Swal.fire("Deleted!", "The option has been removed.", "success");
      }
    });

  }

  updateType(index: number, event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    const question = this.questions.at(index) as FormGroup;

    question.patchValue({ type: selectedType });

    if (['RadioButton', 'MultipleChoice', 'DropDown'].includes(selectedType)) {
      if (!question.get('additionalProperties')) {
        question.setControl('additionalProperties', this.formBuilder.group({ options: this.formBuilder.array([]) }));
      }

      const optionsArray = this.getOptions(index);


      while (optionsArray.length < 2) {
        optionsArray.push(new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]));
      }
    } else {

      question.removeControl('additionalProperties');
    }

    if (['Paragraph', 'Number'].includes(selectedType)) {
      if (!question.get('minSize')) {
        question.addControl('minSize', new FormControl(''));
      }
      if (!question.get('maxSize')) {
        question.addControl('maxSize', new FormControl(''));
      }

    }
    else {
      question.removeControl('minSize');
      question.removeControl('maxSize');
    }

    if (selectedType === 'FileUpload') {
      if (!question.get('maxSize')) {
        question.addControl('maxSize', new FormControl(''));
      }
    } else {
      if (!(['Paragraph', 'Number'].includes(selectedType)))
        question.removeControl('maxSize');
    }

  }

  validateName(event: Event) {
    const name = (event.target as HTMLInputElement).value.trim();
    
    if (!name) return; 
  
    this.surveyApiService.getSurveyName(name).subscribe((data) => {
      if (data['exists']) {
        
        this.questionForm.get('name')?.setErrors({ nameExists: true });
        
      } else {
        this.questionForm.get('name')?.setErrors(null);
      }
    });
  }
  

  deleteQuestion(index: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete question ${index + 1} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.questions.removeAt(index);
        Swal.fire("Deleted!", "The question has been removed.", "success");
      }
    });


  }



  submitForm(): void {

    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    }

    if (this.questions.length < 1) {
      Swal.fire("Error", "A survey must have at least one question!", "error");
      return;
    }

    this.surveyApiService.postSurvey(this.questionForm.value).subscribe(() =>
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Survey saved successfully!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(() => {
        this.router.navigate(['/admin']);
      })
    );

  }

  onCancel() {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to unsave and return?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unsave and return home!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin']);

      }
    });
  }




}

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
      name: ['', Validators.required],
      description: ['', Validators.required],
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
      questionValue: ['', Validators.required],
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

    return question.get('additionalProperties.options') as FormArray;
  }

    addOption(index: number) {
    this.getOptions(index).push(new FormControl(''));
  }

  removeOption(questionIndex: number, optionIndex: number) {
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
    }

    if(['Paragraph','Number'].includes(selectedType)){
      if(!question.get('minSize')){
          question.addControl('minSize', new FormControl(''));
      }
      if(!question.get('maxSize')){
        question.addControl('maxSize', new FormControl(''));
      }
      
    }
    else{
          question.removeControl('minSize');
          question.removeControl('maxSize');
    }

    if (selectedType === 'FileUpload') {
      if (!question.get('maxSize')) {
        question.addControl('maxSize', new FormControl(''));
      }
    } else {
      if(!(['Paragraph','Number'].includes(selectedType)))
              question.removeControl('maxSize'); 
    }

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

    this.surveyApiService.postSurvey(this.questionForm.value).subscribe(()=>
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

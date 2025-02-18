import { Component, inject } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormControl,  FormGroup, } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Inject , Injectable} from '@angular/core';
import {FormArray} from '@angular/forms';
import {Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  messageFromSubject: string = '';

  private subscription: Subscription[] = [];
  private formBuilder = inject(FormBuilder);

  deBounce: FormControl = new FormControl('');

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),
  //   })

  // });

  profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(4)] ],
    lastName: [''],
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.minLength(4)]],
      city: [''],
      state: [''],
      zip: ['', [Validators.required,  Validators.minLength(6), Validators.maxLength(6)]],

    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),

  });

  constructor(private subjectService: SubjectService) {

  }


  ngOnInit() {
    console.log(`into Init`);


    this.subscription.push(this.subjectService.messageObservable
      .subscribe(
        msg => {
          console.log(`subscribed`);
          this.messageFromSubject = msg;
          console.log(`Msg received: ${this.messageFromSubject}`);

        }
      ));

    this.deBounce.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(
        (value) => { console.log(value); }
      )

  }

  
  onSubmit() {
    console.log(this.profileForm.value);
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  updateData() {
    this.deBounce.setValue('data change');
  }

  sendSubjectMessage(msg: string) {
    this.subjectService.sendSubjectMessage(msg);
    console.log(`Message sent : ${msg}`);
  }

  ngOnDestroy() {

    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
    console.log(`unsubscribed`);
  }



}

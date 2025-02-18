import { Component } from '@angular/core';
import { SubjectService } from '../subject.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private subjectService: SubjectService) { }
  
  sendSubjectMessage(msg: string) {
    this.subjectService.sendSubjectMessage(msg);
    console.log(`Message sent : ${msg}`);
  }



}

import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjectMsg = new BehaviorSubject<string>('default');
 
  messageObservable = this.subjectMsg.asObservable();

  constructor() { }

  sendSubjectMessage(message : string){
    this.subjectMsg.next(message);
    console.log(`msg received for service`);
  }


}

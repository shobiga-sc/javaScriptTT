import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, CommonModule, FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  title:string = 'ParentComponent';
  titleForChild:string = 'ChildComponent';

  @ViewChild(ChildComponent) childComponent!: ChildComponent;
  onParentClick(): void {
    console.log("Parent clicked");
    this.childComponent.onParentClicked();

  }

  childMessage: string = '';

  receiveMessage(message: string) {
    this.childMessage = message; 
  }

  isValid : boolean = true;


  arrs : number[] = [1,2, 3, 4];


  firstName : string = 'Name';
  changeName() : void {
    this.firstName = 'Naming';
  }

  
  
}

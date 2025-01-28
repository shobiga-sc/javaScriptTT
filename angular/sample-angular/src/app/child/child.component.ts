import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
     @Input() titleForChild: string = '';

     onParentClicked(): void {
      console.log('Child component executed');
    }


    @Output() childEvent = new EventEmitter<string>();

    sendMessage() {
      this.childEvent.emit('Hello, Parent!'); 
    }
}

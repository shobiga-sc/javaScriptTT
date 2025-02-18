import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  standalone: true,
  imports: [],
  templateUrl: './life-cycle.component.html',
  styleUrl: './life-cycle.component.css'
})
export class LifeCycleComponent {
@Input()
   data: string = '';
  inputData: string = 'Hello!';

  constructor() {
    console.log('Constructor: Called when the component is created.');
  }

  ngOnChanges() {
    console.log('ngOnChanges: Called when any @Input() property changes.');
  }


  ngOnInit() {
    console.log('ngOnInit: Called once, after the first ngOnChanges() and component initialization.');
  }


  ngDoCheck() {
    console.log('ngDoCheck: Called on every change detection cycle.');
  }


  ngAfterContentInit() {
    console.log('ngAfterContentInit: Called after content projection (ng-content) is initialized.');
  }

  
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked: Called after every change detection cycle for projected content.');
  }

  
  ngAfterViewInit() {
    console.log('ngAfterViewInit: Called after the component’s view and child views are initialized.');
  }


  ngAfterViewChecked() {
    console.log('ngAfterViewChecked: Called after every change detection cycle for the component’s view.');
  }

 
  ngOnDestroy() {
    console.log('ngOnDestroy: Called just before the component is destroyed.');
  }

  onClick(){
    this.inputData = "changed data";
  }

}

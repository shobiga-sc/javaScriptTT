import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './parent/parent.component'; // Correctly imported
import { CustomDirective } from './custom.directive';
import { Service1Service } from './service1.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParentComponent, CustomDirective], // Add ParentComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class AppComponent {
  title = 'sample-angular';

  msg: string = '';
  constructor(private service1Service: Service1Service){

  }

  ngOnInit() {
    this.msg = this.service1Service.getMessage();
  }

  updateMessage(): void {
    this.service1Service.setMessage('Updated message from AppComponent!');
    this.msg = this.service1Service.getMessage();
  }

}

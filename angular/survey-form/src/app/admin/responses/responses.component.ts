import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.css'
})
export class ResponsesComponent {
  surveyId: string = '';

  constructor(private route: ActivatedRoute, private location:Location) {}

  back(): void {
    this.location.back();
  }

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.surveyId); 
  }
}

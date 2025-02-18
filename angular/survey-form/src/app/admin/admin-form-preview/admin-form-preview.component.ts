import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-form-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-form-preview.component.html',
  styleUrl: './admin-form-preview.component.css'
})
export class AdminFormPreviewComponent {
  surveyId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleModule } from '../../role/role.module';

@Component({
  selector: 'app-user-survey-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-survey-dashboard.component.html',
  styleUrl: './user-survey-dashboard.component.css'
})
export class UserSurveyDashboardComponent {
         
}

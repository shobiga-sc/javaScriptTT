import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLinkActive, RouterLink} from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ProfileComponent,  DashboardComponent, SettingsComponent, RouterOutlet, RouterLinkActive, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  
}

import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'dashboard', 
        loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) 
      },
      { 
        path: 'settings', 
        loadChildren: () => import('./settings.routes').then(m => m.SETTINGS_ROUTES) 
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' } 
];

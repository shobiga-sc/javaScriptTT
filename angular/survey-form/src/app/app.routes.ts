import { Routes } from '@angular/router';
import { RolesComponent } from './role/roles/roles.component';
import { CreateSurveyComponent } from './admin/creation/create-survey/create-survey.component';

export const routes: Routes = [
    {
        path: '',
        component: RolesComponent
    },
    {
        path: 'role',
        loadChildren: () => 
            import('./role/role.module').then((m) => m.RoleModule),
        
    },
    {
        path: 'admin',
        loadChildren: () => 
            import('./admin/admin.module').then((m) => m.AdminModule),
        
    },
    {
        path: 'user',
        loadChildren: () =>
            import("./user/user.module").then((m) => m.UserModule),
    },
   
   
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RolesComponent, RouterLink, RouterModule,
    RouterModule.forChild([{path: '', component:RolesComponent}])
  ],
  exports: [RolesComponent]
})

export class RoleModule {

 }

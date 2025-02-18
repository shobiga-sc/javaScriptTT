import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, RouterLink } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, NavbarComponent,  RouterModule, RouterLink
  ],
  exports: [NavbarComponent, ] 
})
export class NavbarModule { }

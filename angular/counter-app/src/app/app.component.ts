import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterModule } from './counter/counter.module';

import { CounterComponent } from './counter/counter/counter.component';
import { CommonModule } from '@angular/common';
import { MessageModule } from './message/message.module';
import { MessageComponent } from './message/message/message.component'; 
import { NavbarModule } from './navbar/navbar.module';
import { Routes } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterModule, MessageModule, CommonModule, NavbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'counter-app';
}

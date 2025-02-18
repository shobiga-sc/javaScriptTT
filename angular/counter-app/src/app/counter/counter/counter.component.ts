import { Component } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  constructor(public counterService: CounterService) {}

  increase() {
    this.counterService.increase();
  }

  decrease() {
    this.counterService.decrease();
  }
}

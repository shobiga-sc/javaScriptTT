import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  
  private count = 0;

  constructor() { }
  
  getCount() {
    return this.count;
  }

  increase() {
    this.count++;
  }

  decrease() {
    this.count--;
  }
}

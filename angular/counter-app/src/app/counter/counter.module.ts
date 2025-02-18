import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, CounterComponent, RouterModule.forChild([{ path: '', component: CounterComponent }])],
  
  exports: [ CounterComponent],
})
export class CounterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MessageComponent, RouterModule.forChild([{ path: '', component: MessageComponent }])],

   exports: [ MessageComponent],
})
export class MessageModule { }

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter/counter.component';
import { MessageComponent } from './message/message/message.component';

export const routes: Routes = [
    { path: 'counter', loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule) },
    { path: 'message', loadChildren: () => import('./message/message.module').then(m => m.MessageModule) },
    { path: '', redirectTo: '/counter', pathMatch: 'full' }
  ];
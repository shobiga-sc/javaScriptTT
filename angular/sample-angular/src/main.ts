import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// Adding the router provider and catching errors
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Inject the routes configuration here
  ]
})
  .catch((err) => console.error(err));

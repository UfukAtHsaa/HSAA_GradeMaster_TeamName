import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,       
      withRouterConfig({
        onSameUrlNavigation: "reload", // ---> (3) Hack falls "resolver" eingesetzt werden!!! 
      })
    ), 
    provideAnimationsAsync(), 
    provideHttpClient()
  ]
};

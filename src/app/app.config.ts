import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  NavigateService,
  ResizeService,
  StateService,
  StorageService,
} from './shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    NavigateService,
    StorageService,
    ResizeService,
    StateService,
  ],
};

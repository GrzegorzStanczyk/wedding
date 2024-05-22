import { Routes } from '@angular/router';
import { LocalizationComponent } from './container/localization/localization.component';
import { MainComponent } from './container/main/main.component';

export type AppRoutes = '/home' | '/localization';

export const apRoutes: AppRoutes[] = ['/home', '/localization'];

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent, data: { state: 'home' } },
  {
    path: 'localization',
    component: LocalizationComponent,
    data: { state: 'localization' },
  },
  // { path: 'contact', component: ContactComponent, data: { state: 'contact' } },
];

import { Routes } from '@angular/router';
import { MainComponent } from './container/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent, data: { state: 'home' } },
  { path: 'projects', component: MainComponent, data: { state: 'projects' } },
  { path: 'contact', component: MainComponent, data: { state: 'contact' } },
];

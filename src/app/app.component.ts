import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { slideLeftAnimation } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationComponent, RouterOutlet],
  animations: [slideLeftAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  getState(routerOutlet: RouterOutlet) {
    return routerOutlet.activatedRouteData['state'];
  }
}

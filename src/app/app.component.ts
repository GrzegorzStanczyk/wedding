import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigateService, slideDownAnimation } from './shared';
import { SwipeDirective } from './shared/directives/swipe.directive';
import { debounce } from './shared/utils/helpers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationComponent, RouterOutlet, SwipeDirective],
  animations: [slideDownAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navigateService = inject(NavigateService);
  @HostListener('document:mousewheel', ['$event'])
  @debounce()
  mousewheel(event: WheelEvent) {
    this.navigateService.navigate(event);
  }

  getState(routerOutlet: RouterOutlet) {
    return routerOutlet.activatedRouteData['state'];
  }
}

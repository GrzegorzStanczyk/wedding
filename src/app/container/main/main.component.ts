import { Component, HostListener, OnInit } from '@angular/core';

import { HammerModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavigateService } from '../../shared';
import { ParticlesDirective } from '../../shared/directives/particles.directive';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [HammerModule, ParticlesDirective],
})
export class MainComponent implements OnInit {
  public message: string = 'Nasze Wesele Marzeń';

  constructor(
    private router: Router,
    private navigateService: NavigateService
  ) {}

  @HostListener('document:keydown.ArrowRight')
  @HostListener('swipeleft')
  swipe() {
    this.navigateService.navigateToProjects();
  }

  ngOnInit() {}
}

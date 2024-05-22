import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutes, apRoutes } from '../../app.routes';
import { StorageService } from './storage.service';

@Injectable()
export class NavigateService {
  router = inject(Router);
  storageService = inject(StorageService);

  navigateToProjects() {
    this.storageService.lastProject
      ? this.router.navigate([
          '/projects',
          this.storageService.lastProject.path,
        ])
      : this.router.navigate(['/projects']);
  }

  navigate(event: WheelEvent): void {
    let path = '';
    const currentPath = this.router.url as AppRoutes;
    const currentPathIndex = apRoutes.indexOf(currentPath);
    if (event.deltaY > 0) {
      path = apRoutes[(currentPathIndex + 1) % apRoutes.length];
    } else {
      path =
        apRoutes[
          currentPathIndex > 0 ? currentPathIndex - 1 : apRoutes.length - 1
        ];
    }
    this.router.navigate([path]);
  }
}

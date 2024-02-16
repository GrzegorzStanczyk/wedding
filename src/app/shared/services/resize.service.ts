import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable()
export class ResizeService {
  private resizeSubject: Subject<Window> = new Subject<Window>();
  resizeSubject$ = this.resizeSubject.asObservable();
  document = inject(DOCUMENT);

  constructor(private eventManager: EventManager) {
    this.eventManager.addEventListener(
      this.document.defaultView as unknown as HTMLElement,
      'resize',
      this.onResize.bind(this)
    );
  }

  private onResize(event: UIEvent) {
    this.resizeSubject.next(<Window>event.target);
  }

  public isMobile(event: any) {
    return event.innerWidth < 600 || event.innerHeight < 900;
  }
}

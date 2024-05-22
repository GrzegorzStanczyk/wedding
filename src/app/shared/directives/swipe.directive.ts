import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, partition } from 'rxjs';
import {
  filter,
  map,
  reduce,
  skipWhile,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
@Directive({
  selector: '[swipe]',
  standalone: true,
})
export class SwipeDirective {
  private readonly el = inject(ElementRef);

  @Output() public swipeUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() public swipeDown: EventEmitter<void> = new EventEmitter<void>();
  @Input() public skipWhile = false;
  @Input() public swipeArea = 150;

  constructor() {
    const [up$, down$] = partition(
      fromEvent<TouchEvent>(this.el.nativeElement, 'touchstart', {
        passive: true,
      }).pipe(
        skipWhile(() => this.skipWhile),
        switchMap((startEvent) =>
          fromEvent<TouchEvent>(this.el.nativeElement, 'touchmove', {
            passive: true,
          }).pipe(
            takeUntil(
              fromEvent(this.el.nativeElement, 'touchend', { passive: true })
            ),
            map((e) => e.touches[0].pageY),
            reduce(
              (_, pageY) => Math.round(startEvent.touches[0].pageY - pageY),
              0
            )
          )
        )
      ),
      (difference) => difference > 0
    );

    merge(
      up$.pipe(
        filter((up) => up >= this.swipeArea),
        tap(() => this.swipeUp.next())
      ),
      down$.pipe(
        filter((down) => down <= -this.swipeArea),
        tap(() => this.swipeDown.next())
      )
    )
      .pipe(takeUntilDestroyed())
      .subscribe();
  }
}

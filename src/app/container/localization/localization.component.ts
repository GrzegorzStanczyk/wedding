import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-localization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./localization.component.html`,
  styleUrl: './localization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalizationComponent implements AfterViewInit {
  cardOpen = signal(false);
  cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cardOpen.set(true);
    }, 1500);
  }

  toggle(): void {
    this.cardOpen.update((cardOpen) => !cardOpen);
  }
}

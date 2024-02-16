import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';

import { ResizeService } from '../services/resize.service';

@Directive({
  selector: '[appParticles]',
  standalone: true,
})
export class ParticlesDirective implements OnInit, AfterViewInit, OnDestroy {
  private resizeSubscription?: Subscription;
  private canvasEl: HTMLCanvasElement = this.el.nativeElement;
  private ctx: CanvasRenderingContext2D | null = this.canvasEl.getContext('2d');
  private maxParticlesAmount: number = 50;
  private particlesSpeed: number = 2;
  private particlesArray: Array<any> = [];
  private particleInterval: number = 5000;
  private clearInterval?: any;
  private animationFrame?: any;
  private colorsArray: Array<string> = [
    '#AE2029',
    '#fbb745',
    '#c5a028',
    '#124045',
  ];
  // private colorsArray: Array<string> = [
  //   '#00d1cb',
  //   '#ff4699',
  //   '#fbb63a',
  //   '#b3dc5b',
  //   '#ffe100',
  // ];

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    private resizeService: ResizeService
  ) {}

  setCanvasSize(): void {
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;
  }

  clearCanvas(): void {
    this.ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  whetherCanvasIsFull(): any[] {
    return this.particlesArray.filter((p) => {
      return p.x > (p.r + 100) * -1;
    });
  }

  createParticle(): void {
    // If particle is outside of canvas filter it outside
    const particlesInRange = this.whetherCanvasIsFull();
    // Do not create new particle if canvas is full
    if (particlesInRange.length >= this.maxParticlesAmount) return;

    const p = {
      y: 0,
      r: Math.floor(Math.random() * 20) + 3,
      x: window.innerWidth,
      direction: 0.1,
      color:
        this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)],
    };

    // Prevent delete particles from canvas if they are in it
    this.particlesArray = particlesInRange;

    // Set initial particles outside the canvas
    p.x += p.r;
    // Set initial particles on y axis in range
    p.y = Math.random() * (window.innerHeight - p.r - p.r + 1) + p.r;

    this.particlesArray.push(p);
  }

  animateParticles(p: any): any {
    // Set particle speed depend on its size
    p.x -= this.particlesSpeed / p.r;
    // Change particle direction || Bounce from horizontal lines
    if (
      Math.floor(Math.random() * 500) === 250 ||
      p.y >= window.innerHeight - p.r ||
      p.y <= 0 + p.r
    ) {
      p.direction = p.direction * -1;
    }
    p.y += p.direction;
  }

  drawParticles(p: any): void {
    if (this.ctx) {
      // this.ctx.beginPath();
      // this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      // this.ctx.fillStyle = p.color;
      // this.ctx.fill();

      this.ctx.beginPath();
      // this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      // this.ctx.moveTo(p.x, p.y);
      this.ctx.bezierCurveTo(
        p.x + 75 * p.r * 0.1,
        p.y + 37 * p.r * 0.1,
        p.x + 70 * p.r * 0.1,
        p.y + 25 * p.r * 0.1,
        p.x + 50 * p.r * 0.1,
        p.y + 25 * p.r * 0.1
      );
      this.ctx.bezierCurveTo(
        p.x + 20 * p.r * 0.1,
        p.y + 25 * p.r * 0.1,
        p.x + 20 * p.r * 0.1,
        p.y + 62.5 * p.r * 0.1,
        p.x + 20 * p.r * 0.1,
        p.y + 62.5 * p.r * 0.1
      );
      this.ctx.bezierCurveTo(
        p.x + 20 * p.r * 0.1,
        p.y + 80 * p.r * 0.1,
        p.x + 40 * p.r * 0.1,
        p.y + 102 * p.r * 0.1,
        p.x + 75 * p.r * 0.1,
        p.y + 120 * p.r * 0.1
      );
      this.ctx.bezierCurveTo(
        p.x + 110 * p.r * 0.1,
        p.y + 102 * p.r * 0.1,
        p.x + 130 * p.r * 0.1,
        p.y + 80 * p.r * 0.1,
        p.x + 130 * p.r * 0.1,
        p.y + 62.5 * p.r * 0.1
      );
      this.ctx.bezierCurveTo(
        p.x + 130 * p.r * 0.1,
        p.y + 62.5 * p.r * 0.1,
        p.x + 130 * p.r * 0.1,
        p.y + 25 * p.r * 0.1,
        p.x + 100 * p.r * 0.1,
        p.y + 25 * p.r * 0.1
      );
      this.ctx.bezierCurveTo(
        p.x + 85 * p.r * 0.1,
        p.y + 25 * p.r * 0.1,
        p.x + 75 * p.r * 0.1,
        p.y + 37 * p.r * 0.1,
        p.x + 75 * p.r * 0.1,
        p.y + 40 * p.r * 0.1
      );
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }
  }

  particleDrawDelay(): void {
    setTimeout(() => {
      this.clearInterval = setInterval(
        () => this.createParticle(),
        this.particleInterval
      );
    }, 2000);
  }

  loop() {
    this.clearCanvas();
    this.particlesArray.forEach((p) => {
      this.animateParticles(p);
      this.drawParticles(p);
    });
    this.animationFrame = requestAnimationFrame(() => this.loop());
  }

  stopCreatingParticles(): void {
    clearInterval(this.clearInterval);
  }

  stopAnimationFrame(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  ngOnInit() {
    this.resizeSubscription = this.resizeService.resizeSubject$
      .pipe(debounceTime(200))
      .subscribe((event) => {
        this.stopAnimationFrame();
        this.particlesArray = [];
        this.setCanvasSize();
        // Paint loop run outside the Angular zone
        this.ngZone.runOutsideAngular(() => this.loop());
      });
  }

  ngAfterViewInit() {
    this.setCanvasSize();
    this.particleDrawDelay();
    // Paint loop run outside the Angular zone
    this.ngZone.runOutsideAngular(() => this.loop());
  }

  ngOnDestroy() {
    this.stopCreatingParticles();
    this.stopAnimationFrame();
    this.resizeSubscription?.unsubscribe();
  }
}

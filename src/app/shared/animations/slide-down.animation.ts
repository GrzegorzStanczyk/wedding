import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideDownAnimation = trigger('slideDownAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(100%)' }),
          animate(
            '.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            style({ transform: 'translateY(0%)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)' }),
          animate(
            '.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            style({ transform: 'translateY(-100%)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

import type { HTMLAttributes, ReactNode } from 'react';

export interface AnimatedListProps extends HTMLAttributes<HTMLDivElement> {
  /** Дочірні елементи (анімуються з затримкою на основі індексу) */
  children: ReactNode;
  /** Затримка між появою сусідніх елементів у мс (за замовчуванням 100) */
  staggerDelay?: number;
}

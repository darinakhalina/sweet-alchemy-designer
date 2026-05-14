import type { ReactNode } from 'react';
import type { CarouselItemsPerView } from './CarouselItemsPerView';

export interface CarouselProps {
  /** How many slides to show per breakpoint. */
  itemsPerView?: CarouselItemsPerView;
  /** Show prev/next buttons. Default true. */
  showArrows?: boolean;
  /** Show pagination dots below. Default true. */
  showDots?: boolean;
  /** A11y label for the prev button. */
  prevAriaLabel?: string;
  /** A11y label for the next button. */
  nextAriaLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface CarouselSlideProps {
  className?: string;
  children: ReactNode;
}

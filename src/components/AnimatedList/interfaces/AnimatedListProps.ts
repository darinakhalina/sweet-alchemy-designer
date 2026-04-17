import type { HTMLAttributes, ReactNode } from 'react';

export interface AnimatedListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  staggerDelay?: number;
}

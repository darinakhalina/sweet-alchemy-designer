import type { ReactNode } from 'react';

export interface HeroImage {
  src: string;
  alt: string;
  variant?: number;
}

export interface HeroProps {
  title?: string;
  accentTitle?: string;
  description: string;
  image?: HeroImage;
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

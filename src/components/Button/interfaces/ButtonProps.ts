import type { ReactNode, MouseEvent } from 'react';

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'brand' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  uppercase?: boolean;
  iconLeft?: string;
  iconRight?: string;
  iconOnly?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

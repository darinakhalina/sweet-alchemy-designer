import type { MouseEvent } from 'react';

export interface ButtonIconProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverted';
  size?: 'xs' | 'sm' | 'md';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  iconName: string;
}

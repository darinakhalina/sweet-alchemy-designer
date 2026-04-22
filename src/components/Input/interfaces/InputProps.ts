import type { ReactNode } from 'react';

export interface InputProps {
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  variant?: 'outlined' | 'filled';
  label?: string;
  placeholder?: string;
  helpText?: string;
  startIcon?: string;
  endIcon?: string;
  onEndIconClick?: () => void;
  endAdornment?: ReactNode;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  showPasswordToggle?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
}

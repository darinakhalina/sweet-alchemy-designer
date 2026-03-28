import type { ReactNode } from 'react';
import type { FormikErrors, FormikTouched } from 'formik';

export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  children?: ReactNode;
  errors: FormikErrors<Record<string, string>>;
  touched: FormikTouched<Record<string, string>>;
  [key: string]: unknown;
}

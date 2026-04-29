import type { ReactNode } from 'react';

export interface StepperStepProps {
  value: string;
  label: string;
  icon?: string;
  text?: string;
  disabled?: boolean;
  children?: ReactNode;
}

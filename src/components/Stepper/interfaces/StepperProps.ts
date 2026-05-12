import type { ReactNode } from 'react';

export interface StepperProps {
  /** Активний крок (controlled-режим) */
  value?: string;
  /** Початковий активний крок (uncontrolled-режим) */
  defaultValue?: string;
  /** Обробник зміни активного кроку */
  onValueChange?: (value: string) => void;
  /** Дочірні елементи (`<Stepper.Step>`) */
  children: ReactNode;
  /** Додаткові CSS-класи */
  className?: string;
}

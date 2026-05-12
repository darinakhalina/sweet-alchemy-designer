import type { ReactNode } from 'react';

export interface StepperStepProps {
  /** Унікальний ідентифікатор кроку (для controlled value) */
  value: string;
  /** Заголовок кроку */
  label: string;
  /** Назва іконки зі sprite (опц.) */
  icon?: string;
  /** Допоміжний текст під лейблом (опц.) */
  text?: string;
  /** Вимкнений крок */
  disabled?: boolean;
  /** Контент, який рендериться у tab-panel при активному кроці */
  children?: ReactNode;
}

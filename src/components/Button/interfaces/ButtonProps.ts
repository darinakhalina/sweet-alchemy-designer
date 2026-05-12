import type { ReactNode, MouseEvent } from 'react';

export interface ButtonProps {
  /** Вміст кнопки (текст або іконка) */
  children: ReactNode;
  /** HTML-тип кнопки */
  type?: 'button' | 'submit' | 'reset';
  /** Візуальний варіант */
  variant?: 'primary' | 'secondary' | 'brand' | 'ghost';
  /** Розмір */
  size?: 'sm' | 'md' | 'lg';
  /** Перетворити лейбл на UPPERCASE */
  uppercase?: boolean;
  /** Назва іконки ліворуч від лейбла (id зі sprite icons.svg) */
  iconLeft?: string;
  /** Назва іконки праворуч від лейбла (id зі sprite icons.svg) */
  iconRight?: string;
  /** Лише іконка, лейбл візуально прихований (але доступний скрінрідерам) */
  iconOnly?: boolean;
  /** Обробник кліку */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Вимкнений стан */
  isDisabled?: boolean;
  /** Стан завантаження (показує спінер, кнопка disabled) */
  isLoading?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

import type { ReactNode } from 'react';

export interface InputProps {
  /** Ім'я поля для Formik (обов'язково) */
  name: string;
  /** HTML-тип інпуту */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  /** Візуальний варіант */
  variant?: 'outlined' | 'filled';
  /** Лейбл над полем */
  label?: string;
  /** Текст-плейсхолдер */
  placeholder?: string;
  /** Допоміжний текст під полем (підмінюється на текст помилки, якщо є) */
  helpText?: string;
  /** Іконка ліворуч (id зі sprite icons.svg) */
  startIcon?: string;
  /** Іконка праворуч (id зі sprite icons.svg) */
  endIcon?: string;
  /** Обробник кліку по правій іконці (робить її кнопкою) */
  onEndIconClick?: () => void;
  /** Accessible-name для клікабельної правої іконки (обов'язково при onEndIconClick) */
  endIconLabel?: string;
  /** Кастомний контент праворуч замість іконки (наприклад, badge) */
  endAdornment?: ReactNode;
  /** Багаторядкове поле (textarea) */
  multiline?: boolean;
  /** Кількість рядків для textarea (за замовчуванням 4) */
  rows?: number;
  /** Максимальна довжина значення */
  maxLength?: number;
  /** Показати кнопку перемикання видимості пароля (тільки для type="password") */
  showPasswordToggle?: boolean;
  /** Вимкнений стан */
  disabled?: boolean;
  /** Тільки для читання */
  readOnly?: boolean;
  /** Обов'язкове поле (показує * біля лейбла) */
  required?: boolean;
  /** Атрибут autocomplete */
  autoComplete?: string;
  /** Автофокус при монтуванні */
  autoFocus?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

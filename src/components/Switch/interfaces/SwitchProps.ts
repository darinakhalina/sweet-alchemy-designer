export interface SwitchProps {
  /** Ім'я поля для Formik (обов'язково) */
  name: string;
  /** Текст лейбла праворуч від перемикача */
  label?: string;
  /** Вимкнений стан */
  disabled?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

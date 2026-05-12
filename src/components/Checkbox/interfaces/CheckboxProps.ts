export interface CheckboxProps {
  /** Ім'я поля для Formik (обов'язково) */
  name: string;
  /** Текст лейбла праворуч від чекбокса */
  label?: string;
  /** Вимкнений стан */
  disabled?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

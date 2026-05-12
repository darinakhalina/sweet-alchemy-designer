import type { DropdownOption } from '@/components/Dropdown';

export interface RadioGroupProps {
  /** Ім'я поля для Formik (обов'язково) */
  name: string;
  /** Список варіантів вибору */
  options: DropdownOption[];
  /** Лейбл групи (рендериться як <legend>) */
  label?: string;
  /** Вимкнути всю групу */
  disabled?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

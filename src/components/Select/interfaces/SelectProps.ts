import type { DropdownOption } from '@/components/Dropdown';

export interface SelectProps {
  /** Ім'я поля для Formik (обов'язково) */
  name: string;
  /** Список варіантів */
  options: DropdownOption[];
  /** Лейбл над полем */
  label?: string;
  /** Текст-плейсхолдер коли нічого не вибрано */
  placeholder?: string;
  /** Допоміжний текст (підмінюється на текст помилки, якщо є) */
  helpText?: string;
  /** Увімкнути пошук у меню */
  searchable?: boolean;
  /** Плейсхолдер у полі пошуку */
  searchPlaceholder?: string;
  /** Вимкнений стан */
  disabled?: boolean;
  /** Обов'язкове поле (показує * біля лейбла) */
  required?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

import type { ReactNode } from 'react';
import type { DropdownOption } from './DropdownOption';

export interface DropdownProps {
  /** Список варіантів */
  options: DropdownOption[];
  /** Значення поточно обраного варіанта (controlled) */
  selectedValue?: string;
  /** Обробник вибору варіанта */
  onSelect: (option: DropdownOption) => void;
  /** Render-функція для тригера (кнопки/інпуту що відкриває меню) */
  trigger: (props: DropdownTriggerRenderProps) => ReactNode;
  /** Увімкнути пошук у меню */
  searchable?: boolean;
  /** Плейсхолдер у полі пошуку */
  searchPlaceholder?: string;
  /** З якого боку розкривається меню */
  placement?: 'bottom-start' | 'bottom-end';
  /** Додаткові CSS-класи */
  className?: string;
  /** Кастомний data-testid (за замовчуванням "dropdown") */
  'data-testid'?: string;
}

export interface DropdownTriggerRenderProps {
  /** Чи відкрите меню */
  isOpen: boolean;
  /** Поточно обраний варіант (або null) */
  selectedOption: DropdownOption | null;
  /** Props для прив'язки до тригер-елемента (від downshift) */
  toggleProps: Record<string, unknown>;
}

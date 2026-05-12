import type { ReactNode } from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionSingleProps {
  /** Тип: single — одночасно відкритий один item */
  type?: 'single';
  /** Поточно відкритий item (controlled) */
  value?: string | null;
  /** Початково відкритий item (uncontrolled) */
  defaultValue?: string | null;
  /** Обробник зміни активного item */
  onValueChange?: (value: string | null) => void;
  /** Дозволити закрити останній відкритий item (за замовчуванням true) */
  collapsible?: boolean;
}

export interface AccordionMultipleProps {
  /** Тип: multiple — кілька items можуть бути відкриті одночасно */
  type: 'multiple';
  /** Список відкритих items (controlled) */
  value?: string[];
  /** Початково відкриті items (uncontrolled) */
  defaultValue?: string[];
  /** Обробник зміни списку відкритих items */
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
  /** Дочірні `<Accordion.Item>` елементи */
  children: ReactNode;
  /** Додаткові CSS-класи */
  className?: string;
  /** Показувати шеврон-індикатор у тригерах (за замовчуванням true) */
  showChevron?: boolean;
};

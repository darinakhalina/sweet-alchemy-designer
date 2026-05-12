import type { ReactNode } from 'react';

export interface AccordionItemProps {
  /** Унікальний ідентифікатор item для controlled value */
  value: string;
  /** Заголовок (тригер) */
  label: ReactNode;
  /** Опціональний номер ліворуч від заголовка (наприклад "01") */
  number?: string;
  /** Вимкнений item — не реагує на клік */
  disabled?: boolean;
  /** Контент панелі, який рендериться коли item відкритий */
  children?: ReactNode;
}

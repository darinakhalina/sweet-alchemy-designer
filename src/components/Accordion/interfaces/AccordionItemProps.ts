import type { ReactNode } from 'react';

export interface AccordionItemProps {
  value: string;
  label: ReactNode;
  number?: string;
  disabled?: boolean;
  children?: ReactNode;
}

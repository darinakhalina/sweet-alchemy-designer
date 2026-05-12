import type { ReactNode } from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionSingleProps {
  type?: 'single';
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
  children: ReactNode;
  className?: string;
  showChevron?: boolean;
};

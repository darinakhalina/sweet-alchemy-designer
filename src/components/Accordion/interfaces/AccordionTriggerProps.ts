import type { ReactNode } from 'react';

export interface AccordionTriggerProps {
  value: string;
  label: ReactNode;
  number?: string;
  disabled?: boolean;
  isOpen: boolean;
  showChevron: boolean;
  triggerId: string;
  panelId: string;
  onToggle: (value: string) => void;
}

import type { ReactNode } from 'react';

export interface AccordionPanelProps {
  value: string;
  isOpen: boolean;
  triggerId: string;
  panelId: string;
  children: ReactNode;
}

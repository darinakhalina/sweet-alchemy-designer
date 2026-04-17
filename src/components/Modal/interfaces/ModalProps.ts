import type { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  ariaLabel?: string;
  'data-testid'?: string;
}

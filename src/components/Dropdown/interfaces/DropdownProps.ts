import type { ReactNode } from 'react';
import type { DropdownOption } from './DropdownOption';

export interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (option: DropdownOption) => void;
  trigger: (props: DropdownTriggerRenderProps) => ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  placement?: 'bottom-start' | 'bottom-end';
  className?: string;
  'data-testid'?: string;
}

export interface DropdownTriggerRenderProps {
  isOpen: boolean;
  selectedOption: DropdownOption | null;
  toggleProps: Record<string, unknown>;
}

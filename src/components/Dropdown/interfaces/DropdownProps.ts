import type { DropdownOption } from './DropdownOption';

export interface DropdownProps {
  options?: DropdownOption[];
  placeholder?: string;
  value?: string;
  onChange?: (option: DropdownOption) => void;
  availableOptions?: string[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onBeforeOpen?: () => void;
}

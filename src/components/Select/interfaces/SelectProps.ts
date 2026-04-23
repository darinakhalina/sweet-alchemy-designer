import type { DropdownOption } from '@/components/Dropdown';

export interface SelectProps {
  name: string;
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  helpText?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

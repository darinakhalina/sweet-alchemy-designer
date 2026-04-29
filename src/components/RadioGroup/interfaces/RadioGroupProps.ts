import type { DropdownOption } from '@/components/Dropdown';

export interface RadioGroupProps {
  name: string;
  options: DropdownOption[];
  label?: string;
  disabled?: boolean;
  className?: string;
}

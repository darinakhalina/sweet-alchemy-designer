import type { SelectItem } from './SelectItem';

export interface SelectProps {
  name: string;
  items: SelectItem[];
  placeholder?: string;
  className?: string;
}

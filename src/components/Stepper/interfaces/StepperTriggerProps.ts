export interface StepperTriggerProps {
  value: string;
  label: string;
  icon?: string;
  text?: string;
  disabled?: boolean;
  isActive: boolean;
  triggerId: string;
  panelId: string;
  onSelect: (value: string) => void;
}

import { useRef } from 'react';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import type { StepperTriggerProps } from './interfaces/StepperTriggerProps';

export default function StepperTrigger({
  value,
  label,
  icon,
  text,
  disabled = false,
  isActive,
  triggerId,
  panelId,
  onSelect,
}: StepperTriggerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!disabled) onSelect(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();

    const tablist = triggerRef.current?.closest('[role="tablist"]');
    if (!tablist) return;

    const allBtns = Array.from(
      tablist.querySelectorAll<HTMLElement>('[role="tab"]:not([aria-disabled="true"])'),
    );
    const currentIdx = allBtns.indexOf(triggerRef.current!);
    if (currentIdx === -1) return;

    const nextIdx = e.key === 'ArrowDown'
      ? (currentIdx + 1) % allBtns.length
      : (currentIdx - 1 + allBtns.length) % allBtns.length;

    const nextBtn = allBtns[nextIdx];
    const nextValue = nextBtn.getAttribute('data-stepper-value');
    if (nextValue) onSelect(nextValue);
    nextBtn.focus();
  };

  return (
    <button
      ref={triggerRef}
      id={triggerId}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      tabIndex={isActive ? 0 : -1}
      className={clsx(
        'stepper__step',
        isActive && 'stepper__step--active',
        disabled && 'stepper__step--disabled',
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid={`stepper-step-${value}`}
      data-stepper-value={value}
    >
      <span
        className={clsx(
          'stepper__indicator',
          isActive && 'stepper__indicator--active',
        )}
        data-testid={`stepper-indicator-${value}`}
      >
        {icon && <Icon name={icon} size="lg" className="stepper__indicator-icon" />}
        {text && !icon && (
          <span className="stepper__indicator-text">{text}</span>
        )}
      </span>
      <span className="stepper__label" data-testid={`stepper-label-${value}`}>
        {label}
      </span>
    </button>
  );
}

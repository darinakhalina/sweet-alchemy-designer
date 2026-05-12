import { useRef } from 'react';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import type { AccordionTriggerProps } from './interfaces/AccordionTriggerProps';

export default function AccordionTrigger({
  value,
  label,
  number,
  disabled = false,
  isOpen,
  showChevron,
  triggerId,
  panelId,
  onToggle,
}: AccordionTriggerProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!disabled) onToggle(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const navKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!navKeys.includes(e.key)) return;
    e.preventDefault();

    const root = buttonRef.current?.closest('[data-testid="accordion"]');
    if (!root) return;

    const triggers = Array.from(
      root.querySelectorAll<HTMLButtonElement>(
        '.accordion__trigger:not([aria-disabled="true"])',
      ),
    );
    if (triggers.length === 0) return;

    const currentIdx = triggers.indexOf(buttonRef.current!);
    let nextIdx = currentIdx;
    if (e.key === 'ArrowDown') nextIdx = (currentIdx + 1) % triggers.length;
    if (e.key === 'ArrowUp') nextIdx = (currentIdx - 1 + triggers.length) % triggers.length;
    if (e.key === 'Home') nextIdx = 0;
    if (e.key === 'End') nextIdx = triggers.length - 1;

    triggers[nextIdx].focus();
  };

  return (
    <button
      ref={buttonRef}
      id={triggerId}
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={clsx(
        'accordion__trigger',
        isOpen && 'accordion__trigger--open',
        disabled && 'accordion__trigger--disabled',
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid={`accordion-trigger-${value}`}
    >
      {number && (
        <span
          className="accordion__number"
          data-testid={`accordion-number-${value}`}
          aria-hidden="true"
        >
          {number}
        </span>
      )}
      <span
        className="accordion__label"
        data-testid={`accordion-label-${value}`}
      >
        {label}
      </span>
      {showChevron && (
        <span
          className={clsx(
            'accordion__chevron',
            isOpen && 'accordion__chevron--open',
          )}
          data-testid={`accordion-chevron-${value}`}
          aria-hidden="true"
        >
          <Icon name="icon-arrow-down" size="md" />
        </span>
      )}
    </button>
  );
}

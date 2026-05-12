import clsx from 'clsx';
import type { AccordionPanelProps } from './interfaces/AccordionPanelProps';

export default function AccordionPanel({
  value,
  isOpen,
  triggerId,
  panelId,
  children,
}: AccordionPanelProps) {
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen}
      className={clsx(
        'accordion__panel',
        isOpen && 'accordion__panel--open',
      )}
      data-testid={`accordion-panel-${value}`}
    >
      <div className="accordion__panel-inner">
        {children}
      </div>
    </div>
  );
}

import { useState, useId, Children, isValidElement } from 'react';
import clsx from 'clsx';
import AccordionItem from './AccordionItem';
import AccordionTrigger from './AccordionTrigger';
import AccordionPanel from './AccordionPanel';
import type { AccordionProps } from './interfaces/AccordionProps';
import type { AccordionItemProps } from './interfaces/AccordionItemProps';

const toArray = (
  v: string | string[] | null | undefined,
): string[] => {
  if (Array.isArray(v)) return v;
  if (v === null || v === undefined) return [];
  return [v];
};

function Accordion(props: AccordionProps) {
  const { children, className, showChevron = true } = props;
  const collapsible = props.type === 'multiple'
    ? true
    : props.collapsible ?? true;

  const baseId = useId();
  const isControlled = props.value !== undefined;

  const [internalOpen, setInternalOpen] = useState<string[]>(() =>
    toArray(props.defaultValue),
  );

  const openValues = isControlled ? toArray(props.value) : internalOpen;

  const emitChange = (next: string[]) => {
    if (props.type === 'multiple') {
      props.onValueChange?.(next);
    } else {
      props.onValueChange?.(next[0] ?? null);
    }
  };

  const handleToggle = (value: string) => {
    const wasOpen = openValues.includes(value);
    let next: string[];
    if (props.type === 'multiple') {
      next = wasOpen
        ? openValues.filter((v) => v !== value)
        : [...openValues, value];
    } else if (wasOpen) {
      if (!collapsible) return;
      next = [];
    } else {
      next = [value];
    }
    if (!isControlled) setInternalOpen(next);
    emitChange(next);
  };

  const items: AccordionItemProps[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === AccordionItem) {
      items.push(child.props as AccordionItemProps);
    }
  });

  const triggerId = (v: string) => `${baseId}-trigger-${v}`;
  const panelId = (v: string) => `${baseId}-panel-${v}`;

  return (
    <div className={clsx('accordion', className)} data-testid="accordion">
      {items.map((item) => {
        const isOpen = openValues.includes(item.value);
        return (
          <div
            key={item.value}
            className={clsx(
              'accordion__item',
              isOpen && 'accordion__item--open',
              item.disabled && 'accordion__item--disabled',
            )}
            data-testid={`accordion-item-${item.value}`}
          >
            <AccordionTrigger
              value={item.value}
              label={item.label}
              number={item.number}
              disabled={item.disabled}
              isOpen={isOpen}
              showChevron={showChevron}
              triggerId={triggerId(item.value)}
              panelId={panelId(item.value)}
              onToggle={handleToggle}
            />
            <AccordionPanel
              value={item.value}
              isOpen={isOpen}
              triggerId={triggerId(item.value)}
              panelId={panelId(item.value)}
            >
              {item.children}
            </AccordionPanel>
          </div>
        );
      })}
    </div>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;

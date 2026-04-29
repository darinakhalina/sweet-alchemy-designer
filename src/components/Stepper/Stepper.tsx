import { useState, useCallback, useEffect, useId, useRef, Children, isValidElement } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from '@/hooks';
import { MEDIA } from '@/constants/breakpoints';
import StepperStep from './StepperStep';
import StepperTrigger from './StepperTrigger';
import type { StepperProps } from './interfaces/StepperProps';
import type { StepperStepProps } from './interfaces/StepperStepProps';

function Stepper({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: StepperProps) {
  const baseId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(
    () => controlledValue ?? defaultValue ?? '',
  );

  const activeValue = isControlled ? controlledValue : internalValue;
  const isMobile = useMediaQuery(MEDIA.mobile);

  const setActiveValue = useCallback(
    (newValue: string) => {
      if (newValue === (isControlled ? controlledValue : internalValue)) return;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, internalValue, isControlled, onValueChange],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isMobile && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeValue, isMobile]);

  const steps: StepperStepProps[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === StepperStep) {
      steps.push(child.props as StepperStepProps);
    }
  });

  const activeStep = steps.find((s) => s.value === activeValue);
  const triggerId = (value: string) => `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={clsx('stepper', className)} data-testid="stepper">
      <div
        role="tablist"
        aria-orientation="vertical"
        className="stepper__steps"
        data-testid="stepper-steps"
      >
        {steps.map((step) => (
          <StepperTrigger
            key={step.value}
            value={step.value}
            label={step.label}
            icon={step.icon}
            text={step.text}
            disabled={step.disabled}
            isActive={activeValue === step.value}
            triggerId={triggerId(step.value)}
            panelId={panelId}
            onSelect={setActiveValue}
          />
        ))}
      </div>
      {activeStep?.children && (
        <div
          ref={panelRef}
          id={panelId}
          role="tabpanel"
          aria-labelledby={triggerId(activeValue)}
          className="stepper__panel stepper__panel--enter"
          key={activeValue}
          data-testid="stepper-panel"
        >
          {activeStep.children}
        </div>
      )}
    </div>
  );
}

Stepper.Step = StepperStep;

export default Stepper;

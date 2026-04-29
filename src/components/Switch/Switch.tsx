import { useId } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import type { SwitchProps } from './interfaces/SwitchProps';

const Switch = ({
  name,
  label,
  disabled = false,
  className,
}: SwitchProps) => {
  const inputId = useId();
  const [field] = useField({ name, type: 'checkbox' });

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        'switch',
        field.checked && 'switch--checked',
        disabled && 'switch--disabled',
        className,
      )}
      data-testid={`${name}-switch`}
    >
      <input
        {...field}
        id={inputId}
        type="checkbox"
        role="switch"
        aria-checked={field.checked}
        disabled={disabled}
        className="switch__input"
        data-testid={`${name}-switch-input`}
      />
      <span
        className={clsx(
          'switch__track',
          field.checked && 'switch__track--checked',
        )}
        aria-hidden="true"
        data-testid={`${name}-switch-track`}
      >
        <span className="switch__thumb" />
      </span>
      {label && (
        <span className="switch__label" data-testid={`${name}-switch-label`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;

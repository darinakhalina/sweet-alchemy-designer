import { useId } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import type { CheckboxProps } from './interfaces/CheckboxProps';

const Checkbox = ({
  name,
  label,
  disabled = false,
  className,
}: CheckboxProps) => {
  const inputId = useId();
  const [field] = useField({ name, type: 'checkbox' });

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        'checkbox',
        field.checked && 'checkbox--checked',
        disabled && 'checkbox--disabled',
        className,
      )}
      data-testid={`${name}-checkbox`}
    >
      <input
        {...field}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className="checkbox__input"
        data-testid={`${name}-checkbox-input`}
      />
      <span
        className={clsx(
          'checkbox__box',
          field.checked && 'checkbox__box--checked',
        )}
        aria-hidden="true"
        data-testid={`${name}-checkbox-box`}
      >
        <Icon name="icon-check" className="checkbox__icon" />
      </span>
      {label && (
        <span className="checkbox__label" data-testid={`${name}-checkbox-label`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;

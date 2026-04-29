import { useId } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import type { RadioGroupProps } from './interfaces/RadioGroupProps';

const RadioGroup = ({
  name,
  options,
  label,
  disabled = false,
  className,
}: RadioGroupProps) => {
  const groupId = useId();
  const [field, , helpers] = useField(name);

  return (
    <fieldset
      className={clsx('radio-group', disabled && 'radio-group--disabled', className)}
      disabled={disabled}
      data-testid={`${name}-radio-group`}
    >
      {label && (
        <legend className="radio-group__legend" data-testid={`${name}-radio-group-legend`}>
          {label}
        </legend>
      )}
      <div className="radio-group__options" role="radiogroup" aria-labelledby={label ? undefined : groupId}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isSelected = field.value === option.value;
          const isOptionDisabled = disabled || !!option.disabled;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={clsx(
                'radio-group__option',
                isSelected && 'radio-group__option--selected',
                isOptionDisabled && 'radio-group__option--disabled',
              )}
              data-testid={`${name}-radio-${option.value}`}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isOptionDisabled}
                onChange={() => helpers.setValue(option.value)}
                onBlur={() => helpers.setTouched(true)}
                className="radio-group__input"
                data-testid={`${name}-radio-input-${option.value}`}
              />
              <span
                className={clsx(
                  'radio-group__circle',
                  isSelected && 'radio-group__circle--selected',
                )}
                aria-hidden="true"
                data-testid={`${name}-radio-circle-${option.value}`}
              />
              <span className="radio-group__label">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RadioGroup;

import { useId } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import Dropdown from '@/components/Dropdown';
import Icon from '@/components/Icon';
import type { DropdownOption, DropdownTriggerRenderProps } from '@/components/Dropdown';
import type { SelectProps } from './interfaces/SelectProps';

const Select = ({
  name,
  options,
  label,
  placeholder,
  helpText,
  searchable = false,
  searchPlaceholder,
  disabled = false,
  required = false,
  className,
}: SelectProps) => {
  const inputId = useId();
  const helpId = useId();
  const [field, meta, helpers] = useField(name);

  const hasError = meta.touched && !!meta.error;
  const message = hasError ? meta.error : helpText;

  const handleSelect = (option: DropdownOption) => {
    helpers.setValue(option.value);
    helpers.setTouched(true);
  };

  const renderTrigger = ({ isOpen, selectedOption, toggleProps }: DropdownTriggerRenderProps) => (
    <button
      {...toggleProps}
      type="button"
      id={inputId}
      className={clsx(
        'select__trigger',
        hasError && 'select__trigger--error',
        disabled && 'select__trigger--disabled',
      )}
      disabled={disabled}
      data-testid={`${name}-select-trigger`}
    >
      <span
        className={clsx(
          'select__value',
          !selectedOption && 'select__value--placeholder',
        )}
        data-testid={`${name}-select-value`}
      >
        {selectedOption?.label ?? placeholder}
      </span>
      <span className="select__caret" data-testid={`${name}-select-caret`}>
        <Icon
          name="icon-arrow-down"
          size="lg"
          className={clsx('select__caret-icon', isOpen && 'select__caret-icon--open')}
        />
      </span>
    </button>
  );

  return (
    <div
      className={clsx('select', disabled && 'select--disabled', className)}
      data-testid={`${name}-select`}
    >
      {label && (
        <label className="select__label" htmlFor={inputId} data-testid={`${name}-select-label`}>
          {label}
          {required && <span className="select__required" aria-hidden="true"> *</span>}
        </label>
      )}

      <Dropdown
        options={options}
        selectedValue={field.value}
        onSelect={handleSelect}
        trigger={renderTrigger}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        data-testid={`${name}-select-dropdown`}
      />

      {message && (
        <p
          id={helpId}
          className={clsx('select__help', hasError && 'select__help--error')}
          role={hasError ? 'alert' : undefined}
          data-testid={`${name}-select-help`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Select;

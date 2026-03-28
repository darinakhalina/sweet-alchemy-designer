import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import icons from '/images/icons.svg';
import type { DropdownOption } from './interfaces/DropdownOption';
import type { DropdownProps } from './interfaces/DropdownProps';

export const Dropdown = ({
  options = [],
  placeholder,
  value = '',
  onChange,
  availableOptions,
  isOpen: controlledOpen,
  onOpenChange,
  onBeforeOpen,
}: DropdownProps) => {
  const { t } = useTranslation();
  const isControlled = typeof controlledOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState(false);
  const displayPlaceholder = placeholder ?? t('components.dropdown.placeholder');
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (next: boolean) => {
    if (isControlled) {
      onOpenChange?.(next);
    } else {
      setInternalOpen(next);
    }
  };
  const selected = useMemo(
    () => options.find((opt) => opt.value === value) || null,
    [options, value],
  );
  const toggleOpen = () => {
    if (!open) {
      onBeforeOpen?.();
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleSelect = (option: DropdownOption) => {
    onChange?.(option);
    setOpen(false);
  };
  return (
    <div className="dropdown">
      <button
        className="dropdown__toggle"
        onClick={toggleOpen}
        type="button"
        aria-expanded={open}
      >
        <div>{selected ? selected.searchLabel || selected.label : displayPlaceholder}</div>
        <svg
          className={clsx('dropdown__icon', open && 'dropdown__icon--rotate')}
          width="18"
          height="18"
          aria-hidden="true"
        >
          <use href={`${icons}#icon-arrow-down`} />
        </svg>
      </button>
      {open && (
        <ul className="dropdown__menu">
          {options.map((opt) => {
            const isAvailable =
              !availableOptions || !opt.value || availableOptions.includes(opt.value);
            return (
              <li
                key={opt.value}
                className={clsx('dropdown__item', !isAvailable && 'dropdown__item--disabled')}
                onClick={() => isAvailable && handleSelect(opt)}
                role="option"
                aria-disabled={!isAvailable}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

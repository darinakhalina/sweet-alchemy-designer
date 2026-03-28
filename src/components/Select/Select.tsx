import { useField } from 'formik';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import icons from '/images/icons.svg';
import type { SelectProps } from './interfaces/SelectProps';

const Select = ({ name, items, placeholder, className = '' }: SelectProps) => {
  const [field, , helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    helpers.setValue(id);
    setOpen(false);
  };

  return (
    <div className="select" ref={wrapperRef}>
      <div className={clsx('select__input', className)} onClick={() => setOpen((prev) => !prev)}>
        {field.value ? items.find((item) => item.id === field.value)?.name : placeholder}
        <span className="select__arrow">
          <svg
            className={clsx('select__icon', open && 'select__arrow--rotate')}
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use href={`${icons}#icon-arrow-down`} />
          </svg>
        </span>
      </div>

      {open && (
        <div className="select__dropdown" role="listbox">
          <ul className="select__list">
            {items.map((item) => (
              <li key={item.id} onClick={() => handleSelect(item.id)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;

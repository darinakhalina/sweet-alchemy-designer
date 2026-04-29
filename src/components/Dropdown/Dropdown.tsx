import { useRef, useState, useEffect } from 'react';
import { useSelect } from 'downshift';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import { useLockBodyScroll, useMediaQuery } from '@/hooks';
import { MEDIA } from '@/constants/breakpoints';
import type { DropdownProps } from './interfaces/DropdownProps';
import type { DropdownOption } from './interfaces/DropdownOption';

const Dropdown = ({
  options,
  selectedValue,
  onSelect,
  trigger,
  searchable = false,
  searchPlaceholder,
  placement = 'bottom-start',
  className,
  'data-testid': testId = 'dropdown',
}: DropdownProps) => {
  const isMobile = useMediaQuery(MEDIA.mobile);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selectedItem = options.find((o) => o.value === selectedValue) || null;

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    closeMenu,
  } = useSelect<DropdownOption>({
    items: filteredOptions,
    selectedItem,
    onSelectedItemChange: ({ selectedItem: item }) => {
      if (item) {
        onSelect(item);
        setSearch('');
      }
    },
    itemToString: (item) => item?.label ?? '',
  });

  useLockBodyScroll(isOpen && isMobile);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  const toggleProps = getToggleButtonProps({
    'data-testid': `${testId}-trigger`,
  });

  return (
    <div
      ref={containerRef}
      className={clsx('dropdown', className)}
      data-testid={testId}
    >
      {trigger({ isOpen, selectedOption: selectedItem, toggleProps })}

      {isMobile && isOpen && (
        <div
          className="dropdown__overlay"
          onClick={() => closeMenu()}
          data-testid={`${testId}-overlay`}
        />
      )}

      <div
        {...getMenuProps()}
        className={clsx(
          'dropdown__panel',
          isOpen && 'dropdown__panel--open',
          isMobile && 'dropdown__panel--mobile',
          placement === 'bottom-end' && 'dropdown__panel--end',
        )}
        data-testid={`${testId}-panel`}
      >
        {isOpen && (
          <>
            {searchable && (
              <div className="dropdown__search" data-testid={`${testId}-search`}>
                <div className="dropdown__search-field">
                  <Icon name="icon-search" size="lg" className="dropdown__search-icon" />
                  <input
                    ref={searchRef}
                    type="text"
                    className="dropdown__search-input"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    data-testid={`${testId}-search-input`}
                  />
                </div>
              </div>
            )}

            <ul className="dropdown__list" data-testid={`${testId}-list`}>
              {filteredOptions.map((item, index) => {
                const isSelected = selectedItem?.value === item.value;
                const isHighlighted = highlightedIndex === index;

                return (
                  <li
                    key={item.value}
                    {...getItemProps({ item, index })}
                    className={clsx(
                      'dropdown__item',
                      isHighlighted && 'dropdown__item--highlighted',
                      isSelected && 'dropdown__item--selected',
                      item.disabled && 'dropdown__item--disabled',
                    )}
                    data-testid={`${testId}-item-${item.value}`}
                  >
                    {item.label}
                  </li>
                );
              })}

              {filteredOptions.length === 0 && (
                <li className="dropdown__item dropdown__item--empty" data-testid={`${testId}-empty`}>
                  &mdash;
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

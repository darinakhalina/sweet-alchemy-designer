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
    // Search input lives outside the listbox (so listbox children are options-only
    // for ARIA). Suppress ToggleButtonBlur close when searchable — focus moves
    // to the search input and downshift would otherwise close the menu.
    stateReducer: (state, { changes, type }) => {
      if (searchable && type === useSelect.stateChangeTypes.ToggleButtonBlur) {
        return { ...changes, isOpen: state.isOpen };
      }
      return changes;
    },
  });

  useLockBodyScroll(isOpen && isMobile);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  // Strip aria-labelledby — downshift points it at a non-existent label.
  // Consumer's trigger element provides its own accessible name.
  const { 'aria-labelledby': _ariaTrigger, ...toggleProps } = getToggleButtonProps({
    'data-testid': `${testId}-trigger`,
  });
  const { 'aria-labelledby': _ariaMenu, ...menuProps } = getMenuProps();

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
          aria-hidden="true"
          data-testid={`${testId}-overlay`}
        />
      )}

      {/* Search input is rendered OUTSIDE the listbox so listbox children stay
          options-only (ARIA: listbox can only contain option/group/presentation). */}
      {isOpen && searchable && (
        <div className="dropdown__search-container" data-testid={`${testId}-search`}>
          <div className="dropdown__search">
            <div className="dropdown__search-field">
              <Icon name="icon-search" size="lg" className="dropdown__search-icon" />
              <input
                ref={searchRef}
                type="text"
                className="dropdown__search-input"
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder ?? 'Search'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid={`${testId}-search-input`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Listbox is always in DOM (getMenuProps must be called every render).
          Children are options-only — no <ul>/<li> wrapper, just role="option" divs. */}
      <div
        {...menuProps}
        className={clsx(
          'dropdown__panel',
          isOpen && 'dropdown__panel--open',
          isMobile && 'dropdown__panel--mobile',
          placement === 'bottom-end' && 'dropdown__panel--end',
        )}
        data-testid={`${testId}-panel`}
      >
        {isOpen && filteredOptions.map((item, index) => {
          const isSelected = selectedItem?.value === item.value;
          const isHighlighted = highlightedIndex === index;
          const { role: _itemRole, ...itemProps } = getItemProps({ item, index });

          return (
            <div
              key={item.value}
              {...itemProps}
              role="option"
              aria-selected={isSelected}
              className={clsx(
                'dropdown__item',
                isHighlighted && 'dropdown__item--highlighted',
                isSelected && 'dropdown__item--selected',
                item.disabled && 'dropdown__item--disabled',
              )}
              data-testid={`${testId}-item-${item.value}`}
            >
              {item.label}
            </div>
          );
        })}
      </div>

      {isOpen && filteredOptions.length === 0 && (
        <div className="dropdown__item dropdown__item--empty" data-testid={`${testId}-empty`}>
          &mdash;
        </div>
      )}
    </div>
  );
};

export default Dropdown;

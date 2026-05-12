import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import Dropdown from '../Dropdown';
import type { DropdownOption } from '../interfaces/DropdownOption';

const options: DropdownOption[] = [
  { value: 'sugar', label: 'Цукор' },
  { value: 'gelatin', label: 'Желатин' },
  { value: 'water', label: 'Вода' },
  { value: 'strawberry', label: 'Полуниця' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Tests',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Dropdown.',
      },
    },
  },
  args: { options, onSelect: fn() },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const ClickTriggerOpensMenu: Story = {
  name: 'Клік по тригеру відкриває меню',
  args: { options, onSelect: fn() },
  render: (args) => (
    <Dropdown
      {...args}
      trigger={({ toggleProps }) => (
        <button
          {...toggleProps}
          type="button"
          aria-label="Виберіть варіант"
          className="btn btn--secondary btn--md"
        >
          <span className="btn__label">Open me</span>
        </button>
      )}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('dropdown-trigger');
    await expect(canvas.queryByTestId('dropdown-list')).not.toBeInTheDocument();
    await userEvent.click(trigger);
    await expect(canvas.getByTestId('dropdown-list')).toBeInTheDocument();
  },
};

export const SelectingItemCallsOnSelect: Story = {
  name: 'Вибір елемента викликає onSelect',
  args: { options, onSelect: fn() },
  render: (args) => (
    <Dropdown
      {...args}
      trigger={({ toggleProps }) => (
        <button
          {...toggleProps}
          type="button"
          aria-label="Виберіть варіант"
          className="btn btn--secondary btn--md"
        >
          <span className="btn__label">Select</span>
        </button>
      )}
    />
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('dropdown-trigger');
    await userEvent.click(trigger);
    const item = canvas.getByTestId('dropdown-item-gelatin');
    await userEvent.click(item);
    await expect(args.onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'gelatin', label: 'Желатин' }),
    );
  },
};

export const SelectionUpdatesTrigger: Story = {
  name: 'Вибір оновлює тригер (controlled)',
  args: { options },
  render: (args) => {
    const Wrapper = () => {
      const [value, setValue] = useState<string | undefined>(undefined);
      return (
        <Dropdown
          {...args}
          selectedValue={value}
          onSelect={(opt) => setValue(opt.value)}
          trigger={({ selectedOption, toggleProps }) => (
            <button
              {...toggleProps}
              type="button"
              aria-label="Виберіть варіант"
              className="btn btn--secondary btn--md"
            >
              <span className="btn__label">{selectedOption?.label ?? 'none'}</span>
            </button>
          )}
        />
      );
    };
    return <Wrapper />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('dropdown-trigger');
    await expect(trigger).toHaveTextContent('none');
    await userEvent.click(trigger);
    const item = canvas.getByTestId('dropdown-item-water');
    await userEvent.click(item);
    await expect(trigger).toHaveTextContent('Вода');
  },
};

export const SearchableFiltersOptions: Story = {
  name: 'Searchable фільтрує опції',
  args: { options, searchable: true, searchPlaceholder: 'Пошук' },
  render: (args) => (
    <Dropdown
      {...args}
      trigger={({ toggleProps }) => (
        <button
          {...toggleProps}
          type="button"
          aria-label="Виберіть інгредієнт"
          className="btn btn--ghost btn--md"
        >
          <span className="btn__label">Search</span>
        </button>
      )}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('dropdown-trigger');
    await userEvent.click(trigger);
    const searchInput = canvas.getByTestId('dropdown-search-input');
    await userEvent.type(searchInput, 'цук');
    await expect(canvas.getByTestId('dropdown-item-sugar')).toBeInTheDocument();
    await expect(canvas.queryByTestId('dropdown-item-water')).not.toBeInTheDocument();
  },
};

export const SearchableEmptyStateForNoMatch: Story = {
  name: 'Searchable показує empty-стан без збігів',
  args: { options, searchable: true },
  render: (args) => (
    <Dropdown
      {...args}
      trigger={({ toggleProps }) => (
        <button
          {...toggleProps}
          type="button"
          aria-label="Виберіть інгредієнт"
          className="btn btn--ghost btn--md"
        >
          <span className="btn__label">Search</span>
        </button>
      )}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('dropdown-trigger'));
    const searchInput = canvas.getByTestId('dropdown-search-input');
    await userEvent.type(searchInput, 'неіснуюче');
    await expect(canvas.getByTestId('dropdown-empty')).toBeInTheDocument();
  },
};

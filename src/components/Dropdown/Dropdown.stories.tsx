import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Dropdown from './Dropdown';
import Icon from '@/components/Icon';
import type { DropdownOption } from './interfaces/DropdownOption';

const portionOptions: DropdownOption[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '8', label: '8' },
  { value: '12', label: '12' },
];

const ingredientOptions: DropdownOption[] = [
  { value: 'sugar', label: 'Цукор' },
  { value: 'gelatin', label: 'Желатин' },
  { value: 'water', label: 'Вода' },
  { value: 'oreo', label: 'Орео' },
  { value: 'strawberry', label: 'Полуниця' },
  { value: 'cream', label: 'Вершки' },
  { value: 'butter', label: 'Масло' },
  { value: 'flour', label: 'Борошно' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Випадаюче меню на базі downshift. Підтримує controlled-значення, пошук та кастомний тригер через render-prop.',
      },
    },
  },
  argTypes: {
    searchable: { control: 'boolean' },
    placement: { control: 'select', options: ['bottom-start', 'bottom-end'] },
  },
  args: {
    options: portionOptions,
    onSelect: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<string | undefined>(undefined);

<Dropdown
  options={portionOptions}
  selectedValue={value}
  onSelect={(opt) => setValue(opt.value)}
  trigger={({ selectedOption, toggleProps }) => (
    <button
      {...toggleProps}
      type="button"
      aria-label="Виберіть варіант"
      className="btn btn--secondary btn--md"
    >
      <span className="btn__label">
        {selectedOption?.label ?? 'Виберіть'}
      </span>
    </button>
  )}
/>`,
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <Dropdown
        {...args}
        selectedValue={value}
        onSelect={(opt) => {
          setValue(opt.value);
          args.onSelect?.(opt);
        }}
        trigger={({ selectedOption, toggleProps }) => (
          <button
            {...toggleProps}
            type="button"
            aria-label="Виберіть варіант"
            className="btn btn--secondary btn--md"
          >
            <span className="btn__label">
              {selectedOption?.label ?? 'Виберіть'}
            </span>
          </button>
        )}
      />
    );
  },
};

/* ────────── Кастомний тригер: кнопка ────────── */

export const ButtonTrigger: Story = {
  args: { options: portionOptions },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('6');

<Dropdown
  options={portionOptions}
  selectedValue={value}
  onSelect={(opt) => setValue(opt.value)}
  trigger={({ isOpen, selectedOption, toggleProps }) => (
    <button
      {...toggleProps}
      type="button"
      aria-label="Виберіть варіант"
      className="btn btn--secondary btn--md"
    >
      <span className="btn__label">
        Порцій: {selectedOption?.label}
        {isOpen ? ' ▲' : ' ▼'}
      </span>
    </button>
  )}
/>`,
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState('6');
    return (
      <Dropdown
        {...args}
        selectedValue={value}
        onSelect={(opt) => setValue(opt.value)}
        trigger={({ isOpen, selectedOption, toggleProps }) => (
          <button
            {...toggleProps}
            type="button"
            aria-label="Виберіть варіант"
            className="btn btn--secondary btn--md"
          >
            <span className="btn__label">
              Порцій: {selectedOption?.label}
              {isOpen ? ' ▲' : ' ▼'}
            </span>
          </button>
        )}
      />
    );
  },
};

/* ────────── Searchable ────────── */

export const Searchable: Story = {
  args: { options: ingredientOptions, searchable: true, searchPlaceholder: 'Пошук інгредієнтів' },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<string | undefined>(undefined);

<Dropdown
  options={ingredientOptions}
  selectedValue={value}
  onSelect={(opt) => setValue(opt.value)}
  searchable
  searchPlaceholder="Пошук інгредієнтів"
  trigger={({ selectedOption, toggleProps }) => (
    <button
      {...toggleProps}
      type="button"
      aria-label="Виберіть інгредієнт"
      className="btn btn--ghost btn--md"
    >
      <span className="btn__label">
        {selectedOption?.label ?? 'Інгредієнт'}
      </span>
      <Icon name="icon-arrow-down" size="md" className="btn__icon" />
    </button>
  )}
/>`,
      },
    },
  },
  render: (args) => {
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
            aria-label="Виберіть інгредієнт"
            className="btn btn--ghost btn--md"
          >
            <span className="btn__label">
              {selectedOption?.label ?? 'Інгредієнт'}
            </span>
            <Icon name="icon-arrow-down" size="md" className="btn__icon" />
          </button>
        )}
      />
    );
  },
};

/* ────────── Без selected (placeholder) ────────── */

export const Empty: Story = {
  args: { options: portionOptions },
  render: (args) => (
    <Dropdown
      {...args}
      trigger={({ selectedOption, toggleProps }) => (
        <button
          {...toggleProps}
          type="button"
          aria-label="Виберіть варіант"
          className="btn btn--secondary btn--md"
        >
          <span className="btn__label">
            {selectedOption?.label ?? 'Виберіть варіант'}
          </span>
        </button>
      )}
    />
  ),
};

/* ────────── Placement (bottom-end) ────────── */

export const PlacementEnd: Story = {
  args: { options: portionOptions, placement: 'bottom-end' },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<string | undefined>(undefined);

<Dropdown
  options={portionOptions}
  selectedValue={value}
  onSelect={(opt) => setValue(opt.value)}
  placement="bottom-end"
  trigger={({ selectedOption, toggleProps }) => (
    <button
      {...toggleProps}
      type="button"
      aria-label="Виберіть варіант"
      className="btn btn--secondary btn--md"
    >
      <span className="btn__label">
        {selectedOption?.label ?? 'bottom-end'}
      </span>
    </button>
  )}
/>`,
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 400, display: 'flex', justifyContent: 'flex-end' }}>
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
              <span className="btn__label">
                {selectedOption?.label ?? 'bottom-end'}
              </span>
            </button>
          )}
        />
      </div>
    );
  },
};

/* ────────── Pre-selected (зі стейтом) ────────── */

export const PreSelected: Story = {
  args: { options: portionOptions },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('4');

<Dropdown
  options={portionOptions}
  selectedValue={value}
  onSelect={(opt) => setValue(opt.value)}
  trigger={({ selectedOption, toggleProps }) => (
    <button
      {...toggleProps}
      type="button"
      aria-label="Виберіть варіант"
      className="btn btn--secondary btn--md"
    >
      <span className="btn__label">
        Передвибрано: {selectedOption?.label}
      </span>
    </button>
  )}
/>`,
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState('4');
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
            <span className="btn__label">
              Передвибрано: {selectedOption?.label}
            </span>
          </button>
        )}
      />
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Button from './Button';
import type { ButtonProps } from './interfaces/ButtonProps';

const VARIANTS: NonNullable<ButtonProps['variant']>[] = ['primary', 'secondary', 'brand', 'ghost'];
const SIZES: NonNullable<ButtonProps['size']>[] = ['sm', 'md', 'lg'];
const ICON_NAMES = [
  'icon-arrow-left',
  'icon-arrow-right',
  'icon-plus',
  'icon-check',
  'icon-edit',
  'icon-search',
  'icon-magic',
  'icon-close',
] as const;

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Універсальна кнопка з варіантами, розмірами, іконками та станами завантаження/вимкнення.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    iconLeft: { control: 'select', options: [undefined, ...ICON_NAMES] },
    iconRight: { control: 'select', options: [undefined, ...ICON_NAMES] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    uppercase: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Кнопка',
    variant: 'primary',
    size: 'md',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Варіанти ────────── */

export const Primary: Story = {
  args: { variant: 'primary', children: 'Основна' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Вторинна' },
};

export const Brand: Story = {
  args: { variant: 'brand', children: 'Бренд' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Прозора' },
};

/* ────────── Розміри ────────── */

export const Small: Story = {
  args: { size: 'sm', children: 'Малий' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Середній' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Великий' },
};

/* ────────── Стани ────────── */

export const Disabled: Story = {
  args: { isDisabled: true, children: 'Вимкнено' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Завантаження' },
};

/* ────────── Іконки ────────── */

export const WithIconLeft: Story = {
  args: { iconLeft: 'icon-arrow-left', children: 'Назад' },
};

export const WithIconRight: Story = {
  args: { iconRight: 'icon-arrow-right', children: 'Далі' },
};

export const WithBothIcons: Story = {
  args: { iconLeft: 'icon-edit', iconRight: 'icon-arrow-right', children: 'Редагувати' },
};

export const IconOnly: Story = {
  args: { iconOnly: true, iconLeft: 'icon-plus', children: 'Додати' },
};

/* ────────── Типографіка ────────── */

export const Uppercase: Story = {
  args: { uppercase: true, children: 'Верхній регістр' },
};

/* ────────── Огляд (візуальна довідка) ────────── */

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
    docs: { source: { state: 'closed' } },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 1fr)', gap: 16, alignItems: 'center' }}>
      <div />
      {VARIANTS.map((v) => (
        <strong key={v} style={{ textTransform: 'capitalize', textAlign: 'center' }}>{v}</strong>
      ))}
      {SIZES.map((s) => (
        <>
          <strong key={`${s}-label`} style={{ textTransform: 'uppercase' }}>{s}</strong>
          {VARIANTS.map((v) => (
            <div key={`${s}-${v}`} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant={v} size={s}>Кнопка</Button>
            </div>
          ))}
        </>
      ))}
    </div>
  ),
};

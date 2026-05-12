import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon from './Icon';
import type { IconProps } from './interfaces/IconProps';

const SIZES: NonNullable<IconProps['size']>[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const ALL_ICONS = [
  'icon-arrow-down', 'icon-arrow-left', 'icon-arrow-right', 'icon-arrow-section', 'icon-arrow-up',
  'icon-balance-one', 'icon-book', 'icon-cake', 'icon-check', 'icon-close', 'icon-cook-hat',
  'icon-dots', 'icon-edit', 'icon-effects', 'icon-facebook',
  'icon-folder', 'icon-instagram', 'icon-magic', 'icon-menu',
  'icon-multi-rectangle', 'icon-peas', 'icon-play', 'icon-play-back',
  'icon-plus', 'icon-plus-circle', 'icon-remove', 'icon-search',
  'icon-trending-down', 'icon-whirlwind', 'icon-x',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Іконка зі SVG-sprite `public/images/icons.svg`. Колір контролюється через CSS-властивість `color` на батьківському елементі.',
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: ALL_ICONS },
    size: { control: 'select', options: SIZES },
  },
  args: {
    name: 'icon-magic',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Розміри ────────── */

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };
export const ExtraLarge: Story = { args: { size: 'xl' } };

/* ────────── Кольори (через inline-style для демонстрації) ────────── */

export const ColoredBrand: Story = {
  args: { size: 'xl' },
  decorators: [
    (Story) => (
      <span style={{ color: 'var(--brand-600)' }}>
        <Story />
      </span>
    ),
  ],
};

export const ColoredError: Story = {
  args: { size: 'xl' },
  decorators: [
    (Story) => (
      <span style={{ color: 'var(--color-error)' }}>
        <Story />
      </span>
    ),
  ],
};

export const ColoredSuccess: Story = {
  args: { size: 'xl' },
  decorators: [
    (Story) => (
      <span style={{ color: 'var(--color-success)' }}>
        <Story />
      </span>
    ),
  ],
};

/* ────────── Каталог: усі іконки ────────── */

export const AllIcons: Story = {
  name: 'Усі іконки',
  parameters: {
    layout: 'padded',
    docs: { source: { state: 'closed' } },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 16,
      }}
    >
      {ALL_ICONS.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <Icon name={name} size="lg" />
          <code style={{ fontSize: 12, textAlign: 'center' }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};

/* ────────── Усі розміри одної іконки ────────── */

export const AllSizes: Story = {
  name: 'Усі розміри',
  parameters: { docs: { source: { state: 'closed' } } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="icon-magic" size={s} />
          <code>{s}</code>
        </div>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import Loader from './Loader';
import type { LoaderProps } from './interfaces/LoaderProps';

const SIZES: NonNullable<LoaderProps['size']>[] = ['sm', 'md', 'lg'];
const VARIANTS: NonNullable<LoaderProps['variant']>[] = ['primary', 'brand', 'light'];

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Спінер завантаження. Має 3 розміри, 3 колірні варіанти та опцію повноекранного оверлею.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    overlay: { control: 'boolean' },
  },
  args: {
    size: 'md',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Розміри ────────── */

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

/* ────────── Варіанти ────────── */

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Brand: Story = {
  args: { variant: 'brand' },
};

export const Light: Story = {
  args: { variant: 'light' },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          background: 'var(--neutral-400)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/* ────────── Overlay ────────── */

export const Overlay: Story = {
  args: { overlay: true },
  parameters: {
    layout: 'fullscreen',
    docs: { source: { state: 'open' } },
  },
};

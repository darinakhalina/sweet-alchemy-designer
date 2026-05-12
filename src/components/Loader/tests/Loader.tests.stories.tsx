import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Loader from '../Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader/Tests',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A11y і структурні тести для Loader.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const HasStatusRole: Story = {
  name: 'Має role="status" (a11y)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByRole('status');
    await expect(loader).toBeInTheDocument();
  },
};

export const HasAriaLabel: Story = {
  name: 'Має aria-label для скрінрідерів',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByLabelText('Loading');
    await expect(loader).toBeInTheDocument();
  },
};

export const OverlayWrapsLoader: Story = {
  name: 'overlay=true рендерить обгортку',
  args: { overlay: true },
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overlay = canvas.getByTestId('loader-overlay');
    const loader = canvas.getByTestId('loader');
    await expect(overlay).toBeInTheDocument();
    await expect(overlay).toContainElement(loader);
  },
};

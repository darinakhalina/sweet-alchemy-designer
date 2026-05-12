import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Icon from '../Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon/Tests',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Структурні та a11y-тести для Icon.',
      },
    },
  },
  args: { name: 'icon-magic' },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const HasAriaHidden: Story = {
  name: 'Має aria-hidden (декоративна іконка)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByTestId('icon');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
  },
};

export const RendersSvgUseHref: Story = {
  name: 'Рендерить <use> з href на sprite',
  args: { name: 'icon-cake' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByTestId('icon');
    const use = icon.querySelector('use');
    await expect(use).toHaveAttribute('href', '/images/icons.svg#icon-cake');
  },
};

export const SizeClassApplied: Story = {
  name: 'Клас розміру застосовується',
  args: { name: 'icon-magic', size: 'xl' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByTestId('icon');
    await expect(icon).toHaveClass('icon--xl');
  },
};

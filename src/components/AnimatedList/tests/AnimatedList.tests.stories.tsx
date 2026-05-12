import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import AnimatedList from '../AnimatedList';

const meta: Meta<typeof AnimatedList> = {
  title: 'Components/AnimatedList/Tests',
  component: AnimatedList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Структурні тести для AnimatedList.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedList>;

export const ChildrenGetIndexedStyle: Story = {
  name: 'Кожна дитина отримує --item-index',
  render: () => (
    <AnimatedList>
      <div data-testid="i-0">A</div>
      <div data-testid="i-1">B</div>
      <div data-testid="i-2">C</div>
    </AnimatedList>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const a = canvas.getByTestId('i-0');
    const b = canvas.getByTestId('i-1');
    const c = canvas.getByTestId('i-2');
    await expect(a.style.getPropertyValue('--item-index')).toBe('0');
    await expect(b.style.getPropertyValue('--item-index')).toBe('1');
    await expect(c.style.getPropertyValue('--item-index')).toBe('2');
  },
};

export const StaggerDelayApplied: Story = {
  name: 'staggerDelay застосовується через CSS-змінну',
  render: () => (
    <AnimatedList staggerDelay={250}>
      <div data-testid="item">First</div>
    </AnimatedList>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByTestId('item');
    await expect(item.style.getPropertyValue('--stagger-delay')).toBe('250ms');
  },
};

export const AddsAnimationClass: Story = {
  name: 'Додає клас animated-list__item кожній дитині',
  render: () => (
    <AnimatedList>
      <div data-testid="child">Item</div>
    </AnimatedList>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const child = canvas.getByTestId('child');
    await expect(child).toHaveClass('animated-list__item');
  },
};

export const PreservesExistingClassName: Story = {
  name: 'Зберігає існуючий className дитини',
  render: () => (
    <AnimatedList>
      <div data-testid="child" className="my-class">Item</div>
    </AnimatedList>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const child = canvas.getByTestId('child');
    await expect(child).toHaveClass('my-class');
    await expect(child).toHaveClass('animated-list__item');
  },
};

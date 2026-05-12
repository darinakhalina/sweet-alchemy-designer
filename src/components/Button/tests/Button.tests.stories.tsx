import type { FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import Button from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Tests',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для компонента Button. Запускаються на панелі Component tests.',
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ClickFiresHandler: Story = {
  name: 'Клік викликає onClick',
  args: { children: 'Натисни мене', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('btn');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DisabledDoesNotFire: Story = {
  name: 'Вимкнена не реагує на клік',
  args: { children: 'Вимкнено', isDisabled: true, onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('btn');
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LoadingDoesNotFire: Story = {
  name: 'У стані Loading не реагує на клік',
  args: { children: 'Завантаження', isLoading: true, onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('btn');
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).toBeDisabled();
  },
};

export const A11yIconOnlyHasLabel: Story = {
  name: 'Іконкова кнопка доступна (a11y)',
  args: { iconOnly: true, iconLeft: 'icon-plus', children: 'Додати елемент' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /додати елемент/i });
    await expect(button).toBeInTheDocument();
  },
};

export const KeyboardEnterFires: Story = {
  name: 'Enter на сфокусованій кнопці викликає onClick',
  args: { children: 'Натисни Enter', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('btn');
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const KeyboardSpaceFires: Story = {
  name: 'Space на сфокусованій кнопці викликає onClick',
  args: { children: 'Натисни Space', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('btn');
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const SubmitTypeSubmitsForm: Story = {
  name: 'type="submit" сабмітить форму',
  args: { type: 'submit', children: 'Відправити' },
  render: (args) => {
    const handleSubmit = fn((e: FormEvent) => e.preventDefault());
    return (
      <form data-testid="form" onSubmit={handleSubmit}>
        <Button {...args} />
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('btn');
    const form = canvas.getByTestId('form');
    const onSubmit = fn();
    form.addEventListener('submit', onSubmit);
    await userEvent.click(button);
    await expect(onSubmit).toHaveBeenCalledTimes(1);
  },
};

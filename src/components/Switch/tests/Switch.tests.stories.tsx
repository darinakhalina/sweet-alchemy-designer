import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import { expect, userEvent, within } from 'storybook/test';
import Switch from '../Switch';

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: false }} onSubmit={() => {}}>
    <Form>
      <Story />
    </Form>
  </Formik>
);

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch/Tests',
  component: Switch,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Switch.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const ClickTogglesChecked: Story = {
  name: 'Клік перемикає стан',
  args: { name: 'toggle', label: 'Перемикач' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('toggle-switch-input') as HTMLInputElement;
    await expect(input).not.toBeChecked();
    await userEvent.click(input);
    await expect(input).toBeChecked();
    await userEvent.click(input);
    await expect(input).not.toBeChecked();
  },
};

export const HasSwitchRole: Story = {
  name: 'Має role="switch" (a11y)',
  args: { name: 'role', label: 'Switch' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('switch');
    await expect(input).toBeInTheDocument();
  },
};

export const DisabledDoesNotToggle: Story = {
  name: 'Disabled не перемикається',
  args: { name: 'disabled', label: 'Вимкнено', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('disabled-switch-input') as HTMLInputElement;
    await expect(input).toBeDisabled();
    await userEvent.click(input, { pointerEventsCheck: 0 });
    await expect(input).not.toBeChecked();
  },
};

export const KeyboardSpaceToggles: Story = {
  name: 'Space на сфокусованому перемикає',
  args: { name: 'keyboard', label: 'Натисни Space' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('keyboard-switch-input') as HTMLInputElement;
    input.focus();
    await expect(input).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(input).toBeChecked();
  },
};

export const AriaCheckedReflectsState: Story = {
  name: 'aria-checked відображає стан',
  args: { name: 'aria', label: 'ARIA' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('aria-switch-input');
    await expect(input).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(input);
    await expect(input).toHaveAttribute('aria-checked', 'true');
  },
};

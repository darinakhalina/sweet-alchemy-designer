import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import { expect, fn, userEvent, within } from 'storybook/test';
import Input from '../Input';

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: '' }} onSubmit={() => {}}>
    <Form style={{ width: 360 }}>
      <Story />
    </Form>
  </Formik>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Tests',
  component: Input,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Input.',
      },
    },
  },
  args: { name: 'field' },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const TypingUpdatesValue: Story = {
  name: 'Введення оновлює значення',
  args: { name: 'typing', label: 'Email' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('typing-input-field') as HTMLInputElement;
    await userEvent.type(input, 'baker@example.com');
    await expect(input).toHaveValue('baker@example.com');
  },
};

export const DisabledBlocksTyping: Story = {
  name: 'Disabled блокує введення',
  args: { name: 'disabled', label: 'Вимкнено', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('disabled-input-field') as HTMLInputElement;
    await expect(input).toBeDisabled();
    await userEvent.type(input, 'should not appear', { pointerEventsCheck: 0 });
    await expect(input).toHaveValue('');
  },
};

export const ReadOnlyBlocksTyping: Story = {
  name: 'ReadOnly блокує введення',
  args: { name: 'readonly', label: 'Read-only', readOnly: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('readonly-input-field') as HTMLInputElement;
    await expect(input).toHaveAttribute('readonly');
    await userEvent.type(input, 'nope');
    await expect(input).toHaveValue('');
  },
};

export const PasswordToggleRevealsValue: Story = {
  name: 'Перемикач пароля показує/ховає',
  args: { name: 'pwd', type: 'password', label: 'Пароль', showPasswordToggle: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('pwd-input-field') as HTMLInputElement;
    const toggle = canvas.getByTestId('pwd-input-password-toggle');

    await expect(input).toHaveAttribute('type', 'password');
    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'text');
    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'password');
  },
};

export const EndIconClickFiresHandler: Story = {
  name: 'Клік по правій іконці викликає обробник',
  args: { name: 'endIcon', endIcon: 'icon-close', endIconLabel: 'Очистити', label: 'Очистити поле', onEndIconClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const iconBtn = canvas.getByTestId('endIcon-input-end-icon');
    await userEvent.click(iconBtn);
    await expect(args.onEndIconClick).toHaveBeenCalledTimes(1);
  },
};

export const LabelIsAssociatedWithInput: Story = {
  name: 'Лейбл асоційований з полем (a11y)',
  args: { name: 'a11y', label: 'Email' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Email');
    await expect(input).toBeInTheDocument();
  },
};

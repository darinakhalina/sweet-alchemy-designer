import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import { expect, userEvent, within } from 'storybook/test';
import Checkbox from '../Checkbox';

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: false }} onSubmit={() => {}}>
    <Form>
      <Story />
    </Form>
  </Formik>
);

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Tests',
  component: Checkbox,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Checkbox.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const ClickTogglesChecked: Story = {
  name: 'Клік перемикає checked',
  args: { name: 'toggle', label: 'Чекбокс' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('toggle-checkbox-input') as HTMLInputElement;
    await expect(input).not.toBeChecked();
    await userEvent.click(input);
    await expect(input).toBeChecked();
    await userEvent.click(input);
    await expect(input).not.toBeChecked();
  },
};

export const ClickOnLabelToggles: Story = {
  name: 'Клік по лейблу теж перемикає',
  args: { name: 'labelClick', label: 'Натисни мене' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Натисни мене');
    const input = canvas.getByTestId('labelClick-checkbox-input') as HTMLInputElement;
    await expect(input).not.toBeChecked();
    await userEvent.click(label);
    await expect(input).toBeChecked();
  },
};

export const DisabledDoesNotToggle: Story = {
  name: 'Disabled не перемикається',
  args: { name: 'disabled', label: 'Вимкнено', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('disabled-checkbox-input') as HTMLInputElement;
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
    const input = canvas.getByTestId('keyboard-checkbox-input') as HTMLInputElement;
    input.focus();
    await expect(input).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(input).toBeChecked();
  },
};

export const LabelIsAssociated: Story = {
  name: 'Лейбл асоційований з полем (a11y)',
  args: { name: 'a11y', label: 'Підписатись' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Підписатись');
    await expect(input).toBeInTheDocument();
  },
};

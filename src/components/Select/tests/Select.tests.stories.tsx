import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik } from 'formik';
import { expect, userEvent, within } from 'storybook/test';
import Select from '../Select';
import type { DropdownOption } from '@/components/Dropdown';

const options: DropdownOption[] = [
  { value: 'sm', label: 'Малий' },
  { value: 'md', label: 'Середній' },
  { value: 'lg', label: 'Великий' },
];

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: '' }} onSubmit={() => {}}>
    <div style={{ width: 360 }}><Story /></div>
  </Formik>
);

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Tests',
  component: Select,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Select.',
      },
    },
  },
  args: { options },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const ClickTriggerOpens: Story = {
  name: 'Клік відкриває dropdown',
  args: { name: 'open', label: 'Розмір' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('open-select-trigger');
    await userEvent.click(trigger);
    await expect(canvas.getByTestId('open-select-dropdown')).toBeInTheDocument();
  },
};

export const SelectingValueUpdatesTrigger: Story = {
  name: 'Вибір опції оновлює тригер',
  args: { name: 'choose', label: 'Розмір', placeholder: 'Не вибрано' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('choose-select-trigger');
    await expect(trigger).toHaveTextContent('Не вибрано');
    await userEvent.click(trigger);
    const item = canvas.getByTestId('choose-select-dropdown-item-md');
    await userEvent.click(item);
    await expect(trigger).toHaveTextContent('Середній');
  },
};

export const DisabledCannotBeOpened: Story = {
  name: 'Disabled не відкривається',
  args: { name: 'disabled', label: 'Вимкнено', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('disabled-select-trigger');
    await expect(trigger).toBeDisabled();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger, { pointerEventsCheck: 0 });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const HelpTextRenders: Story = {
  name: 'helpText відображається під полем',
  args: { name: 'help', label: 'Розмір', helpText: 'Підказка' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const help = canvas.getByTestId('help-select-help');
    await expect(help).toHaveTextContent('Підказка');
  },
};

export const LabelIsAssociated: Story = {
  name: 'Лейбл асоційований з тригером (a11y)',
  args: { name: 'a11y', label: 'Розмір' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByTestId('a11y-select-label');
    const trigger = canvas.getByTestId('a11y-select-trigger');
    await expect(label).toHaveAttribute('for', trigger.id);
  },
};

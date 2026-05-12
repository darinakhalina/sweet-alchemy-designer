import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import { expect, userEvent, within } from 'storybook/test';
import RadioGroup from '../RadioGroup';
import type { DropdownOption } from '@/components/Dropdown';

const sizeOptions: DropdownOption[] = [
  { value: 'sm', label: 'Малий' },
  { value: 'md', label: 'Середній' },
  { value: 'lg', label: 'Великий' },
];

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: '' }} onSubmit={() => {}}>
    <Form>
      <Story />
    </Form>
  </Formik>
);

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup/Tests',
  component: RadioGroup,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для RadioGroup.',
      },
    },
  },
  args: { options: sizeOptions },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const ClickSelectsOption: Story = {
  name: 'Клік вибирає опцію',
  args: { name: 'select', label: 'Розмір' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const md = canvas.getByTestId('select-radio-input-md') as HTMLInputElement;
    const lg = canvas.getByTestId('select-radio-input-lg') as HTMLInputElement;

    await userEvent.click(md);
    await expect(md).toBeChecked();
    await expect(lg).not.toBeChecked();

    await userEvent.click(lg);
    await expect(lg).toBeChecked();
    await expect(md).not.toBeChecked();
  },
};

export const HasRadioGroupRole: Story = {
  name: 'Має role="radiogroup" (a11y)',
  args: { name: 'role', label: 'Розмір' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('radiogroup');
    await expect(group).toBeInTheDocument();
  },
};

export const DisabledGroupBlocksSelection: Story = {
  name: 'Disabled група не дає вибрати',
  args: { name: 'disabledGroup', label: 'Вимкнено', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sm = canvas.getByTestId('disabledGroup-radio-input-sm') as HTMLInputElement;
    await expect(sm).toBeDisabled();
    await userEvent.click(sm, { pointerEventsCheck: 0 });
    await expect(sm).not.toBeChecked();
  },
};

export const DisabledOptionCannotBeSelected: Story = {
  name: 'Вимкнена опція не вибирається',
  args: {
    name: 'mixedOptions',
    label: 'Наявність',
    options: [
      { value: 'available', label: 'Доступний' },
      { value: 'soldOut', label: 'Розпродано', disabled: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const soldOut = canvas.getByTestId('mixedOptions-radio-input-soldOut') as HTMLInputElement;
    await expect(soldOut).toBeDisabled();
    await userEvent.click(soldOut, { pointerEventsCheck: 0 });
    await expect(soldOut).not.toBeChecked();
  },
};

export const LegendIsAccessible: Story = {
  name: 'Legend асоційований з групою (a11y)',
  args: { name: 'a11y', label: 'Розмір' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('radiogroup');
    await expect(group).toBeInTheDocument();
    const legend = canvas.getByText('Розмір');
    await expect(legend.tagName).toBe('LEGEND');
  },
};

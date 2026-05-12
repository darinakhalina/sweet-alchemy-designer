import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import RadioGroup from './RadioGroup';
import type { DropdownOption } from '@/components/Dropdown';

const sizeOptions: DropdownOption[] = [
  { value: 'sm', label: 'Малий' },
  { value: 'md', label: 'Середній' },
  { value: 'lg', label: 'Великий' },
];

const deliveryOptions: DropdownOption[] = [
  { value: 'pickup', label: 'Самовивіз' },
  { value: 'courier', label: 'Кур\'єр' },
  { value: 'post', label: 'Поштомат' },
];

const optionsWithDisabled: DropdownOption[] = [
  { value: 'available', label: 'Доступний' },
  { value: 'soldOut', label: 'Розпродано', disabled: true },
  { value: 'preorder', label: 'Передзамовлення' },
];

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: '' }} onSubmit={() => {}}>
    <Form>
      <Story />
    </Form>
  </Formik>
);

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Група радіо-кнопок з підтримкою Formik. Рендериться як `<fieldset>` з `role="radiogroup"`.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    name: 'field',
    label: 'Виберіть варіант',
    options: sizeOptions,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Базові ────────── */

export const Default: Story = {
  args: { name: 'size', label: 'Розмір', options: sizeOptions },
};

export const Delivery: Story = {
  args: { name: 'delivery', label: 'Спосіб доставки', options: deliveryOptions },
};

export const WithoutLabel: Story = {
  args: { name: 'noLabel', options: sizeOptions },
};

/* ────────── Стани ────────── */

export const Disabled: Story = {
  args: { name: 'disabled', label: 'Вимкнено', options: sizeOptions, disabled: true },
};

export const WithDisabledOption: Story = {
  args: { name: 'availability', label: 'Наявність', options: optionsWithDisabled },
};

export const PreSelected: Story = {
  args: { name: 'size', label: 'Передвибраний "md"', options: sizeOptions },
  decorators: [
    (Story) => (
      <Formik initialValues={{ size: 'md' }} onSubmit={() => {}}>
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
};

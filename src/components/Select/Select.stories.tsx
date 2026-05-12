import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik } from 'formik';
import Select from './Select';
import type { DropdownOption } from '@/components/Dropdown';

const sizeOptions: DropdownOption[] = [
  { value: 'sm', label: 'Малий' },
  { value: 'md', label: 'Середній' },
  { value: 'lg', label: 'Великий' },
];

const ingredientOptions: DropdownOption[] = [
  { value: 'sugar', label: 'Цукор' },
  { value: 'gelatin', label: 'Желатин' },
  { value: 'water', label: 'Вода' },
  { value: 'oreo', label: 'Орео' },
  { value: 'strawberry', label: 'Полуниця' },
  { value: 'cream', label: 'Вершки' },
  { value: 'butter', label: 'Масло' },
  { value: 'flour', label: 'Борошно' },
];

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: '' }} onSubmit={() => {}}>
    <div style={{ width: 360 }}><Story /></div>
  </Formik>
);

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Формовий select на базі Dropdown з підтримкою Formik, валідації, плейсхолдера та опціонального пошуку.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
  args: {
    name: 'field',
    label: 'Виберіть',
    placeholder: 'Не вибрано',
    options: sizeOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Базові ────────── */

export const Default: Story = {
  args: { name: 'size', label: 'Розмір', options: sizeOptions },
};

export const WithHelpText: Story = {
  args: { name: 'size', label: 'Розмір', options: sizeOptions, helpText: 'Виберіть розмір порції' },
};

export const Required: Story = {
  args: { name: 'size', label: 'Розмір', options: sizeOptions, required: true },
};

/* ────────── Стани ────────── */

export const Disabled: Story = {
  args: { name: 'disabled', label: 'Вимкнено', options: sizeOptions, disabled: true },
};

/* ────────── Pre-selected ────────── */

export const PreSelected: Story = {
  args: { name: 'size', label: 'Передвибрано', options: sizeOptions },
  decorators: [
    (Story) => (
      <Formik initialValues={{ size: 'md' }} onSubmit={() => {}}>
        <div style={{ width: 360 }}><Story /></div>
      </Formik>
    ),
  ],
};

/* ────────── Searchable ────────── */

export const Searchable: Story = {
  args: {
    name: 'ingredient',
    label: 'Інгредієнт',
    options: ingredientOptions,
    searchable: true,
    searchPlaceholder: 'Пошук',
  },
};

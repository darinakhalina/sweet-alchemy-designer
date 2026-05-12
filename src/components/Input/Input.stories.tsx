import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import Input from './Input';
import type { InputProps } from './interfaces/InputProps';

const VARIANTS: NonNullable<InputProps['variant']>[] = ['outlined', 'filled'];
const TYPES: NonNullable<InputProps['type']>[] = ['text', 'email', 'password', 'number', 'search', 'tel', 'url'];
const ICON_NAMES = [
  'icon-search',
  'icon-edit',
  'icon-plus',
  'icon-check',
  'icon-close',
  'icon-magic',
] as const;

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: '' }} onSubmit={() => {}}>
    <Form style={{ width: 360 }}>
      <Story />
    </Form>
  </Formik>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Поле вводу з підтримкою Formik. Має варіанти, типи, іконки, password toggle, textarea та стани disabled/readOnly.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    type: { control: 'select', options: TYPES },
    startIcon: { control: 'select', options: [undefined, ...ICON_NAMES] },
    endIcon: { control: 'select', options: [undefined, ...ICON_NAMES] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    multiline: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean' },
  },
  args: {
    name: 'field',
    label: 'Поле',
    placeholder: 'Введіть значення',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Варіанти ────────── */

export const Outlined: Story = {
  args: { name: 'outlined', variant: 'outlined', label: 'Outlined', placeholder: 'Звичайне поле' },
};

export const Filled: Story = {
  args: { name: 'filled', variant: 'filled', label: 'Filled', placeholder: 'Заповнене поле' },
};

/* ────────── Типи ────────── */

export const Email: Story = {
  args: { name: 'email', type: 'email', label: 'Email', placeholder: 'baker@gmail.com' },
};

export const Password: Story = {
  args: { name: 'password', type: 'password', label: 'Пароль', placeholder: '******', showPasswordToggle: true },
};

export const Search: Story = {
  args: { name: 'search', type: 'search', startIcon: 'icon-search', placeholder: 'Пошук...' },
};

export const Number: Story = {
  args: { name: 'number', type: 'number', label: 'Кількість', placeholder: '0' },
};

/* ────────── Іконки ────────── */

export const WithStartIcon: Story = {
  args: { name: 'withStartIcon', startIcon: 'icon-search', label: 'З іконкою ліворуч' },
};

export const WithEndIcon: Story = {
  args: { name: 'withEndIcon', endIcon: 'icon-edit', label: 'З іконкою праворуч' },
};

export const WithClickableEndIcon: Story = {
  args: {
    name: 'withClickableEndIcon',
    endIcon: 'icon-close',
    endIconLabel: 'Очистити',
    label: 'Клікабельна іконка',
    onEndIconClick: () => alert('clicked'),
  },
};

/* ────────── Стани ────────── */

export const Disabled: Story = {
  args: { name: 'disabled', label: 'Вимкнено', disabled: true, placeholder: 'Недоступно' },
};

export const ReadOnly: Story = {
  args: { name: 'readonly', label: 'Тільки читання', readOnly: true, placeholder: 'Не редагується' },
};

export const Required: Story = {
  args: { name: 'required', label: 'Обов\'язкове поле', required: true },
};

/* ────────── Допоміжний текст ────────── */

export const WithHelpText: Story = {
  args: { name: 'withHelp', label: 'Email', helpText: 'Будемо надсилати рецепти' },
};

/* ────────── Textarea ────────── */

export const Multiline: Story = {
  args: { name: 'multiline', multiline: true, rows: 4, label: 'Опис', placeholder: 'Опишіть рецепт...' },
};

export const MultilineWithMaxLength: Story = {
  args: { name: 'multilineMax', multiline: true, rows: 3, maxLength: 200, label: 'Коротко (200 символів)' },
};

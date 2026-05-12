import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik } from 'formik';
import Switch from './Switch';

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: false }} onSubmit={() => {}}>
    <Story />
  </Formik>
);

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Перемикач (toggle) з підтримкою Formik. Семантично має role="switch".',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    name: 'field',
    label: 'Перемикач',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  args: { name: 'playground', label: 'Перемикач' },
};

/* ────────── Базові ────────── */

export const Default: Story = {
  args: { name: 'default', label: 'Звичайний перемикач' },
};

/* ────────── Стани ────────── */

export const Disabled: Story = {
  args: { name: 'disabled', label: 'Вимкнено', disabled: true },
};

export const PreEnabled: Story = {
  args: { name: 'darkMode', label: 'Уже увімкнено' },
  decorators: [
    (Story) => (
      <Formik initialValues={{ darkMode: true }} onSubmit={() => {}}>
        <Story />
      </Formik>
    ),
  ],
};

/* ────────── Приклади ────────── */

export const Notifications: Story = {
  args: { name: 'notifications', label: 'Сповіщення' },
};

export const DarkMode: Story = {
  args: { name: 'darkMode', label: 'Темна тема' },
};

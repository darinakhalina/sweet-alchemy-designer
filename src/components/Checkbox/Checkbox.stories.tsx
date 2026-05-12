import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import Checkbox from './Checkbox';

const FormikDecorator = (Story: React.ComponentType, { args }: { args: { name: string } }) => (
  <Formik initialValues={{ [args.name]: false }} onSubmit={() => {}}>
    <Form>
      <Story />
    </Form>
  </Formik>
);

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [FormikDecorator],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Чекбокс з підтримкою Formik. Має кастомну візуальну рамку та іконку при checked.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    name: 'field',
    label: 'Чекбокс',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Базові ────────── */

export const Default: Story = {
  args: { name: 'default', label: 'Звичайний чекбокс' },
};

/* ────────── Стани ────────── */

export const Disabled: Story = {
  args: { name: 'disabled', label: 'Вимкнено', disabled: true },
};

export const PreChecked: Story = {
  args: { name: 'agreed', label: 'Уже погоджено' },
  decorators: [
    (Story) => (
      <Formik initialValues={{ agreed: true }} onSubmit={() => {}}>
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
};

/* ────────── Приклади з реальними лейблами ────────── */

export const Agreement: Story = {
  args: { name: 'agree', label: 'Погоджуюсь з умовами' },
};

export const Newsletter: Story = {
  args: { name: 'newsletter', label: 'Підписатись на розсилку' },
};

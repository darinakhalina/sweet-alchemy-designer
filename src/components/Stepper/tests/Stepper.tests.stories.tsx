import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import Stepper from '../Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper/Tests',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Stepper.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const ClickChangesActiveStep: Story = {
  name: 'Клік міняє активний крок',
  render: () => (
    <Stepper defaultValue="step-1">
      <Stepper.Step value="step-1" label="Перший">Контент 1</Stepper.Step>
      <Stepper.Step value="step-2" label="Другий">Контент 2</Stepper.Step>
      <Stepper.Step value="step-3" label="Третій">Контент 3</Stepper.Step>
    </Stepper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('stepper-panel')).toHaveTextContent('Контент 1');

    const step2 = canvas.getByTestId('stepper-step-step-2');
    await userEvent.click(step2);
    await expect(canvas.getByTestId('stepper-panel')).toHaveTextContent('Контент 2');
  },
};

export const ControlledOnValueChangeFires: Story = {
  name: 'Controlled: onValueChange викликається',
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('step-1');
      const handler = fn(setValue);
      return (
        <div>
          <span data-testid="current">{value}</span>
          <Stepper value={value} onValueChange={handler}>
            <Stepper.Step value="step-1" label="Перший">1</Stepper.Step>
            <Stepper.Step value="step-2" label="Другий">2</Stepper.Step>
          </Stepper>
        </div>
      );
    };
    return <Wrapper />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('current')).toHaveTextContent('step-1');
    await userEvent.click(canvas.getByTestId('stepper-step-step-2'));
    await expect(canvas.getByTestId('current')).toHaveTextContent('step-2');
  },
};

export const DisabledStepCannotBeSelected: Story = {
  name: 'Заблокований крок не вибирається',
  render: () => (
    <Stepper defaultValue="step-1">
      <Stepper.Step value="step-1" label="Перший">Перший контент</Stepper.Step>
      <Stepper.Step value="step-2" label="Заблокований" disabled>Не повинно з'явитися</Stepper.Step>
    </Stepper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const blocked = canvas.getByTestId('stepper-step-step-2');
    await expect(blocked).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(blocked, { pointerEventsCheck: 0 });
    await expect(canvas.getByTestId('stepper-panel')).toHaveTextContent('Перший контент');
  },
};

export const HasTablistAndTabpanelRoles: Story = {
  name: 'Має role="tablist" і "tabpanel" (a11y)',
  render: () => (
    <Stepper defaultValue="step-1">
      <Stepper.Step value="step-1" label="Перший">A</Stepper.Step>
      <Stepper.Step value="step-2" label="Другий">B</Stepper.Step>
    </Stepper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tablist')).toBeInTheDocument();
    await expect(canvas.getByRole('tabpanel')).toBeInTheDocument();
    const tabs = canvas.getAllByRole('tab');
    await expect(tabs.length).toBe(2);
  },
};

export const ActiveStepHasAriaSelected: Story = {
  name: 'Активний крок має aria-selected="true"',
  render: () => (
    <Stepper defaultValue="step-2">
      <Stepper.Step value="step-1" label="Перший">1</Stepper.Step>
      <Stepper.Step value="step-2" label="Другий">2</Stepper.Step>
    </Stepper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const step1 = canvas.getByTestId('stepper-step-step-1');
    const step2 = canvas.getByTestId('stepper-step-step-2');
    await expect(step1).toHaveAttribute('aria-selected', 'false');
    await expect(step2).toHaveAttribute('aria-selected', 'true');
  },
};

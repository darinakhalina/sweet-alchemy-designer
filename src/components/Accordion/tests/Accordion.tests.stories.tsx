import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import Accordion from '../Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion/Tests',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Accordion.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const ClickOpensItem: Story = {
  name: 'Клік відкриває item',
  render: () => (
    <Accordion type="single">
      <Accordion.Item value="a" label="A">Контент A</Accordion.Item>
      <Accordion.Item value="b" label="B">Контент B</Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerA = canvas.getByTestId('accordion-trigger-a');
    await expect(triggerA).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(triggerA);
    await expect(triggerA).toHaveAttribute('aria-expanded', 'true');
  },
};

export const SingleClosesPrevious: Story = {
  name: 'Single mode закриває попередній при відкритті нового',
  render: () => (
    <Accordion type="single" defaultValue="a">
      <Accordion.Item value="a" label="A">Контент A</Accordion.Item>
      <Accordion.Item value="b" label="B">Контент B</Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerA = canvas.getByTestId('accordion-trigger-a');
    const triggerB = canvas.getByTestId('accordion-trigger-b');
    await expect(triggerA).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(triggerB);
    await expect(triggerB).toHaveAttribute('aria-expanded', 'true');
    await expect(triggerA).toHaveAttribute('aria-expanded', 'false');
  },
};

export const MultipleKeepsBothOpen: Story = {
  name: 'Multiple mode тримає декілька відкритими',
  render: () => (
    <Accordion type="multiple">
      <Accordion.Item value="a" label="A">Контент A</Accordion.Item>
      <Accordion.Item value="b" label="B">Контент B</Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('accordion-trigger-a'));
    await userEvent.click(canvas.getByTestId('accordion-trigger-b'));
    await expect(canvas.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'true');
  },
};

export const CollapsibleFalseKeepsOneOpen: Story = {
  name: 'Single + collapsible=false не дає закрити останній',
  render: () => (
    <Accordion type="single" defaultValue="a" collapsible={false}>
      <Accordion.Item value="a" label="A">Контент A</Accordion.Item>
      <Accordion.Item value="b" label="B">Контент B</Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerA = canvas.getByTestId('accordion-trigger-a');
    await expect(triggerA).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(triggerA);
    await expect(triggerA).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DisabledDoesNotOpen: Story = {
  name: 'Заблокований item не відкривається',
  render: () => (
    <Accordion type="single">
      <Accordion.Item value="a" label="A" disabled>Не повинно з'явитися</Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('accordion-trigger-a');
    await expect(trigger).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(trigger, { pointerEventsCheck: 0 });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const ControlledOnValueChangeFires: Story = {
  name: 'Controlled: onValueChange викликається',
  render: () => {
    const Wrapper = () => {
      const [open, setOpen] = useState<string | null>(null);
      const handler = fn((v: string | null) => setOpen(v));
      return (
        <div>
          <span data-testid="current">{open ?? 'none'}</span>
          <Accordion type="single" value={open} onValueChange={handler}>
            <Accordion.Item value="a" label="A">Контент A</Accordion.Item>
          </Accordion>
        </div>
      );
    };
    return <Wrapper />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('current')).toHaveTextContent('none');
    await userEvent.click(canvas.getByTestId('accordion-trigger-a'));
    await expect(canvas.getByTestId('current')).toHaveTextContent('a');
  },
};

export const A11yPanelHasRegionRole: Story = {
  name: 'Панель має role="region" та aria-labelledby (a11y)',
  render: () => (
    <Accordion type="single" defaultValue="a">
      <Accordion.Item value="a" label="A">Контент</Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const panel = canvas.getByTestId('accordion-panel-a');
    await expect(panel).toHaveAttribute('role', 'region');
    await expect(panel).toHaveAttribute('aria-labelledby');
  },
};

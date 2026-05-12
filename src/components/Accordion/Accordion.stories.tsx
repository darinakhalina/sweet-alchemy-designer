import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Аккордеон з підтримкою single/multiple-режимів, controlled і uncontrolled-стану, опціонального шеврону та disabled-items.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    showChevron: { control: 'boolean' },
    onValueChange: { action: 'value changed' },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  args: { type: 'single', defaultValue: 'step-1' },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="step-1" label="Перший крок" number="01">
        <p>Контент першого кроку. Лорем іпсум долор сіт амет.</p>
      </Accordion.Item>
      <Accordion.Item value="step-2" label="Другий крок" number="02">
        <p>Контент другого кроку.</p>
      </Accordion.Item>
      <Accordion.Item value="step-3" label="Третій крок" number="03">
        <p>Контент третього кроку.</p>
      </Accordion.Item>
    </Accordion>
  ),
};

/* ────────── Single mode ────────── */

export const SingleMode: Story = {
  name: 'Single (один відкритий)',
  args: { type: 'single', defaultValue: 'a' },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="a" label="Питання 1">
        <p>Відповідь на питання 1.</p>
      </Accordion.Item>
      <Accordion.Item value="b" label="Питання 2">
        <p>Відповідь на питання 2.</p>
      </Accordion.Item>
      <Accordion.Item value="c" label="Питання 3">
        <p>Відповідь на питання 3.</p>
      </Accordion.Item>
    </Accordion>
  ),
};

export const SingleNonCollapsible: Story = {
  name: 'Single + collapsible=false (хоча б один завжди відкритий)',
  args: { type: 'single', defaultValue: 'a', collapsible: false },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="a" label="Завжди один відкритий">
        <p>Не можна закрити натисканням знов.</p>
      </Accordion.Item>
      <Accordion.Item value="b" label="Другий">
        <p>Відкриваючи цей — попередній закриється.</p>
      </Accordion.Item>
    </Accordion>
  ),
};

/* ────────── Multiple mode ────────── */

export const MultipleMode: Story = {
  name: 'Multiple (кілька відкритих)',
  args: { type: 'multiple', defaultValue: ['a', 'c'] },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="a" label="Item A">
        <p>Контент A (відкритий за замовчуванням).</p>
      </Accordion.Item>
      <Accordion.Item value="b" label="Item B">
        <p>Контент B.</p>
      </Accordion.Item>
      <Accordion.Item value="c" label="Item C">
        <p>Контент C (відкритий за замовчуванням).</p>
      </Accordion.Item>
    </Accordion>
  ),
};

/* ────────── Controlled ────────── */

export const Controlled: Story = {
  name: 'Controlled (value + onValueChange)',
  render: () => {
    const Wrapper = () => {
      const [open, setOpen] = useState<string | null>('q1');
      return (
        <div>
          <p style={{ marginBottom: 16, color: 'var(--color-text-secondary)' }}>
            Відкритий: <strong>{open ?? 'нічого'}</strong>
          </p>
          <Accordion type="single" value={open} onValueChange={setOpen}>
            <Accordion.Item value="q1" label="Питання 1">
              <p>Відповідь 1.</p>
            </Accordion.Item>
            <Accordion.Item value="q2" label="Питання 2">
              <p>Відповідь 2.</p>
            </Accordion.Item>
            <Accordion.Item value="q3" label="Питання 3">
              <p>Відповідь 3.</p>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    };
    return <Wrapper />;
  },
};

/* ────────── Без шеврону ────────── */

export const WithoutChevron: Story = {
  name: 'Без шеврону',
  args: { type: 'single', defaultValue: 'step-1', showChevron: false },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="step-1" label="Перший" number="01">
        <p>Без іконки шеврону праворуч.</p>
      </Accordion.Item>
      <Accordion.Item value="step-2" label="Другий" number="02">
        <p>Тільки number-індикатор зліва.</p>
      </Accordion.Item>
    </Accordion>
  ),
};

/* ────────── З вимкненим item ────────── */

export const WithDisabledItem: Story = {
  name: 'З вимкненим item',
  args: { type: 'single', defaultValue: 'a' },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="a" label="Доступний">
        <p>Можна відкрити.</p>
      </Accordion.Item>
      <Accordion.Item value="b" label="Заблокований" disabled>
        <p>Цей не відкриється.</p>
      </Accordion.Item>
      <Accordion.Item value="c" label="Знову доступний">
        <p>А цей — так.</p>
      </Accordion.Item>
    </Accordion>
  ),
};

/* ────────── FAQ приклад ────────── */

export const FAQExample: Story = {
  name: 'FAQ-приклад',
  args: { type: 'single' },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="q1" label="Які інгредієнти можна додати?">
        <p>Можна додати десятки інгредієнтів — від базових (борошно, цукор) до екзотичних.</p>
      </Accordion.Item>
      <Accordion.Item value="q2" label="Скільки часу зберігається рецепт?">
        <p>Рецепти зберігаються безстроково у твоєму профілі.</p>
      </Accordion.Item>
      <Accordion.Item value="q3" label="Можу я поділитися рецептом?">
        <p>Так, у кожного рецепта є посилання для шерингу.</p>
      </Accordion.Item>
    </Accordion>
  ),
};

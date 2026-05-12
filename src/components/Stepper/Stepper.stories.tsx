import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Stepper from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Вертикальний степпер (tablist/tabpanel) для багатокрокових процесів. Підтримує controlled і uncontrolled-режими.',
      },
    },
  },
  argTypes: {
    onValueChange: { action: 'value changed' },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  args: { defaultValue: 'step-1' },
  render: (args) => (
    <Stepper {...args}>
      <Stepper.Step value="step-1" label="Виберіть рецепт" icon="icon-book">
        <p>Опис кроку 1. Тут користувач обирає рецепт зі списку.</p>
      </Stepper.Step>
      <Stepper.Step value="step-2" label="Підберіть інгредієнти" icon="icon-balance-one">
        <p>Опис кроку 2. Перевірте інгредієнти і кількість.</p>
      </Stepper.Step>
      <Stepper.Step value="step-3" label="Готовий результат" icon="icon-check">
        <p>Опис кроку 3. Збережіть рецепт або поділіться.</p>
      </Stepper.Step>
    </Stepper>
  ),
};

/* ────────── Uncontrolled ────────── */

export const Uncontrolled: Story = {
  name: 'Uncontrolled (defaultValue)',
  args: { defaultValue: 'step-1' },
  render: (args) => (
    <Stepper {...args}>
      <Stepper.Step value="step-1" label="Перший крок">
        <p>Стан керується внутрішньо. defaultValue задає початковий крок.</p>
      </Stepper.Step>
      <Stepper.Step value="step-2" label="Другий крок">
        <p>Клікни на крок щоб переключитись.</p>
      </Stepper.Step>
      <Stepper.Step value="step-3" label="Третій крок">
        <p>Кінцевий крок.</p>
      </Stepper.Step>
    </Stepper>
  ),
};

/* ────────── Controlled ────────── */

export const Controlled: Story = {
  name: 'Controlled (value + onValueChange)',
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('step-2');
      return (
        <div>
          <p style={{ marginBottom: 16, color: 'var(--color-text-secondary)' }}>
            Активний крок (зовнішній state): <strong>{value}</strong>
          </p>
          <Stepper value={value} onValueChange={setValue}>
            <Stepper.Step value="step-1" label="Перший">
              <p>Контент першого кроку.</p>
            </Stepper.Step>
            <Stepper.Step value="step-2" label="Другий">
              <p>Контент другого кроку (зараз активний).</p>
            </Stepper.Step>
            <Stepper.Step value="step-3" label="Третій">
              <p>Контент третього кроку.</p>
            </Stepper.Step>
          </Stepper>
        </div>
      );
    };
    return <Wrapper />;
  },
};

/* ────────── З іконками і текстом ────────── */

export const WithIconsAndText: Story = {
  name: 'З іконками та допоміжним текстом',
  args: { defaultValue: 'step-1' },
  render: (args) => (
    <Stepper {...args}>
      <Stepper.Step
        value="step-1"
        label="Виберіть рецепт"
        icon="icon-book"
        text="З нашого каталогу"
      >
        <p>Знайдіть рецепт із сотень варіантів.</p>
      </Stepper.Step>
      <Stepper.Step
        value="step-2"
        label="Збалансуйте"
        icon="icon-balance-one"
        text="Інгредієнти та ціни"
      >
        <p>Оцініть пропорції та вартість.</p>
      </Stepper.Step>
      <Stepper.Step
        value="step-3"
        label="Готово!"
        icon="icon-check"
        text="Збережіть або поділіться"
      >
        <p>Закінчіть та збережіть результат.</p>
      </Stepper.Step>
    </Stepper>
  ),
};

/* ────────── З вимкненим кроком ────────── */

export const WithDisabledStep: Story = {
  name: 'З вимкненим кроком',
  args: { defaultValue: 'step-1' },
  render: (args) => (
    <Stepper {...args}>
      <Stepper.Step value="step-1" label="Доступний крок">
        <p>Можна клікнути.</p>
      </Stepper.Step>
      <Stepper.Step value="step-2" label="Заблокований крок" disabled>
        <p>Цей крок неможливо обрати.</p>
      </Stepper.Step>
      <Stepper.Step value="step-3" label="Знову доступний">
        <p>Цей крок знов доступний.</p>
      </Stepper.Step>
    </Stepper>
  ),
};

/* ────────── Багато кроків ────────── */

export const ManySteps: Story = {
  name: 'Багато кроків',
  args: { defaultValue: 'step-1' },
  render: (args) => (
    <Stepper {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Stepper.Step key={i} value={`step-${i + 1}`} label={`Крок ${i + 1}`}>
          <p>Контент кроку {i + 1}.</p>
        </Stepper.Step>
      ))}
    </Stepper>
  ),
};

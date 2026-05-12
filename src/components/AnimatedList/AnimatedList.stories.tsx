import type { Meta, StoryObj } from '@storybook/react-vite';
import AnimatedList from './AnimatedList';

const meta: Meta<typeof AnimatedList> = {
  title: 'Components/AnimatedList',
  component: AnimatedList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Обгортка для списку: додає stagger-анімацію fade-in-up до кожного дочірнього елемента через CSS-змінні `--item-index` і `--stagger-delay`.',
      },
    },
  },
  argTypes: {
    staggerDelay: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
  },
  args: {
    staggerDelay: 100,
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedList>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  render: (args) => (
    <AnimatedList {...args}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          style={{
            padding: 16,
            background: 'var(--color-bg-hover)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          Елемент {i + 1}
        </div>
      ))}
    </AnimatedList>
  ),
};

/* ────────── Базовий список ────────── */

export const BasicList: Story = {
  args: { staggerDelay: 100 },
  render: (args) => (
    <AnimatedList {...args} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ padding: 16, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8 }}>Перший</div>
      <div style={{ padding: 16, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8 }}>Другий</div>
      <div style={{ padding: 16, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8 }}>Третій</div>
      <div style={{ padding: 16, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8 }}>Четвертий</div>
    </AnimatedList>
  ),
};

/* ────────── Швидкий старт (мала затримка) ────────── */

export const FastStagger: Story = {
  name: 'Швидко (50ms)',
  args: { staggerDelay: 50 },
  render: (args) => (
    <AnimatedList {...args} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ padding: 12, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8 }}>
          Швидкий елемент {i + 1}
        </div>
      ))}
    </AnimatedList>
  ),
};

/* ────────── Повільний старт ────────── */

export const SlowStagger: Story = {
  name: 'Повільно (300ms)',
  args: { staggerDelay: 300 },
  render: (args) => (
    <AnimatedList {...args} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={{ padding: 12, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8 }}>
          Повільний елемент {i + 1}
        </div>
      ))}
    </AnimatedList>
  ),
};

/* ────────── Як grid ────────── */

export const Grid: Story = {
  name: 'Як grid (3 колонки)',
  args: { staggerDelay: 80 },
  render: (args) => (
    <AnimatedList
      {...args}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          style={{
            padding: 16,
            background: 'var(--brand-600)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}
        >
          {i + 1}
        </div>
      ))}
    </AnimatedList>
  ),
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Контрольована пагінація. Приймає `page`, `totalPages`, `onChange`. Підтримує налаштування siblings/boundaries для еліпсисів.',
      },
    },
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    boundaryCount: { control: { type: 'number', min: 0, max: 3 } },
    disabled: { control: 'boolean' },
    onChange: { action: 'page changed' },
  },
  args: {
    page: 1,
    totalPages: 10,
    siblingCount: 1,
    boundaryCount: 1,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {};

/* ────────── Інтерактивна (зі стейтом) ────────── */

export const Interactive: Story = {
  name: 'Interactive (з реальним стейтом)',
  args: { totalPages: 15 },
  render: (args) => {
    const Wrapper = () => {
      const [page, setPage] = useState(args.page);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <Pagination {...args} page={page} onChange={setPage} />
          <span style={{ color: 'var(--color-text-secondary)' }}>Поточна: {page}</span>
        </div>
      );
    };
    return <Wrapper />;
  },
};

/* ────────── Позиції ────────── */

export const FirstPage: Story = {
  args: { page: 1, totalPages: 10 },
};

export const MiddlePage: Story = {
  args: { page: 5, totalPages: 10 },
};

export const LastPage: Story = {
  args: { page: 10, totalPages: 10 },
};

/* ────────── Кількість сторінок ────────── */

export const FewPages: Story = {
  args: { page: 2, totalPages: 5 },
};

export const ManyPages: Story = {
  args: { page: 25, totalPages: 50 },
};

/* ────────── Налаштування siblings/boundaries ────────── */

export const WideSiblings: Story = {
  name: 'Більше siblings (siblingCount=2, boundaryCount=2)',
  args: { page: 10, totalPages: 20, siblingCount: 2, boundaryCount: 2 },
};

export const NoSiblings: Story = {
  name: 'Без siblings (siblingCount=0)',
  args: { page: 10, totalPages: 20, siblingCount: 0 },
};

/* ────────── Стани ────────── */

export const Disabled: Story = {
  args: { page: 5, totalPages: 10, disabled: true },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import Pagination from '../Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Tests',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Pagination.',
      },
    },
  },
  args: { page: 1, totalPages: 10, onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const ClickPageCallsOnChange: Story = {
  name: 'Клік по сторінці викликає onChange',
  args: { page: 1, totalPages: 10, onChange: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page3 = canvas.getByTestId('pagination-page-3');
    await userEvent.click(page3);
    await expect(args.onChange).toHaveBeenCalledWith(3);
  },
};

export const ActivePageHasAriaCurrent: Story = {
  name: 'Активна сторінка має aria-current="page"',
  args: { page: 5, totalPages: 10, onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const active = canvas.getByTestId('pagination-page-5');
    await expect(active).toHaveAttribute('aria-current', 'page');
    const other = canvas.getByTestId('pagination-page-1');
    await expect(other).not.toHaveAttribute('aria-current');
  },
};

export const HasNavRoleWithLabel: Story = {
  name: 'Має <nav> з aria-label (a11y)',
  args: { page: 1, totalPages: 5, onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute('aria-label');
  },
};

export const EllipsisShownForManyPages: Story = {
  name: 'Еліпсиси з\'являються при багатьох сторінках',
  args: { page: 10, totalPages: 50, onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ellipses = canvas.getAllByTestId('pagination-ellipsis');
    await expect(ellipses.length).toBeGreaterThan(0);
  },
};

export const DisabledBlocksClicks: Story = {
  name: 'Disabled блокує кліки',
  args: { page: 1, totalPages: 10, disabled: true, onChange: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page3 = canvas.getByTestId('pagination-page-3');
    await expect(page3).toBeDisabled();
    await userEvent.click(page3, { pointerEventsCheck: 0 });
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const SinglePageRendersNothing: Story = {
  name: 'totalPages=1 — нічого не рендериться',
  args: { page: 1, totalPages: 1, onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.queryByTestId('pagination');
    await expect(nav).not.toBeInTheDocument();
  },
};

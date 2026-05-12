import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import Modal from '../Modal';

/** Хелпер: тригер-кнопка + внутрішній стейт. Той самий патерн що і у демо-сторях. */
const ModalDemo = ({ buttonLabel, ariaLabel, children }: {
  buttonLabel: string;
  ariaLabel: string;
  children: ReactNode;
}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        data-testid="trigger"
        className="btn btn--primary btn--md"
        onClick={() => setOpen(true)}
      >
        <span className="btn__label">{buttonLabel}</span>
      </button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} ariaLabel={ariaLabel}>
        {children}
      </Modal>
    </>
  );
};

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Tests',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Інтеракційні та a11y-тести для Modal. Кожен тест відкриває модалку через тригер-кнопку (як у демо-сторях).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ClosedByDefault: Story = {
  name: 'Закрита за замовчуванням',
  render: () => (
    <ModalDemo buttonLabel="Open" ariaLabel="Test">
      <p>Should not be visible yet</p>
    </ModalDemo>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await expect(canvas.getByTestId('trigger')).toBeInTheDocument();
    await expect(body.queryByTestId('modal')).not.toBeInTheDocument();
    await expect(body.queryByText('Should not be visible yet')).not.toBeInTheDocument();
  },
};

export const TriggerOpensModal: Story = {
  name: 'Клік по тригеру відкриває модалку',
  render: () => (
    <ModalDemo buttonLabel="Open" ariaLabel="Test">
      <p>Modal content visible</p>
    </ModalDemo>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByTestId('trigger'));
    await expect(body.getByTestId('modal')).toBeInTheDocument();
    await expect(body.getByText('Modal content visible')).toBeInTheDocument();
  },
};

export const CloseButtonClosesModal: Story = {
  name: 'Клік по хрестику закриває',
  render: () => (
    <ModalDemo buttonLabel="Open" ariaLabel="Test">
      <p>Content</p>
    </ModalDemo>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByTestId('trigger'));
    await expect(body.getByTestId('modal')).toBeInTheDocument();
    await userEvent.click(body.getByTestId('modal-close'));
    await waitFor(() => expect(body.queryByTestId('modal')).not.toBeInTheDocument());
  },
};

export const EscapeKeyClosesModal: Story = {
  name: 'Esc закриває модалку',
  render: () => (
    <ModalDemo buttonLabel="Open" ariaLabel="Test">
      <p>Press Esc</p>
    </ModalDemo>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByTestId('trigger'));
    await expect(body.getByTestId('modal')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByTestId('modal')).not.toBeInTheDocument());
  },
};

export const OverlayClickClosesModal: Story = {
  name: 'Клік по оверлею закриває',
  render: () => (
    <ModalDemo buttonLabel="Open" ariaLabel="Test">
      <p>Click overlay to close</p>
    </ModalDemo>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByTestId('trigger'));
    await expect(body.getByTestId('modal')).toBeInTheDocument();
    // react-modal renders overlay as parent of .modal — click it directly
    const overlay = document.querySelector('.modal-overlay') as HTMLElement;
    await userEvent.click(overlay);
    await waitFor(() => expect(body.queryByTestId('modal')).not.toBeInTheDocument());
  },
};

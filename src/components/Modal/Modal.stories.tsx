import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Modal from './Modal';

/** Хелпер для всіх історій: тригер-кнопка + внутрішній стейт відкриття. */
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
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Модальне вікно на базі react-modal. Закривається по кліку на оверлей, Esc або хрестик. Рендериться в портал поза дерева компонента.',
      },
    },
  },
  args: {
    isOpen: false,
    ariaLabel: 'Модальне вікно',
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [isOpen, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Відкрити модальне</button>

<Modal
  isOpen={isOpen}
  onClose={() => setOpen(false)}
  ariaLabel="Пісочниця"
>
  <h2 className="h2">Заголовок</h2>
  <p>Базове модальне вікно. Закривається по Esc, кліку на оверлей або хрестик.</p>
</Modal>`,
      },
    },
  },
  render: () => (
    <ModalDemo buttonLabel="Відкрити модальне" ariaLabel="Пісочниця">
      <h2 className="h2">Заголовок</h2>
      <p>Базове модальне вікно. Закривається по Esc, кліку на оверлей або хрестик.</p>
    </ModalDemo>
  ),
};

/* ────────── З довгим вмістом ────────── */

export const LongContent: Story = {
  name: 'З довгим вмістом',
  parameters: {
    docs: {
      source: {
        code: `<Modal isOpen={isOpen} onClose={onClose} ariaLabel="Умови">
  <h2 className="h2">Умови використання</h2>
  <p>{longText}</p>
</Modal>`,
      },
    },
  },
  render: () => (
    <ModalDemo buttonLabel="Відкрити довге" ariaLabel="Довге">
      <h2 className="h2">Умови використання</h2>
      <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20)}</p>
      <p>{'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(15)}</p>
    </ModalDemo>
  ),
};

/* ────────── З формою всередині ────────── */

export const WithForm: Story = {
  name: 'З формою',
  parameters: {
    docs: {
      source: {
        code: `<Modal isOpen={isOpen} onClose={onClose} ariaLabel="Форма">
  <h2 className="h2">Зворотний зв'язок</h2>
  <form>
    <input type="email" placeholder="Email" />
    <textarea placeholder="Повідомлення" rows={4} />
    <button type="submit">Надіслати</button>
  </form>
</Modal>`,
      },
    },
  },
  render: () => (
    <ModalDemo buttonLabel="Відкрити форму" ariaLabel="Форма зворотного зв'язку">
      <h2 className="h2" style={{ marginBottom: 16 }}>Зворотний зв'язок</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          style={{ padding: 12, border: '1px solid var(--color-border)', borderRadius: 8 }}
        />
        <textarea
          placeholder="Повідомлення"
          aria-label="Повідомлення"
          rows={4}
          style={{ padding: 12, border: '1px solid var(--color-border)', borderRadius: 8 }}
        />
        <button type="button" className="btn btn--primary btn--md" style={{ alignSelf: 'flex-start' }}>
          <span className="btn__label">Надіслати</span>
        </button>
      </form>
    </ModalDemo>
  ),
};

/* ────────── Підтвердження ────────── */

export const Confirmation: Story = {
  name: 'Підтвердження дії',
  parameters: {
    docs: {
      source: {
        code: `<Modal isOpen={isOpen} onClose={onClose} ariaLabel="Підтвердження">
  <h2 className="h2">Видалити рецепт?</h2>
  <p>Цю дію не можна скасувати.</p>
  <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
    <button onClick={onClose}>Скасувати</button>
    <button onClick={handleDelete}>Видалити</button>
  </div>
</Modal>`,
      },
    },
  },
  render: () => {
    const ConfirmDemo = () => {
      const [isOpen, setOpen] = useState(false);
      return (
        <>
          <button
            type="button"
            className="btn btn--brand btn--md"
            onClick={() => setOpen(true)}
          >
            <span className="btn__label">Видалити рецепт</span>
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            ariaLabel="Підтвердження видалення"
          >
            <h2 className="h2" style={{ marginBottom: 16 }}>Видалити рецепт?</h2>
            <p style={{ marginBottom: 24 }}>Цю дію не можна скасувати.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn--ghost btn--md"
                onClick={() => setOpen(false)}
              >
                <span className="btn__label">Скасувати</span>
              </button>
              <button
                type="button"
                className="btn btn--brand btn--md"
                onClick={() => setOpen(false)}
              >
                <span className="btn__label">Видалити</span>
              </button>
            </div>
          </Modal>
        </>
      );
    };
    return <ConfirmDemo />;
  },
};

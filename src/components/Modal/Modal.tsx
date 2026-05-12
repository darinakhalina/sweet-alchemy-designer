import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';
import type { ModalProps } from './interfaces/ModalProps';

const Modal = ({
  children,
  isOpen,
  onClose,
  ariaLabel,
  'data-testid': testId = 'modal',
}: ModalProps) => {
  const { t } = useTranslation();

  // Resolve app element per-instance: prod uses #root, Storybook uses #storybook-root.
  // Avoids putting aria-hidden on document.body (axe a11y violation).
  const appElement = typeof document !== 'undefined'
    ? (document.getElementById('root')
      ?? document.getElementById('storybook-root')
      ?? undefined)
    : undefined;

  return (
    <ReactModal
      appElement={appElement}
      className="modal"
      overlayClassName="modal-overlay"
      bodyOpenClassName="body--modal-open"
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      closeTimeoutMS={300}
      contentLabel={ariaLabel}
      testId={testId}
    >
      <button
        type="button"
        onClick={onClose}
        className="modal__btn-close"
        data-testid={`${testId}-close`}
        aria-label={t('components.modal.close')}
        title={t('components.modal.close')}
      >
        <svg className="modal__btn-close-icon">
          <use href="/images/icons.svg#icon-close" />
        </svg>
      </button>
      <div className="modal__content" tabIndex={0}>{children}</div>
    </ReactModal>
  );
};

export default Modal;

import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';
import type { ModalProps } from './interfaces/ModalProps';

ReactModal.setAppElement('#root');

const Modal = ({
  children,
  isOpen,
  onClose,
  ariaLabel,
  'data-testid': testId = 'modal',
}: ModalProps) => {
  const { t } = useTranslation();

  return (
    <ReactModal
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
      <div className="modal__content">{children}</div>
    </ReactModal>
  );
};

export default Modal;

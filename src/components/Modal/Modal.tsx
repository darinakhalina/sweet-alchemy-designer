import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import type { ModalProps } from './interfaces/ModalProps';

ReactModal.setAppElement('#root');

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const { t } = useTranslation();
  useLockBodyScroll(isOpen);

  return (
    <ReactModal
      className="modal"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      closeTimeoutMS={300}
    >
      <button
        type="button"
        onClick={onClose}
        className="modal__btn-close"
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

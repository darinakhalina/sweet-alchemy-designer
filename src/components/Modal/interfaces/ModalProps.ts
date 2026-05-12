import type { ReactNode } from 'react';

export interface ModalProps {
  /** Вміст модального вікна */
  children: ReactNode;
  /** Чи відкрите модальне вікно */
  isOpen: boolean;
  /** Обробник закриття (викликається при кліку на оверлей, Esc або хрестик) */
  onClose: () => void;
  /** Accessible-name модального вікна для скрінрідерів */
  ariaLabel?: string;
  /** Кастомний data-testid (за замовчуванням "modal") */
  'data-testid'?: string;
}

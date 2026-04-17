import { useContext } from 'react';
import { AuthModalContext } from '@/components/AuthModal/AuthModalContext';

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
};

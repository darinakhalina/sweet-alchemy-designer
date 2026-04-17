import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials } from '@/store/auth/authSlice';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { AuthModalContext } from './AuthModalContext';

// TODO: replace with real API login call
const STUB_USER = {
  id: '1',
  email: 'baker@sweetalchemy.com',
  name: 'Sweet Baker',
};
const STUB_TOKEN = 'stub-jwt-token';

const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pendingAction = useRef<(() => void) | null>(null);

  const requireAuth = useCallback((onSuccess: () => void) => {
    if (isAuthenticated) {
      onSuccess();
      return;
    }
    pendingAction.current = onSuccess;
    setIsOpen(true);
  }, [isAuthenticated]);

  const handleClose = () => {
    setIsOpen(false);
    pendingAction.current = null;
  };

  // TODO: replace with real API login
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      dispatch(setCredentials({ user: STUB_USER, token: STUB_TOKEN }));
      setIsOpen(false);
      pendingAction.current?.();
      pendingAction.current = null;
    } catch {
      toast.error(t('errors.authInvalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: remove — demo only
  const handleLoginError = async () => {
    setIsLoading(true);
    try {
      await new Promise((_, reject) => setTimeout(() => reject(new Error('fail')), 800));
    } catch {
      toast.error(t('errors.authInvalidCredentials'));
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      pendingAction.current = null;
    }
  };

  return (
    <AuthModalContext.Provider value={{ requireAuth }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        ariaLabel={t('authModal.title')}
        data-testid="auth-modal"
      >
        <div className="auth-modal">
          <h2 className="h2">{t('authModal.title')}</h2>
          <p className="text-sm mt-4">{t('authModal.description')}</p>
          <div className="auth-modal__actions mt-6">
            <Button
              variant="brand"
              onClick={handleLogin}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {t('authModal.login')}
            </Button>
            <Button
              variant="ghost"
              onClick={handleLoginError}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {t('authModal.loginError')}
            </Button>
            <Button variant="secondary" onClick={handleClose} isDisabled={isLoading}>
              {t('authModal.cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;

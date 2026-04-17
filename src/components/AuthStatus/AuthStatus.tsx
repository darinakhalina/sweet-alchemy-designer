import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/auth/authSlice';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/Button';

const AuthStatus = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
    // TODO: call real API logout endpoint
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-status" data-testid="auth-status">
        <Link to={ROUTES.LOGIN} className="auth-status__login-link" data-testid="auth-status-login">
          {t('auth.login')}
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-status" data-testid="auth-status">
      <span className="auth-status__name" data-testid="auth-status-name">{user?.name}</span>
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        {t('auth.logout')}
      </Button>
    </div>
  );
};

export default AuthStatus;

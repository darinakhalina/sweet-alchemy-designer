import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials } from '@/store/auth/authSlice';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/Button';

// TODO: replace with real API login call
const STUB_USER = {
  id: '1',
  email: 'baker@sweetalchemy.com',
  name: 'Sweet Baker',
};
const STUB_TOKEN = 'stub-jwt-token';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const redirectTo = searchParams.get('redirect') || ROUTES.HOME;

  if (isAuthenticated) {
    navigate(redirectTo, { replace: true });
    return null;
  }

  const handleLogin = () => {
    // TODO: replace with createAsyncThunk API call
    dispatch(setCredentials({ user: STUB_USER, token: STUB_TOKEN }));
    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="login-page">
      <div className="login-page__card">
        <h1 className="h2">{t('login.title')}</h1>
        <p className="text-sm mt-4">{t('login.stub')}</p>
        <div className="login-page__actions mt-6">
          <Button variant="brand" onClick={handleLogin}>
            {t('login.submit')}
          </Button>
          <Button variant="ghost" onClick={() => navigate(ROUTES.HOME)}>
            {t('common.back')}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

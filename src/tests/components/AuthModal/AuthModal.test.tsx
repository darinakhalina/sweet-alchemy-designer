import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import AuthModalProvider from '@/components/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
}));

const TestButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const { requireAuth } = useAuthModal();
  return (
    <button data-testid="protected-btn" onClick={() => requireAuth(onSuccess)}>
      Protected action
    </button>
  );
};

const createStore = (isAuthenticated = false) =>
  configureStore({
    reducer: { auth: authReducer, desserts: dessertsReducer },
    preloadedState: isAuthenticated
      ? {
        auth: {
          user: { id: '1', email: 'test@test.com', name: 'Test' },
          token: 'token',
          isAuthenticated: true,
          isLoading: false,
        },
      }
      : undefined,
  });

const renderWithAuth = (onSuccess = vi.fn(), isAuthenticated = false) => {
  const store = createStore(isAuthenticated);
  render(
    <Provider store={store}>
      <AuthModalProvider>
        <TestButton onSuccess={onSuccess} />
      </AuthModalProvider>
    </Provider>,
  );
  return { store, onSuccess };
};

describe('AuthModal', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('opens modal when unauthenticated user clicks protected action', () => {
    renderWithAuth();
    fireEvent.click(screen.getByTestId('protected-btn'));
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
    expect(screen.getByText('authModal.title')).toBeInTheDocument();
    expect(screen.getByText('authModal.description')).toBeInTheDocument();
  });

  it('executes action immediately when authenticated', () => {
    const onSuccess = vi.fn();
    renderWithAuth(onSuccess, true);
    fireEvent.click(screen.getByTestId('protected-btn'));
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
  });

  it('does not open modal when authenticated', () => {
    renderWithAuth(vi.fn(), true);
    fireEvent.click(screen.getByTestId('protected-btn'));
    expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
  });

  it('closes modal on cancel button click', async () => {
    renderWithAuth();
    fireEvent.click(screen.getByTestId('protected-btn'));
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('authModal.cancel'));

    await waitFor(() => {
      expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
    });
  });

  it('closes modal on close button click', async () => {
    renderWithAuth();
    fireEvent.click(screen.getByTestId('protected-btn'));
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('auth-modal-close'));

    await waitFor(() => {
      expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
    });
  });

  it('logs in successfully and executes pending action', async () => {
    const onSuccess = vi.fn();
    renderWithAuth(onSuccess);

    fireEvent.click(screen.getByTestId('protected-btn'));
    fireEvent.click(screen.getByText('authModal.login'));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledOnce();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
    });
  });

  it('shows error toast on login error and closes modal', async () => {
    renderWithAuth();

    fireEvent.click(screen.getByTestId('protected-btn'));
    fireEvent.click(screen.getByText('authModal.loginError'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('errors.authInvalidCredentials');
    });

    await waitFor(() => {
      expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
    });
  });

  it('renders three action buttons', () => {
    renderWithAuth();
    fireEvent.click(screen.getByTestId('protected-btn'));
    expect(screen.getByText('authModal.login')).toBeInTheDocument();
    expect(screen.getByText('authModal.loginError')).toBeInTheDocument();
    expect(screen.getByText('authModal.cancel')).toBeInTheDocument();
  });

  it('has accessible aria-label on the modal', () => {
    renderWithAuth();
    fireEvent.click(screen.getByTestId('protected-btn'));
    expect(screen.getByTestId('auth-modal')).toHaveAttribute('aria-label', 'authModal.title');
  });

  it('dispatches setCredentials on successful login', async () => {
    const { store } = renderWithAuth();

    fireEvent.click(screen.getByTestId('protected-btn'));
    fireEvent.click(screen.getByText('authModal.login'));

    await waitFor(() => {
      expect(store.getState().auth.isAuthenticated).toBe(true);
    });
  });
});

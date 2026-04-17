import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import PrivateRoute from '@/components/PrivateRoute';
import type { AuthState } from '@/store/auth/interfaces/AuthState';

const createStore = (authState: Partial<AuthState> = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ...authState,
      },
    },
  });

const ProtectedContent = () => <div>Protected content</div>;

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  return <div>Login page{redirect && <span data-testid="redirect">{redirect}</span>}</div>;
};

const renderWithRoute = (store: ReturnType<typeof createStore>, initialPath = '/protected') => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/protected" element={<ProtectedContent />} />
            <Route path="/profile/edit" element={<ProtectedContent />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('PrivateRoute', () => {
  it('redirects to login when not authenticated', () => {
    const store = createStore({ isAuthenticated: false });
    renderWithRoute(store);

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });

  it('renders outlet when authenticated', () => {
    const store = createStore({
      isAuthenticated: true,
      user: { id: '1', email: 'a@b.com', name: 'Test' },
      token: 'token',
    });
    renderWithRoute(store);

    expect(screen.getByText('Protected content')).toBeInTheDocument();
    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
  });

  it('includes redirect param with original path', () => {
    const store = createStore({ isAuthenticated: false });
    renderWithRoute(store, '/profile/edit');

    const redirect = screen.getByTestId('redirect');
    expect(redirect).toHaveTextContent('/profile/edit');
  });
});

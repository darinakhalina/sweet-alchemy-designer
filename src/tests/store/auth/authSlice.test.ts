import { authReducer, setCredentials, logout } from '@/store/auth/authSlice';
import type { AuthState } from '@/store/auth/interfaces/AuthState';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const mockUser = {
  id: '1',
  email: 'test@test.com',
  name: 'Test User',
};

describe('authSlice', () => {
  it('returns initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('setCredentials', () => {
    it('sets user, token, and isAuthenticated', () => {
      const state = authReducer(
        initialState,
        setCredentials({ user: mockUser, token: 'test-token' }),
      );

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('test-token');
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('logout', () => {
    it('clears user, token, and isAuthenticated', () => {
      const loggedInState: AuthState = {
        user: mockUser,
        token: 'test-token',
        isAuthenticated: true,
        isLoading: false,
      };

      const state = authReducer(loggedInState, logout());

      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });
});

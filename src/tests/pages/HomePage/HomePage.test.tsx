import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import type { DessertsState } from '@/store/desserts/interfaces/DessertsState';
import { mockDesserts } from '@/store/desserts/constants/mockDesserts';
import toast from 'react-hot-toast';
import HomePage from '@/pages/HomePage';

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
}));

const mockRequireAuth = vi.fn((cb: () => void) => cb());
vi.mock('@/hooks/useAuthModal', () => ({
  useAuthModal: () => ({ requireAuth: mockRequireAuth }),
}));

vi.mock('@/services/dessertService', () => ({
  fetchDessertsFromApi: vi.fn(() => Promise.resolve(mockDesserts)),
  fetchDessertsWithError: vi.fn(() => Promise.reject(new Error('Server error'))),
}));

vi.mock('@/services/helpers/getErrorMessage', () => ({
  getErrorMessage: vi.fn((error: { code: string }) => `errors.${error.code}`),
}));

const createStore = (dessertsState: Partial<DessertsState> = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      desserts: dessertsReducer,
    },
    preloadedState: {
      desserts: {
        items: [],
        isLoading: false,
        error: null,
        ...dessertsState,
      },
    },
  });

const renderHomePage = (dessertsState: Partial<DessertsState> = {}) => {
  const store = createStore(dessertsState);
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>,
  );
};

describe('HomePage — Showcase', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders showcase section', () => {
    renderHomePage();
    expect(screen.getByTestId('home-showcase')).toBeInTheDocument();
  });

  it('shows empty state when no desserts loaded', () => {
    renderHomePage();
    expect(screen.getByTestId('home-showcase-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('home-showcase-cards')).not.toBeInTheDocument();
  });

  it('shows cards when desserts are loaded', () => {
    renderHomePage({ items: mockDesserts });
    expect(screen.getByTestId('home-showcase-cards')).toBeInTheDocument();
    expect(screen.getAllByTestId('home-showcase-card')).toHaveLength(3);
    expect(screen.queryByTestId('home-showcase-empty')).not.toBeInTheDocument();
  });

  it('fetches desserts on button click and shows cards', async () => {
    renderHomePage();

    const fetchButtons = screen.getAllByTestId('btn');
    const fetchButton = fetchButtons.find(
      (btn) => btn.textContent === 'pages.home.showcase.fetchButton',
    )!;

    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByTestId('home-showcase-cards')).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('home-showcase-card')).toHaveLength(3);
  });

  it('shows localized toast on error fetch', async () => {
    renderHomePage();

    const buttons = screen.getAllByTestId('btn');
    const errorButton = buttons.find(
      (btn) => btn.textContent === 'pages.home.showcase.errorButton',
    )!;

    fireEvent.click(errorButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('errors.dessertsFetchFailed');
    });
  });

  it('displays dessert name and cooking time', () => {
    renderHomePage({ items: mockDesserts });
    expect(screen.getByText('Tiramisu')).toBeInTheDocument();
    expect(screen.getByText('Napoleon')).toBeInTheDocument();
    expect(screen.getByText('Honey Cake')).toBeInTheDocument();
  });
});

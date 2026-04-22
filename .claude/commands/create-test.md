# Create Unit Test

Create a unit test for an existing component, page, service, slice, or hook. The user provides the path to the source file.

**Usage:** `/create-test src/components/ComponentName/ComponentName.tsx`

## Steps

1. **Read the source file** to understand:
   - What props/arguments it accepts
   - What `data-testid` attributes it has
   - What dependencies it uses (Redux, router, i18n, hooks, services)
   - What states it can be in (loading, empty, error, filled)

2. **Determine the test type and location:**
   - Component: `src/tests/components/$Name/$Name.test.tsx`
   - Page: `src/tests/pages/$Name/$Name.test.tsx`
   - Service: `src/tests/services/$name.test.ts`
   - Store slice: `src/tests/store/$name/${name}Slice.test.ts`
   - Hook: `src/tests/hooks/$name.test.ts`

3. **Write the test** following the patterns below.

4. **Run the test** — `npm run test:run -- --reporter=verbose $testFilePath` to verify it passes.

## What to test

- Rendering: component appears with correct structure
- Props: each prop affects output correctly (classes, text, attributes)
- Interactions: click, change, submit trigger correct behavior
- States: loading, empty, error, success
- Conditional rendering: elements appear/disappear based on props/state

## What NOT to test

- CSS visual appearance
- Third-party library internals (formik, react-modal)
- Implementation details (internal state, private methods)

## Conventions

- **Primary selectors:** `screen.getByTestId()` / `screen.queryByTestId()` / `screen.getAllByTestId()`
- **Fallback selectors:** `getByRole`, `getByText`, `getByAltText` when testid doesn't fit
- **Mocking:** `vi.fn()`, `vi.mock()`, `vi.spyOn()` — Vitest API
- **i18n:** globally mocked in `setup.ts` — `t('key')` returns the key string, so assert against the key
- **Cleanup:** use `afterEach(() => { vi.clearAllMocks(); })`
- **Async:** use `waitFor()` from `@testing-library/react`
- **Imports:** use `@/` prefix (never `../../`)

## Pattern: Simple component test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByTestId('btn')).toHaveTextContent('Click me');
  });

  it('applies default variant and size classes', () => {
    render(<Button>Test</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('btn', 'btn--primary', 'btn--md');
  });

  it('applies variant class', () => {
    render(<Button variant="brand">Test</Button>);
    expect(screen.getByTestId('btn')).toHaveClass('btn--brand');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);
    fireEvent.click(screen.getByTestId('btn'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled when isDisabled', () => {
    render(<Button isDisabled>Test</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('btn--disabled');
  });

  it('is disabled and shows loading when isLoading', () => {
    render(<Button isLoading>Test</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('btn--loading');
  });

  it('has type="button" by default', () => {
    render(<Button>Test</Button>);
    expect(screen.getByTestId('btn')).toHaveAttribute('type', 'button');
  });
});
```

## Pattern: Component with i18n and callbacks

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '@/components/Modal';

describe('Modal', () => {
  const onClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render children when closed', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders close button with translated aria-label', () => {
    render(
      <Modal isOpen onClose={onClose}><p>Content</p></Modal>,
    );
    const closeBtn = screen.getByTestId('modal-close');
    expect(closeBtn).toHaveAttribute('aria-label', 'components.modal.close');
  });

  it('calls onClose when close button clicked', () => {
    render(
      <Modal isOpen onClose={onClose}><p>Content</p></Modal>,
    );
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
```

## Pattern: Page with Redux store and router

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import type { DessertsState } from '@/store/desserts/interfaces/DessertsState';
import toast from 'react-hot-toast';
import HomePage from '@/pages/HomePage';

// Mock external dependencies
vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
}));

vi.mock('@/hooks/useAuthModal', () => ({
  useAuthModal: () => ({ requireAuth: vi.fn((cb: () => void) => cb()) }),
}));

vi.mock('@/services/dessertService', () => ({
  fetchDessertsFromApi: vi.fn(() => Promise.resolve([])),
}));

// Helper: create store with custom preloaded state
const createStore = (dessertsState: Partial<DessertsState> = {}) =>
  configureStore({
    reducer: { auth: authReducer, desserts: dessertsReducer },
    preloadedState: {
      desserts: { items: [], isLoading: false, error: null, ...dessertsState },
    },
  });

// Helper: render with all providers
const renderPage = (dessertsState: Partial<DessertsState> = {}) => {
  const store = createStore(dessertsState);
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>,
  );
};

describe('HomePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders page', () => {
    renderPage();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    renderPage();
    expect(screen.getByTestId('home-showcase-empty')).toBeInTheDocument();
  });

  it('shows error toast on failed fetch', async () => {
    renderPage();
    fireEvent.click(screen.getAllByTestId('btn')[1]);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
```

## Pattern: Redux slice test

```ts
import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import { fetchDesserts } from '@/store/desserts/dessertsThunks';
import type { DessertsState } from '@/store/desserts/interfaces/DessertsState';
import type { ApiError } from '@/services/interfaces/ApiError';

const initialState: DessertsState = {
  items: [],
  isLoading: false,
  error: null,
};

const mockApiError: ApiError = {
  code: 'fetchFailed',
  message: 'Server error',
  status: 500,
};

describe('dessertsSlice', () => {
  it('returns initial state', () => {
    const state = dessertsReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('sets isLoading on pending', () => {
    const state = dessertsReducer(initialState, fetchDesserts.pending(''));
    expect(state.isLoading).toBe(true);
  });

  it('sets items on fulfilled', () => {
    const mockItems = [{ id: '1', name: 'Test' }];
    const state = dessertsReducer(
      { ...initialState, isLoading: true },
      fetchDesserts.fulfilled(mockItems, ''),
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockItems);
  });

  it('sets error on rejected', () => {
    const state = dessertsReducer(
      { ...initialState, isLoading: true },
      fetchDesserts.rejected(null, '', undefined, mockApiError),
    );
    expect(state.error).toEqual(mockApiError);
  });
});
```

## Pattern: Service test

```ts
import { fetchDessertsFromApi, fetchDessertsWithError } from '@/services/dessertService';

describe('dessertService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('fetchDessertsFromApi', () => {
    it('resolves with data', async () => {
      const promise = fetchDessertsFromApi();
      vi.advanceTimersByTime(1000);
      const result = await promise;
      expect(result).toHaveLength(3);
    });

    it('each item has required fields', async () => {
      const promise = fetchDessertsFromApi();
      vi.advanceTimersByTime(1000);
      const result = await promise;
      result.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
      });
    });
  });

  describe('fetchDessertsWithError', () => {
    it('rejects with error', async () => {
      const promise = fetchDessertsWithError();
      vi.advanceTimersByTime(1000);
      await expect(promise).rejects.toThrow('Server error');
    });
  });
});
```

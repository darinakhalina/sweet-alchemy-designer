# Testing Guide

## Stack

- **Vitest** — test runner (Jest-compatible API)
- **@testing-library/react** — render, screen, fireEvent, waitFor
- **@testing-library/jest-dom** — DOM matchers (toBeInTheDocument, toHaveClass, etc.)
- **jsdom** — browser environment for tests

Config: `vite.config.ts` → `test` section. Setup: `src/tests/setup.ts`.

## Where Tests Live

Tests mirror the source structure inside `src/tests/`:

```
src/tests/
├── setup.ts                              # Global setup
├── components/
│   ├── AnimatedList/AnimatedList.test.tsx
│   ├── AuthModal/AuthModal.test.tsx
│   ├── Button/Button.test.tsx
│   ├── Icon/Icon.test.tsx
│   ├── Input/Input.test.tsx
│   ├── Loader/Loader.test.tsx
│   ├── Modal/Modal.test.tsx
│   ├── Pagination/Pagination.test.tsx
│   └── PrivateRoute/PrivateRoute.test.tsx
├── pages/
│   └── HomePage/HomePage.test.tsx
├── store/
│   ├── auth/authSlice.test.ts
│   └── desserts/dessertsSlice.test.ts
└── services/
    ├── dessertService.test.ts
    └── getErrorMessage.test.ts
```

## Selectors: data-testid First

Every component and page must have `data-testid` on key elements. Tests use testid as the primary query.

```tsx
// Component
<button data-testid="btn" ...>
  <span data-testid="btn-label">{children}</span>
</button>

// Test
screen.getByTestId('btn')
screen.getByTestId('btn-label')
screen.getAllByTestId('home-showcase-card')
screen.queryByTestId('loader-overlay')  // null check
```

### Selector priority

1. `getByTestId` / `queryByTestId` / `getAllByTestId` — primary strategy
2. `getByRole`, `getByText`, `getByAltText` — when testid doesn't make sense
3. `container.querySelector` — last resort (SVG `<use>` elements, etc.)

### Naming convention

- kebab-case: `btn`, `btn-label`, `loader`, `loader-overlay`, `home-showcase`, `home-showcase-card`
- Page root: `home-page`, `login-page`
- Component root: matches the component's BEM block name

## Testing Components

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByTestId('btn')).toHaveTextContent('Click me');
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
    expect(screen.getByTestId('btn')).toBeDisabled();
  });
});
```

### What to test in components

- Renders expected content (text, classes)
- Applies correct CSS classes for different props (variants, sizes)
- Interactive behavior (click handlers fire)
- Disabled/loading states
- Conditional rendering (icons shown/hidden, overlay present/absent)

### What NOT to test

- CSS visual appearance (demo page covers that)
- Third-party library internals
- Implementation details (internal state)

## Testing Redux Slices

Test the reducer directly — import it, dispatch actions, check state.

```ts
import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import { fetchDesserts } from '@/store/desserts/dessertsThunks';

it('returns initial state', () => {
  const state = dessertsReducer(undefined, { type: 'unknown' });
  expect(state).toEqual({ items: [], isLoading: false, error: null });
});

it('sets isLoading on pending', () => {
  const state = dessertsReducer(initialState, fetchDesserts.pending(''));
  expect(state.isLoading).toBe(true);
});

it('sets items on fulfilled', () => {
  const state = dessertsReducer(
    { ...initialState, isLoading: true },
    fetchDesserts.fulfilled(mockDesserts, ''),
  );
  expect(state.items).toEqual(mockDesserts);
});

it('sets error on rejected', () => {
  const state = dessertsReducer(
    initialState,
    fetchDesserts.rejected(null, '', undefined, mockApiError),
  );
  expect(state.error).toEqual(mockApiError);
});
```

For async thunks, test the action creators directly (`.pending`, `.fulfilled`, `.rejected`) — not the full thunk execution. This keeps tests fast and deterministic.

## Testing Services

```ts
import { fetchDessertsFromApi, fetchDessertsWithError } from '@/services/dessertService';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it('resolves with desserts', async () => {
  const promise = fetchDessertsFromApi();
  vi.advanceTimersByTime(1000);
  const result = await promise;
  expect(result).toHaveLength(3);
});

it('rejects with error', async () => {
  const promise = fetchDessertsWithError();
  vi.advanceTimersByTime(1000);
  await expect(promise).rejects.toThrow();
});
```

Use `vi.useFakeTimers()` for stub services with `setTimeout`.

## Testing Pages with Redux

Pages that use Redux need a `Provider` + `MemoryRouter` wrapper.

```tsx
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

const createStore = (preloaded = {}) =>
  configureStore({
    reducer: { auth: authReducer, desserts: dessertsReducer },
    preloadedState: preloaded,
  });

const renderPage = (state = {}) =>
  render(
    <Provider store={createStore(state)}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>,
  );
```

Use `preloadedState` to set up specific state scenarios (empty, loaded, loading, error).

## Testing Toasts

Mock `react-hot-toast` and verify `toast.error` is called:

```ts
vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn() },
}));

// Also mock getErrorMessage to bypass i18n mock behavior
vi.mock('@/services/helpers/getErrorMessage', () => ({
  getErrorMessage: vi.fn((error: { code: string }) => `errors.${error.code}`),
}));

it('shows toast on error', async () => {
  fireEvent.click(errorButton);
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('errors.dessertsFetchFailed');
  });
});
```

Why mock `getErrorMessage`: the global i18n mock makes `t('key')` return the key itself, which causes `getErrorMessage` to always fall back to the unknown error. Mocking it separately lets you test the error code flow.

## Testing getErrorMessage

Create a custom `t` mock with known translations:

```ts
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'errors.dessertsFetchFailed': 'Failed to load desserts.',
    'errors.unknown': 'Something went wrong.',
  };
  return translations[key] ?? key;
});

it('returns translated message for known code', () => {
  const error = { code: 'dessertsFetchFailed', message: 'err', status: 500 };
  expect(getErrorMessage(error, mockT)).toBe('Failed to load desserts.');
});

it('falls back for unknown code', () => {
  const error = { code: 'nope', message: 'err', status: 500 };
  expect(getErrorMessage(error, mockT)).toBe('Something went wrong.');
});
```

## Mocking Tools

| Tool | Use |
|------|-----|
| `vi.fn()` | Create mock function |
| `vi.mock('module')` | Mock entire module |
| `vi.spyOn(obj, 'method')` | Spy on existing method |
| `vi.useFakeTimers()` | Control setTimeout/setInterval |
| `vi.clearAllMocks()` | Reset all mocks between tests |

## Running Tests

```bash
npm test             # Watch mode — reruns on file change
npm run test:run     # Single run — for CI and verification
```

Test files are excluded from `tsc` build via `tsconfig.json` → `exclude`. Vitest handles TypeScript separately.

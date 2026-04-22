# Create Page

Create a new page component following the project conventions. The user provides the page name, route path, and brief description.

**Usage:** `/create-page PageName /route-path — brief description`

## Steps

1. **Create the page folder and files** at `src/pages/$PageName/`:

   - `$PageName.tsx` — the page component
   - `$page-name.css` — styles (BEM, kebab-case filename)
   - `index.ts` — barrel export (default export)
   - `i18n/en.json` — English translations under `pages.$pageName.*`
   - `i18n/uk.json` — Ukrainian translations

2. **Add the route constant** to `src/constants/routes.ts`:
   - Add to `ROUTES` object (UPPER_SNAKE_CASE key)

3. **Add the route to `src/App.tsx`**:
   - Add lazy import at the top
   - Add `<Route>` inside the appropriate section:
     - Inside `<HomePageLayout>` for standard pages
     - Inside `<PrivateRoute>` if it requires authentication
     - At the top level for standalone pages (no layout)

4. **Register CSS** — add `@import` to `src/styles/index.css` in `/* === Pages === */` section.

5. **Create a test file** at `src/tests/pages/$PageName/$PageName.test.tsx`.

6. **Run typecheck** — `npm run typecheck` to verify.

## Conventions

- Page root element: `<main className="page-name" data-testid="page-name">`
- Use `useTranslation()` for all visible text, keys under `pages.$pageName.*`
- Use `useAppDispatch()` / `useAppSelector()` for Redux state
- Use grid: `<div className="row">` > `<div className="col-12 col-md-*">`
- Do NOT add `.f-container` — it's already in `HomePageLayout`
- Default export, lazy-loaded via `React.lazy()` in `App.tsx`

## Example: Page component

**`src/constants/routes.ts`** (add new route):
```ts
export const ROUTES = {
  HOME: '/',
  CONSTRUCTOR: '/constructor',
  FAVORITES: '/favorites',  // <-- new
  // ...
} as const;
```

**`src/pages/HomePage/index.ts`:**
```ts
export { default } from './HomePage';
```

**`src/pages/HomePage/i18n/en.json`:**
```json
{
  "pages": {
    "home": {
      "title": "SweetAlchemy Designer",
      "subtitle": "Create your perfect dessert recipe"
    }
  }
}
```

**`src/pages/HomePage/i18n/uk.json`:**
```json
{
  "pages": {
    "home": {
      "title": "SweetAlchemy Designer",
      "subtitle": "Створи свій ідеальний рецепт десерту"
    }
  }
}
```

**`src/pages/HomePage/HomePage.tsx`:**
```tsx
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '@/components/Button';
import Loader from '@/components/Loader';

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.desserts);

  return (
    <main className="home-page" data-testid="home-page">
      <div className="row">
        <div className="col-12 col-md-8">
          <h1 className="h1">{t('pages.home.title')}</h1>
          <p className="text mt-4">{t('pages.home.subtitle')}</p>
        </div>
      </div>

      {isLoading && <Loader size="md" variant="brand" />}

      {!isLoading && items.length === 0 && (
        <p data-testid="home-showcase-empty">
          {t('pages.home.showcase.emptyText')}
        </p>
      )}
    </main>
  );
};

export default HomePage;
```

**`src/App.tsx`** (add route):
```tsx
// At the top — lazy import
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));

// Inside <Routes>:
// Standard page inside HomePageLayout:
<Route path={ROUTES.HOME} element={<HomePageLayout />}>
  <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
</Route>

// Protected page (requires auth):
<Route element={<PrivateRoute />}>
  <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
</Route>

// Standalone page (no layout):
<Route path={ROUTES.DEMO} element={<DemoPage />} />
```

**Registration in `src/styles/index.css`:**
```css
/* === Pages === */
@import '../pages/HomePage/home-page.css';
@import '../pages/FavoritesPage/favorites-page.css';  /* <-- new */
```

## Example: Page test

**`src/tests/pages/HomePage/HomePage.test.tsx`:**
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import type { DessertsState } from '@/store/desserts/interfaces/DessertsState';
import HomePage from '@/pages/HomePage';

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

describe('HomePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders page', () => {
    renderHomePage();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    renderHomePage();
    expect(screen.getByTestId('home-showcase-empty')).toBeInTheDocument();
  });
});
```

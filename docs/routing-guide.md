# Routing Guide

## Stack

- **React Router DOM 7** with `BrowserRouter`
- **Lazy-loaded** page components via `React.lazy` + `Suspense`
- **Route constants** in `src/constants/routes.ts`
- **SPA rewrites** handled by Vercel (`vercel.json`)

## Route Map

| Route | Page | Layout | Access |
|-------|------|--------|--------|
| `/` | HomePage | HomePageLayout | Public |
| `/constructor` | ConstructorPage | HomePageLayout | Protected |
| `/search` | SearchPage | HomePageLayout | Protected |
| `/my-recipes` | MyRecipesPage | HomePageLayout | Protected |
| `/recipe/:id` | RecipeDetailPage | HomePageLayout | Protected |
| `/profile` | ProfilePage | HomePageLayout | Protected |
| `/profile/edit` | ProfileEditPage | HomePageLayout | Protected |
| `/login` | LoginPage | None (standalone) | Public |
| `/demo` | DemoPage | None (standalone) | Public |
| `*` | NotFoundPage | None | Public |

## Route Constants

All paths are defined in `src/constants/routes.ts`:

```ts
export const ROUTES = {
  HOME: '/',
  CONSTRUCTOR: '/constructor',
  SEARCH: '/search',
  MY_RECIPES: '/my-recipes',
  RECIPE_DETAIL: '/recipe/:id',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  DEMO: '/demo',
  LOGIN: '/login',
} as const;

export const buildRecipeDetailPath = (id: string | number): string =>
  `/recipe/${id}`;
```

Always use `ROUTES.*` — never hardcode paths in components or `<Link>`.

For dynamic segments, use builder functions: `buildRecipeDetailPath(recipeId)`.

## Adding a New Route

### 1. Create the page

Follow [component-guide.md](component-guide.md) — pages live in `src/pages/`.

### 2. Add the route constant

`src/constants/routes.ts`:
```ts
export const ROUTES = {
  ...
  FAVORITES: '/favorites',
} as const;
```

### 3. Add lazy import in App.tsx

```tsx
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
```

### 4. Add the route

Inside `HomePageLayout` for standard pages:

```tsx
<Route path={ROUTES.HOME} element={<HomePageLayout />}>
  <Route index element={<HomePage />} />
  <Route element={<PrivateRoute />}>
    ...
    <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
  </Route>
</Route>
```

Outside for standalone pages (no layout):

```tsx
<Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
```

### 5. Update CLAUDE.md route table

Add the new route to the Routes table in CLAUDE.md.

## Protected vs Public Routes

### Public routes

Accessible to everyone — no wrapper needed:
- `/` (HomePage), `/login`, `/demo`, `*` (NotFoundPage)

### Protected routes

Wrapped in `<PrivateRoute />`. If not authenticated, redirects to `/login?redirect={currentPath}`:

```tsx
<Route element={<PrivateRoute />}>
  <Route path={ROUTES.CONSTRUCTOR} element={<ConstructorPage />} />
  <Route path={ROUTES.SEARCH} element={<SearchPage />} />
  ...
</Route>
```

`PrivateRoute` (`src/components/PrivateRoute/PrivateRoute.tsx`):
- Checks `isAuthenticated` from Redux auth state
- Not authenticated → `<Navigate to="/login?redirect=..." replace />`
- Authenticated → `<Outlet />` (renders child routes)

### Redirect after login

The login page reads `?redirect` from URL params:

```ts
const redirectTo = searchParams.get('redirect') || ROUTES.HOME;
```

After successful login, navigates to the original page. Uses `encodeURIComponent` for safe URL encoding.

## Layout Hierarchy

```
App.tsx
├── HomePageLayout              ← Provides: toolbar, f-container, Suspense, Toaster
│   ├── HomePage (index)
│   └── PrivateRoute
│       ├── ConstructorPage
│       ├── SearchPage
│       └── ...
├── LoginPage                   ← Standalone, no layout
├── DemoPage                    ← Standalone, no layout
└── NotFoundPage                ← Catch-all
```

`HomePageLayout` provides:
- **Toolbar** — `AuthStatus` + `LanguageSwitcher`
- **`.f-container`** — max-width 1440px with responsive padding
- **`Suspense`** — fallback `<Loader />` during lazy load
- **`Toaster`** — react-hot-toast notifications (top-right, 3s)

Pages inside `HomePageLayout` must NOT add their own `.f-container` — it's already there.

## Lazy Loading

All pages are lazy-loaded in `App.tsx`:

```tsx
const HomePage = lazy(() => import('@/pages/HomePage'));
const ConstructorPage = lazy(() => import('@/pages/ConstructorPage'));
```

`Suspense` in `HomePageLayout` shows `<Loader />` while chunks load. Vite splits each page into a separate chunk automatically.

## Navigation in Components

```tsx
import { Link } from 'react-router-dom';
import { ROUTES, buildRecipeDetailPath } from '@/constants/routes';

// Static link
<Link to={ROUTES.SEARCH}>Search</Link>

// Dynamic link
<Link to={buildRecipeDetailPath(recipe.id)}>View Recipe</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate(ROUTES.HOME);
navigate(ROUTES.HOME, { replace: true }); // replaces history entry
```

## Key Files

| File | Role |
|------|------|
| `src/App.tsx` | Route definitions |
| `src/constants/routes.ts` | Path constants + builders |
| `src/components/PrivateRoute/PrivateRoute.tsx` | Auth guard |
| `src/components/HomePageLayout/HomePageLayout.tsx` | Shared layout |
| `vercel.json` | SPA rewrites for production |

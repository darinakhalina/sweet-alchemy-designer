# State Management Guide

## When to use Redux vs local state

| Scenario | Use |
|----------|-----|
| Auth (user, token) | Redux — shared across app |
| Fetched data (desserts, recipes) | Redux — cached, shared between pages |
| Form input values | Local state or Formik |
| UI toggle (dropdown open, modal visible) | Local state — `useState` |
| Derived/computed values | Selectors or inline logic |

Rule of thumb: if two unrelated components need the same data, it belongs in Redux. If only one component cares, use local state.

## Folder Structure

```
src/store/
├── store.ts                    # configureStore + type exports
├── hooks.ts                    # useAppDispatch, useAppSelector
├── auth/
│   ├── authSlice.ts
│   └── interfaces/
│       ├── User.ts
│       └── AuthState.ts
└── desserts/
    ├── dessertsSlice.ts
    ├── dessertsThunks.ts
    ├── constants/
    │   └── mockDesserts.ts
    └── interfaces/
        ├── Dessert.ts
        └── DessertsState.ts
```

Each domain gets its own folder under `store/`. Inside:
- `*Slice.ts` — createSlice with reducers
- `*Thunks.ts` — createAsyncThunk (separate file to avoid circular imports)
- `interfaces/` — one file per interface
- `constants/` — mock data, default values

## Creating a New Slice

### 1. Define interfaces

`src/store/recipes/interfaces/Recipe.ts`
```ts
export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
}
```

`src/store/recipes/interfaces/RecipesState.ts`
```ts
import type { Recipe } from './Recipe';
import type { ApiError } from '@/services/interfaces/ApiError';

export interface RecipesState {
  items: Recipe[];
  isLoading: boolean;
  error: ApiError | null;
}
```

Always use `ApiError | null` for error fields — never `string | null`. See [error-handling.md](error-handling.md).

### 2. Create thunks

`src/store/recipes/recipesThunks.ts`
```ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalizeError } from '@/services/helpers/normalizeError';
import type { Recipe } from './interfaces/Recipe';
import type { ApiError } from '@/services/interfaces/ApiError';

export const fetchRecipes = createAsyncThunk<Recipe[], void, { rejectValue: ApiError }>(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      return await recipeService.fetchRecipes();
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);
```

Type the three generics: `<ReturnType, ArgType, { rejectValue: ApiError }>`. This gives you typed `action.payload` everywhere — no `as string` casts.

### 3. Create the slice

`src/store/recipes/recipesSlice.ts`
```ts
import { createSlice } from '@reduxjs/toolkit';
import type { RecipesState } from './interfaces/RecipesState';
import { fetchRecipes } from './recipesThunks';

const initialState: RecipesState = {
  items: [],
  isLoading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.error = action.payload ?? null;
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
```

Pattern for rejected: clear items + set error. On pending: clear error. On fulfilled: set items.

### 4. Register in the store

`src/store/store.ts`
```ts
import { recipesReducer } from '@/store/recipes/recipesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    desserts: dessertsReducer,
    recipes: recipesReducer,
  },
});
```

`RootState` and `AppDispatch` auto-update since they're inferred from `store`.

### 5. Use in a component

```tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRecipes } from '@/store/recipes/recipesThunks';
import { getErrorMessage } from '@/services/helpers/getErrorMessage';

const RecipesPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.recipes);

  const handleFetch = async () => {
    const result = await dispatch(fetchRecipes());
    if (fetchRecipes.rejected.match(result) && result.payload) {
      toast.error(getErrorMessage(result.payload, t));
    }
  };
};
```

## Typed Hooks

`src/store/hooks.ts` provides typed hooks via `.withTypes<>()`:

```ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

Always use `useAppDispatch` / `useAppSelector` — never raw `useDispatch` / `useSelector`.

## Sync vs Async Reducers

- **Sync reducers** (`reducers: {}` in createSlice) — for local state changes without API: `logout`, `clearItems`, `toggleFlag`
- **Async thunks** (`createAsyncThunk` + `extraReducers`) — for API calls: `fetchRecipes`, `createRecipe`, `deleteRecipe`

Keep thunks in a separate `*Thunks.ts` file. The slice only imports them in `extraReducers`.

## Testing

See [testing-guide.md](testing-guide.md) for slice and thunk testing patterns.

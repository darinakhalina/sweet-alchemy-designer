# Create Redux Slice

Create a new Redux slice with async thunks following the project conventions. The user provides the slice name and the entity it manages.

**Usage:** `/create-slice sliceName — what entity/data it manages`

## Steps

1. **Create the slice folder** at `src/store/$sliceName/`:

   - `interfaces/$EntityState.ts` — state interface
   - `interfaces/$Entity.ts` — entity interface
   - `${sliceName}Slice.ts` — createSlice with extraReducers
   - `${sliceName}Thunks.ts` — createAsyncThunk with error normalization
   - `constants/mock$Entities.ts` — mock data for tests (if applicable)

2. **Register the reducer** in `src/store/store.ts`:
   - Import the reducer
   - Add to `configureStore({ reducer: { ... } })`

3. **Create a test file** at `src/tests/store/$sliceName/${sliceName}Slice.test.ts`.

4. **Run typecheck** — `npm run typecheck` to verify.

## Conventions

- State interface always has: `items: Entity[]`, `isLoading: boolean`, `error: ApiError | null`
- Thunks use `createAsyncThunk` with typed generics: `<ReturnType, ArgType, { rejectValue: ApiError }>`
- Error handling: wrap in try/catch, use `normalizeError(error)` from `@/services/helpers/normalizeError`
- Import `ApiError` from `@/services/interfaces/ApiError`
- Export the reducer as named export: `export const ${sliceName}Reducer = ${sliceName}Slice.reducer;`
- Export actions if the slice has synchronous reducers

## Example: Entity interfaces

**`src/store/desserts/interfaces/Dessert.ts`:**
```ts
export interface Dessert {
  id: string;
  name: string;
  description: string;
  cookingTime: number;
}
```

**`src/store/desserts/interfaces/DessertsState.ts`:**
```ts
import type { Dessert } from './Dessert';
import type { ApiError } from '@/services/interfaces/ApiError';

export interface DessertsState {
  items: Dessert[];
  isLoading: boolean;
  error: ApiError | null;
}
```

## Example: Thunks

**`src/store/desserts/dessertsThunks.ts`:**
```ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDessertsFromApi } from '@/services/dessertService';
import { normalizeError } from '@/services/helpers/normalizeError';
import type { Dessert } from './interfaces/Dessert';
import type { ApiError } from '@/services/interfaces/ApiError';

export const fetchDesserts = createAsyncThunk<Dessert[], void, { rejectValue: ApiError }>(
  'desserts/fetchDesserts',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDessertsFromApi();
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);
```

## Example: Slice

**`src/store/desserts/dessertsSlice.ts`:**
```ts
import { createSlice } from '@reduxjs/toolkit';
import type { DessertsState } from './interfaces/DessertsState';
import { fetchDesserts } from './dessertsThunks';

const initialState: DessertsState = {
  items: [],
  isLoading: false,
  error: null,
};

const dessertsSlice = createSlice({
  name: 'desserts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesserts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDesserts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchDesserts.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.error = action.payload ?? null;
      });
  },
});

export const dessertsReducer = dessertsSlice.reducer;
```

## Example: Store registration

**`src/store/store.ts`:**
```ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import { dessertsReducer } from '@/store/desserts/dessertsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    desserts: dessertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Example: Slice test

**`src/tests/store/desserts/dessertsSlice.test.ts`:**
```ts
import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import { fetchDesserts } from '@/store/desserts/dessertsThunks';
import type { DessertsState } from '@/store/desserts/interfaces/DessertsState';
import type { ApiError } from '@/services/interfaces/ApiError';
import { mockDesserts } from '@/store/desserts/constants/mockDesserts';

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

  describe('fetchDesserts', () => {
    it('sets isLoading on pending', () => {
      const state = dessertsReducer(initialState, fetchDesserts.pending(''));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('sets items on fulfilled', () => {
      const state = dessertsReducer(
        { ...initialState, isLoading: true },
        fetchDesserts.fulfilled(mockDesserts, ''),
      );
      expect(state.isLoading).toBe(false);
      expect(state.items).toEqual(mockDesserts);
    });

    it('clears items and sets error on rejected', () => {
      const state = dessertsReducer(
        { ...initialState, isLoading: true },
        fetchDesserts.rejected(null, '', undefined, mockApiError),
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockApiError);
      expect(state.items).toEqual([]);
    });
  });
});
```

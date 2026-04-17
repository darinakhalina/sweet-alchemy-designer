# Error Handling Guide

## Backend Error Contract

Every API error response must follow this format:

```json
{
  "code": "dessertsFetchFailed",
  "message": "Failed to fetch desserts from database",
  "status": 500
}
```

| Field | Type | Purpose |
|-------|------|---------|
| `code` | `string` | Machine-readable error code (camelCase). Maps to i18n key on frontend |
| `message` | `string` | English debug message for logs. **Never shown to users** |
| `status` | `number` | HTTP status code |

Frontend interface: `src/services/interfaces/ApiError.ts`

## Error Code Map

All error codes live in `src/constants/errorCodes.ts`, organized by entity:

```ts
export const ERROR_CODES = {
  common: {
    unknown: 'unknown',
    networkError: 'networkError',
    serverError: 'serverError',
    timeout: 'timeout',
  },
  auth: {
    unauthorized: 'authUnauthorized',
    sessionExpired: 'authSessionExpired',
    invalidCredentials: 'authInvalidCredentials',
  },
  desserts: {
    fetchFailed: 'dessertsFetchFailed',
    notFound: 'dessertsNotFound',
  },
} as const;
```

### Adding a new entity

1. Add a new key to `ERROR_CODES` in `src/constants/errorCodes.ts`:
   ```ts
   users: {
     fetchFailed: 'usersFetchFailed',
     notFound: 'usersNotFound',
     updateFailed: 'usersUpdateFailed',
   },
   ```

2. Add i18n keys to `src/i18n/shared/en.json` and `uk.json`:
   ```json
   "errors": {
     "usersFetchFailed": "Failed to load user data. Please try again.",
     "usersNotFound": "User not found.",
     "usersUpdateFailed": "Failed to update profile. Please try again."
   }
   ```

3. Use the code in your thunk:
   ```ts
   import { ERROR_CODES } from '@/constants/errorCodes';

   return rejectWithValue({
     ...apiError,
     code: ERROR_CODES.users.fetchFailed,
   });
   ```

### Naming convention

Error codes use camelCase with entity prefix: `{entity}{Action}` — `dessertsFetchFailed`, `authSessionExpired`, `usersNotFound`.

Common errors have no prefix: `unknown`, `networkError`, `serverError`, `timeout`.

## Error Flow

### API errors (backend)

```
HTTP error
  → Axios interceptor (api.ts) catches it
  → normalizeError() converts to ApiError
  → interceptor rejects with ApiError (401 also triggers logout)
  → Thunk catches in try/catch
  → rejectWithValue(apiError) — typed, no `as string`
  → Slice stores ApiError in state
  → Component calls getErrorMessage(error, t) → localized text
  → toast.error(localizedText)
```

### UI-only errors (no HTTP involved)

For errors that happen purely on the frontend — no API call needed:

| Use case | Error code | When |
|----------|-----------|------|
| Form validation | Use `validation.*` i18n keys directly | Formik/manual validation |
| File too large | `uploadTooLarge` | Before upload starts |
| Wrong file type | `uploadInvalidType` | Before upload starts |
| Browser offline | `networkError` | `navigator.onLine === false` |
| Feature not supported | `notSupported` | Missing browser API |
| Storage full | `storageFull` | localStorage write fails |

For UI-only errors, you don't need `normalizeError`. Create the toast directly:

```tsx
// Simple — just use i18n key
toast.error(t('errors.uploadTooLarge'));

// With error code constant (preferred for consistency)
toast.error(t(`errors.${ERROR_CODES.common.networkError}`));

// With ApiError object (if you need to store in state)
const error: ApiError = {
  code: ERROR_CODES.upload.tooLarge,
  message: `File size ${size}MB exceeds 10MB limit`,
  status: 0,
};
dispatch(setError(error));
toast.error(getErrorMessage(error, t));
```

## Key Files

| File | Role |
|------|------|
| `src/services/interfaces/ApiError.ts` | Error interface: `{ code, message, status }` |
| `src/constants/errorCodes.ts` | Error code map by entity |
| `src/services/helpers/normalizeError.ts` | Converts any error (Axios, native) to `ApiError` |
| `src/services/helpers/getErrorMessage.ts` | `ApiError` + `t()` → localized user-facing string |
| `src/i18n/shared/en.json` / `uk.json` | Error translations under `errors.*` |
| `src/services/api.ts` | Axios interceptor — normalizes errors, handles 401 |

## Localization Strategy

1. `getErrorMessage(error, t)` tries `t('errors.{code}')`
2. If key exists in i18n — returns localized text
3. If key not found — returns `t('errors.unknown')` (generic fallback)
4. Backend `message` field is **never** shown to the user — it's for developer logs only

This means:
- Known errors get entity-specific localized text
- Unknown/unexpected errors get a safe generic message
- Users never see raw English backend messages

## Thunk Pattern

Always type `rejectValue` — no `as string` casts:

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiError } from '@/services/interfaces/ApiError';
import { normalizeError } from '@/services/helpers/normalizeError';

export const fetchDesserts = createAsyncThunk<
  Dessert[],          // return type
  void,               // argument type
  { rejectValue: ApiError }  // thunk config — types the payload
>(
  'desserts/fetchDesserts',
  async (_, { rejectWithValue }) => {
    try {
      return await dessertService.fetchDessertsFromApi();
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);
```

In the slice, `action.payload` is now typed as `ApiError`:

```ts
.addCase(fetchDesserts.rejected, (state, action) => {
  state.isLoading = false;
  state.items = [];
  state.error = action.payload ?? null;  // ApiError | null — no cast
})
```

In the component, use `getErrorMessage` for the toast:

```ts
const handleFetch = async () => {
  const result = await dispatch(fetchDesserts());
  if (fetchDesserts.rejected.match(result) && result.payload) {
    toast.error(getErrorMessage(result.payload, t));
  }
};
```

## Testing Errors

### Test getErrorMessage (unit)

```ts
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'errors.dessertsFetchFailed': 'Failed to load desserts.',
    'errors.unknown': 'Something went wrong.',
  };
  return translations[key] ?? key;
});

it('returns translated message for known code', () => {
  const error: ApiError = { code: 'dessertsFetchFailed', message: 'err', status: 500 };
  expect(getErrorMessage(error, mockT)).toBe('Failed to load desserts.');
});

it('falls back to unknown for unrecognized code', () => {
  const error: ApiError = { code: 'nope', message: 'err', status: 500 };
  expect(getErrorMessage(error, mockT)).toBe('Something went wrong.');
});
```

### Test toast in component (integration)

Mock `getErrorMessage` so the i18n mock doesn't interfere:

```ts
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

### Test slice rejected state

```ts
const mockApiError: ApiError = {
  code: 'dessertsFetchFailed',
  message: 'Server error',
  status: 500,
};

it('sets error on rejected', () => {
  const state = dessertsReducer(
    initialState,
    fetchDesserts.rejected(null, '', undefined, mockApiError),
  );
  expect(state.error).toEqual(mockApiError);
});
```

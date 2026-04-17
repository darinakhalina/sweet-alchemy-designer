# API Services Guide

## Axios Instance

`src/services/api.ts` — single configured Axios instance used by all services.

```ts
import { api } from '@/services/api';

const response = await api.get<Recipe[]>('/recipes');
```

### Configuration

| Setting | Value |
|---------|-------|
| Base URL | `VITE_API_BASE_URL` from `.env` |
| Timeout | 10 seconds |
| Content-Type | `application/json` |

### Request Interceptor

Automatically attaches `Authorization: Bearer {token}` from Redux auth state. No manual header management needed.

### Response Interceptor

1. Normalizes any HTTP error to `ApiError` via `normalizeError()`
2. On 401 — dispatches `logout()` (clears auth state)
3. Rejects with `ApiError` — thunks catch this typed object

The interceptor does **not** show toasts. Toast display is the component's responsibility — this keeps the interceptor pure and testable.

## Creating a Service

Services live in `src/services/`, one file per entity.

`src/services/recipeService.ts`
```ts
import { api } from '@/services/api';
import type { Recipe } from '@/store/recipes/interfaces/Recipe';

// TODO: replace stubs with real API calls

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const { data } = await api.get<Recipe[]>('/recipes');
  return data;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const { data } = await api.get<Recipe>(`/recipes/${id}`);
  return data;
};

export const createRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
  const { data } = await api.post<Recipe>('/recipes', recipe);
  return data;
};

export const deleteRecipe = async (id: string): Promise<void> => {
  await api.delete(`/recipes/${id}`);
};
```

### Rules

- One service file per entity: `dessertService.ts`, `recipeService.ts`, `userService.ts`
- Each function is a named export — no default export, no class
- Always type the response: `api.get<Recipe[]>(...)` — Axios infers `data` type
- Service functions return the data, not the Axios response: `return data` not `return response`
- Interfaces live in `src/store/{entity}/interfaces/`, not in the service file
- Add `// TODO:` comments on stub implementations

### Stub Pattern (before backend is ready)

```ts
import type { Recipe } from '@/store/recipes/interfaces/Recipe';
import { mockRecipes } from '@/store/recipes/constants/mockRecipes';

const STUB_DELAY = 1000;

// TODO: replace with api.get<Recipe[]>('/recipes')
export const fetchRecipes = (): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRecipes), STUB_DELAY);
  });
};
```

When backend is ready, replace with `api.get()` call — thunks and components don't change.

## Error Flow

```
Service call fails
  → Axios interceptor normalizes to ApiError
  → Thunk catches with try/catch
  → rejectWithValue(normalizeError(error))
  → Slice stores ApiError in state
  → Component shows toast via getErrorMessage()
```

See [error-handling.md](error-handling.md) for the full error handling guide.

## Environment Config

`src/config/env.ts` — typed accessor for environment variables:

```ts
import { env } from '@/config/env';

console.log(env.apiBaseUrl); // from VITE_API_BASE_URL
console.log(env.isDev);      // true in development
console.log(env.isProd);     // true in production
```

`.env` file at project root:
```
VITE_API_BASE_URL=https://api.sweetalchemy.com
```

Never access `import.meta.env` directly in components/services — use `env` from config.

## Key Files

| File | Role |
|------|------|
| `src/services/api.ts` | Axios instance + interceptors |
| `src/services/helpers/normalizeError.ts` | Any error → `ApiError` |
| `src/services/helpers/getErrorMessage.ts` | `ApiError` + `t()` → localized string |
| `src/services/interfaces/ApiError.ts` | Error interface |
| `src/config/env.ts` | Typed env variables |
| `src/services/{entity}Service.ts` | Entity-specific API functions |

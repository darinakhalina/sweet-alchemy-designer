# Backend vs Frontend vs Figma — Gap Analysis

**Backend repo:** dessert-designer-api (branch: db-structure)
**Frontend repo:** dessert-designer-website (branch: main)
**Date:** 2026-04-26

---

## Backend Tech Stack

- Express.js + TypeScript
- PostgreSQL 16 (Docker) + Drizzle ORM
- JWT auth (24h, bcrypt, server-side token storage)
- Zod validation, Swagger docs
- Cloudinary + Sharp (image upload/processing — configured, not wired)

---

## What Backend HAS (API Endpoints)

| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/auth/register` | POST | Working |
| `/api/auth/login` | POST | Working |
| `/api/auth/logout` | GET | Working |
| `/api/health/ping` | GET | Working |

**That's it.** Only auth + health check are implemented. All other domain logic has DB schema but **no endpoints**.

---

## What Backend HAS (DB Schema) but NO Endpoints

The database schema is rich and well-designed, but has zero CRUD routes:

| Table | Fields | Missing Endpoints |
|-------|--------|-------------------|
| **recipes** | id, name, recipe (JSONB), ownerId, recipeCategoryId | CRUD, search, filter by category |
| **recipeCategories** | id, name, parentCategoryId (hierarchical) | List, tree |
| **components** | id, name, component (JSONB), ownerId, componentCategoryId | CRUD, search |
| **componentCategories** | id, name, parentCategoryId | List, tree |
| **ingredients** | id, name, ingredientCategoryId | CRUD, search |
| **ingredientCategories** | id, name, parentCategoryId | List, tree |
| **ingredientPrices** | id, ownerId, ingredientId, price | CRUD per user |
| **recipeComponents** | recipeId, componentId (junction) | Managed via recipe CRUD |
| **componentIngredients** | componentId, ingredientId (junction) | Managed via component CRUD |
| **measureUnits** | id, name | List |
| **measureUnitMultiplicities** | sourceUnitId, targetUnitId, multiplier | List, convert |
| **currencies** | id, code, name | List |
| **shapeTypes** | id, name | List |
| **users** (profile) | firstname, middlename, surname, birthday, avatar | Get/Update profile |

---

## What Frontend NEEDS (from Figma)

### Auth (Figma screens: Registration modal, Login)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Register (name, email, password) | API ready | Stub — no thunk, sync actions only |
| Login (email, password) | API ready | Stub — no thunk |
| Logout | API ready | Sync `logout()` action, no API call |
| Toggle "Нова людина / Місцева" | N/A (UI only) | Not implemented |

### Profile (Figma: profile_tablet, profile_mobile)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Get current user | Schema exists, endpoint MISSING | `User` interface has id, email, name, avatar |
| Update profile (name, bio, email, password) | Schema has fields, endpoint MISSING | ProfileEditPage exists, no API |
| Upload avatar | Cloudinary configured, endpoint MISSING | Not implemented |
| "Про себе" (bio) field | **MISSING in DB** — no bio/about column | Shown in Figma edit profile |

### Constructor (Figma: Constructor-1_tablet, 10+ states)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Create recipe | DB schema ready, endpoint MISSING | ConstructorPage shell exists |
| Recipe categories (Торт, etc.) | `recipeCategories` table (hierarchical) | Not wired |
| Recipe subcategories (Бісквітний торт) | parentCategoryId hierarchy | Not wired |
| Shape types (Кругла, etc.) | `shapeTypes` table | Not wired |
| Components (Шоколадний бісквіт) | `components` table with JSONB | Not wired |
| Ingredients list | `ingredients` + `componentIngredients` | Not wired |
| Diameter, weight fields | Likely in recipe JSONB | Not wired |
| Cost calculation | `ingredientPrices` per user | Not wired |
| Multi-step form (6 steps) | N/A (frontend logic) | Not implemented |

### Search Recipes (Figma: search_recipe_dessert_tablet)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Search recipes by name | Endpoint MISSING | SearchPage shell exists |
| Filter by category (tabs ДЕСЕРТИ/КОМПОНЕНТИ) | Categories in DB | Not wired |
| Search components by name | Endpoint MISSING | Not wired |
| Recipe cards with images | Recipe JSONB may have image | Mock data only |

### My Recipes (Figma: my_recipes_tablet, my_recipes_mobile)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| List user's recipes | Endpoint MISSING (needs ownerId filter) | MyRecipesPage shell exists |
| List user's components | Endpoint MISSING | Not wired |
| Search within own recipes | Endpoint MISSING | Not wired |
| Pagination | Not implemented | Pagination component exists |

### Recipe Detail (Figma: dessert_recipe_mobile/tablet)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Get recipe by ID | Endpoint MISSING | RecipeDetailPage shell exists |
| Display all recipe fields | JSONB in DB | `Dessert` interface is minimal stub |
| Ingredient breakdown | Via relations (recipe→components→ingredients) | Not wired |
| Cost display | Via ingredientPrices | Not wired |

### About Product (Figma: about_product_tablet/mobile)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Static page | N/A (no backend needed) | **Page not created** |

### Packaging (Figma: my_packaging_mobile)

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Packaging data | **MISSING in DB** — no packaging table | **Page not created** |

### Footer

| Need | Backend Status | Frontend Status |
|------|---------------|-----------------|
| Footer component | N/A | **Not created** |

---

## What's MISSING in Backend

### Endpoints needed (priority order):

**P0 — Blocking frontend development:**
1. `GET /api/users/current` — get current user profile
2. `PATCH /api/users/current` — update profile (name, email, password, avatar)
3. `GET /api/recipes` — list recipes (with search, pagination, category filter)
4. `GET /api/recipes/:id` — get recipe detail
5. `POST /api/recipes` — create recipe
6. `PATCH /api/recipes/:id` — update recipe
7. `DELETE /api/recipes/:id` — delete recipe
8. `GET /api/recipe-categories` — list categories (tree)
9. `GET /api/components` — list components (with search, pagination)
10. `GET /api/components/:id` — get component detail
11. `POST /api/components` — create component
12. `GET /api/component-categories` — list categories (tree)
13. `GET /api/ingredients` — list ingredients (with search)
14. `GET /api/ingredient-categories` — list categories
15. `GET /api/shape-types` — list shape types
16. `GET /api/measure-units` — list units + conversions

**P1 — Needed for full flow:**
17. `POST /api/ingredient-prices` — set ingredient price
18. `GET /api/ingredient-prices` — get user's prices
19. `GET /api/currencies` — list currencies

**P2 — Nice to have:**
20. `PATCH /api/users/avatar` — upload avatar (Cloudinary ready)
21. Recipe duplication / fork endpoint
22. Batch ingredient price update

### DB Schema gaps:

| Missing | Figma shows | Recommendation |
|---------|-------------|----------------|
| `bio` / `about` field on users | "Про себе" textarea on edit profile | Add `about TEXT` column to users |
| Packaging table | "Пакування" section in constructor + profile | New `packaging` table (id, name, ownerId, data JSONB) |
| Recipe image field | Recipe cards have photos | Add to recipe JSONB or separate `imageUrl` column |
| Component image field | Component cards have photos | Same as above |

---

## What's EXTRA / Unused in Backend

| Item | Status | Recommendation |
|------|--------|----------------|
| `verify` + `verificationToken` on users | Email verification not in Figma design | Keep for future, low priority |
| `roles` + `rights` tables | RBAC system (admin/user/premium) | Keep — needed for premium features |
| `followers`/`subscribe` in controllers | Social features not in Figma | Remove stubs or defer — not in current scope |
| `gravatar` dependency | Auto-avatar generation | Keep — good fallback for users without uploaded avatar |
| `multer` + `sharp` + `cloudinary` | File upload chain | Keep — needed for avatar/recipe images |
| `joi` dependency | Zod is primary validator | **Remove** — redundant, only Zod is used |
| `currencies` table | Not in any Figma screen | Keep in DB, low priority for endpoints |

---

## What's MISALIGNED between Frontend and Backend

### Frontend `Dessert` interface vs Backend `recipes` table:

**Current frontend:**
```typescript
interface Dessert {
  id: string;          // Backend: bigserial (number)
  name: string;
  description: string; // Backend: doesn't have this — recipe data is in JSONB
  cookingTime: number; // Backend: doesn't have this — might be in JSONB
}
```

**Backend provides:**
```
id: bigserial (number, not string)
name: varchar
recipe: JSONB (flexible structure — shape, diameter, weight, cost, etc.)
ownerId: FK to users
recipeCategoryId: FK to recipeCategories
```

**Action needed:** Redesign frontend `Dessert` interface to match backend reality. The JSONB `recipe` field likely contains shape, diameter, weight, cost, ingredients, and other structured data.

### Frontend `User` interface vs Backend `users` table:

**Current frontend:**
```typescript
interface User {
  id: string;    // Backend: serial (number)
  email: string;
  name: string;
  avatar?: string;
}
```

**Backend provides additionally:**
```
firstname, middlename, surname, birthday, verify, verificationToken
```

**Action needed:** Expand `User` interface to include backend fields + add `about` field to both backend and frontend.

### Auth flow:

**Current frontend:** Sync Redux actions (`setCredentials`, `logout`), no API calls.
**Backend ready:** Full JWT auth with register/login/logout endpoints.
**Action needed:** Create async thunks for register, login, logout, fetchCurrentUser.

---

## Recommended Implementation Order

### Phase 1 — Connect Auth (backend ready, frontend needs thunks)
1. Create `authThunks.ts` — register, login, logout, fetchCurrentUser
2. Wire LoginPage form to real API
3. Store token in localStorage, restore on app init
4. Update `User` interface to match backend

### Phase 2 — Backend CRUD Endpoints
5. Recipes CRUD + search/filter/pagination
6. Components CRUD + search
7. Ingredients list + categories
8. Recipe/Component categories (tree)
9. Shape types, measure units
10. User profile get/update
11. Add `about` column to users table

### Phase 3 — Frontend Integration
12. Redesign `Dessert` → `Recipe` interface matching JSONB structure
13. Create recipe/component/ingredient services + thunks
14. Wire Constructor page to real multi-step API flow
15. Wire Search page to recipe search endpoint
16. Wire MyRecipes page to filtered list
17. Wire RecipeDetail page to single recipe endpoint
18. Wire Profile pages to user endpoints

### Phase 4 — Missing Features
19. Image upload for recipes/avatar (Cloudinary already configured)
20. Packaging table + endpoints + UI
21. About Product static page
22. Footer component
23. Ingredient price management

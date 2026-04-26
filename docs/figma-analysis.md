# Figma Design Analysis & Implementation Plan

**Figma file:** sweetalchemy ux (Copy)
**Date:** 2026-04-26

---

## Design System (Figma Styles)

### Typography

| Style | Size/Line-height | Usage |
|-------|-----------------|-------|
| h1 | 64/100 | Page titles (desktop) |
| h1_accentP | 64/110 | Accent titles, pink (desktop) |
| h1_mobile | 36/100 | Page titles (mobile) |
| h1_accentP-mobile | 36/110 | Accent titles, pink (mobile) |
| h2 | 28/110 (desktop), 24/110 (mobile) | Section headings |
| text | 20/150 | Body text |
| text (sm variant) | 16/150 | Secondary body text |
| text-bold | 20/150, 16/150 | Bold body text |
| text-sm | 16/150 (desktop), 14/150 (mobile) | Small text |
| text-sm-bold | 16/150, 14/150 | Small bold text |

### Color Styles

| Token | Role |
|-------|------|
| brand-800 | Dark brand (headings on dark bg?) |
| brand-600 | Primary brand pink/magenta (titles, CTAs, accents) |
| neutral-400 | Borders, secondary text |
| neutral-200 | Light borders, dividers |
| neutral-100 | Light backgrounds, cards |
| neutral-50 | Background tint |

### Visual Identity

- **Logo:** Pink unicorn/candy icon
- **Accent:** Pink/magenta (brand-600) used for titles, active nav items, image frames, primary CTAs
- **Image frames:** Tilted pink rectangle behind images (distinctive brand element)
- **Font style:** Italic bold for h1 headings, uppercase

---

## Screens Inventory

### Breakpoints in Figma

| Breakpoint | Width | Frames |
|------------|-------|--------|
| Mobile | 393px | `*_mobile` frames |
| Tablet | 768px | `*_tablet` frames |
| Desktop | ~1200px+ | Implied from home page layout |

### 1. Home Page (Landing)

**Frames:** `home_page_tablet`, `home_page_mobile`
**Route:** `/`
**Status:** Exists in code (HomePage)

**Layout:**
- **Header (unauthorized):** Logo | Конструктор | Пошук рецептів | [Увійти] button
- **Header (authorized):** Logo | Конструктор | Пошук рецептів | Мої рецепти | [Avatar]
- **Hero section:**
  - Title: "ВИМИКАЙ КАЛЬКУЛЯТОР" (black) + "ВМИКАЙ НАТХНЕННЯ" (brand-600 pink)
  - Description: "Адаптуй будь-який рецепт під нову форму за 3 секунди..."
  - CTA: "Спробувати безкоштовно" (filled black) + "Детальніше про продукт" (outlined)
  - Hero image: cake photo with tilted pink frame
- **Features section:** 3 icons (visible below hero in tablet)
- **Mobile:** Hamburger menu instead of nav links

### 2. About Product Page

**Frames:** `about_product_tablet`, `about_product_mobile`
**Route:** Linked from home page "Детальніше про продукт"
**Status:** Not yet implemented as separate page

**Layout:**
- Hero: "ТВІЙ ЦИФРОВИЙ ПОМІЧНИК НА КУХНІ, ЯКИЙ БЕРЕ НА СЕБЕ НАЙНУДНІЩУ РОБОТУ"
- Description about recalculating recipe proportions
- CTA: "Спробувати безкоштовно"
- Section: "ЯК ЦЕ ПРАЦЮЄ?" (How it works)

### 3. Registration / Login

**Frames:** `modal_registration_tablet`
**Route:** `/login`
**Status:** Exists in code (LoginPage)

**Layout:**
- Toggle: "Нова людина" / "Місцева" (Register / Login switch)
- Title: "РЕЄСТРАЦІЯ" (pink accent)
- Description: "Зареєструйся, щоб зберігати свої рецепти та користуватись калькулятором перерахунку інгредієнтів."
- Fields: Ім'я, Електронна пошта, Пароль
- **Mobile:** Standalone page with logo + hamburger
- **Tablet:** Modal over page content

### 4. Constructor Page

**Frames:** `Constructor-1_tablet` (10+ variants), `Constuctor-2..13`
**Route:** `/constructor`
**Status:** Exists in code (ConstructorPage)

**Layout:**
- Title: "КОНСТРУКТОР ДЕСЕРТУ" (pink)
- Left sidebar — step navigation (vertical):
  1. ПРО ДЕСЕРТ (About dessert)
  2. ОСНОВА (Base)
  3. НАЧИНКИ (Fillings)
  4. ДОДАТИ (Add) — with "+" icon
  5. ПАКУВАННЯ (Packaging)
  6. РОЗРАХУНКИ (Calculations)
- Right panel — form for current step:
  - "Ягідний Бум" (dessert name)
  - Категорія десерту (Торт)
  - Підкатегорія десерту (Бісквітний торт)
  - Форма (Кругла) — dropdown
  - Діаметр (22)
  - Склад десерту: ingredient list
  - Інгредієнти button
- **Multiple states:** Different constructor steps shown in 10+ frames
- **Mobile:** Vertical layout, steps as collapsible sections

### 5. Search Recipes Page

**Frames:** `search_recipe_dessert_tablet`
**Route:** `/search`
**Status:** Exists in code (SearchPage)

**Layout:**
- Title: "ПОШУК РЕЦЕПТІВ" (pink)
- Tab bar: ДЕСЕРТИ (active, pink filled) | КОМПОНЕНТИ (outlined)
- Search input with query "торт" + search icon + filter icon
- Recipe cards grid: images with pink tilted frames
- Cards show dessert photos (cheesecake, cream cake, etc.)

### 6. My Recipes Page

**Frames:** `my_recipes_tablet`, `my_recipes_mobile`
**Route:** `/my-recipes`
**Status:** Exists in code (MyRecipesPage)

**Layout:**
- Title: "МОЇ РЕЦЕПТИ" (pink)
- Same tab/search pattern as Search page (ДЕСЕРТИ / КОМПОНЕНТИ)
- Recipe cards grid with user's own recipes
- **Identical structure to Search page** but filtered to user's recipes

### 7. Recipe Detail Page

**Frames:** `dessert_recipe_mobile` (393x5621), `dessert_recipe_tablet`, `component_recipe_tablet`
**Route:** `/recipe/:id`
**Status:** Exists in code (RecipeDetailPage)

**Layout (mobile, scrollable):**
- Title: "ЯГІДНИЙ БУМ" (pink)
- Fields (read-only with rounded inputs):
  - Форма: кругла
  - Діаметр: 22
  - Категорія десерту: Торт
  - Підкатегорія десерту: Бісквітний торт
  - Орієнтовна вага: 3 кг
  - Собівартість: 1700 грн
- Component/ingredient breakdown sections (very long page — 5621px)

### 8. Profile Page

**Frames:** `profile_tablet`, `profile_mobile` (7 variants)
**Route:** `/profile`
**Status:** Exists in code (ProfilePage)

**Layout:**
- Title: "МІЙ ПРОФІЛЬ" (pink)
- Avatar area (placeholder icon with pink tilted frame)
- User name: "Оксана" (pink bold)
- Navigation buttons (rounded pills with icons):
  - Десерти
  - Компоненти
  - Пакування
  - Інгредієнти
- Actions: "Редагувати профіль" button, "Вийти" button
- **7 mobile variants** — likely different states (empty, with data, editing, etc.)

### 9. Edit Profile Page

**Frames:** `edit_profile_tablet` (2 variants)
**Route:** `/profile/edit`
**Status:** Exists in code (ProfileEditPage)

**Layout:**
- Title: "РЕДАГУВАТИ ПРОФІЛЬ" (pink)
- Fields:
  - Ім'я (Оксана)
  - Про себе — textarea (bio text)
  - Електронна пошта (baker@gmail.com)
  - Новий пароль
- **Mobile:** hamburger menu, single column

### 10. Packaging Page

**Frames:** `my_packaging_mobile`
**Status:** Not yet implemented

**Notes:** Likely accessed from Profile > Пакування. Shows user's packaging options.

### 11. Filter Component

**Frames:** `filter_component_tablet`
**Status:** Component for Search/MyRecipes pages

### 12. Dropdown Components

**Frames:** `Drop down_category` (8 variants)
**Status:** Various dropdown states for the Constructor form

### 13. Footer

**Frames:** `footer`
**Status:** Not yet implemented as component

---

## Implementation Gap Analysis

### Already Implemented (in code)

| Screen | Route | Notes |
|--------|-------|-------|
| HomePage | `/` | Basic structure exists |
| LoginPage | `/login` | Standalone layout |
| ConstructorPage | `/constructor` | Basic structure |
| SearchPage | `/search` | Basic structure |
| MyRecipesPage | `/my-recipes` | Basic structure |
| RecipeDetailPage | `/recipe/:id` | Basic structure |
| ProfilePage | `/profile` | Basic structure |
| ProfileEditPage | `/profile/edit` | Basic structure |

### Not Yet Implemented

| Screen/Feature | Priority | Notes |
|----------------|----------|-------|
| About Product page | Medium | Linked from home CTA "Детальніше про продукт" |
| My Packaging page | Low | Accessed from Profile |
| Footer component | Medium | Designed in Figma, not in code |
| Ingredient detail views | Medium | Part of recipe/constructor flow |

### UI Refinements Needed (Figma vs Code)

| Area | What to check/align |
|------|---------------------|
| Header | Auth vs unauth states, active nav styling (pink underline) |
| Image frames | Pink tilted rectangle behind images — distinctive brand element |
| Typography | Italic bold h1 in pink — verify CSS matches Figma styles |
| Cards | Recipe card component with pink frame treatment |
| Constructor sidebar | Step navigation with icons, active state |
| Constructor multi-step | 10+ Figma states — verify all steps work |
| Profile nav buttons | Rounded pill buttons with icons (Десерти, Компоненти, Пакування, Інгредієнти) |
| Registration toggle | "Нова людина / Місцева" switch component |
| Dropdown states | 8 dropdown variants designed — verify component covers all |
| Tabs component | ДЕСЕРТИ / КОМПОНЕНТИ tabs on Search + MyRecipes |
| Search bar | Input + search icon + filter icon layout |
| Mobile hamburger menu | Mobile navigation pattern |

---

## Suggested Implementation Order

### Phase 1 — Core UI Polish
1. Verify Header component matches Figma (auth/unauth, active nav pink underline)
2. Implement pink tilted image frame treatment (reusable component)
3. Align typography (italic bold h1, brand-600 color)
4. Recipe card component matching Figma design

### Phase 2 — Page Refinements
5. Constructor page — full multi-step flow with sidebar navigation
6. Search/MyRecipes — tabs (ДЕСЕРТИ/КОМПОНЕНТИ), search bar with filter
7. Profile — pill navigation buttons, avatar with pink frame
8. Edit Profile — textarea for bio, all fields

### Phase 3 — New Pages & Components
9. About Product page (new route)
10. Footer component
11. My Packaging page
12. Registration modal (tablet) vs standalone page (mobile)

### Phase 4 — Responsive Polish
13. Mobile layouts for all pages (hamburger menu, stacked layouts)
14. Tablet layouts (768px breakpoint refinements)
15. Desktop layouts (1200px+)

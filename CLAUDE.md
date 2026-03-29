# SweetAlchemy Designer

Dessert recipe constructor — calculate weight, cost, and ingredients for any shape. React SPA deployed on Vercel.

## Commands

```bash
npm run dev          # Dev server at http://localhost:5173
npm run build        # TypeScript check + production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint + auto-fix
npm run typecheck    # TypeScript only
```

## Tech Stack

- React 19, TypeScript 5, Vite 7
- React Router DOM 7 (BrowserRouter)
- i18next (UK / EN), Formik, clsx
- ESLint 10 + @stylistic (no Prettier)
- Husky + lint-staged (pre-commit)
- PostCSS: postcss-custom-media (breakpoint tokens)
- Deploy: Vercel (`vercel.json` handles SPA rewrites)

## Architecture

- `src/components/` — shared components (Button, Modal, Select, etc.)
- `src/pages/` — page components
- `src/hooks/` — custom React hooks
- `src/i18n/` — i18next config, auto-collects all `**/i18n/*.json`
- `src/styles/` — design tokens + global styles

### Layout Hierarchy

`App.tsx` defines routes. Pages inside `HomePageLayout` get: LanguageSwitcher, Toaster, and `.f-container` (max-width: 1440px with responsive padding). Pages use `.row` > `.col-*` for grid layout. Don't add `.f-container` inside pages — it's already in the layout.

`DemoPage` (`/demo`) and `NotFoundPage` live outside `HomePageLayout` and manage their own layout.

## CSS Rules

1. **BEM only** — no CSS Modules. Classes: `.block`, `.block__element`, `.block--modifier`
2. **No CSS imports in components** — all CSS collected in `src/styles/index.css` via `@import`
3. **Use design tokens** — prefer `var(--space-4)`, `var(--radius-md)`, `var(--color-text)` over raw values. If a component needs a custom value that doesn't fit existing tokens, create a CSS custom property scoped to that component (e.g. `--card-image-height: 200px`) at the top of its CSS block, rather than scattering magic numbers
4. **Localized text via i18next** — visible UI text uses `t('key')`. Exception: data from backend/API can be rendered directly
5. **Breakpoints via @custom-media** (processed by postcss-custom-media):
   ```css
   @media (--mobile) { }      /* max-width: 767px */
   @media (--tablet) { }      /* 768px — 1199px */
   @media (--desktop) { }     /* min-width: 1200px */
   @media (--not-mobile) { }  /* min-width: 768px */
   @media (--not-desktop) { } /* max-width: 1199px */
   ```
   Never hardcode breakpoint pixels — always use these tokens.

## Creating Components

See [docs/component-guide.md](docs/component-guide.md) for the full step-by-step guide, folder structure, and examples.

When creating a new component, don't forget to add its CSS import to `src/styles/index.css`.

## Design Tokens (`src/styles/`)

| File | Tokens |
|------|--------|
| `breakpoints.css` | `--mobile`, `--tablet`, `--desktop`, `--not-mobile`, `--not-desktop` |
| `colors.css` | `--brand-600`, `--neutral-*`, `--color-text`, `--color-bg`, `--font-weight-*`, `--line-height-*`, `--disabled-opacity`, etc. |
| `spacing.css` | `--space-1` (4px) ... `--space-20` (80px) |
| `radius.css` | `--radius-xs` (4px) ... `--radius-full` (50%), `--radius-pill` (50px) |
| `transitions.css` | `--transition-fast/normal/slow` |
| `shadows.css` | `--shadow-sm`, `--shadow-md` |
| `z-index.css` | `--z-dropdown`, `--z-modal-overlay`, `--z-modal` |

## Grid System (Bootstrap-style)

12-column flex grid with 24px gutter. Responsive prefixes: default (mobile-first), `md` (768px+), `lg` (1200px+).

```html
<div class="row row--gap-md">
  <div class="col-12 col-md-6 col-lg-4">card</div>
</div>
```

Row modifiers: `--no-gutters`, `--center`, `--between`, `--align-center`, `--gap-sm/md/lg`.
Offsets: `.offset-1` ... `.offset-6`, `.offset-md-*`, `.offset-lg-*`.

## Utility Classes

- **Spacing**: `.mt-4`, `.mb-6`, `.p-4`, `.px-4`, `.py-4`, `.mx-auto`
- **Display**: `.d-none`, `.d-flex`, `.d-block`, `.d-md-flex`, `.d-lg-none`
- **Flex**: `.flex-row`, `.flex-column`, `.justify-center`, `.align-center`, `.gap-4`
- **Text**: `.text-center`, `.text-truncate`, `.text-uppercase`
- **Visibility**: `.hidden-mobile`, `.hidden-tablet`, `.hidden-desktop`, `.visible-*`
- **Size**: `.w-100`, `.h-100`

## Routes

| Route | Page | Layout |
|-------|------|--------|
| `/` | HomePage | HomePageLayout |
| `/constructor` | ConstructorPage | HomePageLayout |
| `/search` | SearchPage | HomePageLayout |
| `/my-recipes` | MyRecipesPage | HomePageLayout |
| `/recipe/:id` | RecipeDetailPage | HomePageLayout |
| `/profile` | ProfilePage | HomePageLayout |
| `/profile/edit` | ProfileEditPage | HomePageLayout |
| `/demo` | DemoPage | None (standalone) |
| `*` | NotFoundPage | None |

## What NOT to do

- **No CSS Modules** (`.module.css`) — only BEM with global CSS collected in `styles/index.css`
- **No magic pixels** — use spacing/radius/shadow tokens. If no token fits, create a scoped CSS variable in the component, not a bare `12px`
- **No hardcoded media queries** — use `@media (--mobile)` etc., never `@media (max-width: 767px)`
- **No hardcoded UI text** — use `t('key')`. Backend data is the exception
- **No relative imports** — use `@/components/...`, `@/hooks/...`, never `../../`
- **No interfaces in component files** — each interface gets its own file in `interfaces/`
- **No constants in component files** — extract maps, arrays, configs to `constants/` folder (one file per constant)
- **No hardcoded font-weight numbers** — use `var(--font-weight-regular/medium/bold/extrabold)` (`@font-face` is the only exception)
- **No hardcoded line-height for standard values** — use `var(--line-height-none)` (1), `var(--line-height-tight)` (1.2), `var(--line-height-normal)` (1.5)
- **No CSS imports in components** — only add `@import` lines in `styles/index.css`
- **No `f-container` in pages** — it's already in `HomePageLayout`
- **No inline styles for things tokens cover** — if you reach for `style={{ marginTop: 16 }}`, use `.mt-4` instead
- **No new CSS files without registering them** — every `.css` file must be imported in `styles/index.css`

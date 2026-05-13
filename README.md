# SweetAlchemy

Sweet Alchemy instantly adapts the recipe to any shape or weight. This is the magic of precision—no formulas, no mistakes.

## Requirements

- **Node.js** >= 18
- **npm** >= 9

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url>
cd dessert-designer-website

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Dev server runs at `http://localhost:5173`

The project uses **BrowserRouter** with clean URLs (e.g. `http://localhost:5173/constructor`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Type check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (check only) |
| `npm run lint:fix` | Run ESLint + auto-fix + formatting |
| `npm run typecheck` | Run TypeScript type check only |
| `npm test` | Vitest watch mode |
| `npm run test:run` | Vitest single run |
| `npm run storybook` | Start Storybook on `http://localhost:6006` |
| `npm run build-storybook` | Build static Storybook to `storybook-static/` |
| `npm run prepare` | Install husky pre-commit hook (runs automatically on `npm install`) |
| `npx vitest run --project storybook` | Run Storybook interaction + a11y tests (Playwright) |

## Tech Stack

- **React 19** + **TypeScript 5**
- **Vite 7** — build tool
- **React Router DOM 7** — routing (BrowserRouter)
- **Redux Toolkit** + **react-redux** — state management
- **Axios** — HTTP client
- **i18next** — localization (UK / EN), auto-collected from component folders
- **Formik** — forms
- **react-hot-toast** — toast notifications
- **react-modal** — modals
- **clsx** — conditional classNames
- **ESLint 10** + **@stylistic** — linting + formatting (no Prettier needed)
- **Husky** + **lint-staged** — pre-commit hooks (auto lint on commit)
- **PostCSS custom-media** — breakpoint tokens
- **Vitest** + **@testing-library/react** — unit & component testing
- **Storybook 10** + **@storybook/addon-vitest** — component showcase with interaction + a11y tests (Playwright in headless Chromium)
- **BEM** — CSS methodology, global collector in `styles/index.css`

## Deploy

This repo deploys to **Vercel** (zero-config SPA hosting).

- **Config:** `vercel.json` at repo root (SPA rewrites: all paths → `/index.html`)
- **App URL:** _add your Vercel URL here_
- **Storybook URL:** https://sweet-alchemy-designer-storybook-vo.vercel.app/ (separate Vercel project, build command `npm run build-storybook`, output `storybook-static`)
- **Deploy:** automatic on push to `main` via Vercel GitHub integration. Pull requests get preview URLs.

## Project Structure

```
src/
├── components/          <- shared components
│   └── Button/
│       ├── Button.tsx   <- component (TypeScript)
│       ├── button.css   <- styles (BEM, kebab-case)
│       ├── index.ts     <- barrel export
│       ├── interfaces/  <- interfaces (one file per interface)
│       │   └── ButtonProps.ts
│       └── i18n/        <- translations (if has text)
│           ├── uk.json
│           └── en.json
├── pages/               <- page components (same structure)
├── tests/               <- unit tests (mirrors src/ structure)
│   ├── setup.ts         <- global setup (jest-dom + i18n mock)
│   └── components/      <- component tests
│       └── Button/
│           └── Button.test.tsx
├── hooks/               <- custom React hooks
├── constants/           <- app-wide constants (one file per constant)
├── config/              <- typed environment variables
├── services/            <- API client (Axios), service functions, error helpers
├── store/               <- Redux Toolkit (slices, thunks, typed hooks)
├── i18n/                <- i18next config + shared translations
│   ├── index.ts         <- auto-collects all **/i18n/*.json via import.meta.glob
│   └── shared/          <- app-wide translations (header, footer, common, errors)
├── styles/              <- design tokens & global styles
│   ├── index.css        <- CSS collector (@import all tokens + components + pages)
│   ├── colors.css       <- palette, semantic colors, overlays, font stacks
│   ├── spacing.css      <- spacing scale (4px step): --space-1 ... --space-20
│   ├── radius.css       <- border-radius tokens: --radius-xs ... --radius-full
│   ├── transitions.css  <- duration + easing: --transition-fast/normal/slow
│   ├── shadows.css      <- box-shadow tokens: --shadow-sm, --shadow-md
│   ├── z-index.css      <- z-index scale: --z-dropdown, --z-modal
│   ├── fonts.css        <- @font-face declarations
│   ├── typography.css   <- typography classes (.h1, .text, .text-sm, etc.)
│   ├── layout.css       <- container, grid
│   └── base.css         <- resets
├── App.tsx              <- routing
└── main.tsx             <- entry point
```

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/constructor` | Dessert Constructor |
| `/search` | Search Recipes |
| `/my-recipes` | My Recipes |
| `/recipe/:id` | Recipe Detail |
| `/profile` | Profile |
| `/profile/edit` | Edit Profile |
| `/login` | Login |
| `*` | 404 Not Found |

## Testing

**Vitest** — native Vite test runner with the same API as Jest (`describe`, `it`, `expect`, `vi.mock`, `vi.fn`).

Tests live in `src/tests/` mirroring the source structure. Test files are excluded from `tsc` build — Vitest handles them separately.

What Vitest covers:
- **Components** — `@testing-library/react` (render, screen, fireEvent)
- **Redux store/slices** — direct dispatch + state assertions
- **Services** — stub services with mock data (to be replaced with real API)
- **Services/utils** — plain unit tests
- **Custom hooks** — `renderHook` from `@testing-library/react`

Global setup (`src/tests/setup.ts`) provides jest-dom matchers and mocks `react-i18next`.

## Storybook

Live Storybook: **https://sweet-alchemy-designer-storybook-vo.vercel.app/**

Storybook is set up for component documentation and interactive testing. Full guide: **[`docs/storybook-component-guide.md`](docs/storybook-component-guide.md)** (local-only, gitignored).

Short version of the folder structure:

```
src/components/<Name>/
├── <Name>.stories.tsx           # demo stories (one variant per story)
├── <Name>.mdx                   # docs page (MDX with Source + Controls)
└── tests/
    └── <Name>.tests.stories.tsx # interaction + a11y tests with play()
```

`src/components/Button/` is the working example — copy that structure.

**What you get for free:**
- Auto-generated props table from TypeScript types + JSDoc
- Copyable code snippets for every story
- A11y (axe-core) runs on every story automatically — fails on violations
- Interaction tests in real browser (Playwright) via `@storybook/addon-vitest`
- ESLint plugin enforces CSF conventions (PascalCase, default exports, awaited interactions)

**Rule:** all component examples and design-token showcases live **only** in Storybook (`src/components/<Name>/` for components and `src/patterns/` for design tokens / integration patterns).

## Design Tokens

All visual values are defined as CSS custom properties in `src/styles/`:

| Token | Example | File |
|-------|---------|------|
| `--space-{n}` | `--space-4` = 16px | `spacing.css` |
| `--radius-{size}` | `--radius-md` = 16px | `radius.css` |
| `--color-{name}` | `--color-text`, `--color-border` | `colors.css` |
| `--transition-{speed}` | `--transition-normal` = 200ms ease | `transitions.css` |
| `--shadow-{size}` | `--shadow-md` | `shadows.css` |
| `--z-{name}` | `--z-modal` = 1001 | `z-index.css` |
| `--font-{name}` | `--font-primary` = Rubik | `colors.css` |
| `--font-weight-{name}` | `--font-weight-medium` = 500 | `colors.css` |
| `--line-height-{name}` | `--line-height-normal` = 1.5 | `colors.css` |
| `--disabled-opacity` | 0.3 | `colors.css` |

## Key Conventions

- **No CSS Modules** — all styles use BEM, collected into `styles/index.css`. No CSS imports in components.
- **No hardcoded values** — use design tokens (`var(--space-4)`, `var(--radius-md)`, etc.) instead of raw pixels.
- **No hardcoded text** — all visible text uses `t('key')` from i18next.
- **Path aliases** — use `@/` instead of relative paths (`import Button from '@/components/Button'`).
- **Barrel exports** — every component folder has `index.ts` for clean imports.
- **Interfaces** — each interface in its own file inside `interfaces/` folder within the component.
- **Constants** — each constant in its own file. Component-specific in `ComponentName/constants/`, app-wide in `src/constants/`.
- **Translations** — each component owns its translations in `i18n/` subfolder, auto-collected at build time.
- **Tests** — every component has a test file in `src/tests/components/`. Use Vitest + @testing-library/react.

## Localization

The app supports Ukrainian (UK) and English (EN). Translations are split across component folders and merged automatically via `import.meta.glob` in `src/i18n/index.ts`.

To add translations for a new component:
1. Create `ComponentName/i18n/uk.json` and `en.json`
2. That's it — the config picks them up automatically

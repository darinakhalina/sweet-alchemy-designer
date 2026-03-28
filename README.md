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

Since the project uses **HashRouter**, all routes are prefixed with `#` (e.g. `http://localhost:5173/#/constructor`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Type check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (check only) |
| `npm run lint:fix` | Run ESLint + auto-fix + formatting |
| `npm run typecheck` | Run TypeScript type check only |

## Tech Stack

- **React 19** + **TypeScript 5**
- **Vite 7** — build tool
- **React Router DOM 7** — routing (HashRouter)
- **i18next** — localization (UK / EN), auto-collected from component folders
- **Formik** — forms
- **clsx** — conditional classNames
- **ESLint 10** + **@stylistic** — linting + formatting (no Prettier needed)
- **Husky** + **lint-staged** — pre-commit hooks (auto lint on commit)
- **BEM** — CSS methodology, global collector in `styles/index.css`

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
├── hooks/               <- custom React hooks
├── i18n/                <- i18next config + shared translations
│   ├── index.ts         <- auto-collects all **/i18n/*.json via import.meta.glob
│   └── shared/          <- translations for components that don't exist yet
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
| `/demo` | Design System Demo |
| `*` | 404 Not Found |

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

## Key Conventions

- **No CSS Modules** — all styles use BEM, collected into `styles/index.css`. No CSS imports in components.
- **No hardcoded values** — use design tokens (`var(--space-4)`, `var(--radius-md)`, etc.) instead of raw pixels.
- **No hardcoded text** — all visible text uses `t('key')` from i18next.
- **Path aliases** — use `@/` instead of relative paths (`import Button from '@/components/Button'`).
- **Barrel exports** — every component folder has `index.ts` for clean imports.
- **Interfaces** — each interface in its own file inside `interfaces/` folder within the component.
- **Translations** — each component owns its translations in `i18n/` subfolder, auto-collected at build time.

## Localization

The app supports Ukrainian (UK) and English (EN). Translations are split across component folders and merged automatically via `import.meta.glob` in `src/i18n/index.ts`.

To add translations for a new component:
1. Create `ComponentName/i18n/uk.json` and `en.json`
2. That's it — the config picks them up automatically

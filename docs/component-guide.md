# Component Creation Guide

## Folder Structure

Every component or page lives in its own folder with the same set of files:

```
ComponentName/
├── ComponentName.tsx         # Component file (PascalCase)
├── component-name.css        # Styles (kebab-case, BEM)
├── index.ts                  # Barrel export
├── interfaces/               # One file per interface (PascalCase)
│   └── ComponentNameProps.ts
├── constants/                # One file per constant (camelCase)
│   └── someMap.ts
└── i18n/                     # Translations (only if component has visible text)
    ├── uk.json
    └── en.json
```

Pages follow the same structure, but live in `src/pages/`:

```
src/pages/SearchPage/
├── SearchPage.tsx
├── search-page.css
├── index.ts
├── interfaces/
│   └── ...
└── i18n/
    ├── uk.json
    └── en.json
```

## Naming

| What | Convention | Example |
|------|-----------|---------|
| Folder | PascalCase | `DessertCard/` |
| Component file | PascalCase `.tsx` | `DessertCard.tsx` |
| CSS file | kebab-case `.css` | `dessert-card.css` |
| Interface file | PascalCase `.ts` | `DessertCardProps.ts` |
| BEM block | kebab-case | `.dessert-card` |
| BEM element | `__` | `.dessert-card__title` |
| BEM modifier | `--` | `.dessert-card--highlighted` |
| Barrel | always `index.ts` | `export { default } from './DessertCard'` |
| Translation keys | camelCase, nested | `dessertCard.title` |

## Step by Step

### 1. Create the interface

`src/components/DessertCard/interfaces/DessertCardProps.ts`

```ts
export interface DessertCardProps {
  title: string;
  image: string;
  weight: number;
  className?: string;
}
```

Each interface — its own file. Don't put interfaces inside the component file.

### 1b. Extract constants

If a component uses maps, arrays, or config objects — put each one in its own file inside `constants/`:

`src/components/Button/constants/iconSizeMap.ts`

```ts
import type { IconProps } from '@/components/Icon/interfaces/IconProps';

export const iconSizeMap: Record<string, IconProps['size']> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};
```

Rules:
- One constant per file, named after the export (camelCase)
- Component-specific constants go in `ComponentName/constants/`
- App-wide constants go in `src/constants/` (one file per constant)
- Never define constants inline in the component file — keep `.tsx` files focused on JSX and hooks

### 2. Create the component

`src/components/DessertCard/DessertCard.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { DessertCardProps } from './interfaces/DessertCardProps';

const DessertCard = ({ title, image, weight, className }: DessertCardProps) => {
  const { t } = useTranslation();

  return (
    <article className={clsx('dessert-card', className)}>
      <img className="dessert-card__image" src={image} alt={title} />
      <h3 className="dessert-card__title">{title}</h3>
      <span className="dessert-card__weight">
        {weight} {t('common.grams')}
      </span>
    </article>
  );
};

export default DessertCard;
```

Key points:
- Import interface from `./interfaces/`
- `useTranslation()` only if component has UI text (labels, buttons, placeholders). Data from props/backend is rendered directly
- `clsx` for conditional/composed class names
- Always accept optional `className` prop so parent can add positioning classes
- Import other components via `@/` alias: `import Button from '@/components/Button'`

### 3. Create the styles

`src/components/DessertCard/dessert-card.css`

```css
.dessert-card {
  --card-image-height: 200px;

  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: box-shadow var(--transition-normal);
}

.dessert-card:hover {
  box-shadow: var(--shadow-md);
}

.dessert-card__image {
  width: 100%;
  height: var(--card-image-height);
}

.dessert-card__title {
  padding: var(--space-4);
  font-weight: 500;
}

.dessert-card__weight {
  padding: 0 var(--space-4) var(--space-4);
  color: var(--color-text-secondary);
  font-size: 14px;
}

@media (--mobile) {
  .dessert-card {
    --card-image-height: 150px;
  }
}
```

Rules:
- Use design tokens (`var(--space-*)`, `var(--radius-*)`, `var(--color-*)`)
- Use global font-weight tokens: `var(--font-weight-regular)` (400), `var(--font-weight-medium)` (500), `var(--font-weight-bold)` (700), `var(--font-weight-extrabold)` (800) — never hardcode font-weight numbers
- Use `var(--disabled-opacity)` for disabled states — keeps opacity consistent across all components
- If a value doesn't fit any token, create a scoped CSS variable at the top of the block (`--card-image-height`) — not a magic number
- Breakpoints only via `@media (--mobile)`, `@media (--not-mobile)`, etc.
- Never import this CSS in the component — it goes into the global collector

### 4. Create the barrel export

`src/components/DessertCard/index.ts`

```ts
export { default } from './DessertCard';
```

### 5. Create translations (if needed)

`src/components/DessertCard/i18n/uk.json`
```json
{
  "common": {
    "grams": "г"
  }
}
```

`src/components/DessertCard/i18n/en.json`
```json
{
  "common": {
    "grams": "g"
  }
}
```

Translations are auto-collected by `import.meta.glob` in `src/i18n/index.ts` — no manual registration needed.

### 6. Register CSS

Add one line to `src/styles/index.css` in the `Components` section:

```css
/* === Components === */
...
@import '../components/DessertCard/dessert-card.css';
```

For pages — in the `Pages` section:

```css
/* === Pages === */
...
@import '../pages/SearchPage/search-page.css';
```

### 7. Verify

```bash
npm run lint        # No errors
npm run typecheck   # No errors
npm run build       # Build passes
```

## Splitting Components

If a component grows complex, split it into smaller pieces inside the same folder:

```
DessertCard/
├── DessertCard.tsx           # Main component (composes parts)
├── DessertCardImage.tsx      # Sub-component
├── DessertCardInfo.tsx       # Sub-component
├── dessert-card.css          # All styles stay in one CSS file
├── index.ts                  # Only exports the main component
└── interfaces/
    ├── DessertCardProps.ts
    └── DessertCardImageProps.ts
```

Sub-components live in the same folder, not in `components/`. They are implementation details — only the main component is exported.

All styles for sub-components stay in the same CSS file — one CSS file per component folder.

## Using Classes

### BEM in JSX

```tsx
// Static class
<div className="dessert-card">

// With modifier
<div className={clsx('dessert-card', { 'dessert-card--active': isActive })}>

// With dynamic modifier
<button className={clsx('btn', `btn--${variant}`, `btn--${size}`)}>

// With external className from parent
<div className={clsx('dessert-card', className)}>
```

### Utility classes

Use utility classes for quick spacing, layout, and text alignment. Don't write custom CSS for what a utility already does:

```tsx
// Spacing
<h1 className="h1 mb-6">Title</h1>
<div className="mt-4 p-6">Content</div>

// Flex layout
<div className="d-flex justify-between align-center gap-4">

// Responsive visibility
<span className="hidden-mobile">Full label</span>
<span className="visible-mobile">Short</span>

// Text
<p className="text-center text-uppercase">Centered</p>
```

### Mix BEM + utilities

BEM for component identity, utilities for spacing/layout between elements:

```tsx
<article className="dessert-card mt-6">
  <h3 className="dessert-card__title mb-2">{title}</h3>
</article>
```

## Page Layout Patterns

Pages live inside `HomePageLayout` which already provides `.f-container` (max-width 1440px + responsive padding). Don't add `.f-container` in pages.

### Full-width content

```tsx
<main className="py-10">
  <div className="row">
    <div className="col-12">
      <h1 className="h1">{t('search.title')}</h1>
    </div>
  </div>
</main>
```

### Centered narrow content (forms, profile)

```tsx
<main className="py-10">
  <div className="row row--center">
    <div className="col-12 col-md-8 col-lg-6">
      <h1 className="h1">{t('profile.edit')}</h1>
      {/* form here */}
    </div>
  </div>
</main>
```

### Card grid

```tsx
<main className="py-10">
  <div className="row">
    <div className="col-12">
      <h1 className="h1 mb-6">{t('myRecipes.title')}</h1>
    </div>
  </div>
  <div className="row row--gap-md">
    {recipes.map((recipe) => (
      <div key={recipe.id} className="col-12 col-md-6 col-lg-4">
        <DessertCard title={recipe.title} image={recipe.image} weight={recipe.weight} />
      </div>
    ))}
  </div>
</main>
```

### Sidebar + Content (constructor)

```tsx
<main className="py-10">
  <div className="row row--gap-md">
    <aside className="col-12 col-md-3">
      <StepSidebar />
    </aside>
    <div className="col-12 col-md-9">
      {/* step content */}
    </div>
  </div>
</main>
```

### Page sections

Each logical section gets its own `.row`:

```tsx
<main className="py-10">
  {/* Hero */}
  <section>
    <div className="row">
      <div className="col-12 col-md-8">
        <h1 className="h1">{t('pages.home.title')}</h1>
        <p className="text mt-4">{t('pages.home.subtitle')}</p>
      </div>
    </div>
  </section>

  {/* Cards */}
  <section className="mt-12">
    <div className="row">
      <div className="col-12">
        <h2 className="h2 mb-6">{t('pages.home.popular')}</h2>
      </div>
    </div>
    <div className="row row--gap-md">
      <div className="col-12 col-md-6 col-lg-4">card</div>
      <div className="col-12 col-md-6 col-lg-4">card</div>
      <div className="col-12 col-md-6 col-lg-4">card</div>
    </div>
  </section>
</main>
```

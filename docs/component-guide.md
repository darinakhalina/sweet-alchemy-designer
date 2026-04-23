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

Tests live in `src/tests/` mirroring component structure:

```
src/tests/
├── setup.ts                          # Global setup (jest-dom, i18n mock)
└── components/
    ├── Icon/
    │   └── Icon.test.tsx
    ├── Button/
    │   └── Button.test.tsx
    └── Loader/
        └── Loader.test.tsx
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
  font-weight: var(--font-weight-medium);
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

### 7. Write tests

`src/tests/components/DessertCard/DessertCard.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import DessertCard from '@/components/DessertCard';

describe('DessertCard', () => {
  it('renders title and weight', () => {
    render(<DessertCard title="Cake" image="/cake.jpg" weight={500} />);
    expect(screen.getByText('Cake')).toBeInTheDocument();
    expect(screen.getByText('500 common.grams')).toBeInTheDocument();
  });

  it('renders image with alt text', () => {
    render(<DessertCard title="Cake" image="/cake.jpg" weight={500} />);
    expect(screen.getByAltText('Cake')).toHaveAttribute('src', '/cake.jpg');
  });

  it('passes additional className', () => {
    const { container } = render(
      <DessertCard title="Cake" image="/cake.jpg" weight={500} className="mt-4" />
    );
    expect(container.firstChild).toHaveClass('dessert-card', 'mt-4');
  });
});
```

Rules:
- Test files live in `src/tests/` mirroring component structure: `src/tests/components/Button/Button.test.tsx`
- Import components via `@/` alias: `import Button from '@/components/Button'`
- Use `@testing-library/react` — render, screen, fireEvent
- Test behavior, not implementation: what the user sees and can interact with
- Use `getByRole`, `getByText`, `getByAltText` — prefer accessible queries
- Use `container.querySelector` only for CSS classes or elements without roles
- `react-i18next` is mocked globally in `src/tests/setup.ts` — `t('key')` returns the key as-is
- Test files are excluded from `tsc` build — write freely, linter still checks them

What to test:
- Renders expected content (text, images, icons)
- Applies correct CSS classes for props (variants, sizes, modifiers)
- Interactive behavior (clicks, state changes)
- Disabled/loading states
- Accessibility attributes (`role`, `aria-*`)

What NOT to test:
- CSS visual appearance (that's what the demo page is for)
- Internal implementation details (state variables, private functions)
- Third-party libraries (react-modal, formik internals)

### Beyond components

Vitest covers everything, not just UI components:

```ts
// Redux slice test
import { store } from '@/store';
import { addToCart } from '@/store/cartSlice';

it('adds item to cart', () => {
  store.dispatch(addToCart({ id: 1, name: 'Торт' }));
  expect(store.getState().cart.items).toHaveLength(1);
});
```

```ts
// API endpoint test (msw for HTTP mocking)
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('/api/recipes', () => HttpResponse.json([{ id: 1, title: 'Торт' }]))
);
beforeAll(() => server.listen());
afterAll(() => server.close());
```

```ts
// Custom hook test
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

it('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

Mocking tools: `vi.mock()`, `vi.fn()`, `vi.spyOn()` — same API as Jest.

### 8. Verify

```bash
npm run lint        # No errors
npm run typecheck   # No errors
npm run build       # Build passes
npm run test:run    # Tests pass
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

## Dropdown

Headless dropdown powered by **Downshift** (`useSelect`). Handles keyboard navigation, ARIA, and open/close state. Styling is fully custom via BEM CSS.

### Architecture

- **Dropdown** — generic dropdown panel. Renders a trigger via render function, a floating panel with optional search, and a list of options. On mobile (≤767px) it switches to a bottom-sheet with overlay.
- **Select** — Formik-integrated form select. Wraps `Dropdown` with a split-pill trigger (value + caret), label, help/error text. Reads/writes field value via `useField`.

### Dropdown usage (standalone)

```tsx
import Dropdown from '@/components/Dropdown';
import type { DropdownOption } from '@/components/Dropdown';

const options: DropdownOption[] = [
  { value: 'uah', label: 'UAH' },
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
];

<Dropdown
  options={options}
  selectedValue={currency}
  onSelect={(opt) => setCurrency(opt.value)}
  trigger={({ isOpen, selectedOption, toggleProps }) => (
    <button {...toggleProps} type="button" className="my-trigger">
      {selectedOption?.label ?? 'Choose…'}
    </button>
  )}
/>
```

**Important:** `toggleProps` must be spread on a `<button>` element — Downshift requires a natively interactive element for click/keyboard handling.

### Select usage (inside Formik)

```tsx
import Select from '@/components/Select';

<Select
  name="portions"
  options={portionOptions}
  label={t('constructor.portions')}
  placeholder={t('constructor.selectPortions')}
  required
/>
```

Searchable:

```tsx
<Select
  name="category"
  options={categoryOptions}
  label={t('constructor.category')}
  placeholder={t('constructor.selectCategory')}
  searchable
  searchPlaceholder={t('common.search')}
/>
```

### Props

**DropdownOption**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Unique option value |
| `label` | `string` | Display text |
| `disabled` | `boolean?` | Prevents selection |

**Dropdown**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownOption[]` | — | Available options |
| `selectedValue` | `string?` | — | Currently selected value |
| `onSelect` | `(option) => void` | — | Selection callback |
| `trigger` | `(props) => ReactNode` | — | Render function for trigger element |
| `searchable` | `boolean` | `false` | Show search input in panel |
| `searchPlaceholder` | `string?` | — | Placeholder for search input |
| `placement` | `'bottom-start' \| 'bottom-end'` | `'bottom-start'` | Panel alignment |

**Select** (Formik)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Formik field name |
| `options` | `DropdownOption[]` | — | Available options |
| `label` | `string?` | — | Label text |
| `placeholder` | `string?` | — | Placeholder when nothing selected |
| `helpText` | `string?` | — | Help text below the field |
| `searchable` | `boolean` | `false` | Enable search |
| `searchPlaceholder` | `string?` | — | Search input placeholder |
| `disabled` | `boolean` | `false` | Disables the field |
| `required` | `boolean` | `false` | Shows asterisk on label |

### Mobile behavior

On screens ≤767px the dropdown panel renders as a bottom-sheet (`position: fixed; bottom: 0`) with a backdrop overlay, matching the Modal component pattern. `useLockBodyScroll` prevents background scrolling.

### Exports

```ts
// Dropdown
import Dropdown from '@/components/Dropdown';
import type { DropdownOption, DropdownTriggerRenderProps } from '@/components/Dropdown';

// Select
import Select from '@/components/Select';
```

## Animating Lists

Use `AnimatedList` (`src/components/AnimatedList`) to add staggered entrance animation to any list of elements. Children fade in from below, one by one.

### Basic usage

Replace a plain container `<div>` with `<AnimatedList>`:

```tsx
import AnimatedList from '@/components/AnimatedList';

// Before — no animation
<div className="row row--gap-md">
  {items.map((item) => (
    <div key={item.id} className="col-12 col-md-6 col-lg-4">
      <Card {...item} />
    </div>
  ))}
</div>

// After — staggered fade-in
<AnimatedList className="row row--gap-md">
  {items.map((item) => (
    <div key={item.id} className="col-12 col-md-6 col-lg-4">
      <Card {...item} />
    </div>
  ))}
</AnimatedList>
```

`AnimatedList` injects the animation class and `--item-index` CSS variable into each direct child via `cloneElement` — no extra wrapper divs are added, so grid layouts work as-is.

### Custom stagger delay

Default delay between items is 100ms. Override with `staggerDelay`:

```tsx
<AnimatedList className="row row--gap-md" staggerDelay={150}>
  ...
</AnimatedList>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | List items to animate |
| `staggerDelay` | `number` | `100` | Delay in ms between each item's animation |
| `className` | `string` | — | CSS classes for the container (grid, spacing, etc.) |
| `...rest` | `HTMLDivAttributes` | — | Any div attribute (`data-testid`, `id`, etc.) |

### How it works

- CSS `@keyframes fadeInUp` — opacity 0→1, translateY 16px→0
- Duration: `--duration-slow` (300ms), easing: `--ease-in-out`
- Each child gets `animation-delay: calc(index * staggerDelay)`
- Only `opacity` + `transform` are animated — GPU-accelerated, no layout thrashing

### When to use

- Cards appearing after a fetch (desserts, recipes, search results)
- Grid items loading on page mount
- Any list where sequential appearance looks better than all-at-once

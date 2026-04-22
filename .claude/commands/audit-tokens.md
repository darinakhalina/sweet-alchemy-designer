# Audit CSS Tokens

Scan all project CSS files for hardcoded values that should use design tokens. Reports violations and suggests fixes.

**Usage:** `/audit-tokens` or `/audit-tokens src/components/Button/button.css`

## What to check

Scan CSS files in `src/components/`, `src/pages/`, and `src/styles/base.css` for these violations:

### 1. Hardcoded colors
- Raw hex values (`#ff6b35`, `#333`) instead of `var(--color-*)`, `var(--brand-*)`, `var(--neutral-*)`
- Raw `rgb()`/`rgba()` instead of token variables
- **Exception:** token definition files (`colors.css`, `fonts.css`) and `@font-face` blocks

### 2. Hardcoded spacing
- Raw pixel values for margin/padding (`margin: 16px`, `padding: 8px 12px`) instead of `var(--space-*)`
- **Exception:** `0`, `1px` (borders), scoped CSS variables (`--component-height: 48px`)

### 3. Hardcoded font-size
- Raw `font-size: 14px` instead of `var(--font-size-sm)`
- **Exception:** scoped variables like `--demo-font-size-meta: 13px`

### 4. Hardcoded font-weight
- Raw `font-weight: 700` instead of `var(--font-weight-bold)`
- **Exception:** `@font-face` declarations

### 5. Hardcoded line-height
- Raw `line-height: 1.5` instead of `var(--line-height-normal)`
- Values that match standard tokens: `1` (none), `1.2` (tight), `1.5` (normal)

### 6. Hardcoded border-radius
- Raw `border-radius: 8px` instead of `var(--radius-md)`

### 7. Hardcoded media queries
- Raw `@media (max-width: 767px)` instead of `@media (--mobile)`
- Raw `@media (min-width: 768px)` instead of `@media (--not-mobile)`

### 8. Hardcoded z-index
- Raw `z-index: 100` instead of `var(--z-dropdown)`, `var(--z-modal)`, etc.

### 9. Hardcoded transitions
- Raw `transition: 0.3s` instead of `var(--transition-normal)`

### 10. Hardcoded shadows
- Raw `box-shadow: 0 2px 4px rgba(...)` instead of `var(--shadow-sm)`

## Available tokens reference

```
Spacing:    --space-1 (4px) ... --space-20 (80px)
Radius:     --radius-xs (4px), --radius-sm (6px), --radius-md (8px), --radius-lg (12px), --radius-xl (16px), --radius-full (50%), --radius-pill (50px)
Font-size:  --font-size-xs/sm/base/md/lg/xl/2xl/3xl/4xl/5xl
Font-weight: --font-weight-regular/medium/bold/extrabold
Line-height: --line-height-none (1), --line-height-tight (1.2), --line-height-normal (1.5)
Transitions: --transition-fast, --transition-normal, --transition-slow
Shadows:    --shadow-sm, --shadow-md
Z-index:    --z-dropdown, --z-modal-overlay, --z-modal
```

## Output format

```
Token Audit Results:

src/components/Card/card.css:
  Line 12: font-size: 14px → var(--font-size-sm)
  Line 18: margin-top: 16px → var(--space-4)
  Line 25: border-radius: 8px → var(--radius-md)

src/pages/SearchPage/search-page.css:
  Line 5: @media (max-width: 767px) → @media (--mobile)
  Line 31: color: #333 → var(--color-text) or var(--neutral-800)

Summary: 5 violations in 2 files
```

After reporting, ask the user if they want auto-fix applied.

# Internationalization (i18n) Guide

## Overview

The project uses **i18next** with **react-i18next** for UK/EN localization. Translations are auto-collected from component and page folders — no manual registration.

## How Auto-Collection Works

`src/i18n/index.ts` uses `import.meta.glob` to collect all JSON files matching:

```
src/components/**/i18n/uk.json
src/components/**/i18n/en.json
src/pages/**/i18n/uk.json
src/pages/**/i18n/en.json
src/i18n/shared/uk.json
src/i18n/shared/en.json
```

All files are deep-merged into one translation object per language. Just create the files — they're picked up automatically.

## Where Translations Live

| Location | What goes here |
|----------|---------------|
| `src/i18n/shared/uk.json` / `en.json` | App-wide keys: header, footer, common, validation, errors |
| `src/pages/HomePage/i18n/uk.json` / `en.json` | Page-specific keys |
| `src/components/AuthStatus/i18n/uk.json` / `en.json` | Component-specific keys (if component has visible text) |

### Decision: shared vs local

- If only one page/component uses the key → put it in that page/component's `i18n/` folder
- If multiple pages share the key → put it in `src/i18n/shared/`
- Error codes always go in shared (they can appear anywhere)

## Key Naming Convention

```json
{
  "pages": {
    "home": {
      "title": "Sweet Alchemy",
      "showcase": {
        "fetchButton": "Fetch desserts"
      }
    }
  }
}
```

| Rule | Example |
|------|---------|
| Nested by feature/section | `pages.home.showcase.fetchButton` |
| camelCase keys | `fetchButton`, not `fetch_button` or `FetchButton` |
| Descriptive, not generic | `showcase.emptyText`, not `text1` |
| No duplicate keys across files | Deep merge means conflicts override silently |

## Adding Translations

### For a new component

1. Create `src/components/MyComponent/i18n/uk.json`:
   ```json
   {
     "myComponent": {
       "title": "Заголовок",
       "description": "Опис"
     }
   }
   ```

2. Create `src/components/MyComponent/i18n/en.json`:
   ```json
   {
     "myComponent": {
       "title": "Title",
       "description": "Description"
     }
   }
   ```

3. Use in component:
   ```tsx
   const { t } = useTranslation();
   return <h1>{t('myComponent.title')}</h1>;
   ```

No imports or registration needed — auto-collected.

### For a new page

Same pattern, but in `src/pages/MyPage/i18n/`. Nest under `pages.myPage.*`:

```json
{
  "pages": {
    "myPage": {
      "title": "Page Title"
    }
  }
}
```

### For new error codes

Add to `src/i18n/shared/en.json` and `uk.json` under `errors`:

```json
{
  "errors": {
    "recipesFetchFailed": "Failed to load recipes."
  }
}
```

See [error-handling.md](error-handling.md) for the error code convention.

## What to Localize

| Localize | Don't localize |
|----------|---------------|
| UI labels, buttons, headings | Data from API (recipe names, user names) |
| Placeholder text | URLs, email addresses |
| Error messages | Console logs |
| Validation messages | CSS class names |
| Empty state text | Constants used for logic |

## Using in Components

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('myComponent.title')}</h1>
      <p>{t('myComponent.description')}</p>
    </div>
  );
};
```

### Interpolation

```json
{
  "validation": {
    "minLength": "Minimum {{min}} characters"
  }
}
```

```tsx
t('validation.minLength', { min: 3 })
// → "Minimum 3 characters"
```

### Outside React components

For code that doesn't have access to the `t` function (services, helpers):

```ts
import i18n from '@/i18n';
const message = i18n.t('errors.unknown');
```

Prefer passing `t` as a parameter where possible — it's more testable.

## Language Switching

`LanguageSwitcher` component in the header toggles between UK and EN. Language preference is stored in `localStorage` and detected automatically on next visit via `i18next-browser-languagedetector`.

Supported languages: `uk` (Ukrainian, default fallback), `en` (English).

## Testing

`react-i18next` is globally mocked in `src/tests/setup.ts`. The mock `t()` function returns the key as-is:

```ts
t('pages.home.title') // returns "pages.home.title" in tests
```

This means tests check that the correct key is used, not the translated text. This is intentional — translation content can change without breaking tests.

For testing `getErrorMessage` which depends on `t()` behavior (checking if translation exists), create a custom mock — see [error-handling.md](error-handling.md#testing-errors).

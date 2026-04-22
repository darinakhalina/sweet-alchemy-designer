# Create Component

Create a new React component following the project conventions. The user provides the component name and a brief description.

**Usage:** `/create-component ComponentName — brief description of what it does`

## Steps

1. **Create the component folder and files** at `src/components/$ComponentName/`:

   - `$ComponentName.tsx` — the component
   - `$component-name.css` — styles (BEM, kebab-case filename)
   - `index.ts` — barrel export
   - `interfaces/$ComponentNameProps.ts` — props interface

2. **If the component has visible UI text**, create i18n files:
   - `i18n/en.json`
   - `i18n/uk.json`

3. **If the component needs constants/maps**, create:
   - `constants/$constantName.ts`

4. **Register the CSS** — add `@import` to `src/styles/index.css` in the `/* === Components === */` section.

5. **Create a test file** at `src/tests/components/$ComponentName/$ComponentName.test.tsx`.

6. **Run typecheck** — `npm run typecheck` to verify everything compiles.

## Conventions to follow

- Use `clsx` for conditional classNames
- Add `data-testid` on every meaningful element (kebab-case)
- Props interface lives in `interfaces/` folder, NOT in the component file
- Constants/maps live in `constants/` folder, NOT in the component file
- Use `@/` prefix for all imports (never `../../`)
- Use `useTranslation()` for any visible text, with keys under `components.$componentName.*`
- CSS: BEM only (`.block`, `.block__element`, `.block--modifier`)
- CSS: use design tokens (`var(--space-4)`, `var(--color-text)`, etc.), never hardcoded values
- Default export from component file, re-exported from `index.ts`
- No CSS imports inside the component — all CSS is registered via `src/styles/index.css`

## Example: Simple component (Button)

**`src/components/Button/interfaces/ButtonProps.ts`:**
```tsx
import type { ReactNode, MouseEvent } from 'react';

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'brand' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}
```

**`src/components/Button/Button.tsx`:**
```tsx
import clsx from 'clsx';
import type { ButtonProps } from './interfaces/ButtonProps';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      type={type}
      data-testid="btn"
      className={clsx('btn', `btn--${variant}`, `btn--${size}`, className, {
        'btn--loading': isLoading,
        'btn--disabled': isDisabled,
      })}
      onClick={onClick}
    >
      <span data-testid="btn-label" className="btn__label">{children}</span>
    </button>
  );
};

export default Button;
```

**`src/components/Button/index.ts`:**
```ts
export { default } from './Button';
```

**`src/components/Button/button.css`:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.btn--primary {
  background-color: var(--brand-600);
  color: var(--color-text-inverse);
}

.btn--md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-base);
}

.btn--disabled {
  opacity: var(--disabled-opacity);
  cursor: not-allowed;
}
```

**Registration in `src/styles/index.css`:**
```css
/* === Components === */
@import '../components/Button/button.css';
```

## Example: Component with i18n (Modal)

**`src/components/Modal/i18n/en.json`:**
```json
{
  "components": {
    "modal": {
      "close": "Close"
    }
  }
}
```

**`src/components/Modal/i18n/uk.json`:**
```json
{
  "components": {
    "modal": {
      "close": "Закрити"
    }
  }
}
```

**`src/components/Modal/Modal.tsx`** (using i18n):
```tsx
import { useTranslation } from 'react-i18next';
import type { ModalProps } from './interfaces/ModalProps';

const Modal = ({ children, isOpen, onClose, 'data-testid': testId = 'modal' }: ModalProps) => {
  const { t } = useTranslation();

  return (
    <div data-testid={testId} className="modal">
      <button
        type="button"
        onClick={onClose}
        data-testid={`${testId}-close`}
        aria-label={t('components.modal.close')}
      >
        ...
      </button>
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;
```

## Example: Test file

**`src/tests/components/Button/Button.test.tsx`:**
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByTestId('btn')).toHaveTextContent('Click me');
  });

  it('applies variant and size classes', () => {
    render(<Button variant="brand" size="lg">Test</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('btn--brand', 'btn--lg');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);
    fireEvent.click(screen.getByTestId('btn'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled when isDisabled', () => {
    render(<Button isDisabled>Test</Button>);
    expect(screen.getByTestId('btn')).toBeDisabled();
  });
});
```

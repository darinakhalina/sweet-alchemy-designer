# Preflight Check

Run all checks before committing. Reports issues and optionally fixes them.

**Usage:** `/preflight`

## Steps — run all checks and report results

### 1. TypeScript check
```bash
npm run typecheck
```

### 2. ESLint check
```bash
npm run lint
```

### 3. Unit tests
```bash
npm run test:run
```

### 4. CSS registration audit

Check that every `.css` file in `src/components/` and `src/pages/` is imported in `src/styles/index.css`.

For each CSS file found via `find src/components src/pages -name '*.css'`, verify it appears in `src/styles/index.css`. Report any unregistered CSS files.

### 5. data-testid audit

Check that every component TSX file in `src/components/` and every page TSX file in `src/pages/` contains at least one `data-testid` attribute. Report any files missing `data-testid`.

### 6. Test coverage audit

Check that every component in `src/components/` and every page in `src/pages/` has a corresponding test file in `src/tests/`. Report any components/pages without tests.

## Output format

Report results as a checklist:

```
Preflight Results:
- [x] TypeScript — no errors
- [x] ESLint — no errors
- [x] Tests — 42 passed
- [ ] CSS registration — 1 file not registered: components/NewThing/new-thing.css
- [x] data-testid — all components have testid
- [ ] Test coverage — missing tests: components/NewThing
```

If there are fixable issues (unregistered CSS, missing data-testid), ask the user if they want auto-fix.

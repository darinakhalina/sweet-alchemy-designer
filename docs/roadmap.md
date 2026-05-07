# Roadmap — Future Improvements

Tracking work that the project should pick up but isn't blocking current feature delivery. Items here are scoped enough to turn into PRs without further design.

## 1. E2E Tests (Playwright)

**Why Playwright over Cypress:** ESM-friendly with Vite 7, `page.getByTestId()` aligns 1:1 with the project's `data-testid` convention, multi-browser out of the box, native mobile-viewport projects to exercise `Dropdown`/`Modal` bottom-sheet behavior.

### Setup
- **Dependencies (dev):** `@playwright/test`
- **Config:** `playwright.config.ts` at repo root
  - `testDir: './e2e'`
  - `use.testIdAttribute: 'data-testid'`
  - `use.baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:4173'`
  - `webServer: { command: 'npm run preview -- --port=4173', port: 4173, reuseExistingServer: !process.env.CI }` — run against the production build, not `vite dev`
  - Projects: `chromium` + `mobile-chrome` (Pixel 7) for responsive coverage
  - `retries: process.env.CI ? 2 : 0`, `workers: process.env.CI ? 1 : undefined`
- **Folder:** `e2e/` outside `src/` with its own `tsconfig.json` (Playwright globals must not collide with Vitest globals)
  ```
  e2e/
  ├── fixtures/auth.ts
  ├── pages/         # optional Page Objects
  ├── specs/
  └── tsconfig.json
  ```
- **ESLint carve-out** for `e2e/**` — disable `i18next/no-literal-string` and the relative-import ban
- **Add to `.gitignore`:** `playwright-report/`, `test-results/`, `playwright/.cache/`

### NPM scripts
- `test:e2e` → `playwright test`
- `test:e2e:ui` → `playwright test --ui`
- `test:e2e:install` → `playwright install --with-deps chromium`
- `test:e2e:report` → `playwright show-report`

### First three specs (golden paths)
1. **`login.spec.ts`** — visit `/constructor` → expect redirect to `/login?redirect=/constructor` → submit login → land back on `/constructor`. Exercises `PrivateRoute`, `LoginPage`, redirect param.
2. **`home-navigation.spec.ts`** — authenticated home → recipe carousel → `/search` → open card → `/recipe/:id`. Exercises `HomePageLayout`, `SiteHeader`, `RecipeCard`, lazy routes, i18n boot.
3. **`constructor-flow.spec.ts`** — walk `Stepper`, interact with `Select` (Downshift), `Checkbox`, `Switch`, `RadioGroup`. Run via `mobile-chrome` to cover bottom-sheet variants.

### Out of scope
Visual regression, accessibility audits, full route coverage, MSW for E2E (use `page.route()` when a real backend exists).

---

## 2. CI Workflow

**File:** `.github/workflows/ci.yml`

### Triggers
- `pull_request` to `main`
- `push` to `main`

### Job structure (three jobs, not a matrix)
| Job | Steps | Why split |
|-----|-------|-----------|
| `static` | `npm ci` → `npm run lint` → `npm run typecheck` | <1 min feedback |
| `unit` | `npm ci` → `npm run test:run` | Independent of lint |
| `e2e` | `needs: [static, unit]` → `npm ci` → restore Playwright cache → `npx playwright install --with-deps chromium` → `npm run build` → `npx playwright test` → upload artifacts on failure | Don't burn browser-install time on a PR that won't merge |

### Caching
- `actions/setup-node@v4` with `cache: 'npm'` — caches `~/.npm` keyed on `package-lock.json`
- Separate `actions/cache@v4` for Playwright browsers at `~/.cache/ms-playwright`
- **Use `npm ci`, not `npm install`** — deterministic, honors lockfile

### Other essentials
- `node-version: '20.x'` (Vite 7 needs ≥ 20.19)
- `concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }`
- Upload `playwright-report/` and `test-results/` on failure with 7–14 day retention

### When E2E runs
Start with **every PR + every push to `main`**. If flakes appear, switch to label-gated (`if: contains(github.event.pull_request.labels.*.name, 'run-e2e')`) plus always on `main`.

### Vercel preview (later)
Separate workflow listening on `on: deployment_status` runs Playwright with `E2E_BASE_URL=${{ github.event.deployment_status.target_url }}`. Non-blocking, parallel check.

---

## 3. Storybook

### Dependencies (dev)
- `storybook`, `@storybook/react-vite`, `@storybook/addon-essentials`, `@storybook/addon-a11y`, `@storybook/addon-i18n`, `@storybook/test`
- Optional: `storybook-react-router-v7` or a custom `<MemoryRouter>` decorator for components using `<Link>` / `useNavigate`

### Compatibility risk
Storybook 8.x officially supports Vite 5/6; Vite 7 is community-tested. **Spike before committing.** Fallbacks: Storybook 9 if released, pin known-good 8.x minor, or `viteFinal` override.

### Config
- **`.storybook/main.ts`:** `framework: '@storybook/react-vite'`, `stories: ['../src/components/**/*.stories.@(ts|tsx|mdx)']`, defensive `@/` alias in `viteFinal`
- **`.storybook/preview.ts`:**
  - `import '../src/styles/index.css';` — **the** key hook. Aggregated CSS gives every story design tokens, breakpoints, fonts, layout utilities for free
  - `import '../src/i18n';` — real provider, not the Vitest mock (mock lives in `src/tests/setup.ts` and is not loaded by Storybook unless someone imports `@/tests/setup` from production code — don't)
  - Viewport presets `mobile` (≤767), `tablet` (768–1199), `desktop` (≥1200) mirroring `MEDIA.*` constants
- **`.storybook/decorators/withI18n.tsx`** — toolbar locale switcher (`uk` | `en`), calls `i18n.changeLanguage(locale)` and wraps in `<I18nextProvider>`
- **`.storybook/decorators/withRouter.tsx`** — `<MemoryRouter>` wrapper for components needing routing context
- **`.storybook/tsconfig.json`** — extends root, scoped to `.storybook/**` and `**/*.stories.*`

### Folder structure — colocated, not separate `src/stories/`
```
src/components/Button/
├── Button.tsx
├── Button.stories.tsx        ← new
├── button.css
├── index.ts
├── interfaces/
└── constants/
```
Aligns with the existing component-guide convention. ESLint and TS configs need carve-outs:
- `eslint.config.js` — disable `i18next/no-literal-string` for `*.stories.@(ts|tsx|mdx)`
- `tsconfig.app.json` — exclude `**/*.stories.tsx` so production builds skip them

### NPM scripts
- `storybook` → `storybook dev -p 6006`
- `build-storybook` → `storybook build -o storybook-static`

### First three components to story
1. **`Button`** — variants × sizes × icon positions × loading/disabled. Canonical first story.
2. **`Input`** — label, helpText, error state, prefix/suffix icons; include a `WithFormik` story for realistic embedded usage.
3. **`Modal`** — exercises portals, `useLockBodyScroll`, mobile bottom-sheet, i18n title. **Canary for `postcss-custom-media` in Storybook** — if `@media (--mobile)` doesn't apply, `Modal` mobile story is visibly broken.

After these: `Icon`, `Dropdown`, `Select`, `Stepper`, form-control triplet (`Checkbox`/`Switch`/`RadioGroup`), `Pagination`, `Loader`, `AnimatedList`, `RecipeCard`, `AuthStatus`, `LanguageSwitcher`, then layout shells.

### Out of scope
Chromatic / visual regression, full a11y audits in CI, hand-authored MDX docs (rely on `react-docgen-typescript` auto props), `test-storybook` runner integration.

---

## 4. Repo Hygiene

- **`dist/`** — already in `.gitignore` (line 12). Verify nothing was committed before the rule landed: `git ls-files dist/` should be empty. If not, `git rm -r --cached dist/`.
- **`tsconfig.app.tsbuildinfo`** — currently **tracked and modified** (visible in `git status`). This is an incremental TS build cache and must not be in the repo. Action:
  ```
  echo "*.tsbuildinfo" >> .gitignore
  git rm --cached tsconfig.app.tsbuildinfo tsconfig.tsbuildinfo
  ```
- **`figma-screens/`** — 17 design mockups in repo. Acceptable for a prototype; for production move to a shared drive / Figma source of truth and reference URLs from `docs/figma-analysis.md`.
- **Coverage thresholds** for Vitest — not currently configured. Decide once test suite stabilizes.

---

## Suggested Order

1. **Repo hygiene** (5 minutes) — gitignore `*.tsbuildinfo`, drop tracked build artifacts. Cheap, unblocks cleaner diffs.
2. **Storybook** — independent of CI/E2E, zero impact on existing flows, and serves as a sanity check that Vite 7 + the styles pipeline still cooperate before E2E depends on the same build.
3. **CI scaffolding without E2E** — `static` + `unit` jobs only. Verify caching, `npm ci`, branch protection wiring on a noop PR. Make `static` and `unit` required checks.
4. **Playwright + add `e2e` job to CI** — depends on the build being clean (Phase 2 proved it) and on the workflow existing (Phase 3 set it up). Tune retries/timeouts in isolation.

### Optional later
- Vercel preview `deployment_status` workflow for E2E against the real preview
- Storybook test-runner in CI
- Chromatic / visual regression
- Vitest coverage thresholds
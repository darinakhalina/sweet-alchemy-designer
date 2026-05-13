# Roadmap — Future Improvements

Tracking work that the project should pick up but isn't blocking current feature delivery. Items here are scoped enough to turn into PRs without further design.

## Status Summary (as of 2026-05-13)

| Section | Status | Notes |
|---------|--------|-------|
| 1. E2E Tests (Playwright) | TODO | Not yet started — Playwright is installed but only used by Storybook addon-vitest |
| 2. CI Workflow | TODO | `.github/workflows/` not created yet |
| 3. Storybook | **DONE** | Full setup with 14 components, 12 design token stories, 3 integration patterns, MDX docs, interaction + a11y tests via Playwright. See `storybook-component-guide.md` |
| 4. Repo Hygiene | Partial | `tsbuildinfo` cleaned in source. Target repo still has it tracked |

---

## 1. E2E Tests (Playwright)

**Status:** TODO

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

**Status:** TODO

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

**Status:** DONE (as of 2026-05-12)

Installed: Storybook 10 + `@storybook/react-vite` + `@storybook/addon-vitest` + `@storybook/addon-a11y` + `@storybook/addon-docs` + `@storybook/addon-themes`.

**What's there:**
- 14 components with `.stories.tsx` + `.mdx` docs + `tests/*.tests.stories.tsx` (play + a11y tests)
- 12 design token stories under `src/patterns/` (Colors, Spacing, Typography, etc.)
- 3 integration patterns: FormikInputs, FormikSelect, ApiErrorHandling
- Welcome page at `src/Welcome.mdx`
- A11y tests via axe-core run on every story (`test: 'error'` in preview.ts) — only `color-contrast` rule disabled due to brand-pink design choice
- Interaction tests via Playwright (headless Chromium) — 201 tests passing
- Auto props table from TypeScript types + JSDoc via `react-docgen-typescript`

**How to add a component:** see `docs/storybook-component-guide.md`.

**Not implemented (out of scope):** Chromatic visual regression, deployment to public URL.

### Future considerations
- Deploy Storybook to a public URL (Cloudflare Pages / GH Pages) for sharing with team / designers
- Test-storybook runner in CI (currently tests run via `npx vitest run --project storybook`)

---

## 4. Repo Hygiene

**Status:** Partial

- **`dist/`** — already in `.gitignore` and not tracked
- **`*.tsbuildinfo`** — listed in `.gitignore`. In source repo: clean. In target repo: still tracked (legacy), needs `git rm --cached tsconfig.app.tsbuildinfo` once
- **`figma-screens/`** — 17 design mockups in repo. Acceptable for a prototype; for production move to a shared drive / Figma source of truth and reference URLs from `docs/figma-analysis.md`
- **Unused dependencies** — cleaned: `react-paginate`, `@chromatic-com/storybook` removed (2026-05-13)
- **Empty placeholder folders** — `src/components/Footer/` removed (2026-05-13)

---

## Suggested Order (Updated)

1. ~~**Repo hygiene**~~ — DONE in source repo (target needs one-time `git rm --cached tsconfig.app.tsbuildinfo`)
2. ~~**Storybook**~~ — DONE
3. **CI scaffolding without E2E** — `static` + `unit` jobs only. Verify caching, `npm ci`, branch protection wiring on a noop PR. Make `static` and `unit` required checks.
4. **Playwright + add `e2e` job to CI** — depends on the build being clean (Phase 2 proved it) and on the workflow existing (Phase 3 set it up). Tune retries/timeouts in isolation.

### Optional later
- Storybook deploy to public URL (Cloudflare Pages / GH Pages)
- Vercel preview `deployment_status` workflow for E2E against the real preview
- Storybook test-runner in CI
- Chromatic / visual regression
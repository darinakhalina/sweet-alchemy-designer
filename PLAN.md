# SweetAlchemy — План розробки

---

## Чеклист створення компонента / сторінки

> **Кожен новий компонент або сторінка створюється за цим чеклистом.**

### Структура папки компонента

```
ComponentName/
├── ComponentName.tsx       ← компонент (TypeScript)
├── component-name.css      ← стилі (БЕМ, kebab-case)
├── index.ts                ← barrel export
├── interfaces/             ← інтерфейси (один файл на інтерфейс)
│   ├── ComponentNameProps.ts
│   └── OtherInterface.ts
└── i18n/                   ← переклади (якщо є текст)
    ├── uk.json
    └── en.json
```

### Крок за кроком

1. **Створити папку** `src/components/ComponentName/` (або `src/pages/PageName/`)

2. **Створити `interfaces/ComponentNameProps.ts`** — один файл на кожний інтерфейс
   ```ts
   import type { ReactNode } from 'react';

   export interface ComponentNameProps {
     variant?: 'primary' | 'secondary';
     className?: string;
     children?: ReactNode;
   }
   ```

3. **Створити `ComponentName.tsx`**
   - Імпорт інтерфейсу з `./interfaces/ComponentNameProps`
   - Текст тільки через `t('key')`, ніякого хардкоду
   - className — рядки БЕМ (`clsx` для умовних класів)
   - Імпорти через алиас `@/` (наприклад `import Button from '@/components/Button'`)
   ```tsx
   import { useTranslation } from 'react-i18next';
   import clsx from 'clsx';
   import type { ComponentNameProps } from './interfaces/ComponentNameProps';

   const ComponentName = ({ variant = 'primary', className }: ComponentNameProps) => {
     const { t } = useTranslation();
     return (
       <div className={clsx('component-name', `component-name--${variant}`, className)}>
         {t('componentName.title')}
       </div>
     );
   };

   export default ComponentName;
   ```

4. **Створити `component-name.css`** (kebab-case)
   - БЕМ: `.component-name`, `.component-name__element`, `.component-name--modifier`
   - Використовувати **тільки CSS-токени**: `var(--space-4)`, `var(--radius-md)`, `var(--transition-normal)`, `var(--color-text)`
   - Адаптив: `@media (max-width: 767px)` — mobile, `@media (max-width: 1439px)` — tablet

5. **Створити `index.ts`** — barrel export
   ```ts
   export { default } from './ComponentName';
   ```

6. **Створити `i18n/uk.json` та `i18n/en.json`** (якщо компонент має текст)
   - Збираються автоматично через `import.meta.glob` в `src/i18n/index.ts`

7. **Додати CSS-імпорт** у `src/styles/index.css`
   ```css
   @import '../components/ComponentName/component-name.css';
   ```

8. **Перевірити**
   - `npm run lint` — без помилок
   - `npm run typecheck` — без помилок
   - `npm run build` — білд проходить

### Що НЕ робити

- ❌ CSS Modules (`.module.css`) — тільки БЕМ
- ❌ Хардкод тексту в JSX — тільки `t('key')`
- ❌ Хардкод пікселів у CSS — тільки `var(--space-*)`, `var(--radius-*)` тощо
- ❌ Імпорт CSS у компоненті — тільки через `styles/index.css`
- ❌ Відносні імпорти `../../` — тільки `@/components/...`
- ❌ Інтерфейси прямо в компоненті — виносити в `interfaces/`, один файл на інтерфейс

---

## Дизайн-токени

### Файли токенів (`src/styles/`)

| Файл | Зміст |
|------|-------|
| `colors.css` | Палітра, семантичні кольори, оверлеї, font stacks |
| `spacing.css` | `--space-1` (4px) ... `--space-20` (80px), крок 4px |
| `radius.css` | `--radius-xs` (4px) ... `--radius-full` (50%) |
| `transitions.css` | `--duration-fast/normal/slow`, `--transition-*` |
| `shadows.css` | `--shadow-sm`, `--shadow-md` |
| `z-index.css` | `--z-dropdown`, `--z-modal-overlay`, `--z-modal` |

### Правило

> **Всі значення spacing, radius, transition, shadow, z-index, кольори** — тільки через CSS-змінні. Ніяких хардкоджених `12px`, `#FE7BCF`, `0.2s ease` в компонентах.

---

## Сторінки (TODO)

### 1. Конструктор десерту (головна фіча)
Пошаговий wizard з бічною навігацією (stepper).

**Кроки:**
- [ ] Про десерт — назва, категорія, тип
- [ ] Основа — вибір основи десерту
- [ ] Начинки — вибір начинок
- [ ] Додати — додаткові компоненти з селектором кількості
- [ ] Пакування — вибір упаковки з селектором кількості
- [ ] Розрахунки — вага, собівартість, кнопка "Перейти до рецепту"
- [ ] Рецепт — інгредієнти, інвентар, технологія

### 2. Пошук рецептів
- [ ] Фільтри/пошуковий рядок
- [ ] Список результатів (карточки)
- [ ] Пагінація

### 3. Мої рецепти
- [ ] Сітка карточек десертів
- [ ] Пагінація

### 4. Про десерт (деталі)
- [ ] Hero-секція з фото
- [ ] Технологія, Інгредієнти, Інвентар

### 5. Профіль
- [ ] Перегляд профілю
- [ ] Редагування профілю (форма)

---

## Компоненти (TODO)

- [ ] `Header` — логотип, навігація, аватар
- [ ] `Footer` — копірайт, посилання, соціальні мережі
- [ ] `StepSidebar` — вертикальна навігація конструктора
- [ ] `DessertCard` — карточка десерту
- [ ] `QuantitySelector` — +/- з числом
- [ ] `RecipeSteps` — нумеровані кроки
- [ ] `IngredientList` — список інгредієнтів
- [ ] `EquipmentList` — список інвентарю
- [ ] `HeroImage` — фото з декоративною рамкою
- [ ] `SocialLinks` — іконки соцмереж

---

## Інфраструктура (TODO)

### Важливо
- [x] **Suspense для `/demo`** — обгортка всіх lazy routes (`App.tsx`)
- [x] **Error Boundary** — обробка помилок завантаження lazy chunks (`App.tsx`)
- [x] **tsconfig** — додати `forceConsistentCasingInFileNames`, `noImplicitReturns`
- [x] **vite.config** — build оптимізації (chunk splitting, sourcemap, drop console)

### Бажано
- [ ] **Юніт-тести (Jest)** — базове покриття компонентів
- [ ] **Адаптив** — повна система (див. нижче)

---

## Деплой на Vercel

### Підготовка
- [ ] Акаунт на [vercel.com](https://vercel.com) (можна через GitHub)
- [ ] Репозиторій на GitHub (публічний або приватний)

### Крок за кроком

1. **Запушити код на GitHub**
   ```bash
   git remote add origin https://github.com/<username>/dessert-designer-website.git
   git push -u origin main
   ```

2. **Зайти на [vercel.com/new](https://vercel.com/new)**
   - Натиснути "Import Project"
   - Вибрати репозиторій `dessert-designer-website`

3. **Налаштування (Vercel визначить Vite автоматично)**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Натиснути "Deploy"** — Vercel збілдить і видасть URL

5. **Результат**: сайт доступний на `https://dessert-designer-website.vercel.app`

### Що врахувати

- **HashRouter** — працює з Vercel без додаткових налаштувань (все через `index.html`)
- **Environment Variables** — якщо будуть `.env` змінні, додати їх у Vercel Dashboard → Settings → Environment Variables
- **Auto-deploy** — кожен push в `main` автоматично деплоїть нову версію
- **Preview deploys** — кожен pull request отримує свій preview URL

---

## Адаптив (TODO)

### Брейкпоінти

| Назва | Діапазон | Контейнер padding |
|-------|----------|-------------------|
| mobile | 0 – 767px | 16px |
| tablet | 768px – 1439px | 32px |
| desktop | 1440px+ | 80px |

### 1. Токени брейкпоінтів (`styles/breakpoints.css`)
- [ ] CSS custom media queries або змінні для брейкпоінтів
- [ ] `--breakpoint-mobile: 767px`, `--breakpoint-tablet: 1439px`

### 2. Grid-система (`styles/grid.css`)
- [ ] `.grid` — базова CSS Grid обгортка
- [ ] `.grid--2`, `.grid--3`, `.grid--4` — кількість колонок
- [ ] Адаптив: на mobile — 1 колонка, tablet — 2, desktop — 3-4
- [ ] Gap через `var(--space-*)` токени

### 3. Контейнер (вже є `layout.css`)
- [ ] Перевірити `.f-container` на всіх брейкпоінтах
- [ ] Додати `.f-container--narrow` (max-width: 800px) для форм/профілю
- [ ] Додати `.f-container--wide` (max-width: 1600px) якщо потрібно

### 4. Адаптивні утиліти (`styles/responsive.css`)
- [ ] `.hidden-mobile` / `.hidden-desktop` — приховати на певному брейкпоінті
- [ ] `.text-center-mobile` — центрування тексту на mobile
- [ ] Адаптивні spacing утиліти якщо потрібно

### 5. Типографіка — адаптивні розміри
- [ ] `.h1` — зменшити на mobile (64px → 36px)
- [ ] `.h2` — зменшити на mobile (28px → 24px)
- [ ] `.text` — зменшити на mobile (20px → 16px)

### 6. Компоненти — адаптувати кожний
- [ ] Перевірити всі існуючі компоненти на 393px і 768px
- [ ] Кнопки — адаптивні padding (вже частково є)
- [ ] Модалка — full-screen на mobile
- [ ] Dropdown/Select — full-width на mobile (вже є)
- [ ] Форми — stack на mobile

### 7. Сторінки — адаптувати кожну
- [ ] HomePage — навігація, відступи
- [ ] ConstructorPage — sidebar → bottom sheet на mobile
- [ ] SearchPage — фільтри → collapse на mobile
- [ ] MyRecipesPage — grid 1 колонка на mobile
- [ ] RecipeDetailPage — hero full-width на mobile
- [ ] ProfilePage — stack layout на mobile
- [ ] DemoPage — swatches wrap, зменшити відступи
- [x] **`.nvmrc`** — зафіксувати версію Node для команди
- [ ] **`.env.example`** — документація env змінних (коли буде API)
- [x] **`hooks/index.ts`** — barrel export для хуків
- [ ] **Корисні хуки** — `useDebounce`, `useMediaQuery` (по мірі потреби)

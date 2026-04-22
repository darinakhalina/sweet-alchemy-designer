import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Input from '@/components/Input';

const colors = [
  { name: '--brand-600', value: '#FE7BCF', var: 'var(--brand-600)' },
  { name: '--brand-800', value: '#F42EAD', var: 'var(--brand-800)' },
  { name: '--neutral-400', value: '#2B2117', var: 'var(--neutral-400)' },
  { name: '--neutral-200', value: '#626049', var: 'var(--neutral-200)' },
  { name: '--neutral-100', value: '#C3C2AD', var: 'var(--neutral-100)' },
  { name: '--neutral-50', value: '#E9E8E3', var: 'var(--neutral-50)' },
  { name: '--white', value: '#FFFFFF', var: 'var(--white)' },
];

const semanticColors = [
  { name: '--color-text', desc: 'neutral-400' },
  { name: '--color-text-secondary', desc: 'neutral-200' },
  { name: '--color-text-muted', desc: 'neutral-100' },
  { name: '--color-border', desc: 'neutral-100' },
  { name: '--color-border-strong', desc: 'neutral-200' },
  { name: '--color-bg', desc: 'white' },
  { name: '--color-bg-hover', desc: 'neutral-50' },
  { name: '--color-bg-active', desc: 'neutral-100' },
  { name: '--color-overlay', desc: 'rgba(0,0,0,0.35)' },
  { name: '--color-hover-light', desc: 'rgba(0,0,0,0.05)' },
  { name: '--color-error', desc: '#E53E3E' },
  { name: '--color-success', desc: '#38A169' },
];

const spacingTokens = [
  { name: '--space-1', value: '4px' },
  { name: '--space-2', value: '8px' },
  { name: '--space-3', value: '12px' },
  { name: '--space-4', value: '16px' },
  { name: '--space-5', value: '20px' },
  { name: '--space-6', value: '24px' },
  { name: '--space-8', value: '32px' },
  { name: '--space-10', value: '40px' },
  { name: '--space-12', value: '48px' },
  { name: '--space-15', value: '60px' },
  { name: '--space-20', value: '80px' },
];

const radiusTokens = [
  { name: '--radius-xs', value: '4px' },
  { name: '--radius-sm', value: '8px' },
  { name: '--radius-md', value: '16px' },
  { name: '--radius-lg', value: '24px' },
  { name: '--radius-xl', value: '30px' },
  { name: '--radius-full', value: '50%' },
  { name: '--radius-pill', value: '50px' },
];

const transitionTokens = [
  { name: '--transition-fast', value: '150ms ease' },
  { name: '--transition-normal', value: '200ms ease' },
  { name: '--transition-slow', value: '300ms ease' },
];

const shadowTokens = [
  { name: '--shadow-sm', value: '0 2px 6px rgba(0,0,0,0.05)' },
  { name: '--shadow-md', value: '0 2px 6px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.06)' },
];

const fontSizeTokens = [
  { name: '--font-size-xs', value: '12px' },
  { name: '--font-size-sm', value: '14px' },
  { name: '--font-size-base', value: '16px' },
  { name: '--font-size-md', value: '18px' },
  { name: '--font-size-lg', value: '20px' },
  { name: '--font-size-xl', value: '24px' },
  { name: '--font-size-2xl', value: '28px' },
  { name: '--font-size-3xl', value: '36px' },
  { name: '--font-size-4xl', value: '48px' },
  { name: '--font-size-5xl', value: '64px' },
];

const typographyClasses = [
  { className: 'h1', label: '.h1', desc: 'Rubik 700 / 64px / uppercase' },
  { className: 'h1-accent', label: '.h1-accent', desc: 'Playpen Sans 800 / 64px / uppercase / brand-600' },
  { className: 'h2', label: '.h2', desc: 'Rubik 700 / 28px / brand-600' },
  { className: 'text-bold', label: '.text-bold', desc: 'Rubik 500 / 20px' },
  { className: 'text-sm-bold', label: '.text-sm-bold', desc: 'Rubik 500 / 16px' },
  { className: 'text', label: '.text', desc: 'Rubik 400 / 20px' },
  { className: 'text-sm', label: '.text-sm', desc: 'Rubik 400 / 16px' },
];

const iconNames = [
  'icon-arrow-down', 'icon-arrow-left', 'icon-arrow-right', 'icon-arrow-section', 'icon-arrow-up',
  'icon-balance-one', 'icon-book', 'icon-cake', 'icon-close', 'icon-cook-hat',
  'icon-dots', 'icon-edit', 'icon-effects', 'icon-facebook',
  'icon-folder', 'icon-instagram', 'icon-magic', 'icon-menu',
  'icon-multi-rectangle', 'icon-peas', 'icon-play-back', 'icon-play',
  'icon-plus-circle', 'icon-plus', 'icon-remove', 'icon-search',
  'icon-trending-down', 'icon-whirlwind', 'icon-x',
];

const iconSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const iconColorExamples = [
  { label: '--color-text', className: 'demo__icon-color--text' },
  { label: '--brand-600', className: 'demo__icon-color--brand' },
  { label: '--color-text-secondary', className: 'demo__icon-color--secondary' },
  { label: '--color-error', className: 'demo__icon-color--error' },
  { label: '--color-success', className: 'demo__icon-color--success' },
];

const navItems = [
  { id: 'icons', key: 'icons' },
  { id: 'buttons', key: 'buttons' },
  { id: 'inputs', key: 'inputs' },
  { id: 'loader', key: 'loader' },
  { id: 'colors', key: 'colors' },
  { id: 'semantic-colors', key: 'semanticColors' },
  { id: 'spacing', key: 'spacing' },
  { id: 'radius', key: 'radius' },
  { id: 'transitions', key: 'transitions' },
  { id: 'shadows', key: 'shadows' },
  { id: 'font-sizes', key: 'fontSizes' },
  { id: 'typography', key: 'typography' },
  { id: 'fonts', key: 'fonts' },
  { id: 'breakpoints', key: 'breakpoints' },
  { id: 'grid', key: 'grid' },
  { id: 'utilities', key: 'utilities' },
];

const DemoPage = () => {
  const { t } = useTranslation();

  return (
    <div className="demo">
      <div className="demo__header">
        <h1 className="demo__title">{t('pages.demo.title')}</h1>
        <LanguageSwitcher />
      </div>

      {/* === NAV === */}
      <nav className="demo__nav">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="demo__nav-link">
            {t(`pages.demo.${item.key}`)}
          </a>
        ))}
      </nav>

      {/* === ICONS === */}
      <section id="icons" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.icons')}</h2>

        <h3 className="demo__subsection-title">{t('pages.demo.iconsAllIcons')}</h3>
        <div className="demo__icon-grid">
          {iconNames.map((name) => (
            <div key={name} className="demo__icon-item">
              <Icon name={name} size="lg" />
              <code className="demo__icon-label">{name}</code>
            </div>
          ))}
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.iconsSizes')}</h3>
        <div className="demo__icon-sizes">
          {iconSizes.map((size) => (
            <div key={size} className="demo__icon-size-item">
              <Icon name="icon-magic" size={size} />
              <code className="demo__icon-label">{size}</code>
            </div>
          ))}
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.iconsColors')}</h3>
        <div className="demo__icon-colors">
          {iconColorExamples.map((item) => (
            <div key={item.label} className="demo__icon-color-item">
              <Icon name="icon-magic" size="xl" className={item.className} />
              <code className="demo__icon-label">{item.label}</code>
            </div>
          ))}
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.iconsUsage')}</h3>
        <div className="demo__code-block">
          <pre className="demo__code">
            {`<Icon name="icon-search" size="md" />
<Icon name="icon-magic" size="lg" className="my-icon" />

/* CSS — color via class */
.my-icon {
  color: var(--brand-600);
}`}
          </pre>
        </div>
      </section>

      {/* === BUTTONS === */}
      <section id="buttons" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.buttons')}</h2>

        <h3 className="demo__subsection-title">{t('pages.demo.buttonsVariants')}</h3>
        <div className="d-flex flex-wrap gap-4 align-center mb-8">
          <Button variant="primary">{t('pages.demo.buttonsLabel')}</Button>
          <Button variant="secondary">{t('pages.demo.buttonsLabel')}</Button>
          <Button variant="brand">{t('pages.demo.buttonsLabel')}</Button>
          <Button variant="ghost">{t('pages.demo.buttonsLabel')}</Button>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.buttonsSizes')}</h3>
        <div className="d-flex flex-wrap gap-4 align-center mb-8">
          <Button size="sm">{t('pages.demo.buttonsLabel')}</Button>
          <Button size="md">{t('pages.demo.buttonsLabel')}</Button>
          <Button size="lg">{t('pages.demo.buttonsLabel')}</Button>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.buttonsWithIcons')}</h3>
        <div className="d-flex flex-wrap gap-4 align-center mb-8">
          <Button iconLeft="icon-search">{t('pages.demo.buttonsSearch')}</Button>
          <Button iconRight="icon-arrow-right">{t('pages.demo.buttonsNext')}</Button>
          <Button variant="brand" iconLeft="icon-magic">{t('pages.demo.buttonsMagic')}</Button>
          <Button variant="secondary" iconLeft="icon-plus">{t('pages.demo.buttonsAdd')}</Button>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.buttonsIconOnly')}</h3>
        <div className="d-flex flex-wrap gap-4 align-center mb-8">
          <Button
            variant="brand"
            size="sm"
            iconLeft="icon-plus"
            iconOnly
          >+
          </Button>
          <Button
            variant="primary"
            size="md"
            iconLeft="icon-search"
            iconOnly
          >Search
          </Button>
          <Button
            variant="secondary"
            size="md"
            iconLeft="icon-edit"
            iconOnly
          >Edit
          </Button>
          <Button
            variant="ghost"
            size="lg"
            iconLeft="icon-menu"
            iconOnly
          >Menu
          </Button>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.buttonsUppercase')}</h3>
        <div className="d-flex flex-wrap gap-4 align-center mb-8">
          <Button uppercase>{t('pages.demo.buttonsLabel')}</Button>
          <Button variant="brand" uppercase>{t('pages.demo.buttonsLabel')}</Button>
          <Button variant="secondary" uppercase>{t('pages.demo.buttonsLabel')}</Button>
          <Button variant="ghost" uppercase>{t('pages.demo.buttonsLabel')}</Button>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.buttonsStates')}</h3>
        <div className="d-flex flex-wrap gap-4 align-center mb-8">
          <Button isDisabled>{t('pages.demo.buttonsDisabled')}</Button>
          <Button variant="secondary" isDisabled>{t('pages.demo.buttonsDisabled')}</Button>
          <Button isLoading>{t('pages.demo.buttonsLoading')}</Button>
          <Button variant="brand" isLoading>{t('pages.demo.buttonsLoading')}</Button>
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.buttonsUsage')}</h3>
        <div className="demo__code-block">
          <pre className="demo__code">
            {`<Button variant="primary" size="md">Click me</Button>
<Button variant="brand" iconLeft="icon-magic">Magic</Button>
<Button variant="secondary" iconLeft="icon-edit" iconOnly>Edit</Button>
<Button size="lg" iconRight="icon-arrow-right">Next</Button>
<Button uppercase>SUBMIT</Button>`}
          </pre>
        </div>
      </section>

      {/* === INPUTS === */}
      <section id="inputs" className="demo__section">
        <h2 className="demo__section-title">Inputs</h2>

        <Formik
          initialValues={{
            name: '',
            email: 'baker@gmail',
            password: '',
            search: '',
            searchIcons: '',
            portions: '6',
            diameter: '16',
            shape: '',
            disabledField: 'Disabled value',
            readonlyField: 'Read-only text',
            technology: '',
            filledDefault: '',
            filledValue: 'Ягідна хмаринка',
            filledError: '6',
          }}
          initialErrors={{
            email: 'Невірний email',
            filledError: 'Це поле обов\'язкове',
          }}
          initialTouched={{
            email: true,
            filledError: true,
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.name) errors.name = 'Обов\'язкове поле';
            if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              errors.email = 'Невірний email';
            }
            if (values.password && values.password.length < 6) {
              errors.password = 'Мінімум 6 символів';
            }
            return errors;
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <h3 className="demo__subsection-title">Outlined (default)</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="name"
                  label="Ім'я"
                  placeholder="Оксана"
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="email"
                  type="email"
                  label="Електронна пошта"
                  placeholder="baker@gmail.com"
                  helpText="Введіть вашу електронну пошту"
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">Filled variant</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-4">
                <Input
                  name="filledDefault"
                  variant="filled"
                  label="Кількість порцій"
                  placeholder="Введіть значення"
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="filledValue"
                  variant="filled"
                  label="Назва"
                  helpText="Введіть назву рецепту"
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="filledError"
                  variant="filled"
                  label="Кількість порцій"
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">Password with validation</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="password"
                  type="password"
                  label="Пароль"
                  placeholder="******"
                  showPasswordToggle
                  helpText="Мінімум 6 символів"
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">With icons</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="search"
                  startIcon="icon-search"
                  placeholder="Шукати рецепти"
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="searchIcons"
                  placeholder="торт"
                  endAdornment={(
                    <>
                      <button type="button" className="input__icon-btn">
                        <Icon name="icon-search" size="lg" />
                      </button>
                      <button type="button" className="input__icon-btn">
                        <Icon name="icon-edit" size="md" />
                      </button>
                    </>
                  )}
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">Grid layout (3 columns)</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-4">
                <Input
                  name="portions"
                  label="Кількість порцій"
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="diameter"
                  label="Діаметр"
                  helpText="В сантиметрах"
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="shape"
                  label="Форма"
                  placeholder="кругла"
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">States</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="disabledField"
                  label="Disabled"
                  disabled
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="readonlyField"
                  label="Read-only"
                  readOnly
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">Textarea (multiline)</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12">
                <Input
                  name="technology"
                  multiline
                  rows={5}
                  label="Технологія"
                  placeholder="Подрібніть печиво в блендері, додайте розтоплене масло і добре перемішайте..."
                />
              </div>
            </div>

            <div className="d-flex gap-4 mb-8">
              <Button type="submit" variant="primary">Зберегти</Button>
              <Button type="reset" variant="secondary">Скинути</Button>
            </div>

            <h3 className="demo__subsection-title mt-8">Usage</h3>
            <div className="demo__code-block">
              <pre className="demo__code">
                {`{/* Outlined (default) */}
<Input name="email" label="Пошта" placeholder="baker@gmail.com" />

{/* Filled variant */}
<Input name="name" variant="filled" label="Назва" />

{/* Password with toggle */}
<Input name="password" type="password" showPasswordToggle />

{/* Search with icons */}
<Input name="search" startIcon="icon-search" placeholder="Шукати..." />
<Input name="q" endAdornment={<><IconBtn .../><IconBtn .../></>} />

{/* Textarea */}
<Input name="tech" multiline rows={5} label="Технологія" />

{/* Formik validation — just add validate to <Formik> */}`}
              </pre>
            </div>
          </Form>
        </Formik>
      </section>

      {/* === LOADER === */}
      <section id="loader" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.loader')}</h2>

        <h3 className="demo__subsection-title">{t('pages.demo.loaderSizes')}</h3>
        <div className="d-flex flex-wrap gap-8 align-center mb-8">
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.loaderVariants')}</h3>
        <div className="d-flex flex-wrap gap-8 align-center mb-8">
          <Loader variant="primary" />
          <Loader variant="brand" />
          <div className="p-6" style={{ background: 'var(--neutral-400)', borderRadius: 'var(--radius-md)' }}>
            <Loader variant="light" />
          </div>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.loaderOverlay')}</h3>
        <div className="demo__loader-overlay-demo">
          <p className="text-sm">{t('pages.demo.loaderOverlayDesc')}</p>
          <Loader overlay />
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.loaderUsage')}</h3>
        <div className="demo__code-block">
          <pre className="demo__code">
            {`<Loader />
<Loader size="sm" variant="brand" />
<Loader size="lg" />
<Loader overlay />  {/* fullscreen overlay */}`}
          </pre>
        </div>
      </section>

      {/* === COLORS === */}
      <section id="colors" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.colors')}</h2>
        <div className="demo__colors">
          {colors.map((color) => (
            <div key={color.name} className="demo__swatch">
              <div
                className="demo__swatch-box"
                style={{ backgroundColor: color.var }}
              />
              <span className="demo__swatch-name">{color.name}</span>
              <span className="demo__swatch-value">{color.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === SEMANTIC COLORS === */}
      <section id="semantic-colors" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.semanticColors')}</h2>
        <div className="demo__token-grid">
          {semanticColors.map((item) => (
            <div key={item.name} className="demo__token-row">
              <div
                className="demo__token-preview"
                style={{ backgroundColor: `var(${item.name})` }}
              />
              <code className="demo__token-name">{item.name}</code>
              <span className="demo__token-value">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === SPACING === */}
      <section id="spacing" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.spacing')}</h2>
        <div className="demo__spacing-list">
          {spacingTokens.map((item) => (
            <div key={item.name} className="demo__spacing-row">
              <code className="demo__token-name">{item.name}</code>
              <div className="demo__spacing-bar-wrap">
                <div
                  className="demo__spacing-bar"
                  style={{ width: `var(${item.name})` }}
                />
              </div>
              <span className="demo__token-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === RADIUS === */}
      <section id="radius" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.radius')}</h2>
        <div className="demo__radius-list">
          {radiusTokens.map((item) => (
            <div key={item.name} className="demo__radius-item">
              <div
                className="demo__radius-box"
                style={{ borderRadius: `var(${item.name})` }}
              />
              <code className="demo__token-name">{item.name}</code>
              <span className="demo__token-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === TRANSITIONS === */}
      <section id="transitions" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.transitions')}</h2>
        <div className="demo__token-grid">
          {transitionTokens.map((item) => (
            <div key={item.name} className="demo__transition-row">
              <code className="demo__token-name">{item.name}</code>
              <div className="demo__transition-track">
                <div
                  className="demo__transition-dot"
                  style={{ transition: `transform var(${item.name})` }}
                />
              </div>
              <span className="demo__token-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === SHADOWS === */}
      <section id="shadows" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.shadows')}</h2>
        <div className="demo__shadow-list">
          {shadowTokens.map((item) => (
            <div key={item.name} className="demo__shadow-item">
              <div
                className="demo__shadow-box"
                style={{ boxShadow: `var(${item.name})` }}
              />
              <code className="demo__token-name">{item.name}</code>
            </div>
          ))}
        </div>
      </section>

      {/* === FONT SIZES === */}
      <section id="font-sizes" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.fontSizes')}</h2>
        <div className="demo__token-grid">
          {fontSizeTokens.map((item) => (
            <div key={item.name} className="demo__token-row">
              <code className="demo__token-name">{item.name}</code>
              <span style={{ fontSize: `var(${item.name})` }}>
                SweetAlchemy
              </span>
              <span className="demo__token-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === TYPOGRAPHY === */}
      <section id="typography" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.typography')}</h2>
        {typographyClasses.map((item) => (
          <div key={item.className} className="demo__type-row">
            <div className="demo__type-label">{item.label}</div>
            <div className={item.className}>
              SweetAlchemy — Precision in every recipe
            </div>
            <div className="demo__type-meta">{item.desc}</div>
          </div>
        ))}
      </section>

      {/* === FONTS === */}
      <section id="fonts" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.fonts')}</h2>
        <div className="demo__fonts">
          <div className="demo__font-card">
            <div className="demo__font-name">Rubik (--font-primary)</div>
            <div className="demo__font-sample" style={{ fontFamily: 'var(--font-primary)' }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="demo__font-weights">
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">400 Regular</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-primary)', fontWeight: 400 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">500 Medium</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">700 Bold</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-primary)', fontWeight: 700 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
            </div>
          </div>

          <div className="demo__font-card">
            <div className="demo__font-name">Playpen Sans (--font-accent)</div>
            <div className="demo__font-sample" style={{ fontFamily: 'var(--font-accent)', fontWeight: 800 }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="demo__font-weights">
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">800 ExtraBold</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-accent)', fontWeight: 800 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === BREAKPOINTS === */}
      <section id="breakpoints" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.breakpoints')}</h2>

        <h3 className="demo__subsection-title">{t('pages.demo.breakpointsTokens')}</h3>
        <div className="demo__utilities-table mb-6">
          <div className="demo__utilities-row">
            <code className="demo__token-name">--mobile</code>
            <span className="demo__token-value">max-width: 767px</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">--tablet</code>
            <span className="demo__token-value">768px — 1199px</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">--desktop</code>
            <span className="demo__token-value">min-width: 1200px</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">--not-mobile</code>
            <span className="demo__token-value">min-width: 768px (tablet + desktop)</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">--not-desktop</code>
            <span className="demo__token-value">max-width: 1199px (mobile + tablet)</span>
          </div>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.breakpointsUsage')}</h3>
        <div className="demo__code-block mb-6">
          <pre className="demo__code">
            {`/* breakpoints.css */
@custom-media --mobile (max-width: 767px);
@custom-media --tablet (min-width: 768px) and (max-width: 1199px);
@custom-media --desktop (min-width: 1200px);
@custom-media --not-mobile (min-width: 768px);
@custom-media --not-desktop (max-width: 1199px);

/* component.css */
.card {
  padding: var(--space-6);
}

@media (--mobile) {
  .card {
    padding: var(--space-3);
  }
}

@media (--not-mobile) {
  .card {
    display: flex;
    gap: var(--space-6);
  }
}`}
          </pre>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.breakpointsLive')}</h3>
        <div className="demo__breakpoint-live">
          <div className="demo__breakpoint-indicator demo__breakpoint-indicator--mobile visible-mobile">
            MOBILE (&lt; 768px)
          </div>
          <div className="demo__breakpoint-indicator demo__breakpoint-indicator--tablet visible-tablet">
            TABLET (768px — 1199px)
          </div>
          <div className="demo__breakpoint-indicator demo__breakpoint-indicator--desktop visible-desktop">
            DESKTOP (1200px+)
          </div>
        </div>

        <h3 className="demo__subsection-title mt-6">{t('pages.demo.breakpointsCheatsheet')}</h3>
        <div className="demo__utilities-table">
          <div className="demo__utilities-row">
            <code className="demo__token-name">{t('pages.demo.breakpointsOnlyMobile')}</code>
            <code className="demo__token-value">@media (--mobile) {'{ ... }'}</code>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">{t('pages.demo.breakpointsOnlyTablet')}</code>
            <code className="demo__token-value">@media (--tablet) {'{ ... }'}</code>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">{t('pages.demo.breakpointsOnlyDesktop')}</code>
            <code className="demo__token-value">@media (--desktop) {'{ ... }'}</code>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">{t('pages.demo.breakpointsTabletUp')}</code>
            <code className="demo__token-value">@media (--not-mobile) {'{ ... }'}</code>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">{t('pages.demo.breakpointsMobileTablet')}</code>
            <code className="demo__token-value">@media (--not-desktop) {'{ ... }'}</code>
          </div>
        </div>
      </section>

      {/* === GRID === */}
      <section id="grid" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.grid')}</h2>

        <h3 className="demo__subsection-title">12 {t('pages.demo.gridColumns')}</h3>
        <div className="row row--gap-sm mb-6">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="col-1">
              <div className="demo__grid-cell">1</div>
            </div>
          ))}
        </div>

        <h3 className="demo__subsection-title">6 + 6</h3>
        <div className="row row--gap-sm mb-6">
          <div className="col-6"><div className="demo__grid-cell">col-6</div></div>
          <div className="col-6"><div className="demo__grid-cell">col-6</div></div>
        </div>

        <h3 className="demo__subsection-title">4 + 4 + 4</h3>
        <div className="row row--gap-sm mb-6">
          <div className="col-4"><div className="demo__grid-cell">col-4</div></div>
          <div className="col-4"><div className="demo__grid-cell">col-4</div></div>
          <div className="col-4"><div className="demo__grid-cell">col-4</div></div>
        </div>

        <h3 className="demo__subsection-title">3 + 3 + 3 + 3</h3>
        <div className="row row--gap-sm mb-6">
          <div className="col-3"><div className="demo__grid-cell">col-3</div></div>
          <div className="col-3"><div className="demo__grid-cell">col-3</div></div>
          <div className="col-3"><div className="demo__grid-cell">col-3</div></div>
          <div className="col-3"><div className="demo__grid-cell">col-3</div></div>
        </div>

        <h3 className="demo__subsection-title">2 + 2 + 2 + 2 + 2 + 2</h3>
        <div className="row row--gap-sm mb-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="col-2"><div className="demo__grid-cell">col-2</div></div>
          ))}
        </div>

        <h3 className="demo__subsection-title">1 x 12</h3>
        <div className="row row--gap-sm mb-6">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="col-1"><div className="demo__grid-cell">1</div></div>
          ))}
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.gridMixed')}</h3>
        <div className="row row--gap-sm mb-6">
          <div className="col-8"><div className="demo__grid-cell">col-8</div></div>
          <div className="col-4"><div className="demo__grid-cell">col-4</div></div>
        </div>
        <div className="row row--gap-sm mb-6">
          <div className="col-3"><div className="demo__grid-cell">col-3</div></div>
          <div className="col-6"><div className="demo__grid-cell">col-6</div></div>
          <div className="col-3"><div className="demo__grid-cell">col-3</div></div>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.gridResponsive')}</h3>
        <div className="row row--gap-sm mb-6">
          <div className="col-12 col-md-6 col-lg-3"><div className="demo__grid-cell">col-12 / md-6 / lg-3</div></div>
          <div className="col-12 col-md-6 col-lg-3"><div className="demo__grid-cell">col-12 / md-6 / lg-3</div></div>
          <div className="col-12 col-md-6 col-lg-3"><div className="demo__grid-cell">col-12 / md-6 / lg-3</div></div>
          <div className="col-12 col-md-6 col-lg-3"><div className="demo__grid-cell">col-12 / md-6 / lg-3</div></div>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.gridOffset')}</h3>
        <div className="row row--gap-sm mb-6">
          <div className="col-6 offset-3"><div className="demo__grid-cell">col-6 offset-3</div></div>
        </div>
        <div className="row row--gap-sm">
          <div className="col-4 offset-1"><div className="demo__grid-cell">col-4 offset-1</div></div>
          <div className="col-4 offset-2"><div className="demo__grid-cell">col-4 offset-2</div></div>
        </div>
      </section>

      {/* === UTILITIES === */}
      <section id="utilities" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.utilities')}</h2>

        <h3 className="demo__subsection-title">{t('pages.demo.utilitiesSpacing')}</h3>
        <div className="demo__utilities-table">
          <div className="demo__utilities-row">
            <code className="demo__token-name">.mt-4, .mb-4, .ml-4, .mr-4</code>
            <span className="demo__token-value">margin-top/bottom/left/right: var(--space-4)</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">.mx-auto</code>
            <span className="demo__token-value">margin-left: auto; margin-right: auto</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">.p-4, .px-4, .py-4</code>
            <span className="demo__token-value">padding / padding-x / padding-y: var(--space-4)</span>
          </div>
        </div>
        <div className="demo__utilities-demo mt-4">
          <div className="demo__utilities-box p-2"><code>.p-2</code></div>
          <div className="demo__utilities-box p-4"><code>.p-4</code></div>
          <div className="demo__utilities-box p-6"><code>.p-6</code></div>
          <div className="demo__utilities-box p-8"><code>.p-8</code></div>
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.utilitiesDisplay')}</h3>
        <div className="demo__utilities-table">
          <div className="demo__utilities-row">
            <code className="demo__token-name">.d-none, .d-block, .d-flex, .d-inline-block</code>
            <span className="demo__token-value">{t('pages.demo.utilitiesDisplayDesc')}</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">.d-md-none, .d-md-flex, .d-lg-block</code>
            <span className="demo__token-value">{t('pages.demo.utilitiesResponsiveDesc')}</span>
          </div>
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.utilitiesFlex')}</h3>
        <div className="demo__utilities-table">
          <div className="demo__utilities-row">
            <code className="demo__token-name">.flex-row, .flex-column, .flex-wrap</code>
            <span className="demo__token-value">{t('pages.demo.utilitiesFlexDirection')}</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">.justify-center, .justify-between, .align-center</code>
            <span className="demo__token-value">{t('pages.demo.utilitiesFlexAlign')}</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">.gap-1 ... .gap-8</code>
            <span className="demo__token-value">{t('pages.demo.utilitiesGap')}</span>
          </div>
        </div>
        <div className="d-flex gap-4 flex-wrap mt-4">
          <div className="demo__grid-cell px-4 py-2">flex item 1</div>
          <div className="demo__grid-cell px-4 py-2">flex item 2</div>
          <div className="demo__grid-cell px-4 py-2">flex item 3</div>
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.utilitiesText')}</h3>
        <div className="demo__utilities-table">
          <div className="demo__utilities-row">
            <code className="demo__token-name">.text-left, .text-center, .text-right</code>
            <span className="demo__token-value">{t('pages.demo.utilitiesTextAlign')}</span>
          </div>
          <div className="demo__utilities-row">
            <code className="demo__token-name">.text-uppercase, .text-truncate</code>
            <span className="demo__token-value">{t('pages.demo.utilitiesTextTransform')}</span>
          </div>
        </div>
        <div className="row row--gap-sm mt-4">
          <div className="col-4"><div className="demo__text-align-cell text-left">.text-left</div></div>
          <div className="col-4"><div className="demo__text-align-cell text-center">.text-center</div></div>
          <div className="col-4"><div className="demo__text-align-cell text-right">.text-right</div></div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { ROUTES } from '@/constants/routes';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Input from '@/components/Input';
import Pagination from '@/components/Pagination';
import Dropdown from '@/components/Dropdown';
import Checkbox from '@/components/Checkbox';
import Switch from '@/components/Switch';
import RadioGroup from '@/components/RadioGroup';
import type { DropdownOption } from '@/components/Dropdown';

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
  'icon-balance-one', 'icon-book', 'icon-cake', 'icon-check', 'icon-close', 'icon-cook-hat',
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
  { id: 'form-controls', key: 'formControls' },
  { id: 'dropdowns', key: 'dropdowns' },
  { id: 'pagination', key: 'pagination' },
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
  { id: 'patterns', key: 'patterns' },
];

const portionOptions: DropdownOption[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '8', label: '8' },
  { value: '12', label: '12' },
];

const DemoPage = () => {
  const { t } = useTranslation();
  const [demoPage, setDemoPage] = useState(1);
  const [demoPage2, setDemoPage2] = useState(5);
  const [dropdownValue, setDropdownValue] = useState('6');

  const sizeOptions = useMemo((): DropdownOption[] => [
    { value: 'sm', label: t('pages.demo.sizeSmall') },
    { value: 'md', label: t('pages.demo.sizeMedium') },
    { value: 'lg', label: t('pages.demo.sizeLarge') },
  ], [t]);

  const deliveryOptions = useMemo((): DropdownOption[] => [
    { value: 'pickup', label: t('pages.demo.deliveryPickup') },
    { value: 'courier', label: t('pages.demo.deliveryCourier') },
    { value: 'post', label: t('pages.demo.deliveryPost') },
    { value: 'other', label: t('pages.demo.deliveryOther'), disabled: true },
  ], [t]);

  const ingredientOptions = useMemo((): DropdownOption[] => [
    { value: 'sugar', label: t('pages.demo.ingredientSugar') },
    { value: 'gelatin', label: t('pages.demo.ingredientGelatin') },
    { value: 'water', label: t('pages.demo.ingredientWater') },
    { value: 'oreo', label: t('pages.demo.ingredientOreo') },
    { value: 'strawberry', label: t('pages.demo.ingredientStrawberry') },
    { value: 'cream', label: t('pages.demo.ingredientCream') },
    { value: 'butter', label: t('pages.demo.ingredientButter') },
    { value: 'flour', label: t('pages.demo.ingredientFlour') },
  ], [t]);

  return (
    <div className="demo">
      <div className="demo__header">
        <h1 className="demo__title">{t('pages.demo.title')}</h1>
        <LanguageSwitcher />
      </div>

      {/* === NAV === */}
      <nav className="demo__nav">
        <Link to={ROUTES.HOME} className="demo__nav-link">
          {t('pages.demo.backToHome')}
        </Link>
        {navItems.map((item) => (
          item.id === 'patterns' ? (
            <Link key={item.id} to={ROUTES.DEMO_PATTERNS} className="demo__nav-link">
              {t(`pages.demo.${item.key}`)}
            </Link>
          ) : (
            <a key={item.id} href={`#${item.id}`} className="demo__nav-link">
              {t(`pages.demo.${item.key}`)}
            </a>
          )
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
        <h2 className="demo__section-title">{t('pages.demo.inputs')}</h2>

        <Formik
          initialValues={{
            outlined: '',
            filled: 'Berry Cloud',
            password: '',
            searchDemo: '',
            disabledDemo: t('pages.demo.inputDisabledValue'),
            readonlyDemo: t('pages.demo.inputReadOnlyText'),
            textareaDemo: '',
          }}
          onSubmit={() => {}}
        >
          <Form>
            <h3 className="demo__subsection-title">{t('pages.demo.inputsOutlined')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="outlined"
                  label={t('pages.demo.labelOutlined')}
                  placeholder={t('pages.demo.inputOutlinedPlaceholder')}
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="filled"
                  variant="filled"
                  label={t('pages.demo.labelFilled')}
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">{t('pages.demo.inputsPassword')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="password"
                  type="password"
                  label={t('pages.demo.inputPassword')}
                  placeholder="******"
                  showPasswordToggle
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">{t('pages.demo.inputsWithIcons')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="searchDemo"
                  startIcon="icon-search"
                  placeholder={t('pages.demo.inputSearchPlaceholder')}
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">{t('pages.demo.inputsStates')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="disabledDemo"
                  label={t('pages.demo.labelDisabledInput')}
                  disabled
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="readonlyDemo"
                  label={t('pages.demo.labelReadOnly')}
                  readOnly
                />
              </div>
            </div>

            <h3 className="demo__subsection-title">{t('pages.demo.inputsTextarea')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12">
                <Input
                  name="textareaDemo"
                  multiline
                  rows={3}
                  label={t('pages.demo.labelTextarea')}
                  placeholder={t('pages.demo.inputTextareaPlaceholder')}
                />
              </div>
            </div>
          </Form>
        </Formik>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.inputsUsage')}</h3>
        <div className="demo__code-block">
          <pre className="demo__code">
            {`<Input name="email" label="Email" placeholder="baker@gmail.com" />
<Input name="name" variant="filled" label="Name" />
<Input name="password" type="password" showPasswordToggle />
<Input name="search" startIcon="icon-search" placeholder="Search..." />
<Input name="tech" multiline rows={5} label="Technology" />`}
          </pre>
        </div>
      </section>

      {/* === FORM CONTROLS === */}
      <section id="form-controls" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.formControls')}</h2>

        <Formik
          initialValues={{
            agree: false,
            newsletter: true,
            terms: false,
            notifications: false,
            darkMode: true,
            autoSave: false,
            size: 'md',
            delivery: '',
          }}
          onSubmit={() => {}}
        >
          <Form>
            <h3 className="demo__subsection-title">{t('pages.demo.formControlsCheckbox')}</h3>
            <div className="d-flex flex-column gap-4 mb-8">
              <Checkbox name="agree" label={t('pages.demo.checkboxAgree')} />
              <Checkbox name="newsletter" label={t('pages.demo.checkboxNewsletter')} />
              <Checkbox name="terms" label={t('pages.demo.labelDisabled')} disabled />
            </div>

            <h3 className="demo__subsection-title">{t('pages.demo.formControlsSwitch')}</h3>
            <div className="d-flex flex-column gap-4 mb-8">
              <Switch name="notifications" label={t('pages.demo.switchNotifications')} />
              <Switch name="darkMode" label={t('pages.demo.switchDarkMode')} />
              <Switch name="autoSave" label={t('pages.demo.labelDisabled')} disabled />
            </div>

            <h3 className="demo__subsection-title">{t('pages.demo.formControlsRadioGroup')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <RadioGroup name="size" options={sizeOptions} label={t('pages.demo.radioSize')} />
              </div>
              <div className="col-12 col-md-6">
                <RadioGroup name="delivery" options={deliveryOptions} label={t('pages.demo.radioDelivery')} />
              </div>
            </div>
          </Form>
        </Formik>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.formControlsUsage')}</h3>
        <div className="demo__code-block">
          <pre className="demo__code">
            {`{/* Checkbox — Formik field */}
<Checkbox name="agree" label="I agree to the terms" />
<Checkbox name="terms" label="Disabled" disabled />

{/* Switch — Formik field */}
<Switch name="darkMode" label="Dark mode" />

{/* RadioGroup — Formik field */}
<RadioGroup name="size" options={sizeOptions} label="Size" />`}
          </pre>
        </div>
      </section>

      {/* === DROPDOWNS === */}
      <section id="dropdowns" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.dropdowns')}</h2>

        <h3 className="demo__subsection-title">{t('pages.demo.dropdownsStandalone')}</h3>
        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-6">
            <p className="text-sm mb-4">{t('pages.demo.dropdownsButtonTrigger')}</p>
            <Dropdown
              options={portionOptions}
              selectedValue={dropdownValue}
              onSelect={(opt) => setDropdownValue(opt.value)}
              trigger={({ isOpen, selectedOption, toggleProps }) => (
                <button {...toggleProps} type="button" className="btn btn--secondary btn--md">
                  <span className="btn__label">
                    {selectedOption?.label ?? t('pages.demo.dropdownSelect')}
                    {isOpen ? ' (open)' : ''}
                  </span>
                  <Icon name="icon-arrow-down" size="md" className="btn__icon" />
                </button>
              )}
              data-testid="demo-dropdown-btn"
            />
            <p className="text-sm mt-4">
              Selected: {dropdownValue}
            </p>
          </div>
          <div className="col-12 col-md-6">
            <p className="text-sm mb-4">{t('pages.demo.dropdownsSearchable')}</p>
            <Dropdown
              options={ingredientOptions}
              onSelect={(opt) => alert(`Selected: ${opt.label}`)}
              searchable
              searchPlaceholder={t('pages.demo.inputSearchPlaceholder')}
              trigger={({ toggleProps }) => (
                <button {...toggleProps} type="button" className="btn btn--ghost btn--md">
                  <span className="btn__label">{t('pages.demo.dropdownIngredients')}</span>
                  <Icon name="icon-arrow-down" size="md" className="btn__icon" />
                </button>
              )}
              data-testid="demo-dropdown-search"
            />
          </div>
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.dropdownsUsage')}</h3>
        <div className="demo__code-block">
          <pre className="demo__code">
            {`{/* Dropdown — standalone, any trigger */}
<Dropdown
  options={options}
  selectedValue={value}
  onSelect={(opt) => setValue(opt.value)}
  trigger={({ isOpen }) => <Button>Select {isOpen ? '▲' : '▼'}</Button>}
/>

{/* Dropdown — searchable */}
<Dropdown options={options} onSelect={fn} searchable trigger={...} />`}
          </pre>
        </div>
      </section>

      {/* === PAGINATION === */}
      <section id="pagination" className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.pagination')}</h2>

        <h3 className="demo__subsection-title">{t('pages.demo.paginationDefault')}</h3>
        <div className="mb-8">
          <Pagination page={demoPage} totalPages={15} onChange={setDemoPage} />
          <p className="text-sm text-center mt-4">
            {t('pages.demo.paginationCurrent')}: {demoPage}
          </p>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.paginationSiblings')}</h3>
        <div className="mb-8">
          <Pagination
            page={demoPage2}
            totalPages={20}
            onChange={setDemoPage2}
            siblingCount={2}
            boundaryCount={2}
          />
          <p className="text-sm text-center mt-4">
            {t('pages.demo.paginationCurrent')}: {demoPage2} (siblingCount=2, boundaryCount=2)
          </p>
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.paginationFewPages')}</h3>
        <div className="mb-8">
          <Pagination page={2} totalPages={5} onChange={() => {}} />
        </div>

        <h3 className="demo__subsection-title">{t('pages.demo.paginationDisabled')}</h3>
        <div className="mb-8">
          <Pagination
            page={3}
            totalPages={10}
            onChange={() => {}}
            disabled
          />
        </div>

        <h3 className="demo__subsection-title mt-8">{t('pages.demo.paginationUsage')}</h3>
        <div className="demo__code-block">
          <pre className="demo__code">
            {`<Pagination page={page} totalPages={15} onChange={setPage} />

{/* More visible pages */}
<Pagination page={page} totalPages={20} onChange={setPage}
  siblingCount={2} boundaryCount={2} />

{/* Disabled */}
<Pagination page={3} totalPages={10} onChange={fn} disabled />`}
          </pre>
        </div>
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

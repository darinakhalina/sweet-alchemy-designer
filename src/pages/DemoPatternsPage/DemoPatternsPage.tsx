import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDesserts, fetchDessertsError } from '@/store/desserts/dessertsThunks';
import { getErrorMessage } from '@/services/helpers/getErrorMessage';
import { ERROR_CODES } from '@/constants/errorCodes';
import { ROUTES } from '@/constants/routes';
import type { ApiError } from '@/services/interfaces/ApiError';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Select from '@/components/Select';
import AnimatedList from '@/components/AnimatedList';
import Stepper from '@/components/Stepper';
import Checkbox from '@/components/Checkbox';
import Switch from '@/components/Switch';
import RadioGroup from '@/components/RadioGroup';
import type { DropdownOption } from '@/components/Dropdown';

const navItems = [
  { id: 'formik-inputs', key: 'navFormikInputs' },
  { id: 'formik-select', key: 'navFormikSelect' },
  { id: 'error-handling', key: 'navErrorHandling' },
  { id: 'stepper-demo', key: 'navStepper' },
];

const portionOptions: DropdownOption[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '8', label: '8' },
  { value: '12', label: '12' },
];

const currencyOptions: DropdownOption[] = [
  { value: 'UAH', label: 'UAH' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

const DemoPatternsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.desserts);

  const categoryOptions = useMemo((): DropdownOption[] => [
    { value: 'cake', label: t('pages.demoPatterns.categoryTart') },
    { value: 'pastry', label: t('pages.demoPatterns.categoryPastry') },
    { value: 'mousse', label: t('pages.demoPatterns.categoryMousse') },
    { value: 'cookie', label: t('pages.demoPatterns.categoryCookie') },
    { value: 'candy', label: t('pages.demoPatterns.categoryCandy') },
  ], [t]);

  const ingredientOptions = useMemo((): DropdownOption[] => [
    { value: 'sugar', label: t('pages.demoPatterns.ingredientSugar') },
    { value: 'gelatin', label: t('pages.demoPatterns.ingredientGelatin') },
    { value: 'water', label: t('pages.demoPatterns.ingredientWater') },
    { value: 'oreo', label: t('pages.demoPatterns.ingredientOreo') },
    { value: 'strawberry', label: t('pages.demoPatterns.ingredientStrawberry') },
    { value: 'cream', label: t('pages.demoPatterns.ingredientCream') },
    { value: 'butter', label: t('pages.demoPatterns.ingredientButter') },
    { value: 'flour', label: t('pages.demoPatterns.ingredientFlour') },
  ], [t]);

  const unitOptions = useMemo((): DropdownOption[] => [
    { value: 'g', label: t('pages.demoPatterns.unitG') },
    { value: 'ml', label: t('pages.demoPatterns.unitMl') },
    { value: 'pcs', label: t('pages.demoPatterns.unitPcs') },
    { value: 'tsp', label: t('pages.demoPatterns.unitTsp') },
    { value: 'tbsp', label: t('pages.demoPatterns.unitTbsp') },
  ], [t]);

  const deliveryOptions = useMemo((): DropdownOption[] => [
    { value: 'pickup', label: t('pages.demoPatterns.deliveryPickup') },
    { value: 'courier', label: t('pages.demoPatterns.deliveryCourier') },
    { value: 'post', label: t('pages.demoPatterns.deliveryPost') },
    { value: 'other', label: t('pages.demoPatterns.deliveryOther'), disabled: true },
  ], [t]);

  const handleFetch = () => {
    dispatch(fetchDesserts());
  };

  const handleError = async () => {
    const result = await dispatch(fetchDessertsError());
    if (fetchDessertsError.rejected.match(result) && result.payload) {
      toast.error(getErrorMessage(result.payload, t));
    }
  };

  const handleUnknownError = () => {
    const unknownApiError: ApiError = {
      code: 'somethingUnexpected',
      message: 'Unexpected backend error',
      status: 500,
    };
    toast.error(getErrorMessage(unknownApiError, t));
  };

  const handleNetworkError = () => {
    toast.error(t(`errors.${ERROR_CODES.common.networkError}`));
  };

  const handleAddToRecipes = () => {
    toast.success(t('pages.demoPatterns.showcase.recipeAdded'));
  };

  return (
    <div className="demo-patterns" data-testid="demo-patterns-page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="demo-patterns__header">
        <h1 className="demo-patterns__title">{t('pages.demoPatterns.title')}</h1>
        <LanguageSwitcher />
      </div>

      {/* === NAV === */}
      <nav className="demo-patterns__nav" data-testid="demo-patterns-nav">
        <Link to={ROUTES.DEMO} className="demo-patterns__nav-link">
          {t('pages.demoPatterns.backToDemo')}
        </Link>
        <Link to={ROUTES.HOME} className="demo-patterns__nav-link">
          {t('pages.demoPatterns.backToHome')}
        </Link>
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="demo-patterns__nav-link">
            {t(`pages.demoPatterns.${item.key}`)}
          </a>
        ))}
      </nav>

      {/* === SECTION A: FORMIK + INPUT === */}
      <section id="formik-inputs" className="demo-patterns__section" data-testid="demo-patterns-formik-inputs">
        <h2 className="demo-patterns__section-title">{t('pages.demoPatterns.formikInputs')}</h2>

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
            disabledField: t('pages.demoPatterns.inputDisabledValue'),
            readonlyField: t('pages.demoPatterns.inputReadOnlyText'),
            technology: '',
            filledDefault: '',
            filledValue: t('pages.demoPatterns.fieldRecipeNameExample'),
            filledError: '6',
            publishRecipe: false,
            saveToFavorites: true,
          }}
          initialErrors={{
            email: t('pages.demoPatterns.validationEmail'),
            filledError: t('pages.demoPatterns.validationRequired'),
          }}
          initialTouched={{
            email: true,
            filledError: true,
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.name) errors.name = t('pages.demoPatterns.validationRequired');
            if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              errors.email = t('pages.demoPatterns.validationEmail');
            }
            if (values.password && values.password.length < 6) {
              errors.password = t('pages.demoPatterns.validationPassword');
            }
            return errors;
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsOutlined')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="name"
                  label={t('pages.demoPatterns.fieldName')}
                  placeholder={t('pages.demoPatterns.fieldNamePlaceholder')}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="email"
                  type="email"
                  label={t('pages.demoPatterns.fieldEmail')}
                  placeholder="baker@gmail.com"
                  helpText={t('pages.demoPatterns.fieldEmailHelp')}
                />
              </div>
            </div>

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsFilled')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-4">
                <Input
                  name="filledDefault"
                  variant="filled"
                  label={t('pages.demoPatterns.fieldPortions')}
                  placeholder={t('pages.demoPatterns.fieldPortionsPlaceholder')}
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="filledValue"
                  variant="filled"
                  label={t('pages.demoPatterns.fieldRecipeName')}
                  helpText={t('pages.demoPatterns.fieldRecipeNameHelp')}
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="filledError"
                  variant="filled"
                  label={t('pages.demoPatterns.fieldPortions')}
                />
              </div>
            </div>

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsPassword')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="password"
                  type="password"
                  label={t('pages.demoPatterns.fieldPassword')}
                  placeholder="******"
                  showPasswordToggle
                  helpText={t('pages.demoPatterns.fieldPasswordHelp')}
                />
              </div>
            </div>

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsWithIcons')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="search"
                  startIcon="icon-search"
                  placeholder={t('pages.demoPatterns.fieldSearchPlaceholder')}
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="searchIcons"
                  placeholder={t('pages.demoPatterns.fieldSearchPlaceholder')}
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

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsGrid')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-4">
                <Input
                  name="portions"
                  label={t('pages.demoPatterns.fieldPortions')}
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="diameter"
                  label={t('pages.demoPatterns.fieldDiameter')}
                  helpText={t('pages.demoPatterns.fieldDiameterHelp')}
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  name="shape"
                  label={t('pages.demoPatterns.fieldShape')}
                  placeholder={t('pages.demoPatterns.fieldShapePlaceholder')}
                />
              </div>
            </div>

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsStates')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Input
                  name="disabledField"
                  label={t('pages.demoPatterns.labelDisabledInput')}
                  disabled
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  name="readonlyField"
                  label={t('pages.demoPatterns.labelReadOnly')}
                  readOnly
                />
              </div>
            </div>

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsTextarea')}</h3>
            <div className="row row--gap-md mb-8">
              <div className="col-12">
                <Input
                  name="technology"
                  multiline
                  rows={5}
                  label={t('pages.demoPatterns.fieldTechnology')}
                  placeholder={t('pages.demoPatterns.fieldTechnologyPlaceholder')}
                />
              </div>
            </div>

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsPublish')}</h3>
            <div className="d-flex flex-column gap-4 mb-8">
              <Switch name="publishRecipe" label={t('pages.demoPatterns.switchPublish')} />
              <Checkbox name="saveToFavorites" label={t('pages.demoPatterns.checkboxFavorites')} />
            </div>

            <div className="d-flex gap-4 mb-8">
              <Button type="submit" variant="primary">{t('pages.demoPatterns.formikInputsSave')}</Button>
              <Button type="reset" variant="secondary">{t('pages.demoPatterns.formikInputsReset')}</Button>
            </div>

            <h3 className="demo-patterns__subsection-title mt-8">{t('pages.demoPatterns.formikInputsUsage')}</h3>
            <div className="demo-patterns__code-block">
              <pre className="demo-patterns__code">
                {`{/* Outlined (default) */}
<Input name="email" label="Email" placeholder="baker@gmail.com" />

{/* Filled variant */}
<Input name="name" variant="filled" label="Name" />

{/* Password with toggle */}
<Input name="password" type="password" showPasswordToggle />

{/* Search with icons */}
<Input name="search" startIcon="icon-search" placeholder="Search..." />
<Input name="q" endAdornment={<><IconBtn .../><IconBtn .../></>} />

{/* Textarea */}
<Input name="tech" multiline rows={5} label="Technology" />

{/* Formik validation — just add validate to <Formik> */}`}
              </pre>
            </div>
          </Form>
        </Formik>
      </section>

      {/* === SECTION A2: FORMIK + SELECT === */}
      <section id="formik-select" className="demo-patterns__section" data-testid="demo-patterns-formik-select">
        <h2 className="demo-patterns__section-title">{t('pages.demoPatterns.formikSelect')}</h2>

        <Formik
          initialValues={{
            selectPortions: '6',
            selectCategory: '',
            selectIngredient: '',
            selectUnit: 'g',
            selectCurrency: 'UAH',
            deliveryMethod: 'pickup',
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.selectCategory) errors.selectCategory = t('pages.demoPatterns.validationCategory');
            return errors;
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-4">
                <Select
                  name="selectPortions"
                  options={portionOptions}
                  label={t('pages.demoPatterns.fieldPortions')}
                  placeholder={t('pages.demoPatterns.selectPlaceholder')}
                  helpText={t('pages.demoPatterns.fieldPortionsHelp')}
                />
              </div>
              <div className="col-12 col-md-4">
                <Select
                  name="selectCategory"
                  options={categoryOptions}
                  label={t('pages.demoPatterns.fieldCategory')}
                  placeholder={t('pages.demoPatterns.fieldCategoryPlaceholder')}
                  searchable
                  searchPlaceholder={t('pages.demoPatterns.searchPlaceholder')}
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <Select
                  name="selectCurrency"
                  options={currencyOptions}
                  label={t('pages.demoPatterns.fieldCurrency')}
                />
              </div>
            </div>

            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Select
                  name="selectIngredient"
                  options={ingredientOptions}
                  label={t('pages.demoPatterns.fieldIngredient')}
                  placeholder={t('pages.demoPatterns.fieldIngredientPlaceholder')}
                  searchable
                  searchPlaceholder={t('pages.demoPatterns.fieldIngredientSearch')}
                />
              </div>
              <div className="col-12 col-md-3">
                <Select
                  name="selectUnit"
                  options={unitOptions}
                  label={t('pages.demoPatterns.fieldUnit')}
                />
              </div>
              <div className="col-12 col-md-3">
                <Select
                  name="selectPortions"
                  options={portionOptions}
                  disabled
                  label={t('pages.demoPatterns.labelDisabledInput')}
                />
              </div>
            </div>

            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <RadioGroup
                  name="deliveryMethod"
                  options={deliveryOptions}
                  label={t('pages.demoPatterns.fieldDelivery')}
                />
              </div>
            </div>

            <div className="d-flex gap-4 mb-8">
              <Button type="submit" variant="primary">{t('pages.demoPatterns.formikSelectSave')}</Button>
              <Button type="reset" variant="secondary">{t('pages.demoPatterns.formikSelectReset')}</Button>
            </div>
          </Form>
        </Formik>
      </section>

      {/* === SECTION B: ERROR HANDLING === */}
      <section id="error-handling" className="demo-patterns__section" data-testid="demo-patterns-error-handling">
        <div className="demo-patterns__showcase-header">
          <h2 className="demo-patterns__section-title">{t('pages.demoPatterns.showcase.title')}</h2>
          <div className="demo-patterns__showcase-actions">
            <Button
              variant="primary"
              size="sm"
              onClick={handleFetch}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {t('pages.demoPatterns.showcase.fetchButton')}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleError}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {t('pages.demoPatterns.showcase.errorButton')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUnknownError}
            >
              {t('pages.demoPatterns.showcase.unknownErrorButton')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNetworkError}
            >
              {t('pages.demoPatterns.showcase.networkErrorButton')}
            </Button>
            <Button
              variant="brand"
              size="sm"
              onClick={handleAddToRecipes}
            >
              {t('pages.demoPatterns.showcase.addToRecipes')}
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="demo-patterns__showcase-loader" data-testid="demo-patterns-showcase-loader">
            <Loader size="md" variant="brand" />
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <p className="demo-patterns__showcase-empty" data-testid="demo-patterns-showcase-empty">
            {t('pages.demoPatterns.showcase.emptyText')}
          </p>
        )}

        {!isLoading && items.length > 0 && (
          <AnimatedList className="row row--gap-md mt-6" data-testid="demo-patterns-showcase-cards">
            {items.map((dessert) => (
              <div key={dessert.id} className="col-12 col-md-6 col-lg-4">
                <div className="demo-patterns__showcase-card" data-testid="demo-patterns-showcase-card">
                  <h3 className="demo-patterns__showcase-card-name">{dessert.name}</h3>
                  <p className="demo-patterns__showcase-card-description">{dessert.description}</p>
                  <span className="demo-patterns__showcase-card-time">
                    {t('pages.demoPatterns.showcase.cookingTime')}: {dessert.cookingTime} {t('pages.demoPatterns.showcase.minutes')}
                  </span>
                </div>
              </div>
            ))}
          </AnimatedList>
        )}
      </section>

      {/* === SECTION D: STEPPER === */}
      <section id="stepper-demo" className="demo-patterns__section" data-testid="demo-patterns-stepper">
        <h2 className="demo-patterns__section-title">Stepper</h2>

        <div className="mb-8">
          <Stepper defaultValue="add">
            <Stepper.Step value="about" label={t('pages.demoPatterns.stepperAbout')}>
              <p>{t('pages.demoPatterns.stepperAbout')}</p>
            </Stepper.Step>
            <Stepper.Step value="add" text="+" label={t('pages.demoPatterns.stepperAdd')}>
              <p>{t('pages.demoPatterns.stepperAdd')}</p>
            </Stepper.Step>
            <Stepper.Step value="base" label={t('pages.demoPatterns.stepperBase')}>
              <p>{t('pages.demoPatterns.stepperBase')}</p>
            </Stepper.Step>
            <Stepper.Step value="fillings" label={t('pages.demoPatterns.stepperFillings')}>
              <p>{t('pages.demoPatterns.stepperFillings')}</p>
            </Stepper.Step>
            <Stepper.Step value="packaging" label={t('pages.demoPatterns.stepperPackaging')} disabled>
              <p>{t('pages.demoPatterns.stepperPackaging')}</p>
            </Stepper.Step>
            <Stepper.Step value="calc" label={t('pages.demoPatterns.stepperCalc')}>
              <p>{t('pages.demoPatterns.stepperCalc')}</p>
            </Stepper.Step>
          </Stepper>
        </div>

        <h3 className="demo-patterns__subsection-title mt-8">{t('pages.demoPatterns.formikInputsUsage')}</h3>
        <div className="demo-patterns__code-block">
          <pre className="demo-patterns__code">
            {`{/* defaultValue — which step is open initially */}
<Stepper defaultValue="about" onValueChange={handleChange}>
  <Stepper.Step value="about" label="About dessert">
    <AboutForm />
  </Stepper.Step>
  <Stepper.Step value="add" text="+" label="Add">
    <AddForm />
  </Stepper.Step>
  <Stepper.Step value="base" label="Base" disabled>
    <BaseForm />
  </Stepper.Step>
</Stepper>

{/* value + onValueChange — full external control */}
<Stepper value={step} onValueChange={setStep}>...</Stepper>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default DemoPatternsPage;

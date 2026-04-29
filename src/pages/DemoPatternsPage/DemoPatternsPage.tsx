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

const categoryOptions: DropdownOption[] = [
  { value: 'cake', label: 'Торт' },
  { value: 'pastry', label: 'Тістечко' },
  { value: 'mousse', label: 'Мус' },
  { value: 'cookie', label: 'Печиво' },
  { value: 'candy', label: 'Цукерки' },
];

const ingredientOptions: DropdownOption[] = [
  { value: 'sugar', label: 'Цукор' },
  { value: 'gelatin', label: 'Желатин' },
  { value: 'water', label: 'Вода' },
  { value: 'oreo', label: 'Печиво Oreo' },
  { value: 'strawberry', label: 'Полуниця' },
  { value: 'cream', label: 'Вершки' },
  { value: 'butter', label: 'Масло' },
  { value: 'flour', label: 'Борошно' },
];

const unitOptions: DropdownOption[] = [
  { value: 'g', label: 'г' },
  { value: 'ml', label: 'мл' },
  { value: 'pcs', label: 'шт' },
  { value: 'tsp', label: 'ч.л.' },
  { value: 'tbsp', label: 'ст.л.' },
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
            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsOutlined')}</h3>
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

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsFilled')}</h3>
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

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsPassword')}</h3>
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

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsWithIcons')}</h3>
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

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsGrid')}</h3>
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

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsStates')}</h3>
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

            <h3 className="demo-patterns__subsection-title">{t('pages.demoPatterns.formikInputsTextarea')}</h3>
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
              <Button type="submit" variant="primary">{t('pages.demoPatterns.formikInputsSave')}</Button>
              <Button type="reset" variant="secondary">{t('pages.demoPatterns.formikInputsReset')}</Button>
            </div>

            <h3 className="demo-patterns__subsection-title mt-8">{t('pages.demoPatterns.formikInputsUsage')}</h3>
            <div className="demo-patterns__code-block">
              <pre className="demo-patterns__code">
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
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.selectCategory) errors.selectCategory = 'Оберіть категорію';
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
                  label="Кількість порцій"
                  placeholder="Обрати"
                  helpText="Від 1 до 12"
                />
              </div>
              <div className="col-12 col-md-4">
                <Select
                  name="selectCategory"
                  options={categoryOptions}
                  label="Категорія десерту"
                  placeholder="Обрати категорію"
                  searchable
                  searchPlaceholder="Шукати..."
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <Select
                  name="selectCurrency"
                  options={currencyOptions}
                  label="Валюта"
                />
              </div>
            </div>

            <div className="row row--gap-md mb-8">
              <div className="col-12 col-md-6">
                <Select
                  name="selectIngredient"
                  options={ingredientOptions}
                  label="Інгредієнт"
                  placeholder="Оберіть інгредієнт"
                  searchable
                  searchPlaceholder="Шукати інгредієнт..."
                />
              </div>
              <div className="col-12 col-md-3">
                <Select
                  name="selectUnit"
                  options={unitOptions}
                  label="Одиниця"
                />
              </div>
              <div className="col-12 col-md-3">
                <Select
                  name="selectPortions"
                  options={portionOptions}
                  disabled
                  label="Disabled"
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

      {/* === SECTION C: STEPPER === */}
      <section id="stepper-demo" className="demo-patterns__section" data-testid="demo-patterns-stepper">
        <h2 className="demo-patterns__section-title">Stepper</h2>

        <div className="mb-8">
          <Stepper defaultValue="add">
            <Stepper.Step value="about" label="Про десерт">
              <p>Про десерт</p>
            </Stepper.Step>
            <Stepper.Step value="add" text="+" label="Додати">
              <p>Додати</p>
            </Stepper.Step>
            <Stepper.Step value="base" label="Основа">
              <p>Основа</p>
            </Stepper.Step>
            <Stepper.Step value="fillings" label="Начинки">
              <p>Начинки</p>
            </Stepper.Step>
            <Stepper.Step value="packaging" label="Пакування" disabled>
              <p>Пакування</p>
            </Stepper.Step>
            <Stepper.Step value="calc" label="Розрахунки">
              <p>Розрахунки</p>
            </Stepper.Step>
          </Stepper>
        </div>

        <h3 className="demo-patterns__subsection-title mt-8">{t('pages.demoPatterns.formikInputsUsage')}</h3>
        <div className="demo-patterns__code-block">
          <pre className="demo-patterns__code">
            {`{/* defaultValue — який степ відкритий спочатку */}
<Stepper defaultValue="about" onValueChange={handleChange}>
  <Stepper.Step value="about" label="Про десерт">
    <AboutForm />
  </Stepper.Step>
  <Stepper.Step value="add" text="+" label="Додати">
    <AddForm />
  </Stepper.Step>
  <Stepper.Step value="base" label="Основа" disabled>
    <BaseForm />
  </Stepper.Step>
</Stepper>

{/* value + onValueChange — повний контроль ззовні */}
<Stepper value={step} onValueChange={setStep}>...</Stepper>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default DemoPatternsPage;

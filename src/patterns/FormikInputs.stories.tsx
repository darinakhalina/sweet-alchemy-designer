import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import Input from '@/components/Input';
import Switch from '@/components/Switch';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

const meta: Meta = {
  title: 'Patterns/Formik + Input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Інтеграційний патерн: Formik-форма з усіма варіаціями Input — outlined, filled, password, search-з-іконками, multiline, disabled/readOnly. А також Switch/Checkbox як toggles.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const FormikInputs: Story = {
  render: () => (
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
        disabledField: 'Заблоковане значення',
        readonlyField: 'Лише для читання',
        technology: '',
        filledDefault: '',
        filledValue: 'Берi-Хмара 25 см',
        filledError: '6',
        publishRecipe: false,
        saveToFavorites: true,
      }}
      initialErrors={{
        email: 'Невалідний email',
        filledError: 'Обов\'язкове поле',
      }}
      initialTouched={{
        email: true,
        filledError: true,
      }}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (!values.name) errors.name = 'Обов\'язкове поле';
        if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          errors.email = 'Невалідний email';
        }
        if (values.password && values.password.length < 6) {
          errors.password = 'Мінімум 6 символів';
        }
        return errors;
      }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Form>
        <h3 className="demo-patterns__subsection-title">Outlined (default)</h3>
        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-6">
            <Input
              name="name"
              label="Імʼя"
              placeholder="Введіть імʼя"
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="baker@gmail.com"
              helpText="Ми не будемо спамити"
            />
          </div>
        </div>

        <h3 className="demo-patterns__subsection-title">Filled variant</h3>
        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-4">
            <Input
              name="filledDefault"
              variant="filled"
              label="Порції"
              placeholder="Наприклад, 6"
            />
          </div>
          <div className="col-12 col-md-4">
            <Input
              name="filledValue"
              variant="filled"
              label="Назва рецепту"
              helpText="Як буде відображатися у списку"
            />
          </div>
          <div className="col-12 col-md-4">
            <Input
              name="filledError"
              variant="filled"
              label="Порції"
            />
          </div>
        </div>

        <h3 className="demo-patterns__subsection-title">Пароль з валідацією</h3>
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

        <h3 className="demo-patterns__subsection-title">З іконками</h3>
        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-6">
            <Input
              name="search"
              startIcon="icon-search"
              placeholder="Пошук рецептів"
            />
          </div>
          <div className="col-12 col-md-6">
            <Input
              name="searchIcons"
              placeholder="Пошук рецептів"
              endAdornment={(
                <>
                  <button
                    type="button"
                    className="input__icon-btn"
                    aria-label="Шукати"
                  >
                    <Icon name="icon-search" size="lg" />
                  </button>
                  <button
                    type="button"
                    className="input__icon-btn"
                    aria-label="Редагувати"
                  >
                    <Icon name="icon-edit" size="md" />
                  </button>
                </>
              )}
            />
          </div>
        </div>

        <h3 className="demo-patterns__subsection-title">Grid layout (3 колонки)</h3>
        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-4">
            <Input name="portions" label="Порції" />
          </div>
          <div className="col-12 col-md-4">
            <Input
              name="diameter"
              label="Діаметр"
              helpText="у см"
            />
          </div>
          <div className="col-12 col-md-4">
            <Input
              name="shape"
              label="Форма"
              placeholder="Кругла / квадратна"
            />
          </div>
        </div>

        <h3 className="demo-patterns__subsection-title">Стани</h3>
        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-6">
            <Input name="disabledField" label="Disabled" disabled />
          </div>
          <div className="col-12 col-md-6">
            <Input name="readonlyField" label="Read-only" readOnly />
          </div>
        </div>

        <h3 className="demo-patterns__subsection-title">Textarea (multiline)</h3>
        <div className="row row--gap-md mb-8">
          <div className="col-12">
            <Input
              name="technology"
              multiline
              rows={5}
              label="Технологія приготування"
              placeholder="Подрібніть печиво в блендері..."
            />
          </div>
        </div>

        <h3 className="demo-patterns__subsection-title">Toggles (Switch + Checkbox)</h3>
        <div className="d-flex flex-column gap-4 mb-8">
          <Switch name="publishRecipe" label="Опублікувати рецепт" />
          <Checkbox name="saveToFavorites" label="Зберегти в обране" />
        </div>

        <div className="d-flex gap-4 mb-8">
          <Button type="submit" variant="primary">Зберегти</Button>
          <Button type="reset" variant="secondary">Скинути</Button>
        </div>
      </Form>
    </Formik>
  ),
};

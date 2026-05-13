import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik, Form } from 'formik';
import Select from '@/components/Select';
import RadioGroup from '@/components/RadioGroup';
import Button from '@/components/Button';
import type { DropdownOption } from '@/components/Dropdown';

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

const categoryOptions: DropdownOption[] = [
  { value: 'cake', label: 'Торт' },
  { value: 'pastry', label: 'Випічка' },
  { value: 'mousse', label: 'Мус' },
  { value: 'cookie', label: 'Печиво' },
  { value: 'candy', label: 'Цукерки' },
];

const ingredientOptions: DropdownOption[] = [
  { value: 'sugar', label: 'Цукор' },
  { value: 'gelatin', label: 'Желатин' },
  { value: 'water', label: 'Вода' },
  { value: 'oreo', label: 'Орео' },
  { value: 'strawberry', label: 'Полуниця' },
  { value: 'cream', label: 'Вершки' },
  { value: 'butter', label: 'Масло' },
  { value: 'flour', label: 'Борошно' },
];

const unitOptions: DropdownOption[] = [
  { value: 'g', label: 'г' },
  { value: 'ml', label: 'мл' },
  { value: 'pcs', label: 'шт' },
  { value: 'tsp', label: 'ч. л.' },
  { value: 'tbsp', label: 'ст. л.' },
];

const deliveryOptions: DropdownOption[] = [
  { value: 'pickup', label: 'Самовивіз' },
  { value: 'courier', label: 'Кур\'єр' },
  { value: 'post', label: 'Поштомат' },
  { value: 'other', label: 'Інше', disabled: true },
];

const meta: Meta = {
  title: 'Patterns/Formik + Select',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Інтеграційний патерн: Formik-форма з кількома Select-полями, плейсхолдерами, валідацією, searchable-варіантом, disabled-станом та RadioGroup-полем доставки.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const FormikSelect: Story = {
  render: () => (
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
        if (!values.selectCategory) errors.selectCategory = 'Обов\'язкове поле';
        return errors;
      }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Form>
        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-4">
            <Select
              name="selectPortions"
              options={portionOptions}
              label="Порції"
              placeholder="Виберіть"
              helpText="Скільки порцій готувати"
            />
          </div>
          <div className="col-12 col-md-4">
            <Select
              name="selectCategory"
              options={categoryOptions}
              label="Категорія"
              placeholder="Виберіть категорію"
              searchable
              searchPlaceholder="Пошук"
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
              placeholder="Виберіть інгредієнт"
              searchable
              searchPlaceholder="Пошук інгредієнтів"
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

        <div className="row row--gap-md mb-8">
          <div className="col-12 col-md-6">
            <RadioGroup
              name="deliveryMethod"
              options={deliveryOptions}
              label="Спосіб доставки"
            />
          </div>
        </div>

        <div className="d-flex gap-4 mb-8">
          <Button type="submit" variant="primary">Зберегти</Button>
          <Button type="reset" variant="secondary">Скинути</Button>
        </div>
      </Form>
    </Formik>
  ),
};

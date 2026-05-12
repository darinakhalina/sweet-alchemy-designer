import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { store } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDesserts, fetchDessertsError } from '@/store/desserts/dessertsThunks';
import { getErrorMessage } from '@/services/helpers/getErrorMessage';
import { ERROR_CODES } from '@/constants/errorCodes';
import type { ApiError } from '@/services/interfaces/ApiError';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import AnimatedList from '@/components/AnimatedList';

const meta: Meta = {
  title: 'Patterns/API & Error Handling',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Інтеграційний патерн: Redux Toolkit thunks + toast-нотифікації для обробки помилок. Показує loading-стан, успішний фетч списку, типи помилок (server, unknown, network).',
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

const Demo = () => {
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

  return (
    <section className="demo-patterns__section">
      <div className="demo-patterns__showcase-header">
        <h2 className="demo-patterns__section-title">API + обробка помилок</h2>
        <div className="demo-patterns__showcase-actions">
          <Button
            variant="primary"
            size="sm"
            onClick={handleFetch}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Завантажити рецепти
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleError}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Server error
          </Button>
          <Button variant="ghost" size="sm" onClick={handleUnknownError}>
            Unknown error
          </Button>
          <Button variant="ghost" size="sm" onClick={handleNetworkError}>
            Network error
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="demo-patterns__showcase-loader">
          <Loader size="md" variant="brand" />
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <p className="demo-patterns__showcase-empty">
          Список порожній — натисніть «Завантажити рецепти».
        </p>
      )}

      {!isLoading && items.length > 0 && (
        <AnimatedList className="row row--gap-md mt-6">
          {items.map((dessert) => (
            <div key={dessert.id} className="col-12 col-md-6 col-lg-4">
              <div className="demo-patterns__showcase-card">
                <h3 className="demo-patterns__showcase-card-name">{dessert.name}</h3>
                <p className="demo-patterns__showcase-card-description">{dessert.description}</p>
                <span className="demo-patterns__showcase-card-time">
                  Час: {dessert.cookingTime} хв
                </span>
              </div>
            </div>
          ))}
        </AnimatedList>
      )}
    </section>
  );
};

export const ApiErrorHandling: Story = {
  render: () => <Demo />,
};

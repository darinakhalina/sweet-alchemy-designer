import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDesserts, fetchDessertsError } from '@/store/desserts/dessertsThunks';
import { getErrorMessage } from '@/services/helpers/getErrorMessage';
import { ERROR_CODES } from '@/constants/errorCodes';
import { ROUTES, buildRecipeDetailPath } from '@/constants/routes';
import type { ApiError } from '@/services/interfaces/ApiError';
import { useAuthModal } from '@/hooks/useAuthModal';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import AnimatedList from '@/components/AnimatedList';

const pages = [
  { path: ROUTES.CONSTRUCTOR, key: 'header.constructor' },
  { path: ROUTES.SEARCH, key: 'header.searchRecipes' },
  { path: ROUTES.MY_RECIPES, key: 'header.myRecipes' },
  { path: buildRecipeDetailPath(1), key: 'recipe.dessertComposition' }, // TODO: replace with real recipe id when data is available
  { path: ROUTES.PROFILE, key: 'profile.title' },
  { path: ROUTES.PROFILE_EDIT, key: 'profile.edit' },
  { path: ROUTES.DEMO, key: 'pages.home.demo' },
];

const HomePage = () => {
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

  const { requireAuth } = useAuthModal();

  const handleAddToRecipes = () => {
    requireAuth(() => {
      toast.success(t('pages.home.showcase.recipeAdded'));
    });
  };

  return (
    <main className="home-page" data-testid="home-page">
      <div className="row">
        <div className="col-12 col-md-8">
          <h1 className="h1">{t('pages.home.title')}</h1>
          <p className="text mt-4">{t('pages.home.subtitle')}</p>
        </div>
      </div>

      <nav className="home-page__nav mt-10">
        <h2 className="h2">{t('pages.home.navigation')}</h2>
        <div className="row row--gap-md mt-5">
          {pages.map((page) => (
            <div key={page.path} className="col-12 col-md-6 col-lg-4">
              <Link to={page.path} className="home-page__link" viewTransition>
                {t(page.key)}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      <section className="home-showcase mt-12" data-testid="home-showcase">
        <div className="home-showcase__header">
          <h2 className="h2">{t('pages.home.showcase.title')}</h2>
          <div className="home-showcase__actions">
            <Button
              variant="primary"
              size="sm"
              onClick={handleFetch}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {t('pages.home.showcase.fetchButton')}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleError}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {t('pages.home.showcase.errorButton')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUnknownError}
            >
              {t('pages.home.showcase.unknownErrorButton')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNetworkError}
            >
              {t('pages.home.showcase.networkErrorButton')}
            </Button>
            <Button
              variant="brand"
              size="sm"
              onClick={handleAddToRecipes}
            >
              {t('pages.home.showcase.addToRecipes')}
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="home-showcase__loader" data-testid="home-showcase-loader">
            <Loader size="md" variant="brand" />
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <p className="home-showcase__empty" data-testid="home-showcase-empty">
            {t('pages.home.showcase.emptyText')}
          </p>
        )}

        {!isLoading && items.length > 0 && (
          <AnimatedList className="row row--gap-md mt-6" data-testid="home-showcase-cards">
            {items.map((dessert) => (
              <div key={dessert.id} className="col-12 col-md-6 col-lg-4">
                <div className="home-showcase__card" data-testid="home-showcase-card">
                  <h3 className="home-showcase__card-name">{dessert.name}</h3>
                  <p className="home-showcase__card-description">{dessert.description}</p>
                  <span className="home-showcase__card-time">
                    {t('pages.home.showcase.cookingTime')}: {dessert.cookingTime} {t('pages.home.showcase.minutes')}
                  </span>
                </div>
              </div>
            ))}
          </AnimatedList>
        )}
      </section>
    </main>
  );
};

export default HomePage;

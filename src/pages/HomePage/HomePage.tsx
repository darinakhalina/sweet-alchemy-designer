import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES, buildRecipeDetailPath } from '@/constants/routes';

const pages = [
  { path: ROUTES.CONSTRUCTOR, key: 'header.constructor' },
  { path: ROUTES.SEARCH, key: 'header.searchRecipes' },
  { path: ROUTES.MY_RECIPES, key: 'header.myRecipes' },
  { path: buildRecipeDetailPath(1), key: 'recipe.dessertComposition' }, // TODO: replace with real recipe id when data is available
  { path: ROUTES.PROFILE, key: 'profile.title' },
  { path: ROUTES.PROFILE_EDIT, key: 'profile.edit' },
  { path: ROUTES.DEMO, key: 'pages.home.demo' },
  { path: ROUTES.DEMO_PATTERNS, key: 'pages.home.demoPatterns' },
];

const HomePage = () => {
  const { t } = useTranslation();

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
    </main>
  );
};

export default HomePage;

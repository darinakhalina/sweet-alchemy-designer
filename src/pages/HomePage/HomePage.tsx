import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const pages = [
  { path: '/constructor', key: 'header.constructor' },
  { path: '/search', key: 'header.searchRecipes' },
  { path: '/my-recipes', key: 'header.myRecipes' },
  { path: '/recipe/1', key: 'recipe.dessertComposition' },
  { path: '/profile', key: 'profile.title' },
  { path: '/profile/edit', key: 'profile.edit' },
  { path: '/demo', key: 'pages.home.demo' },
];

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <main className="home-page">
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

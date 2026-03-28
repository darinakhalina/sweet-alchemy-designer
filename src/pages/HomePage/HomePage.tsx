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
    <main className="home-page f-container">
      <h1 className="h1">{t('pages.home.title')}</h1>
      <p className="text">{t('pages.home.subtitle')}</p>

      <nav className="home-page__nav">
        <h2 className="h2">{t('pages.home.navigation')}</h2>
        <ul className="home-page__list">
          {pages.map((page) => (
            <li key={page.path} className="home-page__item">
              <Link to={page.path} className="home-page__link" viewTransition>
                {t(page.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
};

export default HomePage;

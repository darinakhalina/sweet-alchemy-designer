import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchPage = () => {
  const { t } = useTranslation();

  return (
    <main className="f-container">
      <h1 className="h1">{t('search.title')}</h1>
      <p className="text">
        <Link to="/">{t('common.back')}</Link>
      </p>
    </main>
  );
};

export default SearchPage;

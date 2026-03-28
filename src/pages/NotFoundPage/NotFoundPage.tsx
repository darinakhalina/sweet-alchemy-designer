import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text">{t('pages.notFound.message')}</p>
      <p className="text">
        <Link to="/" viewTransition>
          {t('pages.notFound.backLink')}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;

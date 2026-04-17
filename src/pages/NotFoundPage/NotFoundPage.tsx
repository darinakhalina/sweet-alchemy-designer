import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text">{t('pages.notFound.message')}</p>
      <p className="text">
        <Link to={ROUTES.HOME} viewTransition>
          {t('pages.notFound.backLink')}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;

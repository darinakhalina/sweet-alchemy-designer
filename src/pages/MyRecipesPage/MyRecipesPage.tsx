import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';

const MyRecipesPage = () => {
  const { t } = useTranslation();

  return (
    <main className="py-10">
      <div className="row">
        <div className="col-12">
          <h1 className="h1">{t('myRecipes.title')}</h1>
          <p className="text mt-4">
            <Link to={ROUTES.HOME}>{t('common.back')}</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default MyRecipesPage;

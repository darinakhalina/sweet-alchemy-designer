import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';

const RecipeDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <main className="py-10">
      <div className="row">
        <div className="col-12 col-md-8">
          <h1 className="h1">{t('recipe.dessertComposition')}</h1>
          <p className="text-sm mt-2">ID: {id}</p>
          <p className="text mt-4">
            <Link to={ROUTES.HOME}>{t('common.back')}</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetailPage;

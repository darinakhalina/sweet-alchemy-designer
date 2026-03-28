import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RecipeDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <main className="f-container">
      <h1 className="h1">{t('recipe.dessertComposition')}</h1>
      <p className="text-sm">ID: {id}</p>
      <p className="text">
        <Link to="/">{t('common.back')}</Link>
      </p>
    </main>
  );
};

export default RecipeDetailPage;

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <main className="py-10">
      <div className="row row--center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="h1">{t('profile.title')}</h1>
          <p className="text mt-4">
            <Link to="/">{t('common.back')}</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

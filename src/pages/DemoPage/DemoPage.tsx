import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const DemoPage = () => {
  const { t } = useTranslation();

  return (
    <div className="demo">
      <div className="demo__header">
        <h1 className="demo__title">{t('pages.demo.title')}</h1>
        <LanguageSwitcher />
      </div>

      <nav className="demo__nav">
        <Link to={ROUTES.HOME} className="demo__nav-link">
          {t('pages.demo.backToHome')}
        </Link>
        <Link to={ROUTES.DEMO_PATTERNS} className="demo__nav-link">
          {t('pages.demo.patterns')}
        </Link>
      </nav>

      <section className="demo__section">
        <p className="text">
          Усі компоненти та дизайн-токени мігровано до Storybook. Запусти{' '}
          <code>npm run storybook</code> щоб переглянути.
        </p>
      </section>
    </div>
  );
};

export default DemoPage;

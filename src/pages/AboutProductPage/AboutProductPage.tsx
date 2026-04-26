import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/Button';

const steps = ['step1', 'step2', 'step3'] as const;

const AboutProductPage = () => {
  const { t } = useTranslation();

  return (
    <main className="about-product" data-testid="about-product-page">
      <section className="about-product__hero" data-testid="about-product-hero">
        <div className="row row--align-center row--gap-lg">
          <div className="col-12 col-md-6">
            <h1 className="h1-accent" data-testid="about-product-title">
              {t('pages.aboutProduct.hero.title')}
            </h1>
            <p className="text mt-6" data-testid="about-product-description">
              {t('pages.aboutProduct.hero.description')}
            </p>
            <div className="mt-8">
              <Link to={ROUTES.LOGIN}>
                <Button variant="brand" size="lg" uppercase>
                  {t('pages.aboutProduct.hero.cta')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="about-product__image-wrapper" data-testid="about-product-image">
              <img
                className="about-product__image"
                src="/images/logo.svg"
                alt={t('pages.aboutProduct.hero.imageAlt')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-product__how-it-works mt-20" data-testid="about-product-how-it-works">
        <h2 className="h1-accent text-center" data-testid="about-product-how-title">
          {t('pages.aboutProduct.howItWorks.title')}
        </h2>
        <div className="row row--gap-md mt-12">
          {steps.map((step) => (
            <div key={step} className="col-12 col-md-4" data-testid="about-product-step">
              <div className="about-product__step">
                <span className="about-product__step-number">
                  {t(`pages.aboutProduct.howItWorks.${step}.number`)}
                </span>
                <h3 className="about-product__step-title">
                  {t(`pages.aboutProduct.howItWorks.${step}.title`)}
                </h3>
                <p className="about-product__step-description">
                  {t(`pages.aboutProduct.howItWorks.${step}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutProductPage;

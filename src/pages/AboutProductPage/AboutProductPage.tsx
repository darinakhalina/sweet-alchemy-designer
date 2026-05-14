import { useTranslation } from 'react-i18next';
import Hero from '@/components/Hero';
import Button from '@/components/Button';

const AboutProductPage = () => {
  const { t } = useTranslation();

  const handleTryForFree = () => {
    // TODO: wire up real signup flow (modal or dedicated route)
  };

  return (
    <main className="about-product" data-testid="about-product-page">
      <Hero
        data-testid="about-product-hero"
        accentTitle={t('pages.aboutProduct.hero.accentTitle')}
        description={t('pages.aboutProduct.hero.description')}
        image={{
          src: '/images/hero-about.png',
          alt: t('pages.aboutProduct.hero.imageAlt'),
          variant: 0,
        }}
      >
        <Button variant="primary" size="lg" onClick={handleTryForFree}>
          {t('pages.aboutProduct.hero.ctaPrimary')}
        </Button>
      </Hero>
    </main>
  );
};

export default AboutProductPage;

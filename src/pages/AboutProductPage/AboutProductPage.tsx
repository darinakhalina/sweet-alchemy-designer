import { useTranslation } from 'react-i18next';
import Hero from '@/components/Hero';
import Button from '@/components/Button';
import Carousel from '@/components/Carousel';

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

      <section className="about-product__carousel-section">
        <Carousel showDots={false}>
          {Array.from({ length: 5 }, (_, i) => (
            <Carousel.Slide key={i}>
              <div className="about-product__test-slide">test {i + 1}</div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </section>
    </main>
  );
};

export default AboutProductPage;

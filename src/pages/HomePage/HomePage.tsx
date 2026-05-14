import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '@/components/Hero';
import Button from '@/components/Button';
import ProblemSolutions from '@/components/ProblemSolutions';
import Carousel from '@/components/Carousel';
import { ROUTES } from '@/constants/routes';

const HomePage = () => {
  const { t } = useTranslation();

  const handleTryForFree = () => {
    // TODO: wire up real signup flow (modal or dedicated route)
  };

  return (
    <main className="home-page" data-testid="home-page">
      <Hero
        data-testid="home-hero"
        title={t('pages.home.hero.title')}
        accentTitle={t('pages.home.hero.accentTitle')}
        description={t('pages.home.hero.description')}
        image={{
          src: '/images/hero-home.jpg',
          alt: t('pages.home.hero.imageAlt'),
          variant: 0,
        }}
      >
        <Button variant="primary" size="lg" onClick={handleTryForFree}>
          {t('pages.home.hero.ctaPrimary')}
        </Button>
        <Link to={ROUTES.ABOUT} className="btn btn--secondary btn--lg">
          {t('pages.home.hero.ctaSecondary')}
        </Link>
      </Hero>

      <ProblemSolutions />

      <section className="home-page__carousel-section">
        <Carousel showArrows={false}>
          {Array.from({ length: 5 }, (_, i) => (
            <Carousel.Slide key={i}>
              <div className="home-page__test-slide">test {i + 1}</div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </section>
    </main>
  );
};

export default HomePage;

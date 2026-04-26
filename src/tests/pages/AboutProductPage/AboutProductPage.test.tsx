import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutProductPage from '@/pages/AboutProductPage';

const renderAboutProductPage = () => {
  return render(
    <MemoryRouter>
      <AboutProductPage />
    </MemoryRouter>,
  );
};

describe('AboutProductPage', () => {
  it('renders the page root element', () => {
    renderAboutProductPage();
    expect(screen.getByTestId('about-product-page')).toBeInTheDocument();
  });

  it('renders hero section with title and description', () => {
    renderAboutProductPage();
    expect(screen.getByTestId('about-product-hero')).toBeInTheDocument();
    expect(screen.getByTestId('about-product-title')).toHaveTextContent('pages.aboutProduct.hero.title');
    expect(screen.getByTestId('about-product-description')).toHaveTextContent('pages.aboutProduct.hero.description');
  });

  it('renders CTA button linking to login', () => {
    renderAboutProductPage();
    const ctaButton = screen.getByText('pages.aboutProduct.hero.cta');
    expect(ctaButton).toBeInTheDocument();

    const link = ctaButton.closest('a');
    expect(link).toHaveAttribute('href', '/login');
  });

  it('renders hero image with alt text', () => {
    renderAboutProductPage();
    expect(screen.getByTestId('about-product-image')).toBeInTheDocument();
    expect(screen.getByAltText('pages.aboutProduct.hero.imageAlt')).toBeInTheDocument();
  });

  it('renders "how it works" section with title', () => {
    renderAboutProductPage();
    expect(screen.getByTestId('about-product-how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('about-product-how-title')).toHaveTextContent('pages.aboutProduct.howItWorks.title');
  });

  it('renders three steps', () => {
    renderAboutProductPage();
    const steps = screen.getAllByTestId('about-product-step');
    expect(steps).toHaveLength(3);
  });

  it('renders step content with numbers, titles, and descriptions', () => {
    renderAboutProductPage();
    expect(screen.getByText('pages.aboutProduct.howItWorks.step1.number')).toBeInTheDocument();
    expect(screen.getByText('pages.aboutProduct.howItWorks.step1.title')).toBeInTheDocument();
    expect(screen.getByText('pages.aboutProduct.howItWorks.step1.description')).toBeInTheDocument();
    expect(screen.getByText('pages.aboutProduct.howItWorks.step2.number')).toBeInTheDocument();
    expect(screen.getByText('pages.aboutProduct.howItWorks.step3.number')).toBeInTheDocument();
  });
});

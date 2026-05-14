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
  it('renders the page root', () => {
    renderAboutProductPage();
    expect(screen.getByTestId('about-product-page')).toBeInTheDocument();
  });

  it('renders hero section with accent title and description', () => {
    renderAboutProductPage();
    expect(screen.getByTestId('about-product-hero')).toBeInTheDocument();
    expect(screen.getByText('pages.aboutProduct.hero.accentTitle')).toBeInTheDocument();
    expect(screen.getByText('pages.aboutProduct.hero.description')).toBeInTheDocument();
  });

  it('renders primary CTA as a button (no navigation yet)', () => {
    renderAboutProductPage();
    expect(screen.getByText('pages.aboutProduct.hero.ctaPrimary')).toBeInTheDocument();
  });

  it('renders hero image with alt text', () => {
    renderAboutProductPage();
    expect(screen.getByAltText('pages.aboutProduct.hero.imageAlt')).toBeInTheDocument();
  });
});

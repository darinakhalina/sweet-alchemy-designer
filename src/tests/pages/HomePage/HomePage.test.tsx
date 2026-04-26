import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';

const renderHomePage = () => {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
};

describe('HomePage', () => {
  it('renders home page', () => {
    renderHomePage();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    renderHomePage();
    expect(screen.getByText('pages.home.title')).toBeInTheDocument();
    expect(screen.getByText('pages.home.subtitle')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderHomePage();
    expect(screen.getByText('pages.home.navigation')).toBeInTheDocument();
    expect(screen.getByText('pages.home.demo')).toBeInTheDocument();
    expect(screen.getByText('pages.home.demoPatterns')).toBeInTheDocument();
  });
});

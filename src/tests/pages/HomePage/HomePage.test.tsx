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
});

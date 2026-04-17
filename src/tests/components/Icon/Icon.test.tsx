import { render, screen } from '@testing-library/react';
import Icon from '@/components/Icon';

describe('Icon', () => {
  it('renders svg with use element pointing to sprite', () => {
    const { container } = render(<Icon name="icon-search" />);
    const use = container.querySelector('use');
    expect(use).toHaveAttribute('href', '/images/icons.svg#icon-search');
  });

  it('applies default size class md', () => {
    render(<Icon name="icon-search" />);
    const svg = screen.getByTestId('icon');
    expect(svg).toHaveClass('icon', 'icon--md');
  });

  it('applies specified size class', () => {
    render(<Icon name="icon-search" size="lg" />);
    expect(screen.getByTestId('icon')).toHaveClass('icon--lg');
  });

  it('passes additional className', () => {
    render(<Icon name="icon-search" className="my-icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('icon', 'my-icon');
  });

  it('has aria-hidden attribute', () => {
    render(<Icon name="icon-search" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });
});

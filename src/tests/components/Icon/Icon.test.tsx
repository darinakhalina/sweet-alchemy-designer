import { render } from '@testing-library/react';
import Icon from '@/components/Icon';

describe('Icon', () => {
  it('renders svg with use element pointing to sprite', () => {
    const { container } = render(<Icon name="icon-search" />);
    const use = container.querySelector('use');
    expect(use).toHaveAttribute('href', '/images/icons.svg#icon-search');
  });

  it('applies default size class md', () => {
    const { container } = render(<Icon name="icon-search" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('icon', 'icon--md');
  });

  it('applies specified size class', () => {
    const { container } = render(<Icon name="icon-search" size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('icon--lg');
  });

  it('passes additional className', () => {
    const { container } = render(<Icon name="icon-search" className="my-icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('icon', 'my-icon');
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<Icon name="icon-search" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});

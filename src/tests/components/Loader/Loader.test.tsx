import { render, screen } from '@testing-library/react';
import Loader from '@/components/Loader';

describe('Loader', () => {
  it('renders with role="status"', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies default size md and variant primary', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('loader', 'loader--md', 'loader--primary');
  });

  it('applies size class', () => {
    render(<Loader size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('loader--sm');
  });

  it('applies variant class', () => {
    render(<Loader variant="brand" />);
    expect(screen.getByRole('status')).toHaveClass('loader--brand');
  });

  it('renders without overlay wrapper by default', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader-overlay')).not.toBeInTheDocument();
  });

  it('wraps in overlay when overlay=true', () => {
    const { container } = render(<Loader overlay />);
    expect(container.querySelector('.loader-overlay')).toBeInTheDocument();
    expect(container.querySelector('.loader-overlay .loader')).toBeInTheDocument();
  });

  it('has sr-only text for accessibility', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('passes additional className', () => {
    render(<Loader className="extra" />);
    expect(screen.getByRole('status')).toHaveClass('extra');
  });
});

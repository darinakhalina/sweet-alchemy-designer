import { render, screen } from '@testing-library/react';
import Loader from '@/components/Loader';

describe('Loader', () => {
  it('renders with role="status"', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toHaveAttribute('role', 'status');
  });

  it('applies default size md and variant primary', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toHaveClass('loader', 'loader--md', 'loader--primary');
  });

  it('applies size class', () => {
    render(<Loader size="sm" />);
    expect(screen.getByTestId('loader')).toHaveClass('loader--sm');
  });

  it('applies variant class', () => {
    render(<Loader variant="brand" />);
    expect(screen.getByTestId('loader')).toHaveClass('loader--brand');
  });

  it('renders without overlay wrapper by default', () => {
    render(<Loader />);
    expect(screen.queryByTestId('loader-overlay')).not.toBeInTheDocument();
  });

  it('wraps in overlay when overlay=true', () => {
    render(<Loader overlay />);
    expect(screen.getByTestId('loader-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('has sr-only text for accessibility', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('passes additional className', () => {
    render(<Loader className="extra" />);
    expect(screen.getByTestId('loader')).toHaveClass('extra');
  });
});

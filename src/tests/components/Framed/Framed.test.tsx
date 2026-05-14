import { render, screen } from '@testing-library/react';
import Framed from '@/components/Framed';

describe('Framed', () => {
  it('renders children directly inside the framed root', () => {
    render(
      <Framed>
        <span data-testid="child">cake</span>
      </Framed>,
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass('framed');
  });

  it('applies framed--0 class when no variant prop is given', () => {
    const { container } = render(
      <Framed>
        <span>x</span>
      </Framed>,
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('framed', 'framed--0');
  });

  it('applies framed--3 class when variant={3}', () => {
    const { container } = render(
      <Framed variant={3}>
        <span>x</span>
      </Framed>,
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('framed--3');
  });

  it('cycles variants via modulo 20 (variant={23} → framed--3)', () => {
    const { container } = render(
      <Framed variant={23}>
        <span>x</span>
      </Framed>,
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('framed--3');
  });

  it('merges external className onto the root', () => {
    const { container } = render(
      <Framed className="custom-class">
        <span>x</span>
      </Framed>,
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('framed', 'framed--0', 'custom-class');
  });
});

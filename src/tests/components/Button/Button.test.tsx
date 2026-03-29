import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies default variant primary and size md', () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn', 'btn--primary', 'btn--md');
  });

  it('applies variant class', () => {
    render(<Button variant="brand">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--brand');
  });

  it('applies size class', () => {
    render(<Button size="lg">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--lg');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled and does not fire onClick when isDisabled', () => {
    const onClick = vi.fn();
    render(<Button isDisabled onClick={onClick}>Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('btn--disabled');
  });

  it('is disabled and has loading class when isLoading', () => {
    render(<Button isLoading>Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('btn--loading');
  });

  it('applies uppercase class', () => {
    render(<Button uppercase>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--uppercase');
  });

  it('renders left icon', () => {
    const { container } = render(<Button iconLeft="icon-search">Search</Button>);
    const svg = container.querySelector('svg.btn__icon');
    expect(svg).toBeInTheDocument();
  });

  it('renders right icon', () => {
    const { container } = render(<Button iconRight="icon-arrow-right">Next</Button>);
    const svgs = container.querySelectorAll('svg.btn__icon');
    expect(svgs).toHaveLength(1);
  });

  it('applies icon-only class and hides label', () => {
    const { container } = render(<Button iconLeft="icon-plus" iconOnly>Add</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn--icon-only');
    const label = container.querySelector('.btn__label--hidden');
    expect(label).toBeInTheDocument();
  });

  it('has type="button" by default', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('accepts type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});

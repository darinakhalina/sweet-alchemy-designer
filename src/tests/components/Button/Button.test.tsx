import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByTestId('btn')).toHaveTextContent('Click me');
  });

  it('applies default variant primary and size md', () => {
    render(<Button>Test</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('btn', 'btn--primary', 'btn--md');
  });

  it('applies variant class', () => {
    render(<Button variant="brand">Test</Button>);
    expect(screen.getByTestId('btn')).toHaveClass('btn--brand');
  });

  it('applies size class', () => {
    render(<Button size="lg">Test</Button>);
    expect(screen.getByTestId('btn')).toHaveClass('btn--lg');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);
    fireEvent.click(screen.getByTestId('btn'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled and does not fire onClick when isDisabled', () => {
    const onClick = vi.fn();
    render(<Button isDisabled onClick={onClick}>Test</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('btn--disabled');
  });

  it('is disabled and has loading class when isLoading', () => {
    render(<Button isLoading>Test</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('btn--loading');
  });

  it('applies uppercase class', () => {
    render(<Button uppercase>Test</Button>);
    expect(screen.getByTestId('btn')).toHaveClass('btn--uppercase');
  });

  it('renders left icon', () => {
    render(<Button iconLeft="icon-search">Search</Button>);
    const icons = screen.getAllByTestId('icon');
    expect(icons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders right icon', () => {
    render(<Button iconRight="icon-arrow-right">Next</Button>);
    const icons = screen.getAllByTestId('icon');
    expect(icons.length).toBeGreaterThanOrEqual(1);
  });

  it('applies icon-only class and hides label', () => {
    render(<Button iconLeft="icon-plus" iconOnly>Add</Button>);
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('btn--icon-only');
    const label = screen.getByTestId('btn-label');
    expect(label).toHaveClass('btn__label--hidden');
  });

  it('has type="button" by default', () => {
    render(<Button>Test</Button>);
    expect(screen.getByTestId('btn')).toHaveAttribute('type', 'button');
  });

  it('accepts type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByTestId('btn')).toHaveAttribute('type', 'submit');
  });
});

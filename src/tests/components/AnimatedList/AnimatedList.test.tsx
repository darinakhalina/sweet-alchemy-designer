import { render, screen } from '@testing-library/react';
import AnimatedList from '@/components/AnimatedList';

describe('AnimatedList', () => {
  it('renders children', () => {
    render(
      <AnimatedList>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </AnimatedList>,
    );
    expect(screen.getByTestId('animated-list')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('adds animated-list__item class to each child', () => {
    render(
      <AnimatedList>
        <div data-testid="child-0">A</div>
        <div data-testid="child-1">B</div>
      </AnimatedList>,
    );
    expect(screen.getByTestId('child-0')).toHaveClass('animated-list__item');
    expect(screen.getByTestId('child-1')).toHaveClass('animated-list__item');
  });

  it('sets --item-index CSS variable on each child', () => {
    render(
      <AnimatedList>
        <div data-testid="child-0">A</div>
        <div data-testid="child-1">B</div>
      </AnimatedList>,
    );
    expect(screen.getByTestId('child-0').style.getPropertyValue('--item-index')).toBe('0');
    expect(screen.getByTestId('child-1').style.getPropertyValue('--item-index')).toBe('1');
  });

  it('preserves existing className on children', () => {
    render(
      <AnimatedList>
        <div data-testid="child" className="col-12 col-md-6">A</div>
      </AnimatedList>,
    );
    const child = screen.getByTestId('child');
    expect(child).toHaveClass('col-12', 'col-md-6', 'animated-list__item');
  });

  it('passes className to container', () => {
    render(
      <AnimatedList className="row row--gap-md">
        <div>A</div>
      </AnimatedList>,
    );
    expect(screen.getByTestId('animated-list')).toHaveClass('animated-list', 'row', 'row--gap-md');
  });

  it('sets custom stagger delay', () => {
    render(
      <AnimatedList staggerDelay={150}>
        <div data-testid="child-0">A</div>
      </AnimatedList>,
    );
    expect(screen.getByTestId('child-0').style.getPropertyValue('--stagger-delay')).toBe('150ms');
  });
});

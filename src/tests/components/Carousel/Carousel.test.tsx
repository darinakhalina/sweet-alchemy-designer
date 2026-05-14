import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Carousel from '@/components/Carousel';

// Embla relies on layout / IntersectionObserver — mock it for jsdom unit tests.
// The tuple is created once inside the factory and reused across renders to avoid
// React re-render loops caused by referentially-new emblaApi objects.
vi.mock('embla-carousel-react', () => {
  const refFn = (_node: HTMLElement | null) => _node;
  const apiMock = {
    scrollPrev: () => undefined,
    scrollNext: () => undefined,
    scrollTo: () => undefined,
    canScrollPrev: () => false,
    canScrollNext: () => true,
    selectedScrollSnap: () => 0,
    scrollSnapList: () => [0, 1, 2],
    on: () => undefined,
    off: () => undefined,
  };
  const tuple = [refFn, apiMock];
  return {
    default: () => tuple,
  };
});

describe('Carousel', () => {
  it('renders a viewport with the slide track', () => {
    const { container } = render(
      <Carousel>
        <Carousel.Slide>A</Carousel.Slide>
        <Carousel.Slide>B</Carousel.Slide>
      </Carousel>,
    );
    expect(container.querySelector('.carousel__viewport')).toBeInTheDocument();
    expect(container.querySelector('.carousel__track')).toBeInTheDocument();
  });

  it('renders all provided slides', () => {
    render(
      <Carousel>
        <Carousel.Slide>One</Carousel.Slide>
        <Carousel.Slide>Two</Carousel.Slide>
        <Carousel.Slide>Three</Carousel.Slide>
      </Carousel>,
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Three')).toBeInTheDocument();
  });

  it('renders prev and next buttons by default', () => {
    const { container } = render(
      <Carousel>
        <Carousel.Slide>A</Carousel.Slide>
      </Carousel>,
    );
    expect(container.querySelector('.carousel__nav--prev')).toBeInTheDocument();
    expect(container.querySelector('.carousel__nav--next')).toBeInTheDocument();
  });

  it('hides arrows when showArrows={false}', () => {
    const { container } = render(
      <Carousel showArrows={false}>
        <Carousel.Slide>A</Carousel.Slide>
      </Carousel>,
    );
    expect(container.querySelector('.carousel__nav--prev')).toBeNull();
    expect(container.querySelector('.carousel__nav--next')).toBeNull();
  });

  it('renders dots by default (one per scroll snap)', () => {
    const { container } = render(
      <Carousel>
        <Carousel.Slide>A</Carousel.Slide>
        <Carousel.Slide>B</Carousel.Slide>
        <Carousel.Slide>C</Carousel.Slide>
      </Carousel>,
    );
    const dots = container.querySelectorAll('.carousel__dots > li');
    expect(dots).toHaveLength(3); // mocked scrollSnapList returns [0,1,2]
  });

  it('hides dots when showDots={false}', () => {
    const { container } = render(
      <Carousel showDots={false}>
        <Carousel.Slide>A</Carousel.Slide>
      </Carousel>,
    );
    expect(container.querySelector('.carousel__dots')).toBeNull();
  });

  it('renders Carousel.Slide with carousel__slide class', () => {
    const { container } = render(
      <Carousel>
        <Carousel.Slide>X</Carousel.Slide>
      </Carousel>,
    );
    const slide = container.querySelector('.carousel__slide');
    expect(slide).toBeInTheDocument();
    expect(slide).toHaveTextContent('X');
  });

  it('merges external className onto root', () => {
    const { container } = render(
      <Carousel className="custom">
        <Carousel.Slide>A</Carousel.Slide>
      </Carousel>,
    );
    expect(container.firstChild).toHaveClass('carousel', 'custom');
  });
});

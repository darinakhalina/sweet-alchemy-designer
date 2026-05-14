import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import type { CarouselProps, CarouselSlideProps } from './interfaces/CarouselProps';
import { DEFAULT_ITEMS_PER_VIEW } from './constants/defaultItemsPerView';

function Slide({ className, children }: CarouselSlideProps) {
  return <li className={clsx('carousel__slide', className)}>{children}</li>;
}

const Carousel = ({
  itemsPerView,
  showArrows = true,
  showDots = true,
  prevAriaLabel = 'Попередній слайд',
  nextAriaLabel = 'Наступний слайд',
  className,
  children,
}: CarouselProps) => {
  const itemsPV = { ...DEFAULT_ITEMS_PER_VIEW, ...itemsPerView };
  const mdItems = itemsPV.md ?? itemsPV.base;
  const lgItems = itemsPV.lg ?? mdItems;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: itemsPV.base,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: mdItems },
      '(min-width: 1200px)': { slidesToScroll: lgItems },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const style = {
    '--carousel-items-base': itemsPV.base,
    '--carousel-items-md': mdItems,
    '--carousel-items-lg': lgItems,
  } as CSSProperties;

  return (
    <div className={clsx('carousel', className)} style={style}>
      <div className="carousel__main">
        {showArrows && (
          <button
            type="button"
            className="carousel__nav carousel__nav--prev"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label={prevAriaLabel}
          >
            <Icon name="icon-arrow-left" size="md" />
          </button>
        )}

        <div className="carousel__viewport" ref={emblaRef}>
          <ul className="carousel__track">{children}</ul>
        </div>

        {showArrows && (
          <button
            type="button"
            className="carousel__nav carousel__nav--next"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label={nextAriaLabel}
          >
            <Icon name="icon-arrow-right" size="md" />
          </button>
        )}
      </div>

      {showDots && scrollSnaps.length > 1 && (
        <ul className="carousel__dots">
          {scrollSnaps.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                className={clsx('carousel__dot', i === selectedIndex && 'carousel__dot--active')}
                onClick={() => scrollTo(i)}
                aria-current={i === selectedIndex}
                aria-label={`Слайд ${i + 1}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Carousel.Slide = Slide;

export default Carousel;

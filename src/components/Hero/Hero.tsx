import clsx from 'clsx';
import Framed from '@/components/Framed';
import type { HeroProps } from './interfaces/HeroProps';

const Hero = ({
  title,
  accentTitle,
  description,
  image,
  children,
  className,
  'data-testid': dataTestId,
}: HeroProps) => {
  const hasTitleBlock = Boolean(title || accentTitle);

  const content = (
    <div className="hero__content">
      {hasTitleBlock && (
        <div className="hero__title-block">
          {title && <h1 className="hero__title h1">{title}</h1>}
          {accentTitle && (
            <h1 className="hero__title hero__title--accent h1-accent">{accentTitle}</h1>
          )}
        </div>
      )}
      <p className="hero__description text">{description}</p>
      {children && <div className="hero__cta">{children}</div>}
    </div>
  );

  return (
    <section
      className={clsx('hero', image && 'hero--with-image', className)}
      data-testid={dataTestId}
    >
      {image ? (
        <div className="row row--align-center row--gap-md">
          <div className="hero__content-col col-12 col-md-7 col-lg-6">{content}</div>
          <div className="hero__image-col col-12 col-md-5 col-lg-6">
            <div className="hero__image">
              <Framed variant={image.variant}>
                <img src={image.src} alt={image.alt} />
              </Framed>
            </div>
          </div>
        </div>
      ) : (
        content
      )}
    </section>
  );
};

export default Hero;

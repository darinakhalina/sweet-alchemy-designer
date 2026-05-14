import clsx from 'clsx';
import { FRAME_VARIANT_COUNT } from './constants/frameVariantCount';
import type { FramedProps } from './interfaces/FramedProps';

const Framed = ({ variant = 0, className, children }: FramedProps) => {
  const actualVariant = ((variant % FRAME_VARIANT_COUNT) + FRAME_VARIANT_COUNT) % FRAME_VARIANT_COUNT;

  return (
    <div className={clsx('framed', `framed--${actualVariant}`, className)}>
      {children}
    </div>
  );
};

export default Framed;

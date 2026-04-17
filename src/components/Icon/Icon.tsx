import clsx from 'clsx';
import type { IconProps } from './interfaces/IconProps';

const Icon = ({ name, size = 'md', className }: IconProps) => {
  return (
    <svg className={clsx('icon', `icon--${size}`, className)} aria-hidden="true" data-testid="icon">
      <use href={`/images/icons.svg#${name}`} />
    </svg>
  );
};

export default Icon;

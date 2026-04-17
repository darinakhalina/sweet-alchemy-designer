import clsx from 'clsx';
import type { LoaderProps } from './interfaces/LoaderProps';

const Loader = ({ size = 'md', variant = 'primary', overlay = false, className }: LoaderProps) => {
  const spinner = (
    <div
      className={clsx('loader', `loader--${size}`, `loader--${variant}`, className)}
      role="status"
      aria-label="Loading"
      data-testid="loader"
    >
      <span className="loader__sr-only">Loading...</span>
    </div>
  );

  if (overlay) {
    return <div className="loader-overlay" data-testid="loader-overlay">{spinner}</div>;
  }

  return spinner;
};

export default Loader;

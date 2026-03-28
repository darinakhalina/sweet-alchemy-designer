import clsx from 'clsx';
import type { ButtonProps } from './interfaces/ButtonProps';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      type={type}
      className={clsx('btn', `btn--${variant}`, `btn--${size}`, className, {
        'btn--loading': isLoading,

        'btn--disabled': isDisabled,
      })}
      onClick={onClick}
    >
      {isLoading && (
        <svg className="btn__loader">
          <use href="/images/icons.svg#icon-spinner" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;

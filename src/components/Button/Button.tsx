import clsx from 'clsx';
import Icon from '@/components/Icon';
import type { ButtonProps } from './interfaces/ButtonProps';
import { iconSizeMap } from './constants/iconSizeMap';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  uppercase = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
}: ButtonProps) => {
  const iconSize = iconSizeMap[size];

  return (
    <button
      disabled={isDisabled || isLoading}
      type={type}
      className={clsx('btn', `btn--${variant}`, `btn--${size}`, className, {
        'btn--uppercase': uppercase,
        'btn--loading': isLoading,
        'btn--disabled': isDisabled,
        'btn--icon-only': iconOnly,
      })}
      onClick={onClick}
    >
      {iconLeft && <Icon name={iconLeft} size={iconSize} className="btn__icon" />}
      <span className={clsx('btn__label', { 'btn__label--hidden': iconOnly })}>{children}</span>
      {iconRight && <Icon name={iconRight} size={iconSize} className="btn__icon" />}
    </button>
  );
};

export default Button;

import clsx from 'clsx';
import type { ButtonIconProps } from './interfaces/ButtonIconProps';

const ButtonIcon = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
  iconName,
}: ButtonIconProps) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      type={type}
      className={clsx('btn-icon', `btn-icon--${variant}`, `btn-icon--${size}`, className, {
        'btn-icon--loading': isLoading,
        'btn-icon--disabled': isDisabled,
      })}
      onClick={onClick}
      aria-label={iconName}
      aria-busy={isLoading ? 'true' : undefined}
    >
      {isLoading ? (
        <svg className="btn-icon__icon btn-icon__loader">
          <use href="/images/icons.svg#icon-spinner" />
        </svg>
      ) : (
        <svg className="btn-icon__icon">
          <use href={`/images/icons.svg#${iconName}`} />
        </svg>
      )}
    </button>
  );
};

export default ButtonIcon;

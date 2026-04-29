import { useId, useRef, useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import type { InputProps } from './interfaces/InputProps';

const Input = ({
  name,
  type = 'text',
  variant = 'outlined',
  label,
  placeholder,
  helpText,
  startIcon,
  endIcon,
  onEndIconClick,
  endAdornment,
  multiline = false,
  rows = 4,
  maxLength,
  showPasswordToggle = false,
  disabled = false,
  readOnly = false,
  required = false,
  autoComplete,
  autoFocus = false,
  className,
}: InputProps) => {
  const { t } = useTranslation();
  const inputId = useId();
  const helpId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const resolvedType = isPassword && showPassword ? 'text' : type;
  const hasError = meta.touched && !!meta.error;
  const message = hasError ? meta.error : helpText;
  const hasEndContent = !!endIcon || !!endAdornment || (isPassword && showPasswordToggle);

  useLayoutEffect(() => {
    if (!multiline || !textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [field.value, multiline]);

  const sharedProps = {
    id: inputId,
    disabled,
    readOnly,
    required,
    placeholder,
    autoComplete,
    autoFocus,
    'aria-describedby': message ? helpId : undefined,
    'aria-invalid': hasError || undefined,
    ...field,
  };

  return (
    <div className={clsx('input', className)} data-testid={`${name}-input`}>
      {label && (
        <label className="input__label" htmlFor={inputId} data-testid={`${name}-input-label`}>
          {label}
          {required && <span className="input__required" aria-hidden="true"> *</span>}
        </label>
      )}

      <div
        className={clsx(
          'input__field-wrapper',
          variant === 'filled' && 'input__field-wrapper--filled',
          multiline && 'input__field-wrapper--multiline',
          hasError && 'input__field-wrapper--error',
          disabled && 'input__field-wrapper--disabled',
          hasEndContent && 'input__field-wrapper--has-end',
        )}
        data-testid={`${name}-input-wrapper`}
      >
        {startIcon && (
          <Icon name={startIcon} size="lg" className="input__start-icon" />
        )}

        {multiline ? (
          <textarea
            ref={textareaRef}
            {...sharedProps}
            rows={rows}
            maxLength={maxLength}
            className="input__field input__field--multiline"
            data-testid={`${name}-input-field`}
          />
        ) : (
          <input
            {...sharedProps}
            type={resolvedType}
            maxLength={maxLength}
            className="input__field"
            data-testid={`${name}-input-field`}
          />
        )}

        {isPassword && showPasswordToggle && (
          <button
            type="button"
            className="input__icon-btn"
            aria-pressed={showPassword}
            aria-label={showPassword ? t('input.hidePassword') : t('input.showPassword')}
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            data-testid={`${name}-input-password-toggle`}
          >
            <Icon name={showPassword ? 'icon-eye-open' : 'icon-eye-close'} size="lg" />
          </button>
        )}

        {endIcon && !endAdornment && (
          onEndIconClick ? (
            <button
              type="button"
              className="input__icon-btn"
              onClick={onEndIconClick}
              tabIndex={-1}
              data-testid={`${name}-input-end-icon`}
            >
              <Icon name={endIcon} size="lg" />
            </button>
          ) : (
            <Icon name={endIcon} size="lg" className="input__end-icon" />
          )
        )}

        {endAdornment && (
          <div className="input__end-adornment" data-testid={`${name}-input-end-adornment`}>
            {endAdornment}
          </div>
        )}
      </div>

      {message && (
        <p
          id={helpId}
          className={clsx('input__help', hasError && 'input__help--error')}
          role={hasError ? 'alert' : undefined}
          data-testid={`${name}-input-help`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Input;

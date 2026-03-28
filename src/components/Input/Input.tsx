import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, ErrorMessage } from 'formik';
import icons from '/images/icons.svg';
import clsx from 'clsx';
import type { InputProps } from './interfaces/InputProps';

export default function Input({
  name,
  type = 'text',
  placeholder,
  required = false,
  showPasswordToggle = false,
  className = '',
  children,
  errors,
  touched,
  ...props
}: InputProps) {
  const { t } = useTranslation();
  const inputId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;
  const hasError = touched[name] && errors[name];

  return (
    <div className="input">
      <div className="input__wrapper">
        <Field
          id={inputId}
          name={name}
          type={inputType}
          required={required}
          placeholder={placeholder}
          className={clsx('input__field', hasError && 'input__field--error', className)}
          data-password={isPasswordField ? 'true' : 'false'}
          {...props}
        >
          {children}
        </Field>

        {isPasswordField && showPasswordToggle && (
          <button
            type="button"
            className="input__eye-btn"
            aria-pressed={showPassword}
            aria-label={showPassword ? t('components.input.hidePassword') : t('components.input.showPassword')}
            onClick={() => setShowPassword((v) => !v)}
          >
            <svg className="input__eye-icon" aria-hidden="true">
              <use href={`${icons}#${showPassword ? 'icon-eye-open' : 'icon-eye-close'}`} />
            </svg>
          </button>
        )}
      </div>

      <ErrorMessage name={name} component="div" className="input__error" />
    </div>
  );
}

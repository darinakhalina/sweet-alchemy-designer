import { useRef, useLayoutEffect } from 'react';
import { Field, useFormikContext, useField } from 'formik';
import clsx from 'clsx';
import type { TextareaProps } from './interfaces/TextareaProps';

const Textarea = ({ name, placeholder, maxLength = 1000, counter = true, className = '' }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [field, meta] = useField(name);
  const { values } = useFormikContext<Record<string, string>>();
  const text = values?.[name] || '';

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      const lineHeight = window.getComputedStyle(el).lineHeight;
      el.style.height = el.value ? el.scrollHeight + 'px' : lineHeight;
    }
  }, [field.value]);

  return (
    <div>
      <div className="textarea__field">
        <Field
          innerRef={textareaRef}
          id={name}
          as="textarea"
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          className={clsx(
            'textarea__input',
            meta.touched && meta.error && 'textarea__input--error',
            className,
          )}
        />
        {counter && (
          <p className="textarea__counter">
            <span className={clsx(text.length > 0 && 'textarea__counter--accent')}>{text.length}</span>/{maxLength}
          </p>
        )}
      </div>
      {meta.touched && meta.error && <div className="textarea__error">{meta.error}</div>}
    </div>
  );
};

export default Textarea;

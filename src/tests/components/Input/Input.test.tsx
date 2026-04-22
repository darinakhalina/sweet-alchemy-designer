import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import Input from '@/components/Input';

function renderInput(
  props: Record<string, unknown> = {},
  formikProps: Record<string, unknown> = {},
) {
  const name = (props.name as string) ?? 'testField';
  const initialValues = { [name]: '', ...formikProps.initialValues as Record<string, string> };
  const initialErrors = formikProps.initialErrors as Record<string, string> | undefined;
  const initialTouched = formikProps.initialTouched as Record<string, boolean> | undefined;

  return render(
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      onSubmit={vi.fn()}
    >
      <Form>
        <Input name={name} {...props} />
      </Form>
    </Formik>,
  );
}

describe('Input', () => {
  it('renders input field with correct test ids', () => {
    renderInput();
    expect(screen.getByTestId('testField-input')).toBeInTheDocument();
    expect(screen.getByTestId('testField-input-field')).toBeInTheDocument();
    expect(screen.getByTestId('testField-input-wrapper')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    renderInput({ label: 'Email' });
    const label = screen.getByTestId('testField-input-label');
    expect(label).toHaveTextContent('Email');
  });

  it('does not render label when not provided', () => {
    renderInput();
    expect(screen.queryByTestId('testField-input-label')).not.toBeInTheDocument();
  });

  it('renders required asterisk in label', () => {
    renderInput({ label: 'Name', required: true });
    const label = screen.getByTestId('testField-input-label');
    expect(label).toHaveTextContent('*');
  });

  it('renders placeholder', () => {
    renderInput({ placeholder: 'Enter text' });
    expect(screen.getByTestId('testField-input-field')).toHaveAttribute('placeholder', 'Enter text');
  });

  it('renders help text', () => {
    renderInput({ helpText: 'Some hint' });
    const help = screen.getByTestId('testField-input-help');
    expect(help).toHaveTextContent('Some hint');
    expect(help).not.toHaveClass('input__help--error');
  });

  it('does not render help when no helpText and no error', () => {
    renderInput();
    expect(screen.queryByTestId('testField-input-help')).not.toBeInTheDocument();
  });

  it('applies custom className to root', () => {
    renderInput({ className: 'my-custom' });
    expect(screen.getByTestId('testField-input')).toHaveClass('input', 'my-custom');
  });

  describe('variants', () => {
    it('applies outlined variant by default (no filled class)', () => {
      renderInput();
      expect(screen.getByTestId('testField-input-wrapper')).not.toHaveClass('input__field-wrapper--filled');
    });

    it('applies filled variant class', () => {
      renderInput({ variant: 'filled' });
      expect(screen.getByTestId('testField-input-wrapper')).toHaveClass('input__field-wrapper--filled');
    });
  });

  describe('error state', () => {
    const errorProps = {
      initialErrors: { testField: 'Required' },
      initialTouched: { testField: true },
    };

    it('shows error message with error class', () => {
      renderInput({}, errorProps);
      const help = screen.getByTestId('testField-input-help');
      expect(help).toHaveTextContent('Required');
      expect(help).toHaveClass('input__help--error');
    });

    it('applies error class to wrapper', () => {
      renderInput({}, errorProps);
      expect(screen.getByTestId('testField-input-wrapper')).toHaveClass('input__field-wrapper--error');
    });

    it('sets role="alert" on error message', () => {
      renderInput({}, errorProps);
      expect(screen.getByTestId('testField-input-help')).toHaveAttribute('role', 'alert');
    });

    it('sets aria-invalid on the input', () => {
      renderInput({}, errorProps);
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('aria-invalid', 'true');
    });

    it('error replaces help text', () => {
      renderInput({ helpText: 'Hint' }, errorProps);
      const help = screen.getByTestId('testField-input-help');
      expect(help).toHaveTextContent('Required');
      expect(help).not.toHaveTextContent('Hint');
    });

    it('does not show error class when not touched', () => {
      renderInput({}, { initialErrors: { testField: 'Required' } });
      expect(screen.queryByTestId('testField-input-help')).not.toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('disables the input element', () => {
      renderInput({ disabled: true });
      expect(screen.getByTestId('testField-input-field')).toBeDisabled();
    });

    it('applies disabled class to wrapper', () => {
      renderInput({ disabled: true });
      expect(screen.getByTestId('testField-input-wrapper')).toHaveClass('input__field-wrapper--disabled');
    });
  });

  describe('multiline', () => {
    it('renders textarea instead of input', () => {
      renderInput({ multiline: true });
      const field = screen.getByTestId('testField-input-field');
      expect(field.tagName).toBe('TEXTAREA');
    });

    it('applies multiline classes', () => {
      renderInput({ multiline: true });
      expect(screen.getByTestId('testField-input-wrapper')).toHaveClass('input__field-wrapper--multiline');
      expect(screen.getByTestId('testField-input-field')).toHaveClass('input__field--multiline');
    });

    it('passes rows prop to textarea', () => {
      renderInput({ multiline: true, rows: 6 });
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('rows', '6');
    });

    it('renders input (not textarea) by default', () => {
      renderInput();
      expect(screen.getByTestId('testField-input-field').tagName).toBe('INPUT');
    });
  });

  describe('password toggle', () => {
    it('renders password toggle button', () => {
      renderInput({ type: 'password', showPasswordToggle: true });
      expect(screen.getByTestId('testField-input-password-toggle')).toBeInTheDocument();
    });

    it('starts with type="password"', () => {
      renderInput({ type: 'password', showPasswordToggle: true });
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('type', 'password');
    });

    it('toggles to type="text" on click', () => {
      renderInput({ type: 'password', showPasswordToggle: true });
      fireEvent.click(screen.getByTestId('testField-input-password-toggle'));
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('type', 'text');
    });

    it('toggles back to password on second click', () => {
      renderInput({ type: 'password', showPasswordToggle: true });
      const toggle = screen.getByTestId('testField-input-password-toggle');
      fireEvent.click(toggle);
      fireEvent.click(toggle);
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('type', 'password');
    });

    it('updates aria-pressed on toggle', () => {
      renderInput({ type: 'password', showPasswordToggle: true });
      const toggle = screen.getByTestId('testField-input-password-toggle');
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
    });

    it('updates aria-label on toggle', () => {
      renderInput({ type: 'password', showPasswordToggle: true });
      const toggle = screen.getByTestId('testField-input-password-toggle');
      expect(toggle).toHaveAttribute('aria-label', 'input.showPassword');
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-label', 'input.hidePassword');
    });

    it('does not render toggle when showPasswordToggle is false', () => {
      renderInput({ type: 'password' });
      expect(screen.queryByTestId('testField-input-password-toggle')).not.toBeInTheDocument();
    });

    it('does not render toggle for non-password types', () => {
      renderInput({ type: 'text', showPasswordToggle: true });
      expect(screen.queryByTestId('testField-input-password-toggle')).not.toBeInTheDocument();
    });
  });

  describe('icons', () => {
    it('renders start icon', () => {
      renderInput({ startIcon: 'icon-search' });
      const root = screen.getByTestId('testField-input-wrapper');
      const icon = root.querySelector('.input__start-icon');
      expect(icon).toBeInTheDocument();
    });

    it('renders end icon as static when no click handler', () => {
      renderInput({ endIcon: 'icon-info' });
      const root = screen.getByTestId('testField-input-wrapper');
      expect(root.querySelector('.input__end-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('testField-input-end-icon')).not.toBeInTheDocument();
    });

    it('renders end icon as button when onEndIconClick provided', () => {
      const onClick = vi.fn();
      renderInput({ endIcon: 'icon-clear', onEndIconClick: onClick });
      const btn = screen.getByTestId('testField-input-end-icon');
      expect(btn.tagName).toBe('BUTTON');
      fireEvent.click(btn);
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe('end adornment', () => {
    it('renders end adornment content', () => {
      renderInput({ endAdornment: <span data-testid="custom">kg</span> });
      expect(screen.getByTestId('testField-input-end-adornment')).toBeInTheDocument();
      expect(screen.getByTestId('custom')).toHaveTextContent('kg');
    });

    it('end adornment takes priority over end icon', () => {
      renderInput({ endIcon: 'icon-info', endAdornment: <span>kg</span> });
      expect(screen.getByTestId('testField-input-end-adornment')).toBeInTheDocument();
      expect(screen.queryByTestId('testField-input-end-icon')).not.toBeInTheDocument();
      const wrapper = screen.getByTestId('testField-input-wrapper');
      expect(wrapper.querySelector('.input__end-icon')).not.toBeInTheDocument();
    });
  });

  describe('maxLength', () => {
    it('passes maxLength to input', () => {
      renderInput({ maxLength: 50 });
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('maxlength', '50');
    });

    it('passes maxLength to textarea', () => {
      renderInput({ multiline: true, maxLength: 200 });
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('maxlength', '200');
    });
  });

  describe('input type', () => {
    it('defaults to type="text"', () => {
      renderInput();
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('type', 'text');
    });

    it('accepts type="email"', () => {
      renderInput({ type: 'email' });
      expect(screen.getByTestId('testField-input-field')).toHaveAttribute('type', 'email');
    });
  });

  describe('accessibility', () => {
    it('links label to input via htmlFor/id', () => {
      renderInput({ label: 'Email' });
      const label = screen.getByTestId('testField-input-label');
      const input = screen.getByTestId('testField-input-field');
      expect(label).toHaveAttribute('for', input.id);
    });

    it('links help text to input via aria-describedby', () => {
      renderInput({ helpText: 'Enter email' });
      const input = screen.getByTestId('testField-input-field');
      const help = screen.getByTestId('testField-input-help');
      expect(input).toHaveAttribute('aria-describedby', help.id);
    });

    it('does not set aria-describedby when no message', () => {
      renderInput();
      expect(screen.getByTestId('testField-input-field')).not.toHaveAttribute('aria-describedby');
    });

    it('does not set aria-invalid when no error', () => {
      renderInput();
      expect(screen.getByTestId('testField-input-field')).not.toHaveAttribute('aria-invalid');
    });

    it('help text has no role when not an error', () => {
      renderInput({ helpText: 'Hint' });
      expect(screen.getByTestId('testField-input-help')).not.toHaveAttribute('role');
    });
  });
});

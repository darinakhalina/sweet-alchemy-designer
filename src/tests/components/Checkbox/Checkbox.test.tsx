import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import Checkbox from '@/components/Checkbox';

const renderCheckbox = (props: Record<string, unknown> = {}, initialValue = false) => {
  return render(
    <Formik initialValues={{ agree: initialValue }} onSubmit={vi.fn()}>
      <Form>
        <Checkbox name="agree" label="I agree" {...props} />
      </Form>
    </Formik>,
  );
};

describe('Checkbox', () => {
  it('renders with label', () => {
    renderCheckbox();
    expect(screen.getByTestId('agree-checkbox-label')).toHaveTextContent('I agree');
  });

  it('renders without label', () => {
    render(
      <Formik initialValues={{ agree: false }} onSubmit={vi.fn()}>
        <Form>
          <Checkbox name="agree" />
        </Form>
      </Formik>,
    );
    expect(screen.queryByTestId('agree-checkbox-label')).not.toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    renderCheckbox();
    expect(screen.getByTestId('agree-checkbox-input')).not.toBeChecked();
    expect(screen.getByTestId('agree-checkbox-box')).not.toHaveClass('checkbox__box--checked');
  });

  it('renders checked when initial value is true', () => {
    renderCheckbox({}, true);
    expect(screen.getByTestId('agree-checkbox-input')).toBeChecked();
    expect(screen.getByTestId('agree-checkbox-box')).toHaveClass('checkbox__box--checked');
  });

  it('toggles on click', () => {
    renderCheckbox();
    fireEvent.click(screen.getByTestId('agree-checkbox'));
    expect(screen.getByTestId('agree-checkbox-input')).toBeChecked();

    fireEvent.click(screen.getByTestId('agree-checkbox'));
    expect(screen.getByTestId('agree-checkbox-input')).not.toBeChecked();
  });

  it('does not toggle when disabled', () => {
    renderCheckbox({ disabled: true });
    fireEvent.click(screen.getByTestId('agree-checkbox'));
    expect(screen.getByTestId('agree-checkbox-input')).not.toBeChecked();
  });

  it('applies disabled class', () => {
    renderCheckbox({ disabled: true });
    expect(screen.getByTestId('agree-checkbox')).toHaveClass('checkbox--disabled');
  });

  it('applies custom className', () => {
    renderCheckbox({ className: 'mt-4' });
    expect(screen.getByTestId('agree-checkbox')).toHaveClass('checkbox', 'mt-4');
  });

  it('has accessible input linked to label via htmlFor', () => {
    renderCheckbox();
    const input = screen.getByTestId('agree-checkbox-input');
    const label = screen.getByTestId('agree-checkbox');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });
});

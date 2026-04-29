import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import Switch from '@/components/Switch';

const renderSwitch = (props: Record<string, unknown> = {}, initialValue = false) => {
  return render(
    <Formik initialValues={{ notifications: initialValue }} onSubmit={vi.fn()}>
      <Form>
        <Switch name="notifications" label="Notifications" {...props} />
      </Form>
    </Formik>,
  );
};

describe('Switch', () => {
  it('renders with label', () => {
    renderSwitch();
    expect(screen.getByTestId('notifications-switch-label')).toHaveTextContent('Notifications');
  });

  it('renders without label', () => {
    render(
      <Formik initialValues={{ notifications: false }} onSubmit={vi.fn()}>
        <Form>
          <Switch name="notifications" />
        </Form>
      </Formik>,
    );
    expect(screen.queryByTestId('notifications-switch-label')).not.toBeInTheDocument();
  });

  it('is off by default', () => {
    renderSwitch();
    expect(screen.getByTestId('notifications-switch-input')).not.toBeChecked();
    expect(screen.getByTestId('notifications-switch-track')).not.toHaveClass('switch__track--checked');
  });

  it('renders on when initial value is true', () => {
    renderSwitch({}, true);
    expect(screen.getByTestId('notifications-switch-input')).toBeChecked();
    expect(screen.getByTestId('notifications-switch-track')).toHaveClass('switch__track--checked');
  });

  it('toggles on click', () => {
    renderSwitch();
    fireEvent.click(screen.getByTestId('notifications-switch'));
    expect(screen.getByTestId('notifications-switch-input')).toBeChecked();

    fireEvent.click(screen.getByTestId('notifications-switch'));
    expect(screen.getByTestId('notifications-switch-input')).not.toBeChecked();
  });

  it('does not toggle when disabled', () => {
    renderSwitch({ disabled: true });
    fireEvent.click(screen.getByTestId('notifications-switch'));
    expect(screen.getByTestId('notifications-switch-input')).not.toBeChecked();
  });

  it('applies disabled class', () => {
    renderSwitch({ disabled: true });
    expect(screen.getByTestId('notifications-switch')).toHaveClass('switch--disabled');
  });

  it('has role=switch on input', () => {
    renderSwitch();
    expect(screen.getByTestId('notifications-switch-input')).toHaveAttribute('role', 'switch');
  });

  it('has aria-checked matching state', () => {
    renderSwitch();
    const input = screen.getByTestId('notifications-switch-input');
    expect(input).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(screen.getByTestId('notifications-switch'));
    expect(input).toHaveAttribute('aria-checked', 'true');
  });

  it('applies custom className', () => {
    renderSwitch({ className: 'mt-4' });
    expect(screen.getByTestId('notifications-switch')).toHaveClass('switch', 'mt-4');
  });
});

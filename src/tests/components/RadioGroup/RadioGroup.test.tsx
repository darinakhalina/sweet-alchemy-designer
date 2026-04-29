import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import RadioGroup from '@/components/RadioGroup';

const options = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

const renderRadioGroup = (props: Record<string, unknown> = {}, initialValue = '') => {
  return render(
    <Formik initialValues={{ size: initialValue }} onSubmit={vi.fn()}>
      <Form>
        <RadioGroup
          name="size"
          options={options}
          label="Size"
          {...props}
        />
      </Form>
    </Formik>,
  );
};

describe('RadioGroup', () => {
  it('renders all options', () => {
    renderRadioGroup();
    expect(screen.getByTestId('size-radio-sm')).toBeInTheDocument();
    expect(screen.getByTestId('size-radio-md')).toBeInTheDocument();
    expect(screen.getByTestId('size-radio-lg')).toBeInTheDocument();
  });

  it('renders legend', () => {
    renderRadioGroup();
    expect(screen.getByTestId('size-radio-group-legend')).toHaveTextContent('Size');
  });

  it('renders without legend', () => {
    renderRadioGroup({ label: undefined });
    expect(screen.queryByTestId('size-radio-group-legend')).not.toBeInTheDocument();
  });

  it('renders option labels', () => {
    renderRadioGroup();
    expect(screen.getByText('Small')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('selects initial value', () => {
    renderRadioGroup({}, 'md');
    expect(screen.getByTestId('size-radio-input-md')).toBeChecked();
    expect(screen.getByTestId('size-radio-circle-md')).toHaveClass('radio-group__circle--selected');
  });

  it('no option selected when initial value is empty', () => {
    renderRadioGroup();
    expect(screen.getByTestId('size-radio-input-sm')).not.toBeChecked();
    expect(screen.getByTestId('size-radio-input-md')).not.toBeChecked();
    expect(screen.getByTestId('size-radio-input-lg')).not.toBeChecked();
  });

  it('selects option on click', () => {
    renderRadioGroup();
    fireEvent.click(screen.getByTestId('size-radio-lg'));
    expect(screen.getByTestId('size-radio-input-lg')).toBeChecked();
    expect(screen.getByTestId('size-radio-circle-lg')).toHaveClass('radio-group__circle--selected');
  });

  it('switches selection between options', () => {
    renderRadioGroup({}, 'sm');
    fireEvent.click(screen.getByTestId('size-radio-lg'));
    expect(screen.getByTestId('size-radio-input-sm')).not.toBeChecked();
    expect(screen.getByTestId('size-radio-input-lg')).toBeChecked();
  });

  it('applies disabled class on group', () => {
    renderRadioGroup({ disabled: true });
    expect(screen.getByTestId('size-radio-group')).toHaveClass('radio-group--disabled');
  });

  it('disables individual option', () => {
    const optionsWithDisabled = [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium', disabled: true },
      { value: 'lg', label: 'Large' },
    ];
    renderRadioGroup({ options: optionsWithDisabled });
    expect(screen.getByTestId('size-radio-input-md')).toBeDisabled();
    expect(screen.getByTestId('size-radio-md')).toHaveClass('radio-group__option--disabled');
  });

  it('applies custom className', () => {
    renderRadioGroup({ className: 'mt-4' });
    expect(screen.getByTestId('size-radio-group')).toHaveClass('radio-group', 'mt-4');
  });

  it('has radiogroup role on options container', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});

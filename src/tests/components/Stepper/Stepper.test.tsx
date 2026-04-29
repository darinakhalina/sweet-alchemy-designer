import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import Stepper from '@/components/Stepper';

const renderStepper = (props: Record<string, unknown> = {}) => {
  return render(
    <Stepper defaultValue="step-1" {...props}>
      <Stepper.Step value="step-1" label="First">
        <div data-testid="panel-1">Content 1</div>
      </Stepper.Step>
      <Stepper.Step value="step-2" label="Second">
        <div data-testid="panel-2">Content 2</div>
      </Stepper.Step>
      <Stepper.Step value="step-3" text="+" label="Third">
        <div data-testid="panel-3">Content 3</div>
      </Stepper.Step>
    </Stepper>,
  );
};

describe('Stepper', () => {
  describe('rendering', () => {
    it('renders all step triggers', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-step-step-1')).toBeInTheDocument();
      expect(screen.getByTestId('stepper-step-step-2')).toBeInTheDocument();
      expect(screen.getByTestId('stepper-step-step-3')).toBeInTheDocument();
    });

    it('renders step labels', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-label-step-1')).toHaveTextContent('First');
      expect(screen.getByTestId('stepper-label-step-2')).toHaveTextContent('Second');
    });

    it('renders text inside indicator', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-indicator-step-3')).toHaveTextContent('+');
    });

    it('renders active panel content', () => {
      renderStepper();
      expect(screen.getByTestId('panel-1')).toHaveTextContent('Content 1');
    });

    it('does not render inactive panel content', () => {
      renderStepper();
      expect(screen.queryByTestId('panel-2')).not.toBeInTheDocument();
    });
  });

  describe('uncontrolled', () => {
    it('uses defaultValue as initial active step', () => {
      renderStepper({ defaultValue: 'step-2' });
      expect(screen.getByTestId('stepper-step-step-2')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('panel-2')).toBeInTheDocument();
    });

    it('switches panel on step click', () => {
      renderStepper();
      fireEvent.click(screen.getByTestId('stepper-step-step-2'));
      expect(screen.getByTestId('panel-2')).toBeInTheDocument();
      expect(screen.queryByTestId('panel-1')).not.toBeInTheDocument();
    });

    it('calls onValueChange when step clicked', () => {
      const onChange = vi.fn();
      renderStepper({ onValueChange: onChange });
      fireEvent.click(screen.getByTestId('stepper-step-step-2'));
      expect(onChange).toHaveBeenCalledWith('step-2');
    });
  });

  describe('controlled', () => {
    it('respects controlled value and external changes', () => {
      const Controlled = () => {
        const [val, setVal] = useState('step-1');
        return (
          <>
            <button data-testid="external" onClick={() => setVal('step-3')}>Go 3</button>
            <Stepper value={val} onValueChange={setVal}>
              <Stepper.Step value="step-1" label="First">
                <div data-testid="panel-1">Content 1</div>
              </Stepper.Step>
              <Stepper.Step value="step-2" label="Second">
                <div data-testid="panel-2">Content 2</div>
              </Stepper.Step>
              <Stepper.Step value="step-3" label="Third">
                <div data-testid="panel-3">Content 3</div>
              </Stepper.Step>
            </Stepper>
          </>
        );
      };
      render(<Controlled />);
      expect(screen.getByTestId('panel-1')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('external'));
      expect(screen.getByTestId('panel-3')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has tablist role on steps container', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-steps')).toHaveAttribute('role', 'tablist');
      expect(screen.getByTestId('stepper-steps')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('has tab role on each step', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-step-step-1')).toHaveAttribute('role', 'tab');
    });

    it('sets aria-selected on active step', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-step-step-1')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('stepper-step-step-2')).toHaveAttribute('aria-selected', 'false');
    });

    it('has tabpanel role on content panel', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-panel')).toHaveAttribute('role', 'tabpanel');
    });

    it('panel has aria-labelledby pointing to trigger id', () => {
      renderStepper();
      const trigger = screen.getByTestId('stepper-step-step-1');
      const panel = screen.getByTestId('stepper-panel');
      const triggerId = trigger.getAttribute('id');
      expect(triggerId).toBeTruthy();
      expect(panel).toHaveAttribute('aria-labelledby', triggerId);
    });

    it('trigger has aria-controls pointing to panel id', () => {
      renderStepper();
      const trigger = screen.getByTestId('stepper-step-step-1');
      const panel = screen.getByTestId('stepper-panel');
      const panelId = panel.getAttribute('id');
      expect(panelId).toBeTruthy();
      expect(trigger).toHaveAttribute('aria-controls', panelId);
    });

    it('active step has tabindex 0, others have -1', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-step-step-1')).toHaveAttribute('tabindex', '0');
      expect(screen.getByTestId('stepper-step-step-2')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('keyboard navigation', () => {
    it('ArrowDown moves to next step', () => {
      renderStepper();
      fireEvent.keyDown(screen.getByTestId('stepper-step-step-1'), { key: 'ArrowDown' });
      expect(screen.getByTestId('panel-2')).toBeInTheDocument();
    });

    it('ArrowUp moves to previous step', () => {
      renderStepper({ defaultValue: 'step-2' });
      fireEvent.keyDown(screen.getByTestId('stepper-step-step-2'), { key: 'ArrowUp' });
      expect(screen.getByTestId('panel-1')).toBeInTheDocument();
    });

    it('ArrowDown wraps around to first step', () => {
      renderStepper({ defaultValue: 'step-3' });
      fireEvent.keyDown(screen.getByTestId('stepper-step-step-3'), { key: 'ArrowDown' });
      expect(screen.getByTestId('panel-1')).toBeInTheDocument();
    });

    it('ArrowUp wraps around to last step', () => {
      renderStepper({ defaultValue: 'step-1' });
      fireEvent.keyDown(screen.getByTestId('stepper-step-step-1'), { key: 'ArrowUp' });
      expect(screen.getByTestId('panel-3')).toBeInTheDocument();
    });
  });

  describe('disabled steps', () => {
    it('does not switch to disabled step on click', () => {
      render(
        <Stepper defaultValue="a">
          <Stepper.Step value="a" label="A"><div data-testid="panel-a">A</div></Stepper.Step>
          <Stepper.Step value="b" label="B" disabled><div data-testid="panel-b">B</div></Stepper.Step>
        </Stepper>,
      );
      fireEvent.click(screen.getByTestId('stepper-step-b'));
      expect(screen.getByTestId('panel-a')).toBeInTheDocument();
      expect(screen.queryByTestId('panel-b')).not.toBeInTheDocument();
    });

    it('has aria-disabled on disabled step', () => {
      render(
        <Stepper defaultValue="a">
          <Stepper.Step value="a" label="A"><div>A</div></Stepper.Step>
          <Stepper.Step value="b" label="B" disabled><div>B</div></Stepper.Step>
        </Stepper>,
      );
      expect(screen.getByTestId('stepper-step-b')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('CSS classes', () => {
    it('applies active class to active step', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-step-step-1')).toHaveClass('stepper__step--active');
      expect(screen.getByTestId('stepper-step-step-2')).not.toHaveClass('stepper__step--active');
    });

    it('applies active class to active indicator', () => {
      renderStepper();
      expect(screen.getByTestId('stepper-indicator-step-1')).toHaveClass('stepper__indicator--active');
    });

    it('applies custom className to root', () => {
      renderStepper({ className: 'custom' });
      expect(screen.getByTestId('stepper')).toHaveClass('stepper', 'custom');
    });
  });
});

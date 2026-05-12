import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import Accordion from '@/components/Accordion';

const renderBasic = (props: Record<string, unknown> = {}) => render(
  <Accordion defaultValue="a" {...props}>
    <Accordion.Item value="a" label="First">
      <div data-testid="content-a">Content A</div>
    </Accordion.Item>
    <Accordion.Item value="b" label="Second">
      <div data-testid="content-b">Content B</div>
    </Accordion.Item>
    <Accordion.Item value="c" label="Third">
      <div data-testid="content-c">Content C</div>
    </Accordion.Item>
  </Accordion>,
);

describe('Accordion', () => {
  describe('rendering', () => {
    it('renders all triggers and labels', () => {
      renderBasic();
      expect(screen.getByTestId('accordion-trigger-a')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-trigger-b')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-trigger-c')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-label-a')).toHaveTextContent('First');
    });

    it('renders all panels in DOM (animation via CSS grid)', () => {
      renderBasic();
      expect(screen.getByTestId('accordion-panel-a')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-panel-b')).toBeInTheDocument();
      expect(screen.getByTestId('content-a')).toBeInTheDocument();
      expect(screen.getByTestId('content-b')).toBeInTheDocument();
    });

    it('renders number prefix when provided', () => {
      render(
        <Accordion defaultValue="a">
          <Accordion.Item value="a" number="01" label="Step one">
            <p>Body</p>
          </Accordion.Item>
        </Accordion>,
      );
      expect(screen.getByTestId('accordion-number-a')).toHaveTextContent('01');
    });

    it('renders chevron by default and hides it when showChevron=false', () => {
      const { rerender } = renderBasic();
      expect(screen.getByTestId('accordion-chevron-a')).toBeInTheDocument();

      rerender(
        <Accordion defaultValue="a" showChevron={false}>
          <Accordion.Item value="a" label="First">
            <p>Body</p>
          </Accordion.Item>
        </Accordion>,
      );
      expect(screen.queryByTestId('accordion-chevron-a')).not.toBeInTheDocument();
    });

    it('applies custom className to root', () => {
      renderBasic({ className: 'custom' });
      expect(screen.getByTestId('accordion')).toHaveClass('accordion', 'custom');
    });
  });

  describe('uncontrolled — single mode', () => {
    it('uses defaultValue as initially open item', () => {
      renderBasic({ defaultValue: 'b' });
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens an item on click and closes the previously open one', () => {
      renderBasic();
      fireEvent.click(screen.getByTestId('accordion-trigger-b'));
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'false');
    });

    it('collapses the open item when clicked again (collapsible default true)', () => {
      renderBasic();
      fireEvent.click(screen.getByTestId('accordion-trigger-a'));
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'false');
    });

    it('keeps the open item open when collapsible=false', () => {
      render(
        <Accordion defaultValue="a" collapsible={false}>
          <Accordion.Item value="a" label="A"><p>A</p></Accordion.Item>
          <Accordion.Item value="b" label="B"><p>B</p></Accordion.Item>
        </Accordion>,
      );
      fireEvent.click(screen.getByTestId('accordion-trigger-a'));
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');
    });

    it('emits onValueChange with the new value', () => {
      const onChange = vi.fn();
      renderBasic({ onValueChange: onChange });
      fireEvent.click(screen.getByTestId('accordion-trigger-b'));
      expect(onChange).toHaveBeenCalledWith('b');
    });

    it('emits onValueChange with null when collapsing', () => {
      const onChange = vi.fn();
      renderBasic({ onValueChange: onChange });
      fireEvent.click(screen.getByTestId('accordion-trigger-a'));
      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('uncontrolled — multiple mode', () => {
    const renderMulti = (props: Record<string, unknown> = {}) => render(
      <Accordion type="multiple" defaultValue={['a']} {...props}>
        <Accordion.Item value="a" label="A"><p>A</p></Accordion.Item>
        <Accordion.Item value="b" label="B"><p>B</p></Accordion.Item>
        <Accordion.Item value="c" label="C"><p>C</p></Accordion.Item>
      </Accordion>,
    );

    it('opens multiple items independently', () => {
      renderMulti();
      fireEvent.click(screen.getByTestId('accordion-trigger-b'));
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes one item without affecting others', () => {
      renderMulti({ defaultValue: ['a', 'b'] });
      fireEvent.click(screen.getByTestId('accordion-trigger-a'));
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'true');
    });

    it('emits onValueChange with full array of open values', () => {
      const onChange = vi.fn();
      renderMulti({ onValueChange: onChange });
      fireEvent.click(screen.getByTestId('accordion-trigger-c'));
      expect(onChange).toHaveBeenCalledWith(['a', 'c']);
    });
  });

  describe('controlled — single mode', () => {
    it('respects controlled value and reacts to external changes', () => {
      const Controlled = () => {
        const [val, setVal] = useState<string | null>('a');
        return (
          <>
            <button
              type="button"
              data-testid="external-b"
              onClick={() => setVal('b')}
            >
              go b
            </button>
            <button
              type="button"
              data-testid="external-clear"
              onClick={() => setVal(null)}
            >
              clear
            </button>
            <Accordion value={val} onValueChange={setVal}>
              <Accordion.Item value="a" label="A"><p>A</p></Accordion.Item>
              <Accordion.Item value="b" label="B"><p>B</p></Accordion.Item>
            </Accordion>
          </>
        );
      };
      render(<Controlled />);
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(screen.getByTestId('external-b'));
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(screen.getByTestId('external-clear'));
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('controlled — multiple mode', () => {
    it('respects controlled array value', () => {
      const Controlled = () => {
        const [val, setVal] = useState<string[]>(['a']);
        return (
          <>
            <button
              type="button"
              data-testid="open-c"
              onClick={() => setVal([...val, 'c'])}
            >
              open c
            </button>
            <Accordion type="multiple" value={val} onValueChange={setVal}>
              <Accordion.Item value="a" label="A"><p>A</p></Accordion.Item>
              <Accordion.Item value="b" label="B"><p>B</p></Accordion.Item>
              <Accordion.Item value="c" label="C"><p>C</p></Accordion.Item>
            </Accordion>
          </>
        );
      };
      render(<Controlled />);
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-trigger-c')).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(screen.getByTestId('open-c'));
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-trigger-c')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('disabled item', () => {
    it('does not open a disabled item on click', () => {
      render(
        <Accordion defaultValue="a">
          <Accordion.Item value="a" label="A"><p>A</p></Accordion.Item>
          <Accordion.Item value="b" label="B" disabled><p>B</p></Accordion.Item>
        </Accordion>,
      );
      fireEvent.click(screen.getByTestId('accordion-trigger-b'));
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');
    });

    it('marks disabled trigger with aria-disabled and disabled attribute', () => {
      render(
        <Accordion defaultValue="a">
          <Accordion.Item value="a" label="A"><p>A</p></Accordion.Item>
          <Accordion.Item value="b" label="B" disabled><p>B</p></Accordion.Item>
        </Accordion>,
      );
      const trigger = screen.getByTestId('accordion-trigger-b');
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
      expect(trigger).toBeDisabled();
    });

    it('applies disabled class on item', () => {
      render(
        <Accordion>
          <Accordion.Item value="a" label="A" disabled><p>A</p></Accordion.Item>
        </Accordion>,
      );
      expect(screen.getByTestId('accordion-item-a')).toHaveClass('accordion__item--disabled');
    });
  });

  describe('accessibility', () => {
    it('trigger has aria-controls pointing to its panel id', () => {
      renderBasic();
      const trigger = screen.getByTestId('accordion-trigger-a');
      const panel = screen.getByTestId('accordion-panel-a');
      const panelId = panel.getAttribute('id');
      expect(panelId).toBeTruthy();
      expect(trigger).toHaveAttribute('aria-controls', panelId);
    });

    it('panel has aria-labelledby pointing to its trigger id', () => {
      renderBasic();
      const trigger = screen.getByTestId('accordion-trigger-a');
      const panel = screen.getByTestId('accordion-panel-a');
      const triggerId = trigger.getAttribute('id');
      expect(triggerId).toBeTruthy();
      expect(panel).toHaveAttribute('aria-labelledby', triggerId);
    });

    it('panel has role=region', () => {
      renderBasic();
      expect(screen.getByTestId('accordion-panel-a')).toHaveAttribute('role', 'region');
    });

    it('aria-expanded reflects open state', () => {
      renderBasic();
      expect(screen.getByTestId('accordion-trigger-a')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-trigger-b')).toHaveAttribute('aria-expanded', 'false');
    });

    it('panel aria-hidden reflects open state', () => {
      renderBasic();
      expect(screen.getByTestId('accordion-panel-a')).toHaveAttribute('aria-hidden', 'false');
      expect(screen.getByTestId('accordion-panel-b')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('keyboard navigation', () => {
    it('ArrowDown moves focus to the next trigger', () => {
      renderBasic();
      const a = screen.getByTestId('accordion-trigger-a');
      a.focus();
      fireEvent.keyDown(a, { key: 'ArrowDown' });
      expect(screen.getByTestId('accordion-trigger-b')).toHaveFocus();
    });

    it('ArrowUp moves focus to the previous trigger', () => {
      renderBasic();
      const b = screen.getByTestId('accordion-trigger-b');
      b.focus();
      fireEvent.keyDown(b, { key: 'ArrowUp' });
      expect(screen.getByTestId('accordion-trigger-a')).toHaveFocus();
    });

    it('ArrowDown wraps from last to first', () => {
      renderBasic();
      const c = screen.getByTestId('accordion-trigger-c');
      c.focus();
      fireEvent.keyDown(c, { key: 'ArrowDown' });
      expect(screen.getByTestId('accordion-trigger-a')).toHaveFocus();
    });

    it('Home jumps to the first trigger', () => {
      renderBasic();
      const c = screen.getByTestId('accordion-trigger-c');
      c.focus();
      fireEvent.keyDown(c, { key: 'Home' });
      expect(screen.getByTestId('accordion-trigger-a')).toHaveFocus();
    });

    it('End jumps to the last trigger', () => {
      renderBasic();
      const a = screen.getByTestId('accordion-trigger-a');
      a.focus();
      fireEvent.keyDown(a, { key: 'End' });
      expect(screen.getByTestId('accordion-trigger-c')).toHaveFocus();
    });

    it('skips disabled triggers in keyboard navigation', () => {
      render(
        <Accordion defaultValue="a">
          <Accordion.Item value="a" label="A"><p>A</p></Accordion.Item>
          <Accordion.Item value="b" label="B" disabled><p>B</p></Accordion.Item>
          <Accordion.Item value="c" label="C"><p>C</p></Accordion.Item>
        </Accordion>,
      );
      const a = screen.getByTestId('accordion-trigger-a');
      a.focus();
      fireEvent.keyDown(a, { key: 'ArrowDown' });
      expect(screen.getByTestId('accordion-trigger-c')).toHaveFocus();
    });
  });

  describe('CSS classes', () => {
    it('applies open class to active item, trigger and chevron', () => {
      renderBasic();
      expect(screen.getByTestId('accordion-item-a')).toHaveClass('accordion__item--open');
      expect(screen.getByTestId('accordion-trigger-a')).toHaveClass('accordion__trigger--open');
      expect(screen.getByTestId('accordion-chevron-a')).toHaveClass('accordion__chevron--open');
    });

    it('applies open class to panel', () => {
      renderBasic();
      expect(screen.getByTestId('accordion-panel-a')).toHaveClass('accordion__panel--open');
      expect(screen.getByTestId('accordion-panel-b')).not.toHaveClass('accordion__panel--open');
    });
  });
});

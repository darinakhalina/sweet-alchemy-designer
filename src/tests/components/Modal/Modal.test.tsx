import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '@/components/Modal';

describe('Modal', () => {
  const onClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render children when closed', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('has default data-testid="modal"', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('accepts custom data-testid', () => {
    render(
      <Modal isOpen onClose={onClose} data-testid="custom-modal">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByTestId('custom-modal')).toBeInTheDocument();
  });

  it('renders close button with aria-label', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );
    const closeBtn = screen.getByTestId('modal-close');
    expect(closeBtn).toHaveAttribute('aria-label', 'components.modal.close');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('sets contentLabel for accessibility', () => {
    render(
      <Modal isOpen onClose={onClose} ariaLabel="Login form">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByTestId('modal')).toHaveAttribute('aria-label', 'Login form');
  });

  it('renders any content passed as children', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <form data-testid="test-form">
          <input data-testid="test-input" />
          <button data-testid="test-submit">Submit</button>
        </form>
      </Modal>,
    );
    expect(screen.getByTestId('test-form')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByTestId('test-submit')).toBeInTheDocument();
  });
});

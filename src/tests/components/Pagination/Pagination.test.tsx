import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onChange={vi.fn()} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when totalPages is 0', () => {
    const { container } = render(
      <Pagination page={1} totalPages={0} onChange={vi.fn()} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders nav with pagination testid', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('renders correct aria-label on nav', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByTestId('pagination')).toHaveAttribute('aria-label', 'pagination.label');
  });

  it('renders all pages when totalPages is small', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`pagination-page-${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId('pagination-ellipsis')).not.toBeInTheDocument();
  });

  it('renders ellipsis for large page counts', () => {
    render(<Pagination page={1} totalPages={15} onChange={vi.fn()} />);
    expect(screen.getAllByTestId('pagination-ellipsis').length).toBeGreaterThanOrEqual(1);
  });

  it('marks active page with aria-current', () => {
    render(<Pagination page={3} totalPages={10} onChange={vi.fn()} />);
    const active = screen.getByTestId('pagination-page-3');
    expect(active).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current on non-active pages', () => {
    render(<Pagination page={3} totalPages={10} onChange={vi.fn()} />);
    const other = screen.getByTestId('pagination-page-1');
    expect(other).not.toHaveAttribute('aria-current');
  });

  it('applies active class to current page', () => {
    render(<Pagination page={3} totalPages={10} onChange={vi.fn()} />);
    expect(screen.getByTestId('pagination-page-3')).toHaveClass('pagination__btn--active');
  });

  it('does not apply active class to other pages', () => {
    render(<Pagination page={3} totalPages={10} onChange={vi.fn()} />);
    expect(screen.getByTestId('pagination-page-1')).not.toHaveClass('pagination__btn--active');
  });

  it('calls onChange with page number on click', () => {
    const onChange = vi.fn();
    render(<Pagination page={1} totalPages={10} onChange={onChange} />);
    fireEvent.click(screen.getByTestId('pagination-page-5'));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('does not call onChange when clicking active page button', () => {
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={10} onChange={onChange} />);
    fireEvent.click(screen.getByTestId('pagination-page-3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  describe('disabled state', () => {
    it('applies disabled class to nav', () => {
      render(<Pagination
        page={1}
        totalPages={5}
        onChange={vi.fn()}
        disabled
      />);
      expect(screen.getByTestId('pagination')).toHaveClass('pagination--disabled');
    });

    it('disables all buttons', () => {
      render(<Pagination
        page={1}
        totalPages={5}
        onChange={vi.fn()}
        disabled
      />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((btn) => {
        expect(btn).toBeDisabled();
      });
    });
  });

  it('applies custom className', () => {
    render(<Pagination
      page={1}
      totalPages={5}
      onChange={vi.fn()}
      className="my-class"
    />);
    expect(screen.getByTestId('pagination')).toHaveClass('pagination', 'my-class');
  });

  describe('page range algorithm', () => {
    it('shows start ellipsis when page is near the end', () => {
      render(<Pagination page={14} totalPages={15} onChange={vi.fn()} />);
      expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
      expect(screen.getAllByTestId('pagination-ellipsis')).toHaveLength(1);
      expect(screen.getByTestId('pagination-page-15')).toBeInTheDocument();
    });

    it('shows both ellipses when page is in the middle', () => {
      render(<Pagination page={8} totalPages={15} onChange={vi.fn()} />);
      expect(screen.getAllByTestId('pagination-ellipsis')).toHaveLength(2);
      expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
      expect(screen.getByTestId('pagination-page-8')).toBeInTheDocument();
      expect(screen.getByTestId('pagination-page-15')).toBeInTheDocument();
    });

    it('shows no ellipsis when all pages fit', () => {
      render(<Pagination page={3} totalPages={7} onChange={vi.fn()} />);
      expect(screen.queryByTestId('pagination-ellipsis')).not.toBeInTheDocument();
      for (let i = 1; i <= 7; i++) {
        expect(screen.getByTestId(`pagination-page-${i}`)).toBeInTheDocument();
      }
    });

    it('respects siblingCount prop', () => {
      render(
        <Pagination
          page={10}
          totalPages={20}
          onChange={vi.fn()}
          siblingCount={2}
        />,
      );
      for (let i = 8; i <= 12; i++) {
        expect(screen.getByTestId(`pagination-page-${i}`)).toBeInTheDocument();
      }
    });

    it('respects boundaryCount prop', () => {
      render(
        <Pagination
          page={10}
          totalPages={20}
          onChange={vi.fn()}
          boundaryCount={2}
        />,
      );
      expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
      expect(screen.getByTestId('pagination-page-2')).toBeInTheDocument();
      expect(screen.getByTestId('pagination-page-19')).toBeInTheDocument();
      expect(screen.getByTestId('pagination-page-20')).toBeInTheDocument();
    });
  });

  it('sets aria-label on page buttons', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByTestId('pagination-page-3')).toHaveAttribute(
      'aria-label',
      'pagination.goToPage',
    );
  });

  it('renders buttons with type="button"', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
    });
  });
});

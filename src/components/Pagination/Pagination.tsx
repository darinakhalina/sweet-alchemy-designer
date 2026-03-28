import ReactPaginate from 'react-paginate';
import clsx from 'clsx';
import type { PaginationProps } from './interfaces/PaginationProps';

const Pagination = ({ currentPage, totalPages, onPageChange, isDisabled }: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        if (!isDisabled) {
          onPageChange(selected + 1);
        }
      }}
      previousLabel={null}
      nextLabel={null}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      breakLabel={(
        <svg className="pagination__icon">
          <use href="/images/icons.svg#icon-dots" />
        </svg>
      )}
      containerClassName={clsx('pagination', { 'pagination--disabled': isDisabled })}
      pageLinkClassName="pagination__link"
      activeClassName="pagination__item--active"
      breakClassName="pagination__break"
    />
  );
};

export default Pagination;

import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { PaginationProps } from './interfaces/PaginationProps';

type PageItem = number | 'ellipsis';

function buildPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number,
): PageItem[] {
  const range = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      page + siblingCount,
      boundaryCount + siblingCount * 2 + 2,
    ),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
  );

  const items: PageItem[] = [
    ...startPages,

    ...(siblingsStart > boundaryCount + 2
      ? ['ellipsis' as const]
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),

    ...range(siblingsStart, siblingsEnd),

    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ['ellipsis' as const]
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),

    ...endPages,
  ];

  return items;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  disabled = false,
  className,
}: PaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const items = buildPageRange(page, totalPages, siblingCount, boundaryCount);

  return (
    <nav
      className={clsx('pagination', disabled && 'pagination--disabled', className)}
      aria-label={t('pagination.label')}
      data-testid="pagination"
    >
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="pagination__ellipsis"
            data-testid="pagination-ellipsis"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={clsx('pagination__btn', item === page && 'pagination__btn--active')}
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            aria-label={t('pagination.goToPage', { page: item })}
            disabled={disabled}
            data-testid={`pagination-page-${item}`}
          >
            {item}
          </button>
        ),
      )}
    </nav>
  );
}

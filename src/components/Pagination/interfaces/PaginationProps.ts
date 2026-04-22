export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  className?: string;
}

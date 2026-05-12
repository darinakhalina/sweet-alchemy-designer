export interface PaginationProps {
  /** Поточна сторінка (1-based) */
  page: number;
  /** Загальна кількість сторінок */
  totalPages: number;
  /** Обробник зміни сторінки */
  onChange: (page: number) => void;
  /** Кількість сторінок ліворуч/праворуч від поточної (за замовчуванням 1) */
  siblingCount?: number;
  /** Кількість сторінок на початку/кінці (за замовчуванням 1) */
  boundaryCount?: number;
  /** Вимкнути всі кнопки */
  disabled?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

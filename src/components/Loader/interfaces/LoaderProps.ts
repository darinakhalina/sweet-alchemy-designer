export interface LoaderProps {
  /** Розмір спінера */
  size?: 'sm' | 'md' | 'lg';
  /** Колірний варіант */
  variant?: 'primary' | 'brand' | 'light';
  /** Показати на повноекранному оверлеї (з фоном) */
  overlay?: boolean;
  /** Додаткові CSS-класи */
  className?: string;
}

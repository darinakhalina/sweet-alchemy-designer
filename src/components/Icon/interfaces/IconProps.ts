export interface IconProps {
  /** Id іконки зі sprite `public/images/icons.svg` (наприклад, `icon-magic`) */
  name: string;
  /** Розмір */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Додаткові CSS-класи (для кольору через `color: ...`) */
  className?: string;
}

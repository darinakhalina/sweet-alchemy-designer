import type { MainTitleProps } from './interfaces/MainTitleProps';

export default function MainTitle({ tag: Tag = 'h2', children, className = '' }: MainTitleProps) {
  return <Tag className={className || null}>{children}</Tag>;
}

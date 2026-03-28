import type { SubtitleProps } from './interfaces/SubtitleProps';

export default function Subtitle({ tag: Tag = 'p', children, className = '' }: SubtitleProps) {
  return <Tag className={className || null}>{children}</Tag>;
}

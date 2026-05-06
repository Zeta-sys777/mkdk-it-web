import { cn } from '@/lib/cn';

interface PlainTagListProps {
  items: string[] | readonly string[];
  className?: string;
  accentIndex?: number;
}

export function PlainTagList({ items, className, accentIndex = -1 }: PlainTagListProps) {
  return (
    <div className={cn('plain-tag-list', className)}>
      {items.map((item, index) => (
        <span key={item} className={cn('plain-tag', index === accentIndex && 'plain-tag--accent')}>
          {item}
        </span>
      ))}
    </div>
  );
}

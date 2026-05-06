import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';

interface BentoGridProps extends PropsWithChildren {
  className?: string;
}

interface BentoItemProps extends PropsWithChildren {
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return <div className={cn('grid gap-4 lg:grid-cols-12 lg:gap-5', className)}>{children}</div>;
}

export function BentoItem({ children, className }: BentoItemProps) {
  return <div className={cn('lg:col-span-4', className)}>{children}</div>;
}

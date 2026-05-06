import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SceneProps extends PropsWithChildren {
  id: string;
  className?: string;
  bleed?: boolean;
  intro?: ReactNode;
}

export function Scene({ id, className, bleed = false, intro, children }: SceneProps) {
  const rhythmClass =
    id === 'hero'
      ? 'scroll-mt-24 pt-8 pb-20 sm:scroll-mt-28 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28'
      : id === 'products' || id === 'python-lab'
        ? 'scroll-mt-24 py-20 sm:scroll-mt-28 sm:py-24 lg:py-28'
        : 'scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20 lg:py-24';

  return (
    <section id={id} className={cn('relative', rhythmClass, className)} aria-labelledby={`${id}-title`}>
      <div className={cn('mx-auto max-w-content px-4 sm:px-6', bleed && 'max-w-shell')}>
        {intro}
        {children}
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex items-center">
      {children}
      <span className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-neutral-line bg-surface-solid px-3 py-2 text-xs text-text-secondary shadow-card group-hover:block group-focus-within:block">
        {label}
      </span>
    </span>
  );
}

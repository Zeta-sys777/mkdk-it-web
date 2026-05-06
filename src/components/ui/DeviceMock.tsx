import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface DeviceMockProps extends PropsWithChildren {
  type?: 'phone' | 'web';
  title?: string;
  status?: ReactNode;
  className?: string;
}

export function DeviceMock({ children, type = 'phone', title, status, className }: DeviceMockProps) {
  const isPhone = type === 'phone';

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-neutral-line bg-[#0A1022] shadow-hero',
        isPhone ? 'mx-auto w-full max-w-[264px] rounded-[1.45rem] p-2 sm:max-w-[320px] sm:rounded-[2rem] sm:p-3' : 'w-full rounded-[1.4rem] p-3 sm:rounded-[1.75rem] sm:p-4',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
      {isPhone ? <div className="mx-auto mb-2 h-1.5 w-16 rounded-pill bg-white/10 sm:mb-3 sm:w-20" /> : null}
      <div className="relative z-[1] overflow-hidden rounded-[1.1rem] border border-white/10 bg-bg-canvas sm:rounded-[1.4rem]">
        {(title || status) ? (
          <div className={cn('border-b border-white/5 px-3 py-2.5 sm:px-4 sm:py-3', isPhone ? 'flex flex-col items-start gap-2' : 'flex items-center justify-between')}> 
            <div>
              {title ? <p className="text-[13px] font-semibold text-text-primary sm:text-sm">{title}</p> : null}
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-tertiary sm:text-[11px] sm:tracking-[0.18em]">{isPhone ? 'мобильное приложение' : 'сайт'}</p>
            </div>
            {status ? <div className={cn(isPhone ? 'self-start' : '')}>{status}</div> : null}
          </div>
        ) : null}
        <div className="p-2.5 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

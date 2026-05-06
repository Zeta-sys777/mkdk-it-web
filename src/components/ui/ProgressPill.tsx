import { cn } from '@/lib/cn';

interface ProgressPillProps {
  label: string;
  tone?: 'info' | 'success' | 'warning' | 'muted';
}

const toneMap = {
  info: 'border-accent-cyan/30 bg-accent-cyan/10 text-text-primary',
  success: 'border-accent-green/30 bg-accent-green/10 text-text-primary',
  warning: 'border-accent-gold/30 bg-accent-gold/10 text-text-primary',
  muted: 'border-neutral-line bg-white/5 text-text-secondary',
};

export function ProgressPill({ label, tone = 'muted' }: ProgressPillProps) {
  return <span className={cn('inline-flex rounded-pill border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]', toneMap[tone])}>{label}</span>;
}

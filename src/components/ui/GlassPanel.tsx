import type { PropsWithChildren, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { motionTokens } from '@/config/motion.tokens';

interface GlassPanelProps extends PropsWithChildren {
  className?: string;
  tone?: 'weak' | 'default' | 'strong' | 'solid';
  badge?: ReactNode;
  hoverable?: boolean;
}

const toneMap = {
  weak: 'border-white/[0.04] bg-white/[0.025]',
  default: 'border-white/[0.06] bg-[rgba(16,26,52,0.76)] backdrop-blur-soft',
  strong: 'border-white/[0.08] bg-[rgba(18,31,61,0.88)] shadow-panel backdrop-blur-md',
  solid: 'border-white/[0.06] bg-surface-solid shadow-card',
};

export function GlassPanel({ children, className, tone = 'default', badge, hoverable = true }: GlassPanelProps) {
  return (
    <motion.div
      className={cn('relative overflow-hidden rounded-xl', toneMap[tone], className)}
      initial="hidden"
      transition={{
        duration: motionTokens.durations.base,
        ease: motionTokens.easings.smooth,
      }}
      variants={motionTokens.revealVariants.cardReveal}
      viewport={{ amount: 0.2, once: true }}
      whileHover={hoverable ? motionTokens.revealVariants.hoverLift.hover : undefined}
      whileInView="visible"
    >
      {tone === 'strong' ? (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),transparent_38%)]" />
      ) : null}
      {badge ? <div className="relative z-[1] p-3 pb-0 sm:p-4">{badge}</div> : null}
      <div className="relative z-[1] p-4 sm:p-5 lg:p-6">{children}</div>
    </motion.div>
  );
}

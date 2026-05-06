import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { motionTokens } from '@/config/motion.tokens';

interface ChipProps {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'accent' | 'success' | 'gold';
}

const toneMap = {
  default: 'border-neutral-lineSoft bg-white/5 text-text-secondary',
  accent: 'border-accent-cyan/35 bg-accent-cyan/10 text-text-primary',
  success: 'border-accent-green/35 bg-accent-green/10 text-text-primary',
  gold: 'border-accent-gold/35 bg-accent-gold/10 text-text-primary',
};

export function Chip({ children, className, tone = 'default' }: ChipProps) {
  return (
    <motion.span
      className={cn('liquid-chip inline-flex rounded-pill border px-3 py-2 text-xs font-medium', toneMap[tone], className)}
      transition={{
        duration: motionTokens.durations.fast,
        ease: motionTokens.easings.micro,
      }}
      whileHover={{ y: -1.5, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
    >
      {children}
    </motion.span>
  );
}

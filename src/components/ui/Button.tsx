import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { motionTokens } from '@/config/motion.tokens';
import { isExternalHref, sanitizeHref } from '@/lib/security';

type Variant = 'primary' | 'secondary' | 'ghost' | 'holo';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd"
>;

const variantClasses: Record<Variant, string> = {
  primary: 'border-accent-cyan/50 bg-accent-cyan/15 text-text-primary hover:border-accent-cyan hover:bg-accent-cyan/20',
  secondary: 'border-neutral-line bg-white/5 text-text-primary hover:border-neutral-lineStrong hover:bg-white/10',
  ghost: 'border-transparent bg-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary',
  holo: 'border-accent-violet/40 bg-gradient-to-r from-accent-blue/20 via-accent-cyan/15 to-accent-violet/25 text-text-primary hover:border-accent-violet/70',
};

export function Button({ children, href, variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  const classes = cn(
    'liquid-action inline-flex items-center justify-center gap-2 rounded-pill border px-4 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40',
    variantClasses[variant],
    className,
  );

  const buttonProps = props as Record<string, unknown>;

  const safeHref = sanitizeHref(href);

  if (safeHref) {
    const isExternal = isExternalHref(safeHref);

    return (
      <motion.a
        className={classes}
        href={safeHref}
        rel={isExternal ? 'noopener noreferrer nofollow' : undefined}
        referrerPolicy={isExternal ? 'no-referrer' : undefined}
        target={isExternal ? '_blank' : undefined}
        transition={{
          duration: motionTokens.durations.fast,
          ease: motionTokens.easings.micro,
        }}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.976, y: 0 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      transition={{
        duration: motionTokens.durations.fast,
        ease: motionTokens.easings.micro,
      }}
      type={type}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.976, y: 0 }}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
}

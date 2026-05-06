import type { CSSProperties, PropsWithChildren } from 'react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/lib/a11y';

interface Card3DTiltProps extends PropsWithChildren {
  className?: string;
}

export function Card3DTilt({ children, className }: Card3DTiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 8;
    const rotateY = (x - 0.5) * 10;
    node.style.setProperty('--tilt-x', `${rotateX}deg`);
    node.style.setProperty('--tilt-y', `${rotateY}deg`);
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--tilt-x', '0deg');
    node.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <motion.div
      ref={ref}
      className={cn('transition-transform duration-200 [transform:perspective(1200px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]', className)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      style={{ '--tilt-x': '0deg', '--tilt-y': '0deg' } as CSSProperties}
      whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }}
    >
      {children}
    </motion.div>
  );
}

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { motionTokens } from '@/config/motion.tokens';

interface SectionTitleProps {
  id: string;
  kicker: string;
  title: string;
  description?: ReactNode;
  meta?: string;
}

export function SectionTitle({ id, kicker, title, description, meta }: SectionTitleProps) {
  return (
    <motion.div
      className="mb-10 space-y-5 sm:mb-12"
      initial="hidden"
      transition={{ staggerChildren: motionTokens.stagger.base }}
      variants={motionTokens.revealVariants.sceneEnter}
      viewport={{ amount: 0.25, once: true }}
      whileInView="visible"
    >
      <motion.div className="flex flex-wrap items-center gap-3 sm:gap-4" variants={motionTokens.revealVariants.cardReveal}>
        <span className="meta-inline meta-inline--accent">{kicker}</span>
        {meta ? <span className="meta-inline">{meta}</span> : null}
      </motion.div>
      <div className="grid gap-4 xl:grid-cols-[0.82fr_1fr] xl:items-start xl:gap-8">
        <motion.h2
          id={id}
          className="max-w-[12ch] font-display text-[clamp(1.9rem,8.5vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-text-primary sm:max-w-[11ch] sm:text-displayMd"
          variants={motionTokens.revealVariants.heroTitle}
        >
          {title}
        </motion.h2>
        {description ? (
          <motion.div
            className="content-copy space-y-3"
            variants={motionTokens.revealVariants.cardReveal}
          >
            {description}
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}

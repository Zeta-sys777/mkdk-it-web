import { motion } from 'framer-motion';
import type { SceneData } from '@/content/department.data';
import { siteConfig } from '@/config/site.config';
import { motionTokens } from '@/config/motion.tokens';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Scene } from '@/components/layout/Scene';

interface HeroSceneProps {
  scene: SceneData;
}

export function HeroScene({ scene }: HeroSceneProps) {
  return (
    <Scene bleed id={scene.id}>
      <motion.div
        className="grid min-h-[calc(100svh-8rem)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        initial="hidden"
        transition={{ staggerChildren: motionTokens.stagger.base }}
        variants={motionTokens.revealVariants.sceneEnter}
        viewport={{ amount: 0.2, once: true }}
        whileInView="visible"
      >
        <div className="space-y-7">
          <motion.div className="flex w-fit items-center gap-3 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-soft" variants={motionTokens.revealVariants.softReveal}>
            <span className="inline-flex h-10 w-10 overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.04]">
              <img alt="Логотип МКДК" className="h-full w-auto max-w-none object-contain object-left" src={siteConfig.assets.logo} />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.22em] text-text-tertiary">часть студсовета</span>
              <span className="block font-display text-base font-bold text-text-primary">{siteConfig.name}</span>
            </span>
          </motion.div>

          <motion.div className="space-y-5" variants={motionTokens.revealVariants.heroTitle}>
            <p className="eyebrow">{`Сцена ${String(scene.sceneNumber).padStart(2, '0')} · ${scene.kicker}`}</p>
            <h1 id={`${scene.id}-title`} className="max-w-[12ch] font-display text-[clamp(3rem,9vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.055em] text-text-primary">
              {siteConfig.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl sm:leading-9">{siteConfig.heroLead}</p>
          </motion.div>

          <motion.div className="flex flex-wrap gap-3" variants={motionTokens.revealVariants.softReveal}>
            <Button href="#products" variant="holo">Смотреть проекты</Button>
            <Button href="#apply" variant="secondary">Вступить в команду</Button>
            <Button href={siteConfig.links.telegram} variant="ghost">Написать в Telegram</Button>
          </motion.div>
        </div>

        <motion.div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(circle_at_50%_24%,rgba(105,226,255,0.16),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-5 shadow-hero backdrop-blur-md" variants={motionTokens.revealVariants.heroMedia}>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-40" />
          <div className="relative z-[1] flex h-full flex-col justify-between gap-8">
            <div className="flex flex-wrap gap-2">
              {['Colai beta', 'Python Lab', 'мессенджер', 'инфраструктура'].map((item, index) => (
                <Chip key={item} tone={index === 0 ? 'accent' : 'default'}>{item}</Chip>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-accent-cyan/18 bg-bg-base/62 p-4 shadow-card">
                <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">продукт</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">Colai</h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">Расписание, замены, уведомления и преподавательский режим.</p>
              </div>
              <div className="rounded-[1.5rem] border border-accent-green/18 bg-bg-base/52 p-4 shadow-card sm:mt-10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">обучение</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">Python Lab</h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">Пять уроков с запуском кода прямо на сайте.</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4">
              <p className="text-sm leading-7 text-text-secondary">{scene.body[0]}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

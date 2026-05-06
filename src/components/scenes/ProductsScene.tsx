import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SceneData } from '@/content/department.data';
import { colaiProduct, messengerProduct } from '@/content/products.data';
import { motionTokens } from '@/config/motion.tokens';
import { Scene } from '@/components/layout/Scene';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Chip } from '@/components/ui/Chip';
import { DeviceMock } from '@/components/ui/DeviceMock';
import { ProgressPill } from '@/components/ui/ProgressPill';
import colaiBrandBoard from '@/assets/products/colai-brand-board.jpeg';

interface ProductsSceneProps {
  scene: SceneData;
}

type ColaiScreenId = (typeof colaiProduct.screens)[number]['id'];

function ColaiMock() {
  const [activeScreenId, setActiveScreenId] = useState<ColaiScreenId>('today');
  const activeScreen = colaiProduct.screens.find((screen) => screen.id === activeScreenId) ?? colaiProduct.screens[0];

  return (
    <DeviceMock title="Colai" status={<ProgressPill label="beta" tone="success" />} type="phone">
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {colaiProduct.screens.map((screen) => (
            <button
              key={screen.id}
              className={activeScreen.id === screen.id ? 'rounded-pill bg-accent-cyan/18 px-3 py-2 text-xs font-semibold text-text-primary' : 'rounded-pill bg-white/[0.04] px-3 py-2 text-xs font-semibold text-text-secondary'}
              onClick={() => setActiveScreenId(screen.id)}
              type="button"
            >
              {screen.label}
            </button>
          ))}
        </div>
        <div className="rounded-[1.2rem] border border-white/[0.08] bg-bg-panel/78 p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-tertiary">{activeScreen.label}</p>
          <h3 className="mt-2 text-lg font-bold text-text-primary">{activeScreen.title}</h3>
          <div className="mt-4 space-y-2">
            {activeScreen.items.map((item) => <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-text-secondary">{item}</div>)}
          </div>
        </div>
      </div>
    </DeviceMock>
  );
}

function ColaiBrandBoard() {
  return (
    <div className="relative overflow-hidden rounded-[1.65rem] border border-white/[0.08] bg-[#f4f1ea] shadow-card">
      <img
        alt="Брендборд Colai: иконка, логотип, палитра, типографика, мобильные экраны и иконки"
        className="h-full w-full object-cover"
        loading="lazy"
        src={colaiBrandBoard}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(5,8,22,0.22))]" />
    </div>
  );
}

function MessengerConcept() {
  return (
    <div className="rounded-[1.8rem] border border-white/[0.08] bg-bg-base/64 p-4 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-accent-violet/18 bg-accent-violet/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">web-мессенджер колледжа</p>
          <p className="text-xs text-text-secondary">каналы, чаты, роли и объявления</p>
        </div>
        <ProgressPill label="UI-концепт" tone="warning" />
      </div>
      <div className="grid gap-3 lg:grid-cols-[0.36fr_0.64fr]">
        <div className="space-y-2 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3">
          {messengerProduct.channels.map((channel, index) => (
            <div key={channel} className={index === 0 ? 'rounded-xl border border-accent-cyan/25 bg-accent-cyan/10 px-3 py-2 text-sm text-text-primary' : 'rounded-xl px-3 py-2 text-sm text-text-secondary'}>{channel}</div>
          ))}
        </div>
        <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3">
          {[
            ['Админ', 'Новое объявление закреплено в канале группы.'],
            ['Студент', 'Файл с заданием загрузился, уведомление пришло.'],
            ['Преподаватель', 'Замена пары отправлена в общий поток.'],
          ].map(([author, text]) => (
            <div key={author} className="rounded-xl border border-white/[0.06] bg-bg-panelSoft px-4 py-3">
              <p className="text-sm font-semibold text-text-primary">{author}</p>
              <p className="mt-1 text-sm leading-6 text-text-secondary">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductsScene({ scene }: ProductsSceneProps) {
  return (
    <Scene bleed id={scene.id}>
      <SectionTitle
        description={<div className="space-y-3"><p>{scene.body[0]}</p><p>{scene.body[1]}</p></div>}
        id={`${scene.id}-title`}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <motion.div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]" initial="hidden" transition={{ staggerChildren: motionTokens.stagger.base }} viewport={{ amount: 0.16, once: true }} whileInView="visible">
        <GlassPanel tone="strong">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <ProgressPill label={colaiProduct.status} tone="success" />
                <Chip tone="accent">College AI</Chip>
                <Chip tone="success">Flutter</Chip>
              </div>
              <div>
                <h3 className="font-display text-4xl font-bold text-text-primary">{colaiProduct.name}</h3>
                <p className="mt-3 text-base leading-8 text-text-secondary">{colaiProduct.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {colaiProduct.cta.map((action) => (
                  <a
                    key={action}
                    className="rounded-pill border border-accent-cyan/20 bg-accent-cyan/[0.07] px-3.5 py-2 text-xs font-semibold text-text-primary transition hover:border-accent-cyan/40 hover:bg-accent-cyan/[0.12]"
                    href="#products"
                  >
                    {action}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">{colaiProduct.technologies.map((tech) => <Chip key={tech}>{tech}</Chip>)}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {colaiProduct.features.map((feature) => <div key={feature} className="rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-sm text-text-secondary">{feature}</div>)}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_0.62fr] xl:grid-cols-1">
              <ColaiBrandBoard />
              <ColaiMock />
            </div>
          </div>
        </GlassPanel>

        <div className="space-y-5">
          <GlassPanel tone="solid">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2"><ProgressPill label={messengerProduct.status} tone="warning" /><Chip>будущий web-продукт</Chip></div>
              <div>
                <h3 className="font-display text-3xl font-bold text-text-primary">{messengerProduct.name}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{messengerProduct.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">{messengerProduct.features.map((feature) => <Chip key={feature}>{feature}</Chip>)}</div>
            </div>
          </GlassPanel>
          <MessengerConcept />
        </div>
      </motion.div>
    </Scene>
  );
}

import { motion } from 'framer-motion';
import type { SceneData } from '@/content/content.data';
import { motionTokens } from '@/config/motion.tokens';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PlainTagList } from '@/components/ui/PlainTagList';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Scene } from '@/components/layout/Scene';

const memoryPrinciples = ['Имя героя в центре', 'Подвиг без пересказа', 'Память, которую можно передать дальше'];
const videoFlow = ['Живой портрет героя', 'Переход в момент подвига', 'Короткий рассказ о поступке', 'Финал с именем и памятью'];

function MemoryVideoPreview() {
  return (
    <div className="relative min-h-[24rem] rounded-[1.6rem] border border-accent-gold/15 bg-[radial-gradient(circle_at_top,rgba(240,201,139,0.12),transparent_35%),linear-gradient(180deg,#0D111B_0%,#12192C_100%)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">Пример будущего видео</p>
          <h3 className="mt-2 text-xl font-bold text-text-primary sm:text-2xl">Так будет выглядеть один ролик о герое</h3>
        </div>
        <div className="status-pill">видеоформат</div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_auto_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.012))] p-4">
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
            <span>Кадр 01</span>
            <span className="text-right">Герой СССР</span>
          </div>
          <div className="relative mt-8 aspect-[0.82] overflow-hidden rounded-[1.1rem] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_35%),linear-gradient(180deg,rgba(17,25,42,0.98),rgba(11,17,30,0.98))]">
            <div className="absolute left-1/2 top-[16%] h-24 w-24 -translate-x-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,240,216,0.85),rgba(165,145,126,0.68))] shadow-[0_0_28px_rgba(240,201,139,0.18)]" />
            <div className="absolute left-1/2 top-[34%] h-[46%] w-[46%] -translate-x-1/2 rounded-[45%_45%_26%_26%] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(79,92,120,0.82),rgba(26,33,47,0.96))]" />
            <div className="absolute left-[38%] top-[44%] h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
            <div className="absolute right-[38%] top-[44%] h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
            <div className="absolute left-1/2 top-[53%] h-[2px] w-6 -translate-x-1/2 rounded-full bg-white/50" />
            <div className="absolute bottom-[18%] left-[22%] flex gap-2">
              <span className="h-7 w-4 rounded-[0.4rem] bg-[linear-gradient(180deg,#f4d585,#b38835)] shadow-[0_0_14px_rgba(240,201,139,0.32)] animate-pulse" />
              <span className="h-7 w-4 rounded-[0.4rem] bg-[linear-gradient(180deg,#f0c98b,#9d6c2b)] shadow-[0_0_14px_rgba(240,201,139,0.22)] animate-pulse" />
              <span className="h-7 w-4 rounded-[0.4rem] bg-[linear-gradient(180deg,#f4d585,#b38835)] shadow-[0_0_14px_rgba(240,201,139,0.28)] animate-pulse" />
            </div>
            <div className="absolute inset-x-3 bottom-3 max-w-[11rem] rounded-[0.85rem] border border-white/[0.12] bg-[rgba(9,14,28,0.76)] px-3 py-2 text-[11px] leading-5 text-text-secondary sm:max-w-[13rem] sm:text-xs">
              Сначала человек видит героя не как архивную фотографию, а как живое лицо своей эпохи.
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-3">
          <div className="relative flex h-28 w-16 items-center justify-center">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent-gold/10 via-accent-gold/45 to-accent-gold/10" />
            <div className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-gold/50 shadow-[0_0_18px_rgba(240,201,139,0.28)]" />
            <div className="absolute left-1/2 bottom-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-gold/65 shadow-[0_0_18px_rgba(240,201,139,0.38)]" />
            <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-gold/20 bg-accent-gold/[0.08] shadow-[0_0_28px_rgba(240,201,139,0.12)]">
              <div className="memory-flow-pulse absolute inset-0 rounded-full border border-accent-gold/20" />
              <div className="flex h-full items-center justify-center text-sm text-text-primary">→</div>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Переход</div>
        </div>

        <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-4">
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
            <span>Кадр 02</span>
            <span className="text-right">Подвиг</span>
          </div>
          <div className="relative mt-8 aspect-[1.2] overflow-hidden rounded-[1.1rem] border border-white/10 bg-[radial-gradient(circle_at_24%_25%,rgba(240,201,139,0.12),transparent_25%),linear-gradient(180deg,rgba(25,33,50,0.98),rgba(12,17,29,0.98))]">
            <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(60,52,40,0.2),rgba(60,52,40,0.72))]" />
            <div className="absolute left-[12%] bottom-[22%] h-20 w-10 rotate-[10deg] rounded-[1rem] bg-[linear-gradient(180deg,rgba(34,40,58,0.9),rgba(16,20,31,0.98))]" />
            <div className="absolute left-[18%] bottom-[33%] h-10 w-16 rotate-[8deg] rounded-[1rem] bg-[linear-gradient(180deg,rgba(34,40,58,0.86),rgba(16,20,31,0.98))]" />
            <div className="absolute right-[10%] top-[18%] h-24 w-24 rounded-full bg-accent-gold/10 blur-2xl" />
            <div className="absolute inset-x-3 bottom-3 ml-auto max-w-[12rem] rounded-[0.95rem] border border-white/[0.12] bg-[rgba(9,14,28,0.78)] px-3 py-2 text-[11px] leading-5 text-text-secondary sm:max-w-[14rem] sm:text-xs">
              Дальше ролик показывает сам подвиг: что произошло, как он поступил и за что его имя осталось в памяти.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {videoFlow.map((item, index) => (
          <motion.div
            key={item}
            className="rounded-[1rem] border border-white/[0.08] bg-white/[0.025] px-4 py-3"
            initial="hidden"
            transition={{ delay: index * 0.05, duration: motionTokens.durations.base, ease: motionTokens.easings.smooth }}
            variants={motionTokens.revealVariants.softReveal}
            viewport={{ amount: 0.2, once: true }}
            whileInView="visible"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Этап {String(index + 1).padStart(2, '0')}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-text-primary">{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function MemoryScene({ scene }: { scene: SceneData }) {
  return (
    <Scene id={scene.id}>
      <SectionTitle
        description={
          <div className="space-y-3">
            <p>{scene.body[0]}</p>
            <p>{scene.body[1]}</p>
          </div>
        }
        id={`${scene.id}-title`}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassPanel className="overflow-hidden" hoverable={false} tone="solid">
          <MemoryVideoPreview />
        </GlassPanel>

        <div className="grid gap-4">
          <GlassPanel hoverable={false} tone="weak">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text-primary">Каким мы хотим сделать этот ролик</h3>
              <p className="support-copy">
                Сначала живой портрет героя. Потом переход в сам момент подвига. После этого — короткий и точный рассказ: что произошло, что он сделал и почему его имя важно помнить сейчас.
              </p>
              <PlainTagList accentIndex={0} items={memoryPrinciples} />
            </div>
          </GlassPanel>

          <GlassPanel hoverable={false} tone="default">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-primary">Что здесь главное</h3>
              <ul className="quiet-list">
                {scene.shortLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Scene>
  );
}

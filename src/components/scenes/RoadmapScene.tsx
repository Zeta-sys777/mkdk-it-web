import type { RoadmapStep, SceneData } from '@/content/department.data';
import { Scene } from '@/components/layout/Scene';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProgressPill } from '@/components/ui/ProgressPill';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface RoadmapSceneProps {
  scene: SceneData;
  steps: RoadmapStep[];
}

const toneMap: Record<RoadmapStep['status'], 'warning' | 'info' | 'success' | 'muted'> = {
  done: 'success',
  active: 'info',
  next: 'warning',
  planned: 'muted',
};

const statusLabelMap: Record<RoadmapStep['status'], string> = {
  done: 'готово',
  active: 'в работе',
  next: 'следом',
  planned: 'план',
};

export function RoadmapScene({ scene, steps }: RoadmapSceneProps) {
  return (
    <Scene bleed id={scene.id}>
      <SectionTitle
        description={<div className="space-y-3"><p>{scene.body[0]}</p><p>{scene.body[1]}</p></div>}
        id={scene.id + '-title'}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <GlassPanel hoverable={false} tone="solid">
        <div className="relative grid gap-4 lg:grid-cols-6">
          <div className="pointer-events-none absolute left-6 right-6 top-[3.15rem] hidden h-px bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/28 to-accent-cyan/0 lg:block" />
          {steps.map((step, index) => (
            <article key={step.id} className="relative rounded-[1.3rem] border border-white/[0.07] bg-bg-base/48 p-4 shadow-soft">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-cyan/20 bg-bg-panel font-mono text-sm text-text-primary shadow-[0_0_26px_rgba(105,226,255,0.12)]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <ProgressPill label={statusLabelMap[step.status]} tone={toneMap[step.status]} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary">{step.phase} · {step.period}</p>
              <h3 className="mt-2 min-h-[3.25rem] text-lg font-bold leading-6 text-text-primary">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{step.summary}</p>
              <div className="mt-4 grid gap-2">
                {step.bullets.map((bullet) => <div key={bullet} className="rounded-xl bg-white/[0.035] px-3 py-2 text-xs text-text-secondary">{bullet}</div>)}
              </div>
            </article>
          ))}
        </div>
      </GlassPanel>
    </Scene>
  );
}

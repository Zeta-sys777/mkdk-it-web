import { useState } from 'react';
import type { SceneData } from '@/content/content.data';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProgressPill } from '@/components/ui/ProgressPill';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Scene } from '@/components/layout/Scene';

const steps = [
  {
    id: 'submit',
    label: 'Приняли',
    tone: 'info' as const,
    detail: 'Студент подает обращение. Его сразу берут в работу, и оно не теряется в переписках.',
  },
  {
    id: 'review',
    label: 'Смотрим',
    tone: 'warning' as const,
    detail: 'Студсовет и человек, который ведет этот вопрос, собирают факты и разбирают ситуацию по шагам, чтобы не было домыслов и путаницы.',
  },
  {
    id: 'council',
    label: 'Разбираем',
    tone: 'info' as const,
    detail: 'Если нужно, подключается Совет старост. Так вопрос не остается на одном человеке и не уходит в сторону.',
  },
  {
    id: 'response',
    label: 'Вернулись с ответом',
    tone: 'success' as const,
    detail: 'Студент получает итог: решение, объяснение или следующий шаг, если вопрос еще не закрыт полностью.',
  },
];

export function AppealFlowScene({ scene }: { scene: SceneData }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Scene id={scene.id}>
      <SectionTitle
        description={
          <div className="space-y-3">
            <p>{scene.body[0]}</p>
            <p>{scene.body[1]}</p>
          </div>
        }
        id={scene.id + '-title'}
        kicker={scene.kicker}
        meta="Сцена 04"
        title={scene.title}
      />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.04fr_0.96fr]">
        <GlassPanel hoverable={false} tone="strong">
          <div className="grid gap-3 sm:gap-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.id}
                  className={isActive ? 'grid gap-3 rounded-[1.15rem] border border-accent-cyan/28 bg-accent-cyan/[0.08] px-4 py-4 text-left shadow-soft sm:rounded-[1.5rem] sm:px-5 sm:py-5' : 'grid gap-3 rounded-[1.15rem] border border-white/[0.05] bg-white/[0.025] px-4 py-4 text-left transition hover:border-white/[0.1] sm:rounded-[1.5rem] sm:px-5 sm:py-5'}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'grid h-9 w-9 place-items-center rounded-full border border-accent-cyan/40 bg-accent-cyan/15 text-sm font-bold text-text-primary sm:h-10 sm:w-10' : 'grid h-9 w-9 place-items-center rounded-full border border-white/8 bg-white/5 text-sm font-bold text-text-secondary sm:h-10 sm:w-10'}>
                        {index + 1}
                      </span>
                      <p className="text-base font-bold text-text-primary sm:text-lg">{step.label}</p>
                    </div>
                    <ProgressPill label={step.label} tone={step.tone} />
                  </div>
                  {isActive ? <p className="support-copy">{step.detail}</p> : <p className="text-sm text-text-tertiary">Нажми на шаг и посмотри, что там дальше.</p>}
                </button>
              );
            })}
          </div>
        </GlassPanel>

        <div className="grid gap-4">
          <GlassPanel hoverable={false} tone="default">
            <div className="space-y-4">
              <ProgressPill label={steps[activeStep].label} tone={steps[activeStep].tone} />
              <h3 className="text-2xl font-bold text-text-primary">{steps[activeStep].label}</h3>
              <p className="content-copy">{steps[activeStep].detail}</p>
              <div className="card-muted border-accent-violet/14 bg-accent-violet/[0.08] text-sm leading-7 text-text-secondary">
                Мне здесь важно одно: человек должен понимать, что сейчас происходит с его вопросом.
              </div>
            </div>
          </GlassPanel>

          <GlassPanel hoverable={false} tone="solid">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-primary">Что человек должен увидеть</h3>
              <ul className="quiet-list">
                {scene.shortLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {scene.cta?.map((action) => (
                  <Button key={action.label} href={action.href} variant="secondary">
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Scene>
  );
}

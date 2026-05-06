import { useMemo, useState } from 'react';
import type { SceneData } from '@/content/content.data';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Scene } from '@/components/layout/Scene';

type GraphNode = {
  id: string;
  level: string;
  label: string;
  detail: string;
};

const nodes: GraphNode[] = [
  { id: 'groups', level: 'Группы', label: 'Группы', detail: 'Здесь все начинается. Вопросы, идеи и обычная обратная связь идут отсюда.' },
  { id: 'starosty', level: 'Старосты', label: 'Старосты', detail: 'Старосты собирают вопрос внятно и не дают ему расползтись в пересказах.' },
  { id: 'council', level: 'Совет старост', label: 'Совет старост', detail: 'Здесь вопрос уже разбирают всерьез. Регулярно. Не тогда, когда про него случайно вспомнили.' },
  { id: 'it', level: 'Отделы', label: 'ИТ', detail: 'Здесь все, что связано с цифровыми сервисами, продуктами и студенческой техкомандой.' },
  { id: 'science', level: 'Отделы', label: 'Наука', detail: 'Здесь проекты, исследования, выступления и возможность зайти в работу чуть глубже.' },
  { id: 'media', level: 'Отделы', label: 'Медиа', detail: 'Здесь все, что связано с подачей, контентом и тем, как колледж выглядит внутри и снаружи.' },
  { id: 'results', level: 'Итог', label: 'Ответ', detail: 'В конце должен появиться ответ. Не тишина.' },
];

export function CouncilGraphScene({ scene }: { scene: SceneData }) {
  const [activeNodeId, setActiveNodeId] = useState<string>('council');
  const activeNode = useMemo(() => nodes.find((node) => node.id === activeNodeId) ?? nodes[0], [activeNodeId]);
  const mainPath = useMemo(() => nodes.filter((node) => ['groups', 'starosty', 'council', 'results'].includes(node.id)), []);
  const departments = useMemo(() => nodes.filter((node) => node.level === 'Отделы'), []);

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
        meta="Сцена 03"
        title={scene.title}
      />

      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <GlassPanel hoverable={false} tone="strong">
          <div className="space-y-6">
            <div className="max-w-[62ch] space-y-2">
              <p className="text-[11px] uppercase tracking-[0.24em] text-text-tertiary">Путь вопроса</p>
              <p className="support-copy">
                Здесь видно, как вопрос идет дальше. Нажимаешь на узел и сразу понимаешь, что на этом месте вообще должно происходить.
              </p>
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.62fr_0.38fr]">
              <div className="space-y-3">
                {mainPath.map((node, index) => {
                  const isActive = node.id === activeNodeId;
                  return (
                    <div key={node.id} className="space-y-3">
                      <button
                        className={isActive ? 'w-full rounded-[1.4rem] border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-4 text-left text-sm font-semibold text-text-primary shadow-soft' : 'w-full rounded-[1.4rem] border border-white/[0.05] bg-white/[0.025] px-4 py-4 text-left text-sm text-text-secondary transition hover:border-white/[0.1] hover:text-text-primary'}
                        onClick={() => setActiveNodeId(node.id)}
                        type="button"
                      >
                        <p className="text-[11px] uppercase tracking-[0.22em] text-text-tertiary">{node.level}</p>
                        <p className="mt-2 text-base font-semibold text-current">{node.label}</p>
                      </button>
                      {index < mainPath.length - 1 ? (
                        <div className="ml-5 h-5 w-px bg-gradient-to-b from-accent-cyan/35 to-transparent" />
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.24em] text-text-tertiary">Отделы</p>
                {departments.map((node) => {
                  const isActive = node.id === activeNodeId;
                  return (
                    <button
                      key={node.id}
                      className={isActive ? 'w-full rounded-[1.4rem] border border-accent-cyan/25 bg-accent-cyan/[0.08] px-4 py-4 text-left text-sm font-semibold text-text-primary shadow-soft' : 'w-full rounded-[1.4rem] border border-white/[0.05] bg-white/[0.02] px-4 py-4 text-left text-sm text-text-secondary transition hover:border-white/[0.1] hover:text-text-primary'}
                      onClick={() => setActiveNodeId(node.id)}
                      type="button"
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-4">
          <GlassPanel hoverable={false} tone="default">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">Сейчас открыт</p>
              <h3 className="text-2xl font-bold text-text-primary">{activeNode.label}</h3>
              <p className="support-copy">{activeNode.detail}</p>
              <div className="card-muted text-sm leading-7 text-text-secondary">
                Мне важно, чтобы этот путь был виден целиком. Тогда сразу ясно, где сейчас вопрос и с кого спрашивать дальше.
              </div>
            </div>
          </GlassPanel>

          <GlassPanel hoverable={false} tone="solid">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-primary">Где здесь Айгуль</h3>
              <ul className="quiet-list">
                <li>Следить, чтобы отделы жили вместе, а не врозь</li>
                <li>Собирать договоренности и сроки в одном месте</li>
                <li>Не терять хорошие идеи по дороге</li>
              </ul>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Scene>
  );
}

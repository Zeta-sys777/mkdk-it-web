import type { SceneData } from '@/content/content.data';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PlainTagList } from '@/components/ui/PlainTagList';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Scene } from '@/components/layout/Scene';

const values = ['Держать слово', 'Работать в команде', 'Не тянуть со сроками', 'Нормально общаться', 'Учиться по ходу', 'Не бросать на середине'];
const roles = ['интерфейсы и фронтенд', 'мобильная часть', 'сборка продукта', 'контент и медиа', 'тестирование', 'исследования и аналитика'];
const path = ['Пишешь, чем хочешь заниматься', 'Быстро созваниваемся или списываемся', 'Берешь первую задачу', 'Дальше работаешь внутри'];

export function RecruitmentScene({ scene }: { scene: SceneData }) {
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
        meta="Сцена 07"
        title={scene.title}
      />

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel hoverable={false} tone="strong">
          <div className="space-y-5">
            <PlainTagList accentIndex={2} items={scene.chips} />
            <h3 className="text-2xl font-bold text-text-primary">Кого мы ищем</h3>
            <p className="content-copy">
              Нам нужны люди, которые готовы взять свой кусок работы и дотащить его до конца. Даже если по ходу придется многому учиться.
            </p>
            <div className="plain-line-list sm:grid-cols-2">
              {roles.map((role) => (
                <div key={role}>{role}</div>
              ))}
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-4">
          <GlassPanel hoverable={false} tone="weak">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-primary">Что для нас важно</h3>
              <PlainTagList accentIndex={0} items={values} />
            </div>
          </GlassPanel>

          <GlassPanel hoverable={false} tone="solid">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-primary">Как сюда зайти</h3>
              <div className="plain-step-list sm:grid-cols-2">
                {path.map((step) => (
                  <div key={step}>{step}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {scene.cta?.map((action, index) => (
                  <Button key={action.label} href={action.href} variant={index === 0 ? 'holo' : 'secondary'}>
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

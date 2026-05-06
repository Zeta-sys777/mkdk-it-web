import type { SceneData } from '@/content/content.data';
import { BentoGrid, BentoItem } from '@/components/ui/BentoGrid';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PlainTagList } from '@/components/ui/PlainTagList';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Scene } from '@/components/layout/Scene';

interface ManifestSceneProps {
  scene: SceneData;
}

const manifestoBlocks = [
  {
    title: 'ВНУТРИ СТУДСОВЕТА',
    text: 'Совет старост, новые отделы и обычная внутренняя работа, которая не обрывается после одного обсуждения.',
    chips: ['Совет старост', 'ИТ / Наука / Медиа', 'Лучшая группа / специальность'],
  },
  {
    title: 'АПЕЛЛЯЦИЯ',
    text: 'Если спор по учебе есть, его нужно разбирать нормально: приняли обращение, посмотрели, вернулись с ответом.',
    chips: ['Подать вопрос', 'Разбор в срок', 'Ответ без беготни'],
  },
  {
    title: 'ЗОЖ',
    text: 'Спорт, экология и нормальное отношение к себе. Без скучных нравоучений и без показной правильности.',
    chips: ['Спорт', 'Экология', 'Нормальные привычки'],
  },
  {
    title: 'ЦИФРОВИЗАЦИЯ',
    text: 'Мессенджер, расписание, домашка, замены и все, что помогает не путаться в обычном учебном дне.',
    chips: ['Мессенджер', 'Расписание', 'Бот для домашки'],
  },
  {
    title: 'СРЕДА',
    text: 'Игры, турниры, встречи и события, где люди из разных направлений вообще знакомятся и начинают делать что-то вместе.',
    chips: ['Шахматы', 'Го', 'Бункер', 'События на единство'],
  },
];

export function ManifestScene({ scene }: ManifestSceneProps) {
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
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <BentoGrid className="gap-3 sm:gap-4 lg:gap-5">
        <BentoItem className="lg:col-span-7">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {manifestoBlocks.map((block, index) => (
              <GlassPanel key={block.title} hoverable={false} tone={index === 0 || index === 1 ? 'default' : 'weak'}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-text-primary sm:text-[0.95rem]">{block.title}</h3>
                    <span className="section-index">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="support-copy">{block.text}</p>
                  <PlainTagList items={block.chips} />
                </div>
              </GlassPanel>
            ))}
          </div>
        </BentoItem>

        <BentoItem className="lg:col-span-5">
          <div className="grid gap-4">
            <GlassPanel hoverable={false} tone="default">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">Почему мы начинаем отсюда</p>
                  <h3 className="mt-2 text-xl font-bold text-text-primary sm:text-2xl">Здесь видно, как вообще будет идти работа</h3>
                </div>
                <p className="support-copy">
                  Нам важно сразу собрать самое базовое. Кто принимает вопрос, где он проходит дальше и почему он не должен теряться по дороге.
                </p>
                <div className="plain-line-list">
                  {scene.shortLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </GlassPanel>

            <GlassPanel hoverable={false} tone="solid">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-text-primary">Учеба для нас на первом месте</p>
                <p className="support-copy">
                  Поэтому здесь рядом и апелляция, и связь со старостами, и цифровые вещи, которые потом реально влияют на обычный день в колледже.
                </p>
              </div>
            </GlassPanel>
          </div>
        </BentoItem>
      </BentoGrid>
    </Scene>
  );
}

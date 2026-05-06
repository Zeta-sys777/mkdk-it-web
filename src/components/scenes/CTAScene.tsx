import { useState } from 'react';
import type { SceneData, ToolkitCardData } from '@/content/content.data';
import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PlainTagList } from '@/components/ui/PlainTagList';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ShareCardGallery } from '@/components/ui/ShareCardGallery';
import { Scene } from '@/components/layout/Scene';

const storyTexts = [
  'Я иду, потому что хочу, чтобы от студсовета был толк каждый день.',
  'Айгуль рядом, чтобы вопросы, люди и задачи не терялись по дороге.',
  'Если вам это близко, нас можно поддержать, к нам можно подключиться или просто рассказать о нас дальше.',
];

interface CTASceneProps {
  scene: SceneData;
  cards: ToolkitCardData[];
}

export function CTAScene({ scene, cards }: CTASceneProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    window.setTimeout(() => setCopiedIndex(null), 1400);
  };

  return (
    <Scene bleed id={scene.id}>
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <SectionTitle
          description={
            <div className="space-y-3">
              <p>{scene.body[0]}</p>
              <p>{scene.body[1]}</p>
            </div>
          }
          id={scene.id + '-title'}
          kicker={scene.kicker}
          meta="Сцена 10"
          title={scene.title}
        />

        <div className="grid gap-5 xl:grid-cols-[0.44fr_0.56fr]">
          <div className="grid gap-4">
            <GlassPanel hoverable={false} tone="strong">
              <div className="space-y-5">
                <PlainTagList accentIndex={0} items={scene.chips} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button href={siteConfig.links.support} variant="holo">Поддержать</Button>
                  <Button href={siteConfig.links.ideaForm} variant="secondary">Прислать идею</Button>
                  <Button href={siteConfig.links.joinDev} variant="secondary">Войти в команду</Button>
                  <Button href={siteConfig.links.subscribe} variant="ghost">Взять материалы</Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel hoverable={false} tone="solid">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-text-primary">Короткие тексты для сторис</h3>
                <div className="grid gap-3">
                  {storyTexts.map((text, index) => (
                    <div key={text} className="card-muted">
                      <p className="text-sm leading-7 text-text-secondary">{text}</p>
                      <Button className="mt-3" onClick={() => void handleCopy(text, index)} variant="secondary">
                        {copiedIndex === index ? 'Готово' : 'Скопировать'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </div>

          <GlassPanel hoverable={false} tone="weak">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">Материалы</p>
                  <h3 className="mt-2 text-2xl font-bold text-text-primary">Карточки для кампании</h3>
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Файлы</span>
              </div>
              <ShareCardGallery cards={cards} />
            </div>
          </GlassPanel>
        </div>
      </div>
    </Scene>
  );
}

import type { SceneData } from '@/content/department.data';
import { siteConfig } from '@/config/site.config';
import { Scene } from '@/components/layout/Scene';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface ContactsSceneProps {
  scene: SceneData;
}

function GmailIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" role="img">
      <path d="M3.5 6.8v10.4c0 1 .8 1.8 1.8 1.8h13.4c1 0 1.8-.8 1.8-1.8V6.8l-8.5 6.1-8.5-6.1Z" fill="#fff" />
      <path d="M4.2 5.3 12 10.9l7.8-5.6A1.8 1.8 0 0 0 18.7 5H5.3c-.4 0-.8.1-1.1.3Z" fill="#EA4335" />
      <path d="M3.5 6.8 12 12.9v-2L4.2 5.3c-.4.3-.7.9-.7 1.5Z" fill="#FBBC04" />
      <path d="M20.5 6.8 12 12.9v-2l7.8-5.6c.4.3.7.9.7 1.5Z" fill="#34A853" />
      <path d="M3.5 17.2c0 1 .8 1.8 1.8 1.8h2.2V9.7l-4-2.9v10.4Z" fill="#4285F4" />
      <path d="M16.5 19h2.2c1 0 1.8-.8 1.8-1.8V6.8l-4 2.9V19Z" fill="#C5221F" />
    </svg>
  );
}

export function ContactsScene({ scene }: ContactsSceneProps) {
  return (
    <Scene id={scene.id}>
      <SectionTitle
        description={<div className="space-y-3"><p>{scene.body[0]}</p><p>{scene.body[1]}</p></div>}
        id={`${scene.id}-title`}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <GlassPanel tone="strong">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-text-tertiary">связь</p>
            <h3 className="mt-2 font-display text-3xl font-bold text-text-primary">Telegram и Gmail</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">Для быстрых вопросов лучше Telegram. Для писем, материалов и документов — Gmail.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={siteConfig.contacts.telegram} variant="holo">Написать в Telegram</Button>
            <Button className="border-white bg-white text-text-inverse hover:bg-white/90" href={siteConfig.contacts.mailto} variant="secondary"><GmailIcon /> Gmail</Button>
          </div>
        </div>
      </GlassPanel>
    </Scene>
  );
}

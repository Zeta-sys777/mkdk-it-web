import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/Button';

export function Footer() {
  return (
    <footer className="border-t border-neutral-lineSoft bg-bg-elevated/72">
      <div className="mx-auto flex max-w-shell flex-col gap-5 px-4 py-8 text-sm text-text-tertiary sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-lg font-bold text-text-primary">{siteConfig.name}</p>
          <p className="mt-2 leading-6">{siteConfig.disclaimer}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href={siteConfig.links.telegram} variant="secondary">Telegram</Button>
          <Button className="border-white bg-white text-text-inverse hover:bg-white/90" href={siteConfig.links.gmail} variant="secondary">Gmail</Button>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import type { SceneData } from '@/content/department.data';
import { siteConfig } from '@/config/site.config';
import { cn } from '@/lib/cn';

interface NavbarProps {
  scenes: SceneData[];
  activeSceneId: string;
  onSceneSelect: (sceneId: string) => void;
}

export function Navbar({ scenes, activeSceneId, onSceneSelect }: NavbarProps) {
  const activeIndex = Math.max(0, scenes.findIndex((scene) => scene.id === activeSceneId));
  const progress = ((activeIndex + 1) / scenes.length) * 100;
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cn('border-b border-white/[0.05] bg-bg-base/78 backdrop-blur-md transition-all duration-300', isCompact && 'bg-bg-base/88 shadow-[0_12px_32px_rgba(2,10,22,0.28)]')}>
        <div className={cn('mx-auto flex max-w-shell flex-col gap-2 px-3 py-2 sm:px-6 sm:py-2.5 transition-all duration-300', isCompact && 'gap-1.5 py-1.5')}>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <a className="flex min-w-0 items-center gap-3" href="#hero" onClick={() => onSceneSelect('hero')}>
              <span className={cn('inline-flex overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.04]', isCompact ? 'h-7 w-7' : 'h-8 w-8')}>
                <img alt="Логотип МКДК" className="h-full w-auto max-w-none object-contain object-left" src={siteConfig.assets.logo} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.24em] text-text-tertiary">{siteConfig.college.shortName}</span>
                <span className={cn('block truncate font-display font-bold tracking-tight text-text-primary', isCompact ? 'text-sm' : 'text-base')}>{siteConfig.name}</span>
              </span>
            </a>

            <nav aria-label="Навигация по разделам" className="max-w-full overflow-x-auto pb-0.5 scrollbar-none">
              <ul className="flex min-w-max items-center gap-1.5">
                {scenes.map((scene) => {
                  const isActive = scene.id === activeSceneId;
                  return (
                    <li key={scene.id}>
                      <a
                        className={cn(
                          'inline-flex items-center rounded-pill border font-medium tracking-[0.06em] transition-all duration-300',
                          isCompact ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-[11px]',
                          isActive
                            ? 'border-accent-cyan/40 bg-accent-cyan/[0.1] text-text-primary shadow-[0_0_22px_rgba(105,226,255,0.12)]'
                            : 'border-white/[0.035] bg-transparent text-text-secondary hover:border-white/[0.1] hover:text-text-primary',
                        )}
                        href={`#${scene.id}`}
                        onClick={() => onSceneSelect(scene.id)}
                      >
                        <span className="mr-1.5 font-mono text-[9px] text-text-tertiary">{String(scene.sceneNumber).padStart(2, '0')}</span>
                        {scene.kicker}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-[3px] flex-1 overflow-hidden rounded-pill bg-white/[0.04]">
              <div className="h-full rounded-pill bg-gradient-to-r from-accent-blue/90 via-accent-cyan/90 to-accent-green/70 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <span className="status-pill hidden whitespace-nowrap text-[10px] sm:inline-flex">{activeIndex + 1} из {scenes.length}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

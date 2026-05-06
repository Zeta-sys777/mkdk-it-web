import type { PropsWithChildren } from 'react';
import type { SceneData } from '@/content/department.data';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { SkipLink } from './SkipLink';

interface PageShellProps extends PropsWithChildren {
  scenes: SceneData[];
  activeSceneId: string;
  onSceneSelect: (sceneId: string) => void;
}

export function PageShell({ scenes, activeSceneId, onSceneSelect, children }: PageShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-base text-text-primary">
      <SkipLink />

      <div className="ambient-layer" aria-hidden="true">
        <div className="ambient-orb ambient-orb--blue" />
        <div className="ambient-orb ambient-orb--violet" />
        <div className="ambient-grid" />
      </div>

      <Navbar activeSceneId={activeSceneId} onSceneSelect={onSceneSelect} scenes={scenes} />
      <main className="pt-[4.9rem] sm:pt-[5.3rem] lg:pt-[5.8rem]" id="main-content">{children}</main>
      <Footer />
    </div>
  );
}

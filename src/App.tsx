import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { HeroScene } from '@/components/scenes/HeroScene';
import { WhoWeAreScene } from '@/components/scenes/WhoWeAreScene';
import { TeamScene } from '@/components/scenes/TeamScene';
import { ProductsScene } from '@/components/scenes/ProductsScene';
import { RoadmapScene } from '@/components/scenes/RoadmapScene';
import { ApplyScene } from '@/components/scenes/ApplyScene';
import { ContactsScene } from '@/components/scenes/ContactsScene';
import { roadmapSteps, scenes } from '@/content/department.data';

const PythonLabScene = lazy(() => import('@/components/scenes/PythonLabScene'));

type SceneId = (typeof scenes)[number]['id'];

function App() {
  const visibleScenes = useMemo(() => scenes, []);
  const [activeSceneId, setActiveSceneId] = useState<SceneId>(visibleScenes[0]?.id ?? 'hero');

  const sceneMap = useMemo(
    () => Object.fromEntries(visibleScenes.map((scene) => [scene.id, scene])),
    [visibleScenes],
  ) as Record<SceneId, (typeof scenes)[number]>;

  const handleSceneSelect = (sceneId: string) => {
    if (visibleScenes.some((scene) => scene.id === sceneId)) {
      setActiveSceneId(sceneId as SceneId);
    }
  };

  useEffect(() => {
    const sectionNodes = visibleScenes
      .map((scene) => document.getElementById(scene.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sectionNodes.length) return;

    let frame = 0;

    const updateActiveScene = () => {
      frame = 0;
      const header = document.querySelector('header');
      const headerOffset = header instanceof HTMLElement ? header.offsetHeight : 0;
      const anchor = window.scrollY + headerOffset + Math.min(window.innerHeight * 0.24, 220);
      let nextId = sectionNodes[0].id as SceneId;

      for (const node of sectionNodes) {
        const top = node.offsetTop;
        const bottom = top + node.offsetHeight;

        if (anchor >= top && anchor < bottom) {
          nextId = node.id as SceneId;
          break;
        }

        if (anchor >= top) nextId = node.id as SceneId;
      }

      setActiveSceneId((current) => (current === nextId ? current : nextId));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveScene);
    };

    updateActiveScene();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [visibleScenes]);

  return (
    <PageShell activeSceneId={activeSceneId} onSceneSelect={handleSceneSelect} scenes={visibleScenes}>
      <HeroScene scene={sceneMap.hero} />
      <WhoWeAreScene scene={sceneMap['who-we-are']} />
      <TeamScene scene={sceneMap.team} />
      <ProductsScene scene={sceneMap.products} />
      <Suspense fallback={<div className="mx-auto max-w-content px-4 py-20 text-text-secondary sm:px-6">Загружаем Python Lab...</div>}>
        <PythonLabScene scene={sceneMap['python-lab']} />
      </Suspense>
      <RoadmapScene scene={sceneMap.roadmap} steps={roadmapSteps} />
      <ApplyScene scene={sceneMap.apply} />
      <ContactsScene scene={sceneMap.contacts} />
    </PageShell>
  );
}

export default App;

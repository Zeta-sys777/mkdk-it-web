import { motion } from 'framer-motion';
import type { SceneData } from '@/content/department.data';
import { directions } from '@/content/department.data';
import { motionTokens } from '@/config/motion.tokens';
import { Scene } from '@/components/layout/Scene';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Chip } from '@/components/ui/Chip';

interface WhoWeAreSceneProps {
  scene: SceneData;
}

export function WhoWeAreScene({ scene }: WhoWeAreSceneProps) {
  return (
    <Scene id={scene.id}>
      <SectionTitle
        description={<div className="space-y-3"><p>{scene.body[0]}</p><p>{scene.body[1]}</p></div>}
        id={`${scene.id}-title`}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <motion.div className="grid gap-4 md:grid-cols-3" initial="hidden" transition={{ staggerChildren: motionTokens.stagger.base }} viewport={{ amount: 0.2, once: true }} whileInView="visible">
        {directions.map((direction, index) => (
          <GlassPanel key={direction.title} className={index === 0 ? 'md:translate-y-6' : index === 2 ? 'md:-translate-y-4' : ''} tone={index === 1 ? 'strong' : 'default'}>
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-bold text-text-primary">{direction.title}</h3>
                <span className="font-mono text-xs text-text-tertiary">0{index + 1}</span>
              </div>
              <p className="text-sm leading-7 text-text-secondary">{direction.text}</p>
              <div className="flex flex-wrap gap-2">
                {direction.chips.map((chip) => <Chip key={chip}>{chip}</Chip>)}
              </div>
            </div>
          </GlassPanel>
        ))}
      </motion.div>
    </Scene>
  );
}

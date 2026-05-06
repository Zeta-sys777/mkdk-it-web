import { motion } from 'framer-motion';
import type { SceneData, TeamMember } from '@/content/department.data';
import { teamMembers } from '@/content/department.data';
import { motionTokens } from '@/config/motion.tokens';
import { Scene } from '@/components/layout/Scene';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Chip } from '@/components/ui/Chip';
import { DeviceMock } from '@/components/ui/DeviceMock';

interface TeamSceneProps {
  scene: SceneData;
}

function MemberVisual({ member }: { member: TeamMember }) {
  return (
    <div className="relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-bg-base/48 p-4">
      <div className={`team-glow team-glow--${member.glow}`} />
      <div className="relative z-[1] mx-auto flex h-64 w-48 items-end justify-center rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-card">
        <div className="absolute inset-4 rounded-[1.5rem] border border-white/[0.06]" />
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full border border-white/[0.12] bg-bg-panel/80 font-display text-6xl font-extrabold text-text-primary shadow-hero">
          {member.initials}
        </div>
      </div>
      <p className="relative z-[1] mt-4 text-center text-xs uppercase tracking-[0.18em] text-text-tertiary">Фото PNG без фона можно заменить в src/assets/team</p>
    </div>
  );
}

function MemberAddon({ member }: { member: TeamMember }) {
  if (member.id === 'daniil') {
    return (
      <DeviceMock className="mt-4" title="Colai" type="phone">
        <div className="space-y-3">
          <div className="rounded-2xl border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-2 text-sm font-semibold text-text-primary">Flutter</div>
          {['Today', 'Week', 'Python backend'].map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-text-secondary">{item}</div>)}
        </div>
      </DeviceMock>
    );
  }

  if (member.id === 'radik') {
    return (
      <div className="mt-4 rounded-[1.4rem] border border-white/[0.08] bg-bg-base/55 p-4">
        <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold text-text-primary">Мессенджер</p><Chip tone="gold">UI-концепт</Chip></div>
        {['объявления', 'группы', 'роли', 'файлы'].map((item) => <div key={item} className="mb-2 rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-text-secondary">{item}</div>)}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {['3 этаж', '5 этаж', 'облако', 'доступы'].map((item) => <div key={item} className="rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-3 text-center text-sm text-text-secondary">{item}</div>)}
    </div>
  );
}

export function TeamScene({ scene }: TeamSceneProps) {
  return (
    <Scene bleed id={scene.id}>
      <SectionTitle
        description={<div className="space-y-3"><p>{scene.body[0]}</p><p>{scene.body[1]}</p></div>}
        id={`${scene.id}-title`}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <motion.div className="grid gap-5 lg:grid-cols-3" initial="hidden" transition={{ staggerChildren: motionTokens.stagger.base }} viewport={{ amount: 0.12, once: true }} whileInView="visible">
        {teamMembers.map((member) => (
          <GlassPanel key={member.id} className="h-full" tone="solid">
            <div className="space-y-5">
              <MemberVisual member={member} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">{member.course}</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-text-primary">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold text-accent-cyan">{member.role}</p>
                <p className="mt-2 text-sm leading-7 text-text-secondary">{member.shortRole}</p>
              </div>
              <div className="grid gap-2">
                {member.tasks.map((task) => <div key={task} className="rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-sm text-text-secondary">{task}</div>)}
              </div>
              <MemberAddon member={member} />
            </div>
          </GlassPanel>
        ))}
      </motion.div>
    </Scene>
  );
}

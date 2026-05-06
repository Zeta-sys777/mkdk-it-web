import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SceneData } from '@/content/content.data';
import { motionTokens } from '@/config/motion.tokens';
import { Scene } from '@/components/layout/Scene';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { Chip } from '@/components/ui/Chip';
import { DeviceMock } from '@/components/ui/DeviceMock';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PlainTagList } from '@/components/ui/PlainTagList';
import { LottieIcon } from '@/components/ui/LottieIcon';
import { MessengerMock } from '@/components/ui/MessengerMock';
import { ScheduleMock } from '@/components/ui/ScheduleMock';
import { SectionTitle } from '@/components/ui/SectionTitle';

type DemoId = 'messenger' | 'schedule' | 'automation' | 'classrooms' | 'hackathon';

const demoCards: Array<{
  id: DemoId;
  title: string;
  summary: string;
  badge: string;
}> = [
  {
    id: 'messenger',
    title: 'Мессенджер',
    summary: 'Группы, объявления, закрепленные сообщения и бот для домашки в одном месте.',
    badge: '01',
  },
  {
    id: 'schedule',
    title: 'Расписание',
    summary: 'Сегодня, неделя, замены, уведомления и отдельный режим для преподавателя.',
    badge: '02',
  },
  {
    id: 'automation',
    title: 'Автоматизация',
    summary: 'Расписание собирается проще, а преподаватель может подать перенос или замену без лишней путаницы.',
    badge: '03',
  },
  {
    id: 'classrooms',
    title: 'Классы',
    summary: 'Показываем, как сейчас выглядят компьютерные классы и какими мы хотим их сделать.',
    badge: '04',
  },
  {
    id: 'hackathon',
    title: 'Хакатон и встречи',
    summary: 'Хакатон, ИИ-грамотность и цифровые встречи, которые не заканчиваются одним постом.',
    badge: '05',
  },
];

const literacyEvents = [
  'Неделя ИИ-грамотности',
  'Цифровая грамотность для преподавателей',
  'Кейсы по медицине, экономике и банкингу',
  'Ежегодный ИТ-хакатон',
];

const automationSteps = [
  'Собираем данные по группам, аудиториям и преподавателям',
  'Система предлагает черновой вариант расписания',
  'Преподаватель отправляет перенос или замену',
  'Дальше видно, что уже принято, а что еще в работе',
];

const joinTracks = ['Разработка', 'Дизайн', 'Контент', 'Тесты', 'Поддержка'];

function AutomationExplainer() {
  return (
    <div className="quiet-list">
      {automationSteps.map((item, index) => (
        <div key={item}>
          <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-accent-cyan/25 bg-accent-cyan/10 text-[11px] font-bold text-text-primary">
            {index + 1}
          </span>
          {item}
        </div>
      ))}
    </div>
  );
}

function HomeworkBotModule() {
  return (
    <div className="plain-line-list sm:grid-cols-3">
      <div>Принять</div>
      <div>Проверить</div>
      <div>Напомнить про дедлайн</div>
    </div>
  );
}

function HackathonShowcase() {
  return (
    <GlassPanel hoverable={false} tone="weak">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">События</p>
            <h3 className="mt-2 text-xl font-bold text-text-primary">Хакатон и цифровые встречи</h3>
          </div>
          <LottieIcon className="h-9 w-9 sm:h-12 sm:w-12" />
        </div>
        <p className="support-copy">
          Мы хотим, чтобы цифровая жизнь в колледже не сводилась к одному анонсу. Нужны регулярные встречи, практика и хакатон, который правда собирает людей.
        </p>
        <PlainTagList accentIndex={3} items={literacyEvents} />
        <div className="plain-line-list sm:grid-cols-3">
          <div>Сначала собираем команды</div>
          <div>Потом делаем короткие интенсивы</div>
          <div>После этого уже сам хакатон</div>
        </div>
      </div>
    </GlassPanel>
  );
}

function ActiveShowcase({ activeDemo }: { activeDemo: DemoId }) {
  if (activeDemo === 'messenger') {
    return (
      <DeviceMock status={<span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">внутри колледжа</span>} title="Мессенджер" type="web">
        <MessengerMock />
      </DeviceMock>
    );
  }

  if (activeDemo === 'schedule') {
    return (
      <DeviceMock
        status={<span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">для студентов и преподавателей</span>}
        title="Расписание"
        type="phone"
      >
        <ScheduleMock />
      </DeviceMock>
    );
  }

  if (activeDemo === 'automation') {
    return (
      <GlassPanel hoverable={false} tone="default">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">Как это идет</p>
              <h3 className="mt-2 text-xl font-bold text-text-primary">Автоматизация и домашка</h3>
            </div>
            <LottieIcon className="h-12 w-12" />
          </div>
          <AutomationExplainer />
          <div className="rounded-[1.5rem] border border-accent-violet/14 bg-accent-violet/[0.08] p-4">
            <p className="mb-3 text-sm font-semibold text-text-primary">Что делает бот</p>
            <HomeworkBotModule />
          </div>
        </div>
      </GlassPanel>
    );
  }

  if (activeDemo === 'hackathon') {
    return <HackathonShowcase />;
  }

  return (
    <GlassPanel hoverable={false} tone="solid">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">Сейчас / потом</p>
            <h3 className="mt-2 text-xl font-bold text-text-primary">Компьютерные классы</h3>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">Сравнение</span>
        </div>
        <BeforeAfter />
      </div>
    </GlassPanel>
  );
}

export function ITScene({ scene }: { scene: SceneData }) {
  const [activeDemo, setActiveDemo] = useState<DemoId>('messenger');

  const activeCard = useMemo(
    () => demoCards.find((card) => card.id === activeDemo) ?? demoCards[0],
    [activeDemo],
  );

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
          meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
          title={scene.title}
        />

        <div className="grid gap-4 sm:gap-5 xl:grid-cols-[0.58fr_0.42fr] xl:items-start">
          <div className="space-y-4">
            <GlassPanel hoverable={false} tone="strong">
              <div className="space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">Сейчас открыт</p>
                    <h3 className="mt-2 text-xl font-bold text-text-primary sm:text-2xl">{activeCard.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <LottieIcon className="h-8 w-8 sm:h-10 sm:w-10" />
                    <span className="section-index">{activeCard.badge}</span>
                  </div>
                </div>

                <p className="content-copy">{activeCard.summary}</p>
                <PlainTagList accentIndex={0} items={scene.chips} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo}
                    animate="visible"
                    exit="exit"
                    initial="hidden"
                    variants={motionTokens.revealVariants.switchPanel}
                  >
                    <ActiveShowcase activeDemo={activeDemo} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </GlassPanel>

            <GlassPanel hoverable={false} tone="default">
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">Если хочешь включиться</p>
                  <h3 className="mt-2 text-xl font-bold text-text-primary">Эту часть мы тоже хотим делать вместе со студентами</h3>
                </div>
                <p className="support-copy">
                  Нам нужна своя команда под реальные задачи. Не абстрактно «в будущем», а под мессенджер, расписание, подачу, тесты и поддержку.
                </p>
                <PlainTagList items={joinTracks} />
                <div className="plain-line-list sm:grid-cols-3">
                  <div>Можно зайти без большого опыта</div>
                  <div>Важно не пропадать по дороге</div>
                  <div>Нужно доводить свой кусок работы</div>
                </div>
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {demoCards.map((card) => {
              const isActive = card.id === activeDemo;

              return (
                <motion.button
                  key={card.id}
                  className={
                    isActive
                      ? 'rounded-[1.2rem] border border-accent-cyan/24 bg-accent-cyan/[0.08] p-4 text-left shadow-soft transition sm:rounded-[1.6rem] sm:p-5'
                      : 'rounded-[1.2rem] border border-white/[0.05] bg-white/[0.025] p-4 text-left transition hover:border-white/[0.1] sm:rounded-[1.6rem] sm:p-5'
                  }
                  onClick={() => setActiveDemo(card.id)}
                  transition={{ duration: motionTokens.durations.fast, ease: motionTokens.easings.micro }}
                  whileHover={{ y: -3, scale: 1.012 }}
                  whileTap={{ scale: 0.988 }}
                  type="button"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">Модуль {card.badge}</p>
                      <h3 className="mt-1.5 text-lg font-bold text-text-primary sm:mt-2 sm:text-xl">{card.title}</h3>
                    </div>
                    <Chip tone={isActive ? 'accent' : 'default'}>{isActive ? 'Открыто' : 'Нажми'}</Chip>
                  </div>
                  <p className="mt-2.5 text-sm leading-6 text-text-secondary sm:mt-3 sm:leading-7">{card.summary}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </Scene>
  );
}

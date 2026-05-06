import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SceneData } from '@/content/content.data';
import { motionTokens } from '@/config/motion.tokens';
import { BentoGrid, BentoItem } from '@/components/ui/BentoGrid';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PlainTagList } from '@/components/ui/PlainTagList';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Scene } from '@/components/layout/Scene';

const directions = [
  {
    name: 'Туризм',
    prompt: 'Если тебе интересно не только учить маршруты, но и самому собирать поездки, программы и городские кейсы.',
    outputs: ['Маршрут', 'Локация', 'Защита идеи'],
    entry: 'Можно зайти через маленький проект: собрать маршрут по Москве, разобрать точку притяжения или придумать формат студенческой экскурсии.',
    result: 'На выходе у тебя остается готовая идея, которую можно показать на защите, конкурсе или положить в портфолио.',
    focus: ['Сценарий поездки', 'Карта маршрута', 'Подача'],
  },
  {
    name: 'Сестринское дело',
    prompt: 'Если тебе ближе практика, разбор клинических ситуаций и темы, которые потом пригодятся в работе.',
    outputs: ['Кейс', 'Памятка', 'Выступление'],
    entry: 'Здесь можно взять конкретную тему: уход, профилактику, общение с пациентом или частую ситуацию — и собрать из этого нормальную работу.',
    result: 'Получается полезный материал: памятка, учебный проект, разбор или выступление, которое потом не стыдно показать дальше.',
    focus: ['Практика', 'Алгоритмы', 'Выступления'],
  },
  {
    name: 'Банковское дело',
    prompt: 'Если тебе нравится считать, сравнивать и разбирать деньги, риски и банковские истории не только по учебнику.',
    outputs: ['Финансовый кейс', 'Аналитика', 'Модель'],
    entry: 'Можно зайти через прикладной разбор: кредит, вклад, семейный бюджет, банковский продукт или простую финансовую модель.',
    result: 'У тебя остается кейс с цифрами и выводами, а не просто пересказ того, что уже было в тетради.',
    focus: ['Продукты', 'Цифры', 'Выводы'],
  },
  {
    name: 'Программирование',
    prompt: 'Если тебе мало просто сдавать лабораторные и хочется собирать что-то живое: сервис, интерфейс, бот или внутренний инструмент.',
    outputs: ['Прототип', 'Демо', 'Код'],
    entry: 'Вход здесь простой: берешь задачу, собираешь прототип, показываешь ход мысли и доводишь хотя бы одну часть до рабочего вида.',
    result: 'На выходе остается вещь, которую можно открыть: экран, бот, репозиторий, админка или модуль под задачи колледжа.',
    focus: ['Идея', 'Прототип', 'Демо'],
  },
  {
    name: 'Реклама',
    prompt: 'Если тебе интересно придумывать кампании, искать подачу и собирать визуал с понятной мыслью.',
    outputs: ['Кампания', 'Визуал', 'Защита'],
    entry: 'Можно взять событие, проект колледжа или социальную тему и собрать под это нормальную подачу: смысл, тон, носители и коммуникацию.',
    result: 'В итоге у тебя получается цельная идея, которую можно защищать, дорабатывать и запускать дальше.',
    focus: ['Тон', 'Визуал', 'Концепция'],
  },
] as const;

type Direction = (typeof directions)[number];

const sideModules = ['Шахматы и го', 'Ролевые форматы и «Бункер»', 'Интеллектуальные встречи', 'Люди с разных направлений в одном месте'];

export function ScienceShowcaseScene({ scene }: { scene: SceneData }) {
  const [activeDirection, setActiveDirection] = useState<Direction>(directions[0]);

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

      <BentoGrid>
        <BentoItem className="lg:col-span-8">
          <GlassPanel hoverable={false} tone="strong">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">Открой направление</p>
                  <h3 className="mt-2 text-xl font-bold text-text-primary sm:text-2xl">Посмотри, где тебе будет интересно не только сидеть на парах</h3>
                </div>
                <p className="meta-note">Нажми на карточку</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {directions.map((direction) => {
                  const isActive = direction.name === activeDirection.name;

                  return (
                    <motion.button
                      key={direction.name}
                      className={
                        isActive
                          ? 'rounded-[1.5rem] border border-accent-cyan/18 bg-accent-cyan/[0.08] p-5 text-left shadow-[0_18px_40px_rgba(2,10,22,0.22)]'
                          : 'rounded-[1.5rem] border border-white/[0.05] bg-white/[0.025] p-5 text-left transition hover:border-white/[0.1] hover:bg-white/[0.04]'
                      }
                      onClick={() => setActiveDirection(direction)}
                      transition={{ duration: motionTokens.durations.fast, ease: motionTokens.easings.micro }}
                      whileHover={{ y: -3, scale: 1.012 }}
                      whileTap={{ scale: 0.988 }}
                      type="button"
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">направление</p>
                      <h3 className="mt-2 text-xl font-bold text-text-primary">{direction.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-text-secondary">{direction.prompt}</p>
                      <PlainTagList className="mt-4" items={direction.outputs} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </GlassPanel>
        </BentoItem>

        <BentoItem className="lg:col-span-4">
          <div className="grid gap-4">
            <GlassPanel hoverable={false} tone="default">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDirection.name}
                  animate="visible"
                  exit="exit"
                  initial="hidden"
                  variants={motionTokens.revealVariants.switchPanel}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">Сейчас открыто</p>
                    <h3 className="mt-2 text-xl font-bold text-text-primary">{activeDirection.name}</h3>
                  </div>
                  <p className="support-copy">{activeDirection.entry}</p>
                  <PlainTagList accentIndex={0} items={activeDirection.focus} />
                  <p className="support-copy">{activeDirection.result}</p>
                </motion.div>
              </AnimatePresence>
            </GlassPanel>

            <GlassPanel hoverable={false} tone="solid">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-text-primary">И рядом будет такая же живая среда</h3>
                <PlainTagList items={sideModules} />
                <p className="support-copy">
                  Мне не хочется, чтобы все заканчивалось только парами. Нужны места, где люди знакомятся, спорят, думают и начинают что-то делать вместе.
                </p>
              </div>
            </GlassPanel>
          </div>
        </BentoItem>
      </BentoGrid>
    </Scene>
  );
}

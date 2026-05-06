import { Chip } from './Chip';
import { ProgressPill } from './ProgressPill';

const channels = ['# объявления', '# группа-1', '# старосты', '# наука', '# ит-отдел'];
const messages = [
  { author: 'Студсовет', time: '09:10', text: 'Сегодня в 15:30 — встреча Совета старост. Повестка уже закреплена.' },
  { author: 'Преподаватель', time: '09:18', text: 'Замена по второй паре подтверждена. Обновление ушло в расписание и в уведомления.' },
  { author: 'Бот для домашки', time: '09:21', text: 'Домашнее задание по экономике отправлено. Дедлайн — 18:00.' },
];

export function MessengerMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr]">
      <div className="rounded-[1.1rem] border border-white/6 bg-white/5 p-3">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-text-primary">Сервер колледжа</p>
          <ProgressPill label="в сети" tone="success" />
        </div>
        <div className="space-y-2">
          {channels.map((channel, index) => (
            <button
              key={channel}
              className={index === 0 ? 'flex w-full items-center justify-between rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-2 text-left text-sm text-text-primary' : 'flex w-full items-center justify-between rounded-xl border border-transparent bg-transparent px-3 py-2 text-left text-sm text-text-secondary hover:border-white/5 hover:bg-white/5'}
              type="button"
            >
              <span>{channel}</span>
              {index === 0 ? <span className="h-2 w-2 rounded-full bg-accent-cyan" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[1.1rem] border border-white/6 bg-white/5 p-3">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent-cyan/15 bg-accent-cyan/10 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-text-primary">Закреплённое объявление</p>
            <p className="text-xs text-text-secondary">Новости, расписание, решения Совета старост и быстрые апдейты</p>
          </div>
          <Chip tone="accent">закреплено</Chip>
        </div>

        <div className="space-y-3">
          {messages.map((message, index) => (
            <div key={message.author + message.time} className={index === 2 ? 'ml-auto max-w-[84%] rounded-[1.1rem] border border-accent-violet/20 bg-accent-violet/10 px-4 py-3' : 'max-w-[88%] rounded-[1.1rem] border border-white/6 bg-bg-panelSoft px-4 py-3'}>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">{message.author}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">{message.time}</span>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">{message.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/6 bg-[#0B1430] px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-accent-green" />
          <p className="flex-1 text-sm text-text-tertiary">печатают: группа 1, режим преподавателя, диспетчер</p>
          <Chip>синхронизация журнала</Chip>
        </div>
      </div>
    </div>
  );
}

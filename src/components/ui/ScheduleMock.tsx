import { useState } from 'react';
import { Chip } from './Chip';
import { Toggle } from './Toggle';

const tabs = [
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'Неделя' },
  { value: 'replacements', label: 'Замены' },
  { value: 'notifications', label: 'Уведомления' },
  { value: 'teacher', label: 'Преподаватель' },
] as const;

type TabValue = (typeof tabs)[number]['value'];

const tabContent: Record<TabValue, { title: string; rows: string[] }> = {
  today: {
    title: 'Сегодня',
    rows: ['09:00 Банковское дело / ауд. 302', '10:40 Экономика / ауд. 115', '12:20 Английский / ауд. 207'],
  },
  week: {
    title: 'Неделя',
    rows: ['Пн: пары без окна', 'Вт: замена по второй паре', 'Ср: лабораторная + дедлайн', 'Чт: элективы', 'Пт: консультация'],
  },
  replacements: {
    title: 'Замены и переносы',
    rows: ['Перенос истории на 4 пару', 'Отмена практики в 213', 'Новая аудитория для группы П-12'],
  },
  notifications: {
    title: 'Уведомления',
    rows: ['Изменение расписания отправлено', 'Подтверждена заявка преподавателя', 'Новый дедлайн в боте для домашки'],
  },
  teacher: {
    title: 'Режим преподавателя',
    rows: ['Моё расписание', 'Подать заявку на замену', 'Статус заявки: на рассмотрении / одобрено / отклонено'],
  },
};

export function ScheduleMock() {
  const [tab, setTab] = useState<TabValue>('today');
  const current = tabContent[tab];

  return (
    <div className="space-y-2.5 sm:space-y-4">
      <Toggle options={tabs as unknown as { value: TabValue; label: string }[]} value={tab} onChange={setTab} />

      <div className="rounded-[1.1rem] border border-white/6 bg-white/5 p-2.5 sm:rounded-[1.2rem] sm:p-4">
        <div className="mb-3.5 flex flex-col gap-2.5 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-5 text-text-primary sm:text-sm sm:leading-normal">{current.title}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-text-tertiary sm:text-xs sm:tracking-[0.2em]">Телефон / сайт</p>
          </div>
          <Chip className="max-w-[9.5rem] px-2 py-1.5 text-[10px] leading-4 sm:max-w-full sm:px-3 sm:py-2 sm:text-xs" tone="accent">Синхронизация расписания</Chip>
        </div>

        <div className="space-y-2">
          {current.rows.map((row, index) => (
            <div
              key={row}
              className={
                index === 1 && tab === 'replacements'
                  ? 'flex items-start justify-between gap-2 rounded-[0.95rem] border border-accent-gold/25 bg-accent-gold/10 px-2.5 py-2.5 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-3'
                  : 'flex items-start justify-between gap-2 rounded-[0.95rem] border border-white/5 bg-bg-panelSoft px-2.5 py-2.5 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-3'
              }
            >
              <span className="min-w-0 text-[13px] leading-5 text-text-secondary sm:text-sm sm:leading-6">{row}</span>
              <span className="shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.18em] text-text-tertiary">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

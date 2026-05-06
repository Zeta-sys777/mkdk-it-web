import oldComputerImg from '@/assets/photos/old-computer.cutout.png';
import newComputerImg from '@/assets/photos/new-computer.cutout.png';

const beforeBullets = [
  'Старые ПК работают нестабильно, часть ПО отсутствует',
  'Нет единого профиля: настройки теряются после каждой пары',
  'На запуск среды уходит лишнее время',
];

const afterBullets = [
  'Новые ПК и нужные программы уже готовы к занятию',
  'Рабочие места закреплены и персонализированы',
  'Сохраняются настройки, доступы и учебная среда',
];

function ComparisonCard({
  title,
  imageSrc,
  imageAlt,
  bullets,
  upgraded,
}: {
  title: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
  upgraded?: boolean;
}) {
  return (
    <article
      className={
        upgraded
          ? 'relative rounded-[1rem] border border-accent-cyan/24 bg-[linear-gradient(160deg,rgba(18,33,68,0.9),rgba(10,20,44,0.92))] p-2.5 shadow-soft sm:rounded-[1.2rem] sm:p-3.5'
          : 'relative rounded-[1rem] border border-white/10 bg-[linear-gradient(160deg,rgba(16,29,60,0.9),rgba(9,19,40,0.92))] p-2.5 shadow-soft sm:rounded-[1.2rem] sm:p-3.5'
      }
    >
      {upgraded ? (
        <span className="pointer-events-none absolute right-2.5 top-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-accent-cyan/20 via-accent-cyan/60 to-accent-cyan/20" />
      ) : null}
      <p className="text-[11px] uppercase tracking-[0.18em] text-text-tertiary sm:text-xs">{title}</p>
      <div className="mt-2.5 flex h-28 items-end justify-center overflow-hidden rounded-[0.85rem] border border-white/8 bg-[#0a142d]/70 p-1.5 sm:h-[8.5rem] sm:rounded-[1rem] sm:p-2 lg:h-36">
        <img
          alt={imageAlt}
          className="h-full w-full max-w-[76%] object-contain object-bottom drop-shadow-[0_12px_18px_rgba(0,0,0,0.38)]"
          loading="lazy"
          src={imageSrc}
        />
      </div>
      <ul className="mt-2.5 space-y-1.5 text-[12px] leading-relaxed text-text-secondary sm:text-[13px]">
        {bullets.map((item) => (
          <li
            key={item}
            className={
              upgraded
                ? 'rounded-[0.8rem] border border-accent-cyan/20 bg-accent-cyan/[0.06] px-2 py-1.5 sm:px-2.5 sm:py-2'
                : 'rounded-[0.8rem] border border-white/8 bg-bg-panelSoft px-2 py-1.5 sm:px-2.5 sm:py-2'
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function BeforeAfter() {
  return (
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
      <ComparisonCard
        bullets={beforeBullets}
        imageAlt="ПК в нашем колледже сейчас"
        imageSrc={oldComputerImg}
        title="ПК в нашем колледже сейчас"
      />
      <ComparisonCard
        bullets={afterBullets}
        imageAlt="ПК в нашем колледже, если вы выберете нас"
        imageSrc={newComputerImg}
        title="ПК в нашем колледже, если вы выберете нас"
        upgraded
      />
    </div>
  );
}

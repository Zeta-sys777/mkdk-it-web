# QA-чеклист проекта

## Accessibility checklist

### Контраст
- Проверить обычный текст на контраст не ниже `4.5:1`
- Проверить маленькие meta-labels, status-pill и chips
- Проверить читаемость текста поверх glow и glass-поверхностей

### Клавиатура
- Весь интерфейс проходится через `Tab`
- Кнопки CTA достижимы и понятны без мыши
- `CouncilGraph`, `AppealFlow`, toggles и toolkit доступны через клавиатуру
- Нет keyboard trap в pinned-сценах

### Фокус
- Фокус видим на `Button`, links, toggles, scene-nav
- Focus-ring не теряется на тёмном фоне
- Focus-state не маскируется hover-анимацией

### Landmarks и семантика
- `header`, `nav`, `main`, `footer` присутствуют
- `SkipLink` работает
- Заголовки идут логично по уровням
- `alt` есть у фото и preview-картинок

---

## Reduced-motion checklist

- `prefers-reduced-motion` отключает autoplay Lottie
- `prefers-reduced-motion` отключает pseudo‑3D tilt
- `prefers-reduced-motion` не включает pinned/scrub-heavy поведение в `RoadmapScene`
- `prefers-reduced-motion` не включает pinned/scrub-heavy поведение в `ITScene`
- В reduced-mode интерфейс остаётся понятным и без “смысловых провалов”

---

## Mobile / responsive checklist

### Телефон
- Hero читается без скролл-хаоса
- Фото Патимат и Айгуль не ломают layout
- Navbar не превращается в неуправляемую строку
- `CouncilGraph`, `AppealFlow`, `Roadmap`, `Toolkit` остаются читаемыми

### Планшет
- Sticky-поведение не делает интерфейс дёрганым
- Текст не выглядит слишком плотным
- Product demo остаются похожими на продукт, а не на сжатые блоки

### Десктоп / ноутбук
- Сцены читаются как отдельные композиции
- Hero, IT и Roadmap визуально сильнее secondary-секций
- Toolkit-карточки смотрятся как часть кампании, а не как отдельный каталог

### Проектор / большой экран
- Headline и roadmap можно читать с расстояния
- Основные CTA и chips остаются различимыми
- Неон и blur не превращают экран в “мыло”

---

## Performance checklist

### Core Web Vitals targets
- `LCP ≤ 2.5s`
- `INP ≤ 200ms`
- `CLS ≤ 0.1`

### Runtime checks
- Hero не перегружен тяжёлыми анимациями
- Lottie грузится lazy, а не eagerly в стартовый bundle
- Pinned-сцены не создают jank на средних ноутбуках
- Нет постоянных дорогостоящих перерисовок из-за hover/scroll

### Bundle / build checks
- `npm run typecheck` проходит
- `npm run build` проходит
- Неиспользуемые ассеты не тянутся без надобности
- Тяжёлые анимационные зависимости загружаются осознанно

---

## Визуальный QA

- Hero выглядит как главная сцена всей страницы
- Патимат — главный якорь, Айгуль — вторым слоем, но не теряется
- Секции не ощущаются одинаковыми стеклянными карточками
- `Memory` визуально спокойнее `ITScene`
- `Roadmap` читается как маршрут, а не список
- CTA и toolkit дают понятную точку входа в кампанию

---

## Контентный QA

- Тон остаётся от первого лица `я/мы`
- Нет канцелярита и формальной сухости
- SMM-строки читаются быстро и легко
- Везде понятна роль Патимат и роль Айгуль
- Все ключевые модули программы отражены в сценах

---

## SEO / social checklist

- Title и description выставлены
- OG title / description / image выставлены
- Twitter card выставлена
- Placeholder OG image существует и открывается
- `robots.txt` присутствует

---

## Финальный smoke test перед релизом

1. `npm run typecheck`
2. `npm run build`
3. Проверка на телефоне
4. Проверка на ноутбуке
5. Проверка reduced-motion
6. Проверка CTA и download SVG
7. Проверка, что hero и roadmap выглядят читаемо на большом экране

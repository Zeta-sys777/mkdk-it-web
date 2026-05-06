# Дизайн-система лендинга: Патимат + Айгуль

## Общий визуальный вектор
Мы строим лендинг как premium-tech продуктовую страницу с живыми сценами, а не как набор одинаковых карточек. Основа — тёмный сине-графитовый фон, глубокие слои, мягкие локальные свечения, умеренный glassmorphism и чистая типографика. Визуально мы соединяем ощущение современного цифрового продукта, кампании нового поколения и уверенного студенческого лидерства.

Главный принцип: не перегружать экран эффектами. Мы держим фон спокойным, свет — локальным, стекло — дозированным, а акценты — точными. Главная глубина создаётся не шумом, а иерархией сцен, крупными композициями, воздухом, асимметрией и ритмом между блоками.

---

## Цветовые токены

### Фон
- `bg.base` — основной фон страницы, глубокий сине-графитовый
- `bg.elevated` — слой для крупных секций и hero-подложек
- `bg.canvas` — самый тёмный участок для контраста с glass-поверхностями
- `bg.panel` — основа для solid-first панелей
- `bg.panelSoft` — более мягкая подложка для вторичных поверхностей

### Слои и стекло
- `surface.glassWeak` — лёгкий glass для secondary-поверхностей
- `surface.glass` — основной glass для средних сцен
- `surface.glassStrong` — более плотный glass для hero и pinned-сцен
- `surface.solid` — плотная продуктовая поверхность
- `surface.solidElevated` — плотная поверхность второго уровня

### Текст
- `text.primary` — основной яркий текст
- `text.secondary` — основной текст абзацев
- `text.tertiary` — вторичный / meta / helper
- `text.inverse` — текст на светлых/holo-плашках

### Акценты
- `accent.blue` — основной tech-акцент
- `accent.cyan` — холодное свечение / UI-highlight
- `accent.violet` — голографический secondary-акцент
- `accent.green` — З.С. / успех / экология / подтверждение
- `accent.gold` — roadmap / важные вехи / “собранный” warm-акцент
- `accent.rose` — error / конфликт / alert-подсветка

### Статусы
- `status.success`
- `status.warning`
- `status.error`
- `status.info`

### Нейтрали
- `neutral.lineStrong`
- `neutral.line`
- `neutral.lineSoft`
- `neutral.shadow`

### Свечение
- `glow.blue`
- `glow.cyan`
- `glow.violet`
- `glow.green`
- `glow.gold`

---

## Базовая палитра

```text
bg.base           #050816
bg.elevated       #0A1022
bg.canvas         #0D1730
bg.panel          #101A34
bg.panelSoft      #131F3D

surface.glassWeak   rgba(255,255,255,0.05)
surface.glass       rgba(255,255,255,0.08)
surface.glassStrong rgba(255,255,255,0.12)
surface.solid       rgba(13,23,48,0.86)
surface.solidElevated rgba(18,31,61,0.92)

text.primary      #F5F8FF
text.secondary    #CAD6F3
text.tertiary     #93A3C7
text.inverse      #07101F

accent.blue       #5B8CFF
accent.cyan       #69E2FF
accent.violet     #9B8CFF
accent.green      #5EE7A4
accent.gold       #F0C98B
accent.rose       #FF7BA6

status.success    #4FD39B
status.warning    #F2C46D
status.error      #FF7C8F
status.info       #74C7FF

neutral.lineStrong rgba(255,255,255,0.18)
neutral.line      rgba(255,255,255,0.12)
neutral.lineSoft  rgba(255,255,255,0.07)
neutral.shadow    rgba(0,0,0,0.42)
```

---

## Типографика

### Шрифтовая система
- `display` — для крупных hero-заголовков и scene-headline
- `body` — для основного текста, UI, списков, микрокопи
- `mono` — для roadmap labels, status-pill, мини-технических модулей

### Рекомендация по применению
- `display`: `Manrope` или `Inter Tight`-подобный современный гротеск с плотным весом
- `body`: `Inter` или `Manrope`
- `mono`: `IBM Plex Mono` или `JetBrains Mono`

### Scale
- `hero` — `clamp(3rem, 7vw, 7rem)`
- `displayLg` — `clamp(2.2rem, 4.6vw, 4.8rem)`
- `displayMd` — `clamp(1.8rem, 3vw, 3rem)`
- `titleLg` — `1.5rem`
- `titleMd` — `1.25rem`
- `titleSm` — `1.125rem`
- `bodyLg` — `1.125rem`
- `bodyMd` — `1rem`
- `bodySm` — `0.9375rem`
- `meta` — `0.8125rem`
- `micro` — `0.75rem`

### Веса
- `regular` — `400`
- `medium` — `500`
- `semibold` — `600`
- `bold` — `700`
- `extrabold` — `800`

### Правила
- Hero и ключевые сцены используют более плотную, уверенную display-типографику.
- Микрокопи и chips короткие, легко сканируемые, SMM-формата.
- Текст второго уровня всегда заметно спокойнее headline, чтобы не спорить за внимание.

---

## Spacing, radius, shadow, blur, glow

### Spacing scale
- `2` = `0.5rem`
- `3` = `0.75rem`
- `4` = `1rem`
- `5` = `1.25rem`
- `6` = `1.5rem`
- `8` = `2rem`
- `10` = `2.5rem`
- `12` = `3rem`
- `16` = `4rem`
- `20` = `5rem`
- `24` = `6rem`
- `28` = `7rem`

### Радиусы
- `xs` = `0.75rem`
- `sm` = `1rem`
- `md` = `1.25rem`
- `lg` = `1.75rem`
- `xl` = `2.25rem`
- `pill` = `999px`

### Тени
- `shadow.soft` — мелкие UI-элементы и chips
- `shadow.card` — secondary surfaces
- `shadow.panel` — крупные панели
- `shadow.hero` — hero и крупные mockup-сцены

### Blur rules
- `blur.none` — плотные solid-панели
- `blur.soft` — `10px`
- `blur.md` — `16px`
- `blur.lg` — `24px`

Правило: blur применяем только там, где он усиливает глубину слоя. Не используем сильный blur массово на каждой панели.

### Glow rules
- Glow всегда локальный, мягкий, не кислотный
- Используем 1–2 источника света на сцену, не больше
- Для Memory-сцены glow сильно слабее
- Для CTA и hero glow можно усиливать через radial background, а не через жёсткие box-shadow

---

## Motion tokens

### Easing
- `standard` — `cubic-bezier(0.22, 1, 0.36, 1)`
- `smooth` — `cubic-bezier(0.16, 1, 0.3, 1)`
- `micro` — `cubic-bezier(0.2, 0.8, 0.2, 1)`

### Durations
- `fast` — `180ms`
- `base` — `320ms`
- `slow` — `680ms`

### Где применять
- `fast` — hover, chips, buttons, toggle, small state changes
- `base` — reveal card, layout shift, content fade, UI module swaps
- `slow` — hero entrance, sticky narrative moments, pinned scene transitions

### Motion principles
- Движение поддерживает премиальность, а не отвлекает
- Основные reveal — opacity + slight translateY
- Hover — лёгкий lift, scale до `1.01` максимум
- Pinned-анимации только для тех сцен, где есть narrative-value
- `prefers-reduced-motion` обязательно выключает scrub/pinned heavy motion

---

## Компоненты UI и назначение

### Layout
- `PageShell` — общий каркас страницы, фон, grid, max-width
- `Scene` — semantic-wrapper для сцены с вариациями layout
- `Navbar` — навигация по якорям + прогресс по сценам
- `Footer` — нижний служебный блок
- `SkipLink` — быстрый переход к контенту

### Base UI
- `Button` — primary / secondary / ghost / holo
- `Chip` — короткие тезисы и статусные лейблы
- `GlassPanel` — controlled glass surface
- `SectionTitle` — kicker, title, description
- `BentoGrid` — асимметричная раскладка модулей
- `Tooltip` — мини-подсказки в схемах и product demo
- `Toggle` — before/after и режимы mockup
- `ProgressPill` — статусы, step labels, progress marks

### Premium / visual
- `Card3DTilt` — мягкий pseudo‑3D hover для акцентных элементов
- `DeviceMock` — телефон / web-app frame
- `LottieIcon` — микро-анимации для сцен и смысловых модулей

### Product demo
- `MessengerMock` — Discord-style internal messenger
- `ScheduleMock` — Today / Week / Replacements / Notifications / Teacher
- `BeforeAfter` — цифровые классы до / после
- `ShareCardGallery` — toolkit preview grid
- `ShareCard` — SVG-based downloadable campaign cards

---

## Сетка и композиция

### Принципы bento / asymmetric
- Не строим сцену как один ряд одинаковых блоков
- В каждой сцене есть:
  - один главный акцент
  - 1–2 вторичных модуля
  - асимметрия ширин, высот или depth-layers
- Плотные информационные сцены чередуем с воздушными, чтобы был ритм

### Hero
- Главный акцент — Патимат
- Айгуль рядом вторым слоем: как опора, координация, баланс
- Hero строится как editorial scene: headline + supporting lines + floating UI / mockup layers

### Middle scenes
- `CouncilGraph` и `AppealFlow` — более diagram-based
- `ScienceShowcase` — витрина с richer content clusters
- `IT Scene` — самая product-like и технологичная

### Roadmap
- Sticky timeline с pinned progression
- Одна центральная ось + меняющиеся состояния / активные этапы
- Не превращаем roadmap в просто список из карточек

### CTA / Toolkit
- Сцена-финал: сильный social/share модуль
- toolkit — не отдельный “каталог”, а часть кампании и её вирусности

---

## Визуальная иерархия сцен

1. `Hero` — самый сильный и самый визуально дорогой
2. `IT Scene` — второй по технологичности и depth
3. `Roadmap` — narrative/pinned-сцена
4. `CouncilGraph` / `AppealFlow` — структурные сцены
5. `ScienceShowcase` / `Recruitment` — витринные и community-сцены
6. `Memory` — спокойная и уважительная, без лишнего неона
7. `CTA/Toolkit` — сильный финал с shareability

---

## Правила “чего не делать”
- Не делать ряд одинаковых стеклянных карточек
- Не ставить одинаковый glow на все элементы
- Не использовать слишком кислотные акценты
- Не делать excessive blur и heavy bloom
- Не перегружать интерфейс постоянной анимацией
- Не ломать читаемость ради визуального эффекта

---

## Итог
Эта дизайн-система нужна, чтобы лендинг ощущался как современный цифровой продукт высокого уровня, а не как шаблонная промо-страница. Мы строим сцены с характером, но держим всё в собранной, спокойной и дорогой визуальной рамке. Визуал должен поддерживать смысл программы: команда, порядок, координация, развитие, цифровизация и уважение к колледжу.

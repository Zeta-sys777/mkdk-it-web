# Технический scaffold и запуск проекта

## Что это за scaffold
Мы собираем одностраничный React + Vite + TypeScript проект с TailwindCSS как базой для совместного предвыборного лендинга Патимат и Айгуль. На этом этапе проект уже должен подниматься локально, читать контент из `src/content/content.data.ts`, использовать централизованные токены и быть готовым к следующему слою — реальным сценам, UI-компонентам и анимациям.

Мы заранее закладываем:
- data-driven контент
- единый конфиг сайта
- Tailwind, готовый к design tokens
- GSAP и Motion для будущих scrollytelling и микроанимаций
- Lottie для лёгких микро-анимаций
- reduced-motion helper и базовые accessibility hooks

---

## Почему выбран `lottie-react`
Мы используем `lottie-react`, потому что для React-лендинга это наиболее прямой и лёгкий путь:
- простой declarative API
- без отдельного player-слоя
- удобно lazy-loadить на уровне компонента
- хорошо подходит для маленьких loop-иконок и микро-анимаций

Если позже в проекте появится большой набор `.lottie`-пакетов и потребуется более сложный runtime, мы сможем перейти на `@lottiefiles/dotlottie-react`. Для MVP это избыточно, поэтому сейчас оставляем `lottie-react`.

---

## Структура scaffold

```text
/
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  postcss.config.cjs
  tailwind.config.ts
  eslint.config.js
  /public
    robots.txt
    favicon.svg
  /docs
    content.md
    design.md
    tech.md
  /src
    main.tsx
    App.tsx
    vite-env.d.ts
    /styles
      globals.css
    /config
      site.config.ts
      motion.tokens.ts
      design.tokens.ts
    /content
      content.data.ts
    /lib
      gsap.ts
      a11y.ts
      perf.ts
```

---

## Как запустить локально

### 1. Установить зависимости
```bash
npm install
```

### 2. Поднять dev-сервер
```bash
npm run dev
```

### 3. Открыть в браузере
По умолчанию:
- `http://localhost:5173`

---

## Как собрать проект

### Production build
```bash
npm run build
```

### Локальный preview build
```bash
npm run preview
```

### Проверить типы
```bash
npm run typecheck
```

### Проверить lint
```bash
npm run lint
```

---

## Как подключать фото, видео и ссылки через `site.config.ts`
Весь внешний слой конфигурации лежит в:

- [site.config.ts](/Users/danilmila/Desktop/WORK/канделла/src/config/site.config.ts)

Через него мы централизованно управляем:
- названием сайта
- названием колледжа
- именами кандидатов
- внешними ссылками
- CTA URL
- social handles
- placeholder-путями к фото и медиа
- feature flags

### Что менять в первую очередь
- `assets.logo`
- `assets.patimatPhoto`
- `assets.aigulPhoto`
- `assets.ogImage`
- `links.support`
- `links.ideaForm`
- `links.joinDev`
- `links.subscribe`
- `social.telegram`
- `social.vk`

### Placeholder assets
На этом этапе placeholder-ресурсы считаются допустимыми. Они должны быть заменены позже, но хранятся централизованно в конфиге, а не размазаны по компонентам.

---

## Deploy notes: Vercel

### Базовый вариант
1. Импортировать репозиторий в Vercel
2. Framework preset: `Vite`
3. Build command:
```bash
npm run build
```
4. Output directory:
```bash
dist
```

### Переменные окружения
Для MVP переменные окружения не обязательны, если все CTA и ссылки лежат прямо в `site.config.ts`. Если позже будут формы, аналитика или API, выносим их в env.

---

## Deploy notes: Netlify

### Базовый вариант
1. Подключить репозиторий к Netlify
2. Build command:
```bash
npm run build
```
3. Publish directory:
```bash
dist
```

### Опционально через `netlify.toml`
Для MVP не обязателен. Если понадобится, можно добавить позже, но сейчас scaffold уже совместим с Netlify без дополнительного конфига.

---

## Performance notes

### Что делаем сразу
- контент храним data-driven, без тяжёлой логики в `App.tsx`
- heavy animation libraries уже вынесены в отдельный vendor chunk
- закладываем alias и структуру для lazy-loaded сцен

### Что делаем на следующих jobs
- lazy import для тяжёлых сцен
- lazy import для Lottie и, если понадобится, three.js-акцента
- GSAP pinned-секции подключаем только там, где это действительно оправдано
- все mockup-компоненты должны быть лёгкими и без тяжёлого DOM-overdraw

### Цели MVP
- `LCP ≤ 2.5s`
- `INP ≤ 200ms`
- `CLS ≤ 0.1`

---

## Accessibility notes

### Уже заложено в scaffold
- `lang="ru"` в `index.html`
- skip link
- semantic landmarks: `header`, `nav`, `main`, `footer`
- reduced-motion helper
- data-driven структура, где проще контролировать иерархию heading-levels

### Что обязательно сохранить дальше
- контраст не ниже WCAG 4.5:1 для обычного текста
- все интерактивные элементы должны быть доступны с клавиатуры
- фокус должен быть видимым, а не декоративным
- pinned/scrollytelling анимации должны иметь reduced-motion fallback
- важная информация не должна зависеть только от анимации

---

## GSAP / Motion / Lottie: как это подключено
- `framer-motion` — для hover, reveal, layout и микро-анимаций компонентов
- `gsap` + `ScrollTrigger` — для pinned-сцен и scrollytelling
- `lottie-react` — для лёгких loop-анимаций и смысловых иконок

На этом этапе `gsap.ts` и `a11y.ts` уже лежат в `src/lib`, чтобы в следующем job не встраивать анимации хаотично.

---

## Что уже готово логически
- проект собирается как Vite SPA
- есть единая входная точка `main.tsx`
- есть минимальный `App.tsx`, который читает сцены из `content.data.ts`
- есть config-layer через `site.config.ts`
- есть design tokens и motion tokens
- есть hooks/helpers под reduced motion и GSAP registration

---

## Что будет в следующем шаге
Следующий слой — это реальный UI: все 10 сцен, scene-компоненты, device mockups, toolkit gallery, messenger/schedule demos и нормальный product-like layout.

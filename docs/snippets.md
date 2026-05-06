# Кодовые сниппеты и паттерны

## 1. Hero reveal через Motion

```tsx
import { motion } from "framer-motion";
import { motionTokens } from "@/config/motion.tokens";

export function HeroTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial="hidden"
      transition={{ staggerChildren: motionTokens.stagger.base }}
      variants={motionTokens.revealVariants.heroTitle}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="visible"
    >
      {children}
    </motion.h1>
  );
}
```

Когда использовать:
- hero headline
- крупные scene-title
- entry-point блоки, где важен вес первой подачи

---

## 2. GSAP ScrollTrigger init для Roadmap

```tsx
useEffect(() => {
  if (prefersReducedMotion || window.innerWidth < 1280) {
    return;
  }

  const { ScrollTrigger } = ensureGSAP();

  const context = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top+=96",
      end: "bottom bottom-=64",
      pin: pinRef.current,
      pinSpacing: false,
      onUpdate: (self) => setProgress(self.progress),
    });

    stepRefs.current.forEach((node, index) => {
      if (!node) return;

      ScrollTrigger.create({
        trigger: node,
        start: "top center+=60",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });
  }, sectionRef);

  return () => context.revert();
}, [prefersReducedMotion]);
```

Что важно:
- `context.revert()` обязателен
- reduced motion должен отрезать pinned и scrubbed поведение
- мобильные breakpoint'ы лучше не заставлять работать в desktop-style pin

---

## 3. Паттерн phone mockup со сменой экранов

```tsx
const tabs = [
  { value: "today", label: "Today" },
  { value: "week", label: "Week" },
  { value: "teacher", label: "Teacher" },
] as const;

type TabValue = (typeof tabs)[number]["value"];

export function ScheduleMock() {
  const [tab, setTab] = useState<TabValue>("today");

  return (
    <DeviceMock type="phone" title="Schedule app">
      <Toggle options={tabs} value={tab} onChange={setTab} />
      <div className="mt-4">
        {tab === "today" ? <TodayView /> : null}
        {tab === "week" ? <WeekView /> : null}
        {tab === "teacher" ? <TeacherView /> : null}
      </div>
    </DeviceMock>
  );
}
```

Когда использовать:
- app demos
- before/after product flows
- сценарии, где нужен controlled state без сложной логики

---

## 4. Lazy Lottie usage

```tsx
const LazyLottie = lazy(async () => {
  const module = await import("lottie-react");
  return { default: module.default };
});

export function LottieIcon({ className }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <Suspense fallback={<div className={className} aria-hidden="true" />}>
      <LazyLottie animationData={animationData} autoplay loop className={className} />
    </Suspense>
  );
}
```

Почему так:
- не тянем `lottie-react` в основной runtime без необходимости
- reduced motion получает спокойный fallback
- проще держать CWV в рамках

---

## 5. Copy-to-clipboard паттерн для toolkit / stories

```tsx
const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

const handleCopy = async (value: string, index: number) => {
  await navigator.clipboard.writeText(value);
  setCopiedIndex(index);
  window.setTimeout(() => setCopiedIndex(null), 1400);
};
```

Где применять:
- сторис-тексты
- быстрые CTA-копии
- агитматериалы для активистов

---

## 6. Data-driven scene wiring

```tsx
const sceneMap = Object.fromEntries(
  scenes.map((scene) => [scene.id, scene]),
) as Record<SceneId, (typeof scenes)[number]>;

<HeroScene candidates={candidates} scene={sceneMap.hero} />
<ManifestScene scene={sceneMap.manifest} />
<RoadmapScene scene={sceneMap.roadmap} steps={roadmapSteps} />
```

Плюс такого паттерна:
- UI не хранит текст в себе
- контент и макет можно править независимо
- проще готовить alternate-версии лендинга

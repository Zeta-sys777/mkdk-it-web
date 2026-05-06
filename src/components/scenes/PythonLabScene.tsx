import { useEffect, useMemo, useState } from 'react';
import type { SceneData } from '@/content/department.data';
import { pythonLessons } from '@/content/pythonLab.lessons';
import type { PythonLesson } from '@/content/pythonLab.lessons';
import { Scene } from '@/components/layout/Scene';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { ProgressPill } from '@/components/ui/ProgressPill';

interface PythonLabSceneProps {
  scene: SceneData;
}

const progressKey = 'mkdk-python-lab-progress';
const codeKey = 'mkdk-python-lab-code';
const outputLimit = 5000;
const executionTimeoutMs = 2200;

type SavedCodes = Record<string, string>;
type LessonStatus = Record<string, boolean>;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function limitOutput(value: string) {
  return value.length > outputLimit ? `${value.slice(0, outputLimit)}\n...вывод остановлен, чтобы страница не зависла` : value;
}

async function runPython(code: string): Promise<string> {
  const module = await import('skulpt');
  const Sk = module.default;
  let output = '';

  function builtinRead(path: string) {
    const files = Sk.builtinFiles?.files;
    if (!files || !files[path]) {
      throw new Error(`Файл библиотеки не найден: ${path}`);
    }
    return files[path];
  }

  Sk.configure({
    output: (text: string) => {
      output = limitOutput(output + text);
    },
    read: builtinRead,
    __future__: Sk.python3,
  });

  const execution = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true)).then(() => output || 'Код выполнен. Вывода нет.');
  const timeout = new Promise<string>((_, reject) => {
    window.setTimeout(() => reject(new Error('Код выполнялся слишком долго. Проверь цикл или условие.')), executionTimeoutMs);
  });

  return Promise.race([execution, timeout]);
}

function checkLesson(lesson: PythonLesson, output: string) {
  return lesson.expectedOutputIncludes.every((item) => output.includes(item));
}

function PythonLabScene({ scene }: PythonLabSceneProps) {
  const [activeLessonId, setActiveLessonId] = useState(pythonLessons[0].id);
  const activeLesson = useMemo(() => pythonLessons.find((lesson) => lesson.id === activeLessonId) ?? pythonLessons[0], [activeLessonId]);
  const [savedCodes, setSavedCodes] = useState<SavedCodes>({});
  const [progress, setProgress] = useState<LessonStatus>({});
  const [code, setCode] = useState(activeLesson.starterCode);
  const [output, setOutput] = useState('Нажми «Запустить код», чтобы увидеть вывод.');
  const [isRunning, setIsRunning] = useState(false);
  const [lastCheck, setLastCheck] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setSavedCodes(readStorage<SavedCodes>(codeKey, {}));
    setProgress(readStorage<LessonStatus>(progressKey, {}));
  }, []);

  useEffect(() => {
    setCode(savedCodes[activeLesson.id] ?? activeLesson.starterCode);
    setOutput('Нажми «Запустить код», чтобы увидеть вывод.');
    setLastCheck('idle');
  }, [activeLesson, savedCodes]);

  const completedCount = Object.values(progress).filter(Boolean).length;

  const saveCode = (nextCode: string) => {
    setCode(nextCode);
    const nextSavedCodes = { ...savedCodes, [activeLesson.id]: nextCode };
    setSavedCodes(nextSavedCodes);
    window.localStorage.setItem(codeKey, JSON.stringify(nextSavedCodes));
  };

  const handleRun = async () => {
    setIsRunning(true);
    setLastCheck('idle');
    setOutput('Запускаем код...');

    try {
      const result = await runPython(code);
      const safeResult = limitOutput(result);
      const isCorrect = checkLesson(activeLesson, safeResult);
      setOutput(safeResult);
      setLastCheck(isCorrect ? 'success' : 'error');

      if (isCorrect) {
        const nextProgress = { ...progress, [activeLesson.id]: true };
        setProgress(nextProgress);
        window.localStorage.setItem(progressKey, JSON.stringify(nextProgress));
      }
    } catch (error) {
      setLastCheck('error');
      setOutput(error instanceof Error ? error.message : 'Код не запустился. Проверь синтаксис.');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => saveCode(activeLesson.starterCode);

  return (
    <Scene bleed id={scene.id}>
      <SectionTitle
        description={<div className="space-y-3"><p>{scene.body[0]}</p><p>{scene.body[1]}</p></div>}
        id={`${scene.id}-title`}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr]">
        <div className="space-y-4">
          <div className="rounded-[1.7rem] border border-white/[0.08] bg-bg-panel/82 p-4 shadow-card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-display text-xl font-bold text-text-primary">Уроки</p>
              <ProgressPill label={`${completedCount}/${pythonLessons.length}`} tone="success" />
            </div>
            <div className="space-y-2">
              {pythonLessons.map((lesson) => {
                const isActive = lesson.id === activeLesson.id;
                const isDone = Boolean(progress[lesson.id]);
                return (
                  <button
                    key={lesson.id}
                    className={isActive ? 'w-full rounded-2xl border border-accent-cyan/26 bg-accent-cyan/10 px-4 py-3 text-left' : 'w-full rounded-2xl border border-white/[0.06] bg-white/[0.035] px-4 py-3 text-left hover:bg-white/[0.06]'}
                    onClick={() => setActiveLessonId(lesson.id)}
                    type="button"
                  >
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-text-tertiary">{lesson.level}</span>
                    <span className="mt-1 block font-semibold text-text-primary">{lesson.title}</span>
                    <span className="mt-1 block text-xs text-text-secondary">{isDone ? 'пройдено' : lesson.goal}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-[1.4rem] border border-accent-gold/18 bg-accent-gold/[0.06] p-4 text-sm leading-7 text-text-secondary">
            Не вводите личные данные в Python Lab. Код запускается в браузере, прогресс сохраняется только на этом устройстве.
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[#07101f] shadow-hero">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-status-error" /><span className="h-3 w-3 rounded-full bg-status-warning" /><span className="h-3 w-3 rounded-full bg-status-success" /></div>
            <p className="font-mono text-xs text-text-tertiary">Python Lab · IT-департамент МКДК</p>
          </div>

          <div className="grid gap-0 lg:grid-cols-[0.58fr_0.42fr]">
            <div className="border-b border-white/[0.08] lg:border-b-0 lg:border-r">
              <div className="border-b border-white/[0.08] px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">{activeLesson.level}</p>
                <h3 className="mt-1 text-xl font-bold text-text-primary">{activeLesson.title}</h3>
                <p className="mt-2 text-sm leading-7 text-text-secondary">{activeLesson.theory}</p>
              </div>
              <textarea
                aria-label="Редактор Python-кода"
                className="min-h-[22rem] w-full resize-y bg-[#060b16] p-4 font-mono text-sm leading-7 text-text-primary outline-none"
                onChange={(event) => saveCode(event.target.value)}
                spellCheck={false}
                value={code}
              />
              <div className="flex flex-wrap gap-2 border-t border-white/[0.08] px-4 py-3">
                <Button disabled={isRunning} onClick={handleRun} variant="holo">{isRunning ? 'Запускаем...' : 'Запустить код'}</Button>
                <Button disabled={isRunning} onClick={resetCode} variant="secondary">Сбросить код</Button>
              </div>
            </div>

            <div className="flex min-h-[24rem] flex-col">
              <div className="border-b border-white/[0.08] px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">вывод</p>
                <p className="mt-1 text-sm text-text-secondary">{activeLesson.goal}</p>
              </div>
              <pre className="min-h-[12rem] flex-1 whitespace-pre-wrap bg-[#050914] p-4 font-mono text-sm leading-7 text-text-secondary">{output}</pre>
              <div className="border-t border-white/[0.08] p-4">
                {lastCheck === 'success' ? <p className="rounded-2xl border border-status-success/25 bg-status-success/10 px-4 py-3 text-sm text-text-primary">{activeLesson.successText}</p> : null}
                {lastCheck === 'error' ? <p className="rounded-2xl border border-status-error/22 bg-status-error/10 px-4 py-3 text-sm text-text-secondary">Проверь вывод и условие урока. Можно поправить код и запустить еще раз.</p> : null}
                {lastCheck === 'idle' ? <p className="rounded-2xl border border-white/[0.06] bg-white/[0.035] px-4 py-3 text-sm text-text-secondary">Курс подготовлен IT-департаментом МКДК.</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}

export default PythonLabScene;

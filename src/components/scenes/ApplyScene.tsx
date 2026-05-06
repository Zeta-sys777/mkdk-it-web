import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { SceneData } from '@/content/department.data';
import { applicationDirections } from '@/content/department.data';
import { Scene } from '@/components/layout/Scene';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import {
  clearApplications,
  emptyApplicationForm,
  formatApplication,
  formatApplications,
  readApplications,
  saveApplication,
  validateApplication,
} from '@/lib/applications';
import type { ApplicationErrors, ApplicationFormState, StoredApplication } from '@/lib/applications';

interface ApplySceneProps {
  scene: SceneData;
}

const firstDirection = applicationDirections[0];

export function ApplyScene({ scene }: ApplySceneProps) {
  const [form, setForm] = useState<ApplicationFormState>(() => emptyApplicationForm(firstDirection));
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [applications, setApplications] = useState<StoredApplication[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'copy' | 'clear'>('idle');
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    setApplications(readApplications());
  }, []);

  const lastApplication = applications[0];
  const applicationText = useMemo(() => formatApplications(applications), [applications]);

  const updateField = (field: keyof ApplicationFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('idle');
    setStatusText('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateApplication(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      setStatusText('Проверь поля с подсказками. Заявка пока не сохранена.');
      return;
    }

    const result = saveApplication(form);
    setApplications(result.applications);
    setForm(emptyApplicationForm(firstDirection));
    setStatus('success');
    setStatusText('Заявка сохранена на этом устройстве. Ее видно в служебной панели ниже.');
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copy');
      setStatusText('Заявка скопирована в буфер обмена.');
    } catch {
      setStatus('copy');
      setStatusText('Не удалось скопировать автоматически. Выдели текст в панели и скопируй вручную.');
    }
  };

  const handleClear = () => {
    clearApplications();
    setApplications([]);
    setStatus('clear');
    setStatusText('Локальные заявки очищены на этом устройстве.');
  };

  return (
    <Scene bleed id={scene.id}>
      <SectionTitle
        description={<div className="space-y-3"><p>{scene.body[0]}</p><p>{scene.body[1]}</p></div>}
        id={`${scene.id}-title`}
        kicker={scene.kicker}
        meta={`Сцена ${String(scene.sceneNumber).padStart(2, '0')}`}
        title={scene.title}
      />

      <div className="grid gap-5 lg:grid-cols-[0.62fr_0.38fr]">
        <GlassPanel hoverable={false} tone="strong">
          <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
            <label className="space-y-2 text-sm font-semibold text-text-primary">
              Имя
              <input className="form-field" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Как к тебе обращаться" />
              {errors.name ? <span className="form-error">{errors.name}</span> : null}
            </label>

            <label className="space-y-2 text-sm font-semibold text-text-primary">
              Группа
              <input className="form-field" value={form.group} onChange={(event) => updateField('group', event.target.value)} placeholder="Например: ИСИП9" />
              {errors.group ? <span className="form-error">{errors.group}</span> : null}
            </label>

            <label className="space-y-2 text-sm font-semibold text-text-primary">
              Направление
              <select className="form-field" value={form.direction} onChange={(event) => updateField('direction', event.target.value)}>
                {applicationDirections.map((direction) => <option key={direction} value={direction}>{direction}</option>)}
              </select>
              {errors.direction ? <span className="form-error">{errors.direction}</span> : null}
            </label>

            <label className="space-y-2 text-sm font-semibold text-text-primary">
              Контакт
              <input className="form-field" value={form.contact} onChange={(event) => updateField('contact', event.target.value)} placeholder="Telegram, почта или телефон" />
              {errors.contact ? <span className="form-error">{errors.contact}</span> : null}
            </label>

            <label className="space-y-2 text-sm font-semibold text-text-primary lg:col-span-2">
              Опыт
              <textarea className="form-field min-h-[7rem]" value={form.experience} onChange={(event) => updateField('experience', event.target.value)} placeholder="Что уже пробовал: код, дизайн, сети, реклама, монтаж, тесты" />
            </label>

            <label className="space-y-2 text-sm font-semibold text-text-primary lg:col-span-2">
              Сообщение
              <textarea className="form-field min-h-[9rem]" value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Если у тебя есть идея для колледжа — опиши ее здесь. Если идея подойдет, мы свяжемся с тобой." />
              {errors.message ? <span className="form-error">{errors.message}</span> : null}
            </label>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
              <Button type="submit" variant="holo">Сохранить заявку</Button>
              {statusText ? (
                <p className={status === 'success' ? 'text-sm text-status-success' : 'text-sm text-text-secondary'}>{statusText}</p>
              ) : null}
            </div>
          </form>
        </GlassPanel>

        <GlassPanel hoverable={false} tone="solid">
          <div className="space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-text-tertiary">служебная панель</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-text-primary">Локальные заявки</h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                На первом этапе заявки хранятся только в браузере владельца сайта. Позже этот же сценарий можно заменить на отправку в <span className="font-mono">/api/apply</span>.
              </p>
            </div>

            <div className="rounded-[1.2rem] border border-white/[0.06] bg-bg-base/62 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-text-primary">Всего заявок</span>
                <span className="status-pill">{applications.length}</span>
              </div>
              {lastApplication ? (
                <div className="mt-4 space-y-2 text-sm leading-6 text-text-secondary">
                  <p><span className="text-text-primary">Последняя:</span> {lastApplication.name}, {lastApplication.group}</p>
                  <p>{lastApplication.direction}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-text-secondary">Пока пусто. Отправь тестовую заявку, и она появится здесь.</p>
              )}
            </div>

            <textarea
              aria-label="Локальные заявки"
              className="form-field min-h-[16rem] font-mono text-xs leading-6"
              readOnly
              value={applicationText}
            />

            <div className="flex flex-wrap gap-2">
              <Button disabled={!applications.length} onClick={() => copyText(lastApplication ? formatApplication(lastApplication) : applicationText)} variant="secondary">Скопировать заявку</Button>
              <Button disabled={!applications.length} onClick={() => copyText(applicationText)} variant="ghost">Скопировать все</Button>
              <Button disabled={!applications.length} onClick={handleClear} variant="ghost">Очистить локальные заявки</Button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </Scene>
  );
}

export interface ApplicationFormState {
  name: string;
  group: string;
  direction: string;
  experience: string;
  contact: string;
  message: string;
}

export interface StoredApplication extends ApplicationFormState {
  id: string;
  createdAt: string;
}

export type ApplicationErrors = Partial<Record<keyof ApplicationFormState, string>>;

export const applicationsStorageKey = 'mkdk-it-department-applications';

export const emptyApplicationForm = (direction: string): ApplicationFormState => ({
  name: '',
  group: '',
  direction,
  experience: '',
  contact: '',
  message: '',
});

export function validateApplication(form: ApplicationFormState): ApplicationErrors {
  const errors: ApplicationErrors = {};

  if (form.name.trim().length < 2) errors.name = 'Напиши имя.';
  if (form.group.trim().length < 2) errors.group = 'Укажи группу.';
  if (!form.direction.trim()) errors.direction = 'Выбери направление.';
  if (form.contact.trim().length < 5) errors.contact = 'Оставь Telegram, почту или другой контакт.';
  if (form.message.trim().length < 12) errors.message = 'Опиши идею или задачу чуть подробнее.';

  return errors;
}

export function readApplications(storage: Storage = window.localStorage): StoredApplication[] {
  try {
    const raw = storage.getItem(applicationsStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeApplications(applications: StoredApplication[], storage: Storage = window.localStorage) {
  storage.setItem(applicationsStorageKey, JSON.stringify(applications));
}

export function saveApplication(form: ApplicationFormState, storage: Storage = window.localStorage) {
  const application: StoredApplication = {
    ...form,
    name: form.name.trim(),
    group: form.group.trim(),
    direction: form.direction.trim(),
    experience: form.experience.trim(),
    contact: form.contact.trim(),
    message: form.message.trim(),
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const nextApplications = [application, ...readApplications(storage)];
  writeApplications(nextApplications, storage);
  return { application, applications: nextApplications };
}

export function clearApplications(storage: Storage = window.localStorage) {
  storage.removeItem(applicationsStorageKey);
}

export function formatApplication(application: StoredApplication) {
  const date = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(application.createdAt));

  return [
    `Заявка: ${application.name}`,
    `Дата: ${date}`,
    `Группа: ${application.group}`,
    `Направление: ${application.direction}`,
    `Контакт: ${application.contact}`,
    `Опыт: ${application.experience || 'не указан'}`,
    `Сообщение: ${application.message}`,
  ].join('\n');
}

export function formatApplications(applications: StoredApplication[]) {
  if (!applications.length) return 'Локальных заявок пока нет.';
  return applications.map(formatApplication).join('\n\n---\n\n');
}

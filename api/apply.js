const requiredFields = ['name', 'group', 'direction', 'contact', 'message'];

function clean(value) {
  return String(value || '').trim().slice(0, 1200);
}

function validate(body) {
  const errors = [];
  for (const field of requiredFields) {
    if (!clean(body[field])) errors.push(field);
  }
  if (clean(body.name).length < 2) errors.push('name');
  if (clean(body.group).length < 2) errors.push('group');
  if (clean(body.contact).length < 5) errors.push('contact');
  if (clean(body.message).length < 12) errors.push('message');
  return [...new Set(errors)];
}

function formatMessage(body) {
  return [
    'Новая заявка в IT-департамент МКДК',
    '',
    `Имя: ${clean(body.name)}`,
    `Группа: ${clean(body.group)}`,
    `Направление: ${clean(body.direction)}`,
    `Контакт: ${clean(body.contact)}`,
    '',
    `Опыт: ${clean(body.experience) || 'не указан'}`,
    '',
    `Сообщение: ${clean(body.message)}`,
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const errors = validate(body);

  if (errors.length) {
    res.status(400).json({ ok: false, error: 'validation_error', fields: errors });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(503).json({ ok: false, error: 'telegram_env_missing' });
    return;
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: formatMessage(body), disable_web_page_preview: true }),
  });

  if (!telegramResponse.ok) {
    res.status(502).json({ ok: false, error: 'telegram_failed' });
    return;
  }

  res.status(200).json({ ok: true });
}

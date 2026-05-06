import { useMemo } from 'react';
import type { ToolkitCardData } from '@/content/content.data';
import { Button } from './Button';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildCardSvg(card: ToolkitCardData) {
  const title = escapeXml(card.title);
  const caption = escapeXml(card.caption);
  const theme = escapeXml(card.theme.toUpperCase());

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1080" y2="1350" gradientUnits="userSpaceOnUse">
      <stop stop-color="#07111F"/>
      <stop offset="0.55" stop-color="#0B1731"/>
      <stop offset="1" stop-color="#111E3E"/>
    </linearGradient>
    <linearGradient id="line" x1="126" y1="154" x2="930" y2="980" gradientUnits="userSpaceOnUse">
      <stop stop-color="#69E2FF" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#9B8CFF" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" rx="64" fill="url(#bg)"/>
  <circle cx="868" cy="238" r="210" fill="#69E2FF" fill-opacity="0.11"/>
  <circle cx="240" cy="1116" r="220" fill="#9B8CFF" fill-opacity="0.10"/>
  <rect x="72" y="72" width="936" height="1206" rx="48" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
  <path d="M156 270H924" stroke="url(#line)" stroke-width="2" stroke-linecap="round"/>
  <text x="156" y="180" fill="#93A3C7" font-family="Inter, Arial, sans-serif" font-size="32" letter-spacing="8">ПАТИМАТ + АЙГУЛЬ</text>
  <text x="156" y="246" fill="#F5F8FF" font-family="Inter, Arial, sans-serif" font-size="88" font-weight="800">${title}</text>
  <foreignObject x="156" y="328" width="768" height="320">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,Arial,sans-serif;font-size:42px;line-height:1.25;color:#CAD6F3;">
      ${caption}
    </div>
  </foreignObject>
  <rect x="156" y="1058" width="204" height="60" rx="30" fill="rgba(105,226,255,0.12)" stroke="rgba(105,226,255,0.30)"/>
  <text x="196" y="1097" fill="#F5F8FF" font-family="IBM Plex Mono, monospace" font-size="26">${theme}</text>
  <text x="156" y="1198" fill="#F5F8FF" font-family="Inter, Arial, sans-serif" font-size="48" font-weight="700">Я хочу, чтобы студсовет был полезен каждый день.</text>
</svg>`;
}

interface ShareCardProps {
  card: ToolkitCardData;
}

const formatLabelMap: Record<ToolkitCardData['format'], string> = {
  story: 'сторис',
  post: 'пост',
  quote: 'цитата',
  checklist: 'чеклист',
};

export function ShareCard({ card }: ShareCardProps) {
  const svgMarkup = useMemo(() => buildCardSvg(card), [card]);
  const svgUrl = useMemo(() => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`, [svgMarkup]);

  const handleDownload = () => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.id}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-[1.5rem] border border-neutral-line bg-surface-solid shadow-card">
      <div className="overflow-hidden rounded-t-[1.5rem] border-b border-white/5 bg-black/10 p-3">
        <img alt={card.title} className="w-full rounded-[1.1rem] border border-white/6 object-cover" src={svgUrl} />
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-base font-bold text-text-primary">{card.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">{card.caption}</p>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">{formatLabelMap[card.format]}</span>
        </div>
        <Button className="w-full" onClick={handleDownload} variant="secondary">
          Скачать файл
        </Button>
      </div>
    </div>
  );
}

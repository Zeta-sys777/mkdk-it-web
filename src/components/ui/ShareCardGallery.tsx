import type { ToolkitCardData } from '@/content/content.data';
import { ShareCard } from './ShareCard';

interface ShareCardGalleryProps {
  cards: ToolkitCardData[];
}

export function ShareCardGallery({ cards }: ShareCardGalleryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <ShareCard key={card.id} card={card} />
      ))}
    </div>
  );
}

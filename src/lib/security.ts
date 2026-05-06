const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function sanitizeHref(rawHref?: string): string | undefined {
  if (!rawHref) return undefined;

  const href = rawHref.trim();
  if (!href) return undefined;

  if (href.startsWith("#")) return href;
  if (href.startsWith("/")) return href;
  if (href.startsWith("./") || href.startsWith("../")) return href;

  try {
    const parsed = new URL(href, "http://localhost");
    if (SAFE_PROTOCOLS.has(parsed.protocol)) {
      return href;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

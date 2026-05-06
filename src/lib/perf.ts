export function shouldUseLightExperience() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;

  if (!connection) {
    return false;
  }

  return Boolean(connection.saveData) || connection.effectiveType === "2g";
}

export async function lazyImport<T>(loader: () => Promise<T>) {
  return loader();
}

export const STORAGE_KEYS = {
  recentSearches: "sound-search:recent-searches",
  theme: "sound-search:theme",
  viewMode: "sound-search:view-mode"
} as const;

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function loadJson<T>(key: string, fallback: T, storage: StorageLike | undefined = getStorage()): T {
  if (!storage) {
    return fallback;
  }

  try {
    const rawValue = storage.getItem(key);
    return rawValue === null ? fallback : (JSON.parse(rawValue) as T);
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T, storage: StorageLike | undefined = getStorage()): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function getStorage(): StorageLike | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.localStorage;
}

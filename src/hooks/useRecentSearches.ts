import { useCallback, useState } from "react";
import { addRecentSearch } from "../lib/recentSearches";
import { loadJson, saveJson, STORAGE_KEYS } from "../lib/storage";

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    loadJson<string[]>(STORAGE_KEYS.recentSearches, [])
  );

  const addSearch = useCallback((term: string) => {
    setRecentSearches((currentSearches) => {
      const nextSearches = addRecentSearch(currentSearches, term);
      saveJson(STORAGE_KEYS.recentSearches, nextSearches);
      return nextSearches;
    });
  }, []);

  return {
    recentSearches,
    addSearch
  };
}

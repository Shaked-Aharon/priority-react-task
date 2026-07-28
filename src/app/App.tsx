import { useCallback, useEffect, useRef } from "react";
import { mixcloudProvider } from "../api/mixcloudProvider";
import type { SoundSearchResult } from "../api/types";
import type { ViewMode } from "../components/ViewModeControls";
import { useEffectiveTheme, type ThemePreference } from "../hooks/useEffectiveTheme";
import { usePersistentPreference } from "../hooks/usePersistentPreference";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { useSearchController } from "../hooks/useSearchController";
import { LANGUAGES, languageDirections, messages, type Language } from "../i18n/messages";
import { animateSelection } from "../lib/animation";
import { STORAGE_KEYS } from "../lib/storage";
import { PreviewPanel } from "./PreviewPanel";
import { RecentPanel } from "./RecentPanel";
import { SearchPanel } from "./SearchPanel";

const VIEW_MODES = ["list", "tile"] as const;
const THEME_PREFERENCES = ["system", "light", "dark"] as const;

export function App() {
  const search = useSearchController(mixcloudProvider);
  const { recentSearches, addSearch } = useRecentSearches();
  const [viewMode, setViewMode] = usePersistentPreference<ViewMode>(
    STORAGE_KEYS.viewMode,
    "list",
    VIEW_MODES
  );
  const [themePreference, setThemePreference] = usePersistentPreference<ThemePreference>(
    STORAGE_KEYS.theme,
    "system",
    THEME_PREFERENCES
  );
  const [language, setLanguage] = usePersistentPreference<Language>(
    STORAGE_KEYS.language,
    "en",
    LANGUAGES
  );
  const direction = languageDirections[language];
  const effectiveTheme = useEffectiveTheme(themePreference);
  const t = messages[language];
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.lastSuccessfulSearch) {
      addSearch(search.lastSuccessfulSearch.term);
    }
  }, [addSearch, search.lastSuccessfulSearch]);

  useEffect(() => {
    document.documentElement.dataset.theme = themePreference;
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [direction, language]);

  const handleSelectResult = useCallback(
    (result: SoundSearchResult, sourceElement: HTMLElement) => {
      search.selectResult(result);

      if (previewRef.current) {
        animateSelection(sourceElement, previewRef.current);
        window.setTimeout(() => previewRef.current?.focus(), 0);
      }
    },
    [search]
  );

  return (
    <main className="app-shell">
      <SearchPanel
        search={search}
        viewMode={viewMode}
        language={language}
        themePreference={themePreference}
        messages={t}
        onViewModeChange={setViewMode}
        onLanguageChange={setLanguage}
        onThemePreferenceChange={setThemePreference}
        onSelectResult={handleSelectResult}
      />

      <PreviewPanel
        ref={previewRef}
        result={search.selectedResult}
        effectiveTheme={effectiveTheme}
        messages={t}
      />

      <RecentPanel searches={recentSearches} messages={t} onSearch={search.searchRecentTerm} />
    </main>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { mixcloudProvider } from "../api/mixcloudProvider";
import type { SoundSearchResult } from "../api/types";
import { ImagePreview } from "../components/ImagePreview";
import { LanguageControls } from "../components/LanguageControls";
import { PaginationControls } from "../components/PaginationControls";
import { PlayerEmbed } from "../components/PlayerEmbed";
import { RecentSearches } from "../components/RecentSearches";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import { ThemeControls, type ThemePreference } from "../components/ThemeControls";
import { ViewModeControls, type ViewMode } from "../components/ViewModeControls";
import { usePersistentPreference } from "../hooks/usePersistentPreference";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { useSearchController } from "../hooks/useSearchController";
import { LANGUAGES, languageDirections, messages, type Language } from "../i18n/messages";
import { animateSelection } from "../lib/animation";
import { STORAGE_KEYS } from "../lib/storage";

const VIEW_MODES = ["list", "tile"] as const;
const THEME_PREFERENCES = ["system", "light", "dark"] as const;

export function App() {
  const search = useSearchController(mixcloudProvider);
  const {
    activeQuery,
    canGoNext,
    canGoPrevious,
    errorMessage,
    goNext,
    goPrevious,
    inputQuery,
    isLoading,
    lastSuccessfulSearch,
    results,
    retry,
    searchRecentTerm,
    selectResult,
    selectedResult,
    setInputQuery,
    status,
    submitSearch
  } = search;
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
  const t = messages[language];
  const previewRef = useRef<HTMLDivElement>(null);
  const [openPlayerResultId, setOpenPlayerResultId] = useState<string | null>(null);
  const isPlayerOpen = openPlayerResultId === selectedResult?.id;

  useEffect(() => {
    if (lastSuccessfulSearch) {
      addSearch(lastSuccessfulSearch.term);
    }
  }, [addSearch, lastSuccessfulSearch]);

  useEffect(() => {
    document.documentElement.dataset.theme = themePreference;
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [direction, language]);

  const handleSelectResult = useCallback(
    (result: SoundSearchResult, sourceElement: HTMLElement) => {
      selectResult(result);

      if (previewRef.current) {
        animateSelection(sourceElement, previewRef.current);
        window.setTimeout(() => previewRef.current?.focus(), 0);
      }
    },
    [selectResult]
  );

  return (
    <main className="app-shell">
      <section
        className="app-region app-region--search"
        aria-labelledby="search-heading"
        aria-busy={isLoading}
      >
        <div className="app-region__header">
          <h1 id="search-heading">{t.app.title}</h1>
          <div className="app-preference-controls">
            <LanguageControls value={language} messages={t.language} onChange={setLanguage} />
            <ThemeControls value={themePreference} messages={t.theme} onChange={setThemePreference} />
          </div>
        </div>
        <SearchBar
          value={inputQuery}
          isLoading={isLoading}
          messages={t.searchBar}
          onChange={setInputQuery}
          onSubmit={submitSearch}
        />
        <ViewModeControls
          value={viewMode}
          disabled={isLoading}
          messages={t.viewMode}
          onChange={setViewMode}
        />
        <SearchResults
          activeQuery={activeQuery}
          results={results}
          selectedResult={selectedResult}
          status={status}
          errorMessage={errorMessage}
          messages={t.results}
          viewMode={viewMode}
          onRetry={retry}
          onSelect={handleSelectResult}
        />
        <PaginationControls
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          isLoading={isLoading}
          messages={t.pagination}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      </section>

      <section className="app-region app-region--preview" aria-labelledby="preview-heading">
        <h2 id="preview-heading">{t.app.previewHeading}</h2>
        <ImagePreview
          ref={previewRef}
          result={selectedResult}
          messages={t.preview}
          onOpenPlayer={() => setOpenPlayerResultId(selectedResult?.id ?? null)}
        />
        {selectedResult && isPlayerOpen ? (
          <PlayerEmbed result={selectedResult} messages={t.player} />
        ) : null}
      </section>

      <section className="app-region app-region--recent" aria-labelledby="recent-heading">
        <h2 id="recent-heading">{t.app.recentHeading}</h2>
        <RecentSearches searches={recentSearches} messages={t.recent} onSearch={searchRecentTerm} />
      </section>
    </main>
  );
}

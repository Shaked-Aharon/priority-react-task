import { useCallback, useEffect, useRef, useState } from "react";
import { mixcloudProvider } from "../api/mixcloudProvider";
import type { SoundSearchResult } from "../api/types";
import { ImagePreview } from "../components/ImagePreview";
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
import { animateSelection } from "../lib/animation";
import { STORAGE_KEYS } from "../lib/storage";

const VIEW_MODES = ["list", "tile"] as const;
const THEME_PREFERENCES = ["system", "light", "dark"] as const;

export function App() {
  const search = useSearchController(mixcloudProvider);
  const { selectResult } = search;
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
  const previewRef = useRef<HTMLDivElement>(null);
  const [openPlayerResultId, setOpenPlayerResultId] = useState<string | null>(null);
  const isPlayerOpen = openPlayerResultId === search.selectedResult?.id;

  useEffect(() => {
    if (search.lastSuccessfulSearch) {
      addSearch(search.lastSuccessfulSearch.term);
    }
  }, [addSearch, search.lastSuccessfulSearch]);

  useEffect(() => {
    document.documentElement.dataset.theme = themePreference;
  }, [themePreference]);

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
        aria-busy={search.isLoading}
      >
        <div className="app-region__header">
          <h1 id="search-heading">Sound Search</h1>
          <ThemeControls value={themePreference} onChange={setThemePreference} />
        </div>
        <SearchBar
          value={search.inputQuery}
          isLoading={search.isLoading}
          onChange={search.setInputQuery}
          onSubmit={search.submitSearch}
        />
        <ViewModeControls value={viewMode} disabled={search.isLoading} onChange={setViewMode} />
        <SearchResults
          activeQuery={search.activeQuery}
          results={search.results}
          selectedResult={search.selectedResult}
          status={search.status}
          errorMessage={search.errorMessage}
          viewMode={viewMode}
          onRetry={search.retry}
          onSelect={handleSelectResult}
        />
        <PaginationControls
          canGoPrevious={search.canGoPrevious}
          canGoNext={search.canGoNext}
          isLoading={search.isLoading}
          onPrevious={search.goPrevious}
          onNext={search.goNext}
        />
      </section>

      <section className="app-region app-region--preview" aria-labelledby="preview-heading">
        <h2 id="preview-heading">Image Preview</h2>
        <ImagePreview
          ref={previewRef}
          result={search.selectedResult}
          onOpenPlayer={() => setOpenPlayerResultId(search.selectedResult?.id ?? null)}
        />
        {search.selectedResult && isPlayerOpen ? <PlayerEmbed result={search.selectedResult} /> : null}
      </section>

      <section className="app-region app-region--recent" aria-labelledby="recent-heading">
        <h2 id="recent-heading">Recent Searches</h2>
        <RecentSearches searches={recentSearches} onSearch={search.searchRecentTerm} />
      </section>
    </main>
  );
}

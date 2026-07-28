import type { SoundSearchResult } from "../api/types";
import { PaginationControls } from "../components/PaginationControls";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import { SettingsPopover } from "../components/SettingsPopover";
import { ViewModeControls, type ViewMode } from "../components/ViewModeControls";
import type { ThemePreference } from "../hooks/useEffectiveTheme";
import type { useSearchController } from "../hooks/useSearchController";
import type { Language, Messages } from "../i18n/messages";

type SearchController = ReturnType<typeof useSearchController>;

type SearchPanelProps = {
  search: SearchController;
  viewMode: ViewMode;
  language: Language;
  themePreference: ThemePreference;
  messages: Messages;
  onViewModeChange: (value: ViewMode) => void;
  onLanguageChange: (value: Language) => void;
  onThemePreferenceChange: (value: ThemePreference) => void;
  onSelectResult: (result: SoundSearchResult, sourceElement: HTMLElement) => void;
};

export function SearchPanel({
  search,
  viewMode,
  language,
  themePreference,
  messages,
  onViewModeChange,
  onLanguageChange,
  onThemePreferenceChange,
  onSelectResult
}: SearchPanelProps) {
  return (
    <section
      className="app-region app-region--search"
      aria-labelledby="search-heading"
      aria-busy={search.isLoading}
    >
      <div className="app-region__header">
        <h1 id="search-heading">{messages.app.title}</h1>
        <div className="app-preference-controls">
          <SettingsPopover
            language={language}
            themePreference={themePreference}
            messages={messages.settings}
            onLanguageChange={onLanguageChange}
            onThemePreferenceChange={onThemePreferenceChange}
          />
        </div>
      </div>

      <SearchBar
        value={search.inputQuery}
        isLoading={search.isLoading}
        messages={messages.searchBar}
        onChange={search.setInputQuery}
        onSubmit={search.submitSearch}
      />

      <ViewModeControls
        value={viewMode}
        disabled={search.isLoading}
        messages={messages.viewMode}
        onChange={onViewModeChange}
      />

      <SearchResults
        activeQuery={search.activeQuery}
        results={search.results}
        selectedResult={search.selectedResult}
        status={search.status}
        errorMessage={search.errorMessage}
        messages={messages.results}
        viewMode={viewMode}
        onRetry={search.retry}
        onSelect={onSelectResult}
      />

      <PaginationControls
        canGoPrevious={search.canGoPrevious}
        canGoNext={search.canGoNext}
        isLoading={search.isLoading}
        messages={messages.pagination}
        onPrevious={search.goPrevious}
        onNext={search.goNext}
      />
    </section>
  );
}

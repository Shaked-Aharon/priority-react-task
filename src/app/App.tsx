import { useEffect } from "react";
import { mixcloudProvider } from "../api/mixcloudProvider";
import { PaginationControls } from "../components/PaginationControls";
import { RecentSearches } from "../components/RecentSearches";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { useSearchController } from "../hooks/useSearchController";

export function App() {
  const search = useSearchController(mixcloudProvider);
  const { recentSearches, addSearch } = useRecentSearches();

  useEffect(() => {
    if (search.lastSuccessfulSearch) {
      addSearch(search.lastSuccessfulSearch.term);
    }
  }, [addSearch, search.lastSuccessfulSearch]);

  return (
    <main className="app-shell">
      <section className="app-region app-region--search" aria-labelledby="search-heading">
        <h1 id="search-heading">Sound Search</h1>
        <SearchBar
          value={search.inputQuery}
          isLoading={search.isLoading}
          onChange={search.setInputQuery}
          onSubmit={search.submitSearch}
        />
        <SearchResults
          activeQuery={search.activeQuery}
          results={search.results}
          selectedResult={search.selectedResult}
          status={search.status}
          errorMessage={search.errorMessage}
          onRetry={search.retry}
          onSelect={search.selectResult}
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
        <p>Select a result to preview its artwork.</p>
      </section>

      <section className="app-region app-region--recent" aria-labelledby="recent-heading">
        <h2 id="recent-heading">Recent Searches</h2>
        <RecentSearches searches={recentSearches} onSearch={search.searchRecentTerm} />
      </section>
    </main>
  );
}

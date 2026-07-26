import { mixcloudProvider } from "../api/mixcloudProvider";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import { useSearchController } from "../hooks/useSearchController";

export function App() {
  const search = useSearchController(mixcloudProvider);

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
      </section>

      <section className="app-region app-region--preview" aria-labelledby="preview-heading">
        <h2 id="preview-heading">Image Preview</h2>
        <p>Select a result to preview its artwork.</p>
      </section>

      <section className="app-region app-region--recent" aria-labelledby="recent-heading">
        <h2 id="recent-heading">Recent Searches</h2>
        <p>Your latest searches will appear here.</p>
      </section>
    </main>
  );
}

import type { SoundSearchResult } from "../api/types";
import type { SearchStatus } from "../hooks/useSearchController";
import { MIN_SEARCH_TERM_LENGTH } from "../lib/recentSearches";
import { ResultListItem } from "./ResultListItem";
import { ResultTile } from "./ResultTile";
import { StateMessage } from "./StateMessage";
import type { ViewMode } from "./ViewModeControls";

const SKELETON_ITEM_COUNT = 6;

type SearchResultsProps = {
  activeQuery: string;
  results: SoundSearchResult[];
  selectedResult: SoundSearchResult | null;
  status: SearchStatus;
  errorMessage: string;
  viewMode: ViewMode;
  onRetry: () => void;
  onSelect: (result: SoundSearchResult, element: HTMLElement) => void;
};

export function SearchResults({
  activeQuery,
  results,
  selectedResult,
  status,
  errorMessage,
  viewMode,
  onRetry,
  onSelect
}: SearchResultsProps) {
  const label = activeQuery ? `Results for ${activeQuery}` : "Search results";

  if (status === "idle") {
    return (
      <StateMessage
        title="Ready when you are"
        message="Enter a search term to browse Mixcloud cloudcasts."
      />
    );
  }

  if (status === "tooShort") {
    return (
      <StateMessage
        title="Keep typing"
        message={`Search terms need at least ${MIN_SEARCH_TERM_LENGTH} characters.`}
      />
    );
  }

  if (status === "loading") {
    return <SearchResultsSkeleton activeQuery={activeQuery} viewMode={viewMode} />;
  }

  if (status === "error") {
    return (
      <StateMessage
        title="Search failed"
        message={errorMessage}
        tone="error"
        actionLabel="Retry"
        onAction={onRetry}
      />
    );
  }

  if (status === "empty") {
    return <StateMessage title="No results" message={`No cloudcasts matched "${activeQuery}".`} />;
  }

  const ResultComponent = viewMode === "tile" ? ResultTile : ResultListItem;
  const listClassName = viewMode === "tile" ? "result-grid" : "result-list";

  return (
    <ul className={listClassName} aria-label={label}>
      {results.map((result) => (
        <ResultComponent
          key={result.id}
          result={result}
          isSelected={selectedResult?.id === result.id}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function SearchResultsSkeleton({
  activeQuery,
  viewMode
}: {
  activeQuery: string;
  viewMode: ViewMode;
}) {
  const listClassName = viewMode === "tile" ? "result-grid" : "result-list";
  const itemClassName = viewMode === "tile" ? "result-grid__item" : "result-list__item";
  const cardClassName =
    viewMode === "tile"
      ? "result-card result-card--tile result-card--skeleton"
      : "result-card result-card--list result-card--skeleton";

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {activeQuery ? `Searching for ${activeQuery}.` : "Searching."}
      </p>
      <ul className={listClassName} aria-label="Loading search results" aria-hidden="true">
        {Array.from({ length: SKELETON_ITEM_COUNT }, (_, index) => (
          <li className={itemClassName} key={index}>
            <div className={cardClassName}>
              <span className="result-card__skeleton-artwork skeleton-shimmer" />
              <span className="result-card__text">
                <span className="result-card__skeleton-line result-card__skeleton-line--title skeleton-shimmer" />
                <span className="result-card__skeleton-line result-card__skeleton-line--artist skeleton-shimmer" />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

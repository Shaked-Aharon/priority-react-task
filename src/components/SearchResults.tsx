import type { SoundSearchResult } from "../api/types";
import type { SearchStatus } from "../hooks/useSearchController";
import { ResultListItem } from "./ResultListItem";
import { ResultTile } from "./ResultTile";
import { StateMessage } from "./StateMessage";
import type { ViewMode } from "./ViewModeControls";

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

  if (status === "loading") {
    return <StateMessage title="Searching" message={`Looking for "${activeQuery}"...`} />;
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

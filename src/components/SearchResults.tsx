import type { SoundSearchResult } from "../api/types";
import type { SearchStatus } from "../hooks/useSearchController";
import { ResultListItem } from "./ResultListItem";
import { StateMessage } from "./StateMessage";

type SearchResultsProps = {
  activeQuery: string;
  results: SoundSearchResult[];
  selectedResult: SoundSearchResult | null;
  status: SearchStatus;
  errorMessage: string;
  onRetry: () => void;
  onSelect: (result: SoundSearchResult) => void;
};

export function SearchResults({
  activeQuery,
  results,
  selectedResult,
  status,
  errorMessage,
  onRetry,
  onSelect
}: SearchResultsProps) {
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

  return (
    <ul className="result-list" aria-label={`Results for ${activeQuery}`}>
      {results.map((result) => (
        <ResultListItem
          key={result.id}
          result={result}
          isSelected={selectedResult?.id === result.id}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

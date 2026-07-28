import type { SoundSearchResult } from "../api/types";
import type { SearchStatus } from "../hooks/useSearchController";
import type { Messages } from "../i18n/messages";
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
  messages: Messages["results"];
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
  messages,
  viewMode,
  onRetry,
  onSelect
}: SearchResultsProps) {
  const label = activeQuery ? messages.label(activeQuery) : messages.defaultLabel;

  if (status === "idle") {
    return (
      <StateMessage
        title={messages.idleTitle}
        message={messages.idleMessage}
      />
    );
  }

  if (status === "tooShort") {
    return (
      <StateMessage
        title={messages.tooShortTitle}
        message={messages.tooShortMessage(MIN_SEARCH_TERM_LENGTH)}
      />
    );
  }

  if (status === "loading") {
    return <SearchResultsSkeleton activeQuery={activeQuery} messages={messages} viewMode={viewMode} />;
  }

  if (status === "error") {
    return (
      <StateMessage
        title={messages.errorTitle}
        message={errorMessage || messages.errorMessage}
        tone="error"
        actionLabel={messages.retry}
        onAction={onRetry}
      />
    );
  }

  if (status === "empty") {
    return <StateMessage title={messages.emptyTitle} message={messages.emptyMessage(activeQuery)} />;
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
  messages,
  viewMode
}: {
  activeQuery: string;
  messages: Messages["results"];
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
        {messages.searching(activeQuery)}
      </p>
      <ul className={listClassName} aria-label={messages.loadingLabel} aria-hidden="true">
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

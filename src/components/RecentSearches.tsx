import type { Messages } from "../i18n/messages";

type RecentSearchesProps = {
  searches: string[];
  messages: Messages["recent"];
  onSearch: (term: string) => void;
};

export function RecentSearches({ searches, messages, onSearch }: RecentSearchesProps) {
  if (searches.length === 0) {
    return (
      <p className="recent-searches__empty" role="status">
        {messages.empty}
      </p>
    );
  }

  return (
    <ul className="recent-searches" aria-label={messages.label}>
      {searches.map((term) => (
        <li key={term}>
          <button type="button" onClick={() => onSearch(term)}>
            {term}
          </button>
        </li>
      ))}
    </ul>
  );
}

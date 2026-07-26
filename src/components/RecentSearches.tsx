type RecentSearchesProps = {
  searches: string[];
  onSearch: (term: string) => void;
};

export function RecentSearches({ searches, onSearch }: RecentSearchesProps) {
  if (searches.length === 0) {
    return <p className="recent-searches__empty">No recent searches yet.</p>;
  }

  return (
    <ul className="recent-searches" aria-label="Recent searches">
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

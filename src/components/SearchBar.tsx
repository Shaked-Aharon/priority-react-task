import type { FormEvent } from "react";
import { isValidSearchTerm } from "../lib/recentSearches";

type SearchBarProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({ value, isLoading, onChange, onSubmit }: SearchBarProps) {
  const canSubmit = isValidSearchTerm(value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    onSubmit();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="search-bar__label" htmlFor="sound-search">
        Search Mixcloud
      </label>
      <div className="search-bar__controls">
        <input
          id="sound-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try jazz, techno, soul..."
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading || !canSubmit}>
          Search
        </button>
      </div>
    </form>
  );
}

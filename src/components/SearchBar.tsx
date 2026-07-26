import type { FormEvent } from "react";

type SearchBarProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({ value, isLoading, onChange, onSubmit }: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        <button type="submit" disabled={isLoading || value.trim().length === 0}>
          Search
        </button>
      </div>
    </form>
  );
}

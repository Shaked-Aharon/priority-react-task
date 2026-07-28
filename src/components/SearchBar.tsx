import type { FormEvent } from "react";
import type { Messages } from "../i18n/messages";
import { isValidSearchTerm } from "../lib/recentSearches";

type SearchBarProps = {
  value: string;
  isLoading: boolean;
  messages: Messages["searchBar"];
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({ value, isLoading, messages, onChange, onSubmit }: SearchBarProps) {
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
        {messages.label}
      </label>
      <div className="search-bar__controls">
        <input
          id="sound-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={messages.placeholder}
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading || !canSubmit}>
          {messages.submit}
        </button>
      </div>
    </form>
  );
}

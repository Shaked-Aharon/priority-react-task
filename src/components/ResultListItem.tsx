import type { SoundSearchResult } from "../api/types";

type ResultListItemProps = {
  result: SoundSearchResult;
  isSelected: boolean;
  onSelect: (result: SoundSearchResult) => void;
};

export function ResultListItem({ result, isSelected, onSelect }: ResultListItemProps) {
  return (
    <li className="result-list__item">
      <button
        className="result-card result-card--list"
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelect(result)}
      >
        <img src={result.imageUrl} alt="" loading="lazy" />
        <span className="result-card__text">
          <span className="result-card__title">{result.title}</span>
          <span className="result-card__artist">{result.artist}</span>
        </span>
      </button>
    </li>
  );
}

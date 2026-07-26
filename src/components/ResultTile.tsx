import type { SoundSearchResult } from "../api/types";

type ResultTileProps = {
  result: SoundSearchResult;
  isSelected: boolean;
  onSelect: (result: SoundSearchResult, element: HTMLElement) => void;
};

export function ResultTile({ result, isSelected, onSelect }: ResultTileProps) {
  return (
    <li className="result-grid__item">
      <button
        className="result-card result-card--tile"
        type="button"
        aria-pressed={isSelected}
        onClick={(event) => onSelect(result, event.currentTarget)}
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

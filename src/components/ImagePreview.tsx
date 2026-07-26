import { forwardRef } from "react";
import type { SoundSearchResult } from "../api/types";

type ImagePreviewProps = {
  result: SoundSearchResult | null;
  onOpenPlayer: () => void;
};

export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(function ImagePreview(
  { result, onOpenPlayer },
  ref
) {
  return (
    <div className="image-preview" ref={ref} tabIndex={-1} aria-live="polite">
      {result ? (
        <button
          className="image-preview__button"
          type="button"
          onClick={onOpenPlayer}
          aria-label={`Open player for ${result.title}`}
        >
          <figure className="image-preview__figure" key={result.id}>
            <img src={result.imageUrl} alt="" />
            <figcaption>
              <strong>{result.title}</strong>
              <span>{result.artist}</span>
            </figcaption>
          </figure>
        </button>
      ) : (
        <div className="image-preview__placeholder">
          <p>Select a result to preview its artwork.</p>
        </div>
      )}
    </div>
  );
});

import { forwardRef } from "react";
import type { SoundSearchResult } from "../api/types";

type ImagePreviewProps = {
  result: SoundSearchResult | null;
};

export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(function ImagePreview(
  { result },
  ref
) {
  return (
    <div className="image-preview" ref={ref} tabIndex={-1} aria-live="polite">
      {result ? (
        <figure className="image-preview__figure" key={result.id}>
          <img src={result.imageUrl} alt="" />
          <figcaption>
            <strong>{result.title}</strong>
            <span>{result.artist}</span>
          </figcaption>
        </figure>
      ) : (
        <div className="image-preview__placeholder">
          <p>Select a result to preview its artwork.</p>
        </div>
      )}
    </div>
  );
});

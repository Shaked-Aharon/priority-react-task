import { forwardRef } from "react";
import type { SoundSearchResult } from "../api/types";
import type { Messages } from "../i18n/messages";

type ImagePreviewProps = {
  result: SoundSearchResult | null;
  messages: Messages["preview"];
};

export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(function ImagePreview(
  { result, messages },
  ref
) {
  return (
    <div
      className="image-preview"
      ref={ref}
      tabIndex={-1}
      aria-live="polite"
      aria-label={result ? messages.selectedLabel(result.title, result.artist) : messages.emptyLabel}
    >
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
          <p>{messages.placeholder}</p>
        </div>
      )}
    </div>
  );
});

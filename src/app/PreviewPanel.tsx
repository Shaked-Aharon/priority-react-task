import { forwardRef } from "react";
import type { SoundSearchResult } from "../api/types";
import { ImagePreview } from "../components/ImagePreview";
import { PlayerEmbed } from "../components/PlayerEmbed";
import type { EffectiveTheme } from "../hooks/useEffectiveTheme";
import type { Messages } from "../i18n/messages";

type PreviewPanelProps = {
  result: SoundSearchResult | null;
  effectiveTheme: EffectiveTheme;
  messages: Messages;
};

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(function PreviewPanel(
  { result, effectiveTheme, messages },
  ref
) {
  return (
    <section className="app-region app-region--preview" aria-labelledby="preview-heading">
      <h2 id="preview-heading">{messages.app.previewHeading}</h2>
      <ImagePreview ref={ref} result={result} messages={messages.preview} />
      {result ? <PlayerEmbed result={result} effectiveTheme={effectiveTheme} messages={messages.player} /> : null}
    </section>
  );
});

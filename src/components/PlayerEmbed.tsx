import type { SoundSearchResult } from "../api/types";
import type { Messages } from "../i18n/messages";

type PlayerEmbedProps = {
  result: SoundSearchResult;
  messages: Messages["player"];
};

export function PlayerEmbed({ result, messages }: PlayerEmbedProps) {
  return (
    <div className="player-embed" aria-label={messages.label}>
      <iframe
        title={messages.title(result.title)}
        src={result.embedUrl}
        allow="autoplay"
        loading="lazy"
      />
    </div>
  );
}

import type { SoundSearchResult } from "../api/types";

type PlayerEmbedProps = {
  result: SoundSearchResult;
};

export function PlayerEmbed({ result }: PlayerEmbedProps) {
  return (
    <div className="player-embed" aria-label="Selected track player">
      <iframe
        title={`Mixcloud player for ${result.title}`}
        src={result.embedUrl}
        allow="autoplay"
        loading="lazy"
      />
    </div>
  );
}

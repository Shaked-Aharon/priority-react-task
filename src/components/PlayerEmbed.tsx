import type { SoundSearchResult } from "../api/types";
import type { EffectiveTheme } from "../hooks/useEffectiveTheme";
import type { Messages } from "../i18n/messages";

type PlayerEmbedProps = {
  result: SoundSearchResult;
  effectiveTheme: EffectiveTheme;
  messages: Messages["player"];
};

export function PlayerEmbed({ result, effectiveTheme, messages }: PlayerEmbedProps) {
  return (
    <div className="player-embed" aria-label={messages.label}>
      <iframe
        title={messages.title(result.title)}
        src={buildMixcloudEmbedUrl(result.url, effectiveTheme)}
        allow="autoplay"
        loading="lazy"
      />
    </div>
  );
}

export function buildMixcloudEmbedUrl(resultUrl: string, effectiveTheme: EffectiveTheme): string {
  const embedUrl = new URL("https://www.mixcloud.com/widget/iframe/");
  embedUrl.searchParams.set("hide_cover", "1");
  embedUrl.searchParams.set("hide_artwork", "1");
  embedUrl.searchParams.set("light", effectiveTheme === "light" ? "1" : "0");
  embedUrl.searchParams.set("feed", resultUrl);
  return embedUrl.toString();
}

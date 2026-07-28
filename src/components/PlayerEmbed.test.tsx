import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SoundSearchResult } from "../api/types";
import { messages } from "../i18n/messages";
import { buildMixcloudEmbedUrl, PlayerEmbed } from "./PlayerEmbed";

describe("PlayerEmbed", () => {
  it("builds Mixcloud embed URLs from source URLs and effective themes", () => {
    const lightUrl = new URL(buildMixcloudEmbedUrl("https://www.mixcloud.com/artist/mix/", "light"));
    const darkUrl = new URL(buildMixcloudEmbedUrl("https://www.mixcloud.com/artist/mix/", "dark"));

    expect(lightUrl.origin + lightUrl.pathname).toBe("https://www.mixcloud.com/widget/iframe/");
    expect(lightUrl.searchParams.get("hide_cover")).toBe("1");
    expect(lightUrl.searchParams.get("hide_artwork")).toBe("1");
    expect(lightUrl.searchParams.get("light")).toBe("1");
    expect(lightUrl.searchParams.get("feed")).toBe("https://www.mixcloud.com/artist/mix/");
    expect(darkUrl.searchParams.get("light")).toBe("0");
  });

  it("updates the iframe src when the effective theme changes", () => {
    const { rerender } = render(
      <PlayerEmbed result={track("theme-track")} effectiveTheme="light" messages={messages.en.player} />
    );

    const iframe = screen.getByTitle("Mixcloud player for theme-track");
    expect(new URL(iframe.getAttribute("src") ?? "").searchParams.get("light")).toBe("1");

    rerender(<PlayerEmbed result={track("theme-track")} effectiveTheme="dark" messages={messages.en.player} />);

    expect(new URL(iframe.getAttribute("src") ?? "").searchParams.get("light")).toBe("0");
  });
});

function track(id: string): SoundSearchResult {
  return {
    id,
    title: id,
    artist: "Test Artist",
    url: `https://www.mixcloud.com/test/${id}/`,
    imageUrl: `https://example.test/${id}.jpg`
  };
}

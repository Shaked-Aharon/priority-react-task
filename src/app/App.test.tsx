import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { SoundProvider } from "../api/soundProvider";
import type { SoundSearchResult } from "../api/types";
import { messages } from "../i18n/messages";
import { App } from "./App";

const searchMock = vi.hoisted(() => vi.fn<SoundProvider["search"]>());

vi.mock("../api/mixcloudProvider", () => ({
  mixcloudProvider: {
    search: searchMock
  }
}));

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  searchMock.mockReset();
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.lang = "";
  document.documentElement.dir = "";
  window.matchMedia = originalMatchMedia;
  vi.restoreAllMocks();
});

describe("App", () => {
  it("renders selected artwork and the Mixcloud player immediately after choosing a result", async () => {
    installMatchMedia();
    const result = track("midnight-mix", "Midnight Mix");
    searchMock.mockResolvedValueOnce({
      results: [result],
      nextCursor: null
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText("Search Mixcloud"), { target: { value: "ambient" } });
    fireEvent.submit(screen.getByRole("button", { name: "Search" }).closest("form")!);

    const resultButton = await screen.findByRole("button", { name: /Midnight Mix/ });
    fireEvent.click(resultButton);

    const preview = screen.getByLabelText("Selected result: Midnight Mix by Test Artist");
    expect(preview).toBeInTheDocument();
    expect(within(preview).getByText("Midnight Mix")).toBeInTheDocument();
    expect(screen.getByTitle("Mixcloud player for Midnight Mix")).toBeInTheDocument();
    expect(searchMock).toHaveBeenCalledTimes(1);
  });

  it("switches to Hebrew RTL and keeps settings labels associated with native controls", async () => {
    installMatchMedia();
    searchMock.mockResolvedValue({
      results: [],
      nextCursor: null
    });

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.change(screen.getByLabelText("Language"), { target: { value: "he" } });

    await waitFor(() => {
      expect(document.documentElement.dir).toBe("rtl");
    });

    expect(document.documentElement.lang).toBe("he");
    expect(screen.getByLabelText(messages.he.settings.languageLabel)).toHaveValue("he");
    expect(screen.getByLabelText(messages.he.settings.themeLabel)).toHaveValue("system");
  });
});

function installMatchMedia() {
  window.matchMedia = vi.fn((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  }));
}

function track(id: string, title: string): SoundSearchResult {
  return {
    id,
    title,
    artist: "Test Artist",
    url: `https://www.mixcloud.com/test/${id}/`,
    imageUrl: `https://example.test/${id}.jpg`
  };
}

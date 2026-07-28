import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useEffectiveTheme, type ThemePreference } from "./useEffectiveTheme";

const mountedHooks: { unmount: () => void }[] = [];
const originalMatchMedia = window.matchMedia;

afterEach(() => {
  mountedHooks.splice(0).forEach((hook) => hook.unmount());
  window.matchMedia = originalMatchMedia;
  vi.restoreAllMocks();
});

describe("useEffectiveTheme", () => {
  it("returns explicit light and dark preferences", () => {
    installMatchMedia(false);
    const hook = renderEffectiveTheme("light");

    expect(hook.current).toBe("light");

    act(() => {
      hook.setPreference("dark");
    });

    expect(hook.current).toBe("dark");
  });

  it("resolves system preference and updates when the system scheme changes", () => {
    const media = installMatchMedia(false);
    const hook = renderEffectiveTheme("system");

    expect(hook.current).toBe("light");

    act(() => {
      media.setMatches(true);
    });

    expect(hook.current).toBe("dark");
  });
});

function renderEffectiveTheme(initialPreference: ThemePreference) {
  let current: ReturnType<typeof useEffectiveTheme> | undefined;
  let setPreference!: (preference: ThemePreference) => void;
  const container = document.createElement("div");
  const root: Root = createRoot(container);

  function Harness({ preference }: { preference: ThemePreference }) {
    current = useEffectiveTheme(preference);
    return null;
  }

  setPreference = (preference: ThemePreference) => {
    root.render(createElement(Harness, { preference }));
  };

  act(() => {
    setPreference(initialPreference);
  });

  const hook = {
    get current() {
      if (!current) {
        throw new Error("Hook did not render.");
      }

      return current;
    },
    setPreference,
    unmount() {
      act(() => {
        root.unmount();
      });
      container.remove();
    }
  };

  mountedHooks.push(hook);
  return hook;
}

function installMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery = {
    get matches() {
      return matches;
    },
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener);
    }),
    removeEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener);
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      listeners.forEach((listener) =>
        listener({ matches: nextMatches, media: "(prefers-color-scheme: dark)" } as MediaQueryListEvent)
      );
    }
  };

  window.matchMedia = vi.fn().mockReturnValue(mediaQuery);
  return mediaQuery;
}

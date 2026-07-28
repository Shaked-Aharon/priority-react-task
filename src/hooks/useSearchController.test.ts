import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { SoundProvider } from "../api/soundProvider";
import type { SearchCursor, SearchPage, SoundSearchResult } from "../api/types";
import { useSearchController } from "./useSearchController";

const mountedHooks: { unmount: () => void }[] = [];

afterEach(() => {
  mountedHooks.splice(0).forEach((hook) => hook.unmount());
  vi.restoreAllMocks();
});

describe("useSearchController", () => {
  it("does not search for empty or too-short terms", () => {
    const search = vi.fn(async () => page());
    const hook = renderSearchController({ search });

    act(() => {
      hook.current.searchRecentTerm("  ");
    });

    expect(hook.current.status).toBe("idle");

    act(() => {
      hook.current.searchRecentTerm("ab");
    });

    expect(hook.current.status).toBe("tooShort");
    expect(search).not.toHaveBeenCalled();
  });

  it("does not let stale responses replace newer results", async () => {
    const jazzRequest = deferred<SearchPage>();
    const houseRequest = deferred<SearchPage>();
    const search = vi.fn((request: Parameters<SoundProvider["search"]>[0]) =>
      request.query === "jazz" ? jazzRequest.promise : houseRequest.promise
    );
    const hook = renderSearchController({ search });

    act(() => {
      hook.current.searchRecentTerm("jazz");
    });
    act(() => {
      hook.current.searchRecentTerm("house");
    });

    await act(async () => {
      houseRequest.resolve(page([track("house-track")]));
      await houseRequest.promise;
    });
    await act(async () => {
      jazzRequest.resolve(page([track("jazz-track")]));
      await jazzRequest.promise;
    });

    expect(hook.current.status).toBe("success");
    expect(hook.current.activeQuery).toBe("house");
    expect(hook.current.results).toEqual([track("house-track")]);
  });

  it("retries the failed request snapshot", async () => {
    const search = vi
      .fn()
      .mockRejectedValueOnce(new Error("temporary failure"))
      .mockResolvedValueOnce(page([track("retry-track")]));
    const hook = renderSearchController({ search });

    act(() => {
      hook.current.searchRecentTerm("garage");
    });

    await flushPromises();
    expect(hook.current.status).toBe("error");

    act(() => {
      hook.current.retry();
    });

    await flushPromises();
    expect(hook.current.status).toBe("success");

    expect(search).toHaveBeenCalledTimes(2);
    expect(search.mock.calls[1][0]).toMatchObject({
      query: "garage",
      cursor: null,
      pageSize: 6
    });
    expect(hook.current.results).toEqual([track("retry-track")]);
  });

  it("uses provider cursors for next and previous pages", async () => {
    const pageTwoCursor = cursor("page-2");
    const pageThreeCursor = cursor("page-3");
    const search = vi
      .fn()
      .mockResolvedValueOnce(page([track("page-1")], pageTwoCursor))
      .mockResolvedValueOnce(page([track("page-2")], pageThreeCursor))
      .mockResolvedValueOnce(page([track("page-1-again")], pageTwoCursor));
    const hook = renderSearchController({ search });

    act(() => {
      hook.current.searchRecentTerm("ambient");
    });
    await flushPromises();
    expect(hook.current.canGoNext).toBe(true);

    act(() => {
      hook.current.goNext();
    });
    await flushPromises();
    expect(hook.current.results).toEqual([track("page-2")]);

    act(() => {
      hook.current.goPrevious();
    });
    await flushPromises();
    expect(hook.current.results).toEqual([track("page-1-again")]);

    expect(search.mock.calls[1][0].cursor).toEqual(pageTwoCursor);
    expect(search.mock.calls[2][0].cursor).toBeNull();
  });

  it("emits a recent-search event for successful first-page searches", async () => {
    const search = vi.fn().mockResolvedValue(page([track("soul-track")]));
    const hook = renderSearchController({ search });

    act(() => {
      hook.current.searchRecentTerm("  soul  ");
    });

    await flushPromises();
    expect(hook.current.status).toBe("success");

    expect(hook.current.lastSuccessfulSearch).toEqual({
      id: 1,
      term: "soul"
    });
  });
});

function renderSearchController(provider: SoundProvider) {
  let current: ReturnType<typeof useSearchController> | undefined;
  const container = document.createElement("div");
  const root: Root = createRoot(container);

  function Harness() {
    current = useSearchController(provider);
    return null;
  }

  act(() => {
    root.render(createElement(Harness));
  });

  const hook = {
    get current() {
      if (!current) {
        throw new Error("Hook did not render.");
      }

      return current;
    },
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

async function flushPromises() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

function deferred<TValue>() {
  let resolve!: (value: TValue) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<TValue>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
}

function cursor(name: string): SearchCursor {
  return { url: `https://example.test/${name}` };
}

function page(results: SoundSearchResult[] = [], nextCursor: SearchCursor | null = null): SearchPage {
  return { results, nextCursor };
}

function track(id: string): SoundSearchResult {
  return {
    id,
    title: id,
    artist: "Test Artist",
    url: `https://example.test/${id}`,
    imageUrl: `https://example.test/${id}.jpg`,
    embedUrl: `https://example.test/${id}/embed`
  };
}

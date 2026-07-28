import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { SoundProvider } from "../api/soundProvider";
import type { SearchCursor, SearchPage, SoundSearchResult } from "../api/types";
import { initialPaginationState } from "../lib/pagination";
import {
  useSoundSearchRequest,
  type SoundSearchRequestSnapshot
} from "./useSoundSearchRequest";

const mountedHooks: { unmount: () => void }[] = [];

afterEach(() => {
  mountedHooks.splice(0).forEach((hook) => hook.unmount());
  vi.restoreAllMocks();
});

describe("useSoundSearchRequest", () => {
  it("does not let stale responses replace newer results", async () => {
    const jazzRequest = deferred<SearchPage>();
    const houseRequest = deferred<SearchPage>();
    const search = vi.fn((request: Parameters<SoundProvider["search"]>[0]) =>
      request.query === "jazz" ? jazzRequest.promise : houseRequest.promise
    );
    const hook = renderSoundSearchRequest({ search });

    act(() => {
      hook.current.startRequest(firstPageSnapshot("jazz"));
    });
    act(() => {
      hook.current.startRequest(firstPageSnapshot("house"));
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
    expect(hook.current.results).toEqual([track("house-track")]);
  });

  it("retries the failed request snapshot", async () => {
    const search = vi
      .fn()
      .mockRejectedValueOnce(new Error("temporary failure"))
      .mockResolvedValueOnce(page([track("retry-track")]));
    const hook = renderSoundSearchRequest({ search });

    act(() => {
      hook.current.startRequest(firstPageSnapshot("garage"));
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

  it("passes provider cursors and snapshots through pagination requests", async () => {
    const pageTwoCursor = cursor("page-2");
    const pageThreeCursor = cursor("page-3");
    const onSuccess = vi.fn();
    const search = vi
      .fn()
      .mockResolvedValueOnce(page([track("page-1")], pageTwoCursor))
      .mockResolvedValueOnce(page([track("page-2")], pageThreeCursor));
    const hook = renderSoundSearchRequest({ search }, onSuccess);

    const firstSnapshot = firstPageSnapshot("ambient");
    act(() => {
      hook.current.startRequest(firstSnapshot);
    });
    await flushPromises();

    const nextSnapshot: SoundSearchRequestSnapshot = {
      kind: "next",
      query: "ambient",
      cursor: pageTwoCursor,
      pagination: {
        currentCursor: null,
        previousCursors: [],
        nextCursor: pageTwoCursor
      }
    };
    act(() => {
      hook.current.startRequest(nextSnapshot);
    });
    await flushPromises();

    expect(search.mock.calls[1][0].cursor).toEqual(pageTwoCursor);
    expect(onSuccess).toHaveBeenNthCalledWith(1, firstSnapshot, page([track("page-1")], pageTwoCursor));
    expect(onSuccess).toHaveBeenNthCalledWith(2, nextSnapshot, page([track("page-2")], pageThreeCursor));
  });
});

function renderSoundSearchRequest(
  provider: SoundProvider,
  onSuccess: (snapshot: SoundSearchRequestSnapshot, page: SearchPage) => void = vi.fn()
) {
  let current: ReturnType<typeof useSoundSearchRequest> | undefined;
  const container = document.createElement("div");
  const root: Root = createRoot(container);

  function Harness() {
    current = useSoundSearchRequest(provider, { pageSize: 6, onSuccess });
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

function firstPageSnapshot(query: string): SoundSearchRequestSnapshot {
  return {
    kind: "first",
    query,
    cursor: null,
    pagination: initialPaginationState
  };
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

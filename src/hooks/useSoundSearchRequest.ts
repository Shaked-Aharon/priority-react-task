import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SoundProvider } from "../api/soundProvider";
import type { SearchCursor, SearchPage, SoundSearchResult } from "../api/types";
import type { PaginationState } from "../lib/pagination";

export type SearchStatus = "idle" | "tooShort" | "loading" | "success" | "empty" | "error";

export type SearchRequestKind = "first" | "next" | "previous";

export type SoundSearchRequestSnapshot = {
  kind: SearchRequestKind;
  query: string;
  cursor: SearchCursor | null;
  pagination: PaginationState;
};

type UseSoundSearchRequestOptions = {
  pageSize: number;
  onSuccess?: (snapshot: SoundSearchRequestSnapshot, page: SearchPage) => void;
};

export function useSoundSearchRequest(
  provider: SoundProvider,
  { pageSize, onSuccess }: UseSoundSearchRequestOptions
) {
  const [results, setResults] = useState<SoundSearchResult[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const failedRequestRef = useRef<SoundSearchRequestSnapshot | null>(null);

  const resetRequestState = useCallback((nextStatus: SearchStatus) => {
    abortControllerRef.current?.abort();
    requestIdRef.current += 1;
    failedRequestRef.current = null;
    setResults([]);
    setStatus(nextStatus);
    setErrorMessage("");
  }, []);

  const startRequest = useCallback(
    async (snapshot: SoundSearchRequestSnapshot) => {
      abortControllerRef.current?.abort();

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setStatus("loading");
      setErrorMessage("");

      try {
        const page = await provider.search({
          query: snapshot.query,
          cursor: snapshot.cursor,
          pageSize,
          signal: abortController.signal
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        setResults(page.results);
        setStatus(page.results.length > 0 ? "success" : "empty");
        failedRequestRef.current = null;
        onSuccess?.(snapshot, page);
      } catch (error) {
        if (abortController.signal.aborted || requestId !== requestIdRef.current) {
          return;
        }

        failedRequestRef.current = snapshot;
        setResults([]);
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "");
      }
    },
    [onSuccess, pageSize, provider]
  );

  const retry = useCallback(() => {
    const failedRequest = failedRequestRef.current;

    if (!failedRequest || status === "loading") {
      return;
    }

    void startRequest(failedRequest);
  }, [startRequest, status]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const isLoading = status === "loading";

  return useMemo(
    () => ({
      results,
      status,
      errorMessage,
      isLoading,
      resetRequestState,
      startRequest,
      retry
    }),
    [errorMessage, isLoading, resetRequestState, results, retry, startRequest, status]
  );
}

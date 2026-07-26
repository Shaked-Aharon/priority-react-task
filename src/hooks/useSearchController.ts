import { useCallback, useEffect, useRef, useState } from "react";
import type { SoundProvider } from "../api/soundProvider";
import type { SearchCursor, SoundSearchResult } from "../api/types";
import {
  canGoNext,
  canGoPrevious,
  initialPaginationState,
  moveToNextPage,
  moveToPreviousPage,
  startPagination,
  type PaginationState
} from "../lib/pagination";
import { cleanSearchTerm } from "../lib/recentSearches";
import { useDebouncedValue } from "./useDebouncedValue";

const SEARCH_DEBOUNCE_MS = 300;
const PAGE_SIZE = 6;

export type SearchStatus = "idle" | "loading" | "success" | "empty" | "error";

export type SuccessfulSearchEvent = {
  id: number;
  term: string;
};

type SearchRequestKind = "first" | "next" | "previous";

type RequestSnapshot = {
  kind: SearchRequestKind;
  query: string;
  cursor: SearchCursor | null;
  pagination: PaginationState;
};

export function useSearchController(provider: SoundProvider) {
  const [inputQuery, setInputQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [results, setResults] = useState<SoundSearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SoundSearchResult | null>(null);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [pagination, setPagination] = useState<PaginationState>(initialPaginationState);
  const [lastSuccessfulSearch, setLastSuccessfulSearch] = useState<SuccessfulSearchEvent | null>(null);

  const debouncedQuery = useDebouncedValue(inputQuery, SEARCH_DEBOUNCE_MS);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const failedRequestRef = useRef<RequestSnapshot | null>(null);

  const startRequest = useCallback(
    async (snapshot: RequestSnapshot) => {
      abortControllerRef.current?.abort();

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setStatus("loading");
      setErrorMessage("");
      setActiveQuery(snapshot.query);

      try {
        const page = await provider.search({
          query: snapshot.query,
          cursor: snapshot.cursor,
          pageSize: PAGE_SIZE,
          signal: abortController.signal
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        setResults(page.results);
        setSelectedResult(null);
        setStatus(page.results.length > 0 ? "success" : "empty");
        setPagination((currentPagination) => {
          if (snapshot.kind === "first") {
            return startPagination(page.nextCursor);
          }

          if (snapshot.kind === "next") {
            return moveToNextPage(snapshot.pagination, page.nextCursor);
          }

          return moveToPreviousPage(snapshot.pagination, page.nextCursor);
        });
        failedRequestRef.current = null;

        if (snapshot.kind === "first") {
          setLastSuccessfulSearch((currentEvent) => ({
            id: (currentEvent?.id ?? 0) + 1,
            term: snapshot.query
          }));
        }
      } catch (error) {
        if (abortController.signal.aborted || requestId !== requestIdRef.current) {
          return;
        }

        failedRequestRef.current = snapshot;
        setResults([]);
        setSelectedResult(null);
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Search failed. Please try again.");
      }
    },
    [provider]
  );

  const searchFirstPage = useCallback(
    (term: string) => {
      const query = cleanSearchTerm(term);

      if (!query) {
        abortControllerRef.current?.abort();
        requestIdRef.current += 1;
        setActiveQuery("");
        setResults([]);
        setSelectedResult(null);
        setStatus("idle");
        setErrorMessage("");
        setPagination(initialPaginationState);
        return;
      }

      void startRequest({
        kind: "first",
        query,
        cursor: null,
        pagination: initialPaginationState
      });
    },
    [startRequest]
  );

  useEffect(() => {
    searchFirstPage(debouncedQuery);
  }, [debouncedQuery, searchFirstPage]);

  const submitSearch = useCallback(() => {
    searchFirstPage(inputQuery);
  }, [inputQuery, searchFirstPage]);

  const searchRecentTerm = useCallback(
    (term: string) => {
      setInputQuery(term);
      searchFirstPage(term);
    },
    [searchFirstPage]
  );

  const goNext = useCallback(() => {
    if (status === "loading" || !canGoNext(pagination)) {
      return;
    }

    void startRequest({
      kind: "next",
      query: activeQuery,
      cursor: pagination.nextCursor,
      pagination
    });
  }, [activeQuery, pagination, startRequest, status]);

  const goPrevious = useCallback(() => {
    if (status === "loading" || !canGoPrevious(pagination)) {
      return;
    }

    const previousCursor = pagination.previousCursors[pagination.previousCursors.length - 1] ?? null;

    void startRequest({
      kind: "previous",
      query: activeQuery,
      cursor: previousCursor,
      pagination
    });
  }, [activeQuery, pagination, startRequest, status]);

  const retry = useCallback(() => {
    const failedRequest = failedRequestRef.current;

    if (!failedRequest || status === "loading") {
      return;
    }

    void startRequest(failedRequest);
  }, [startRequest, status]);

  const selectResult = useCallback((result: SoundSearchResult) => {
    setSelectedResult(result);
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    inputQuery,
    activeQuery,
    results,
    selectedResult,
    status,
    errorMessage,
    pagination,
    lastSuccessfulSearch,
    isLoading: status === "loading",
    canGoPrevious: status !== "loading" && canGoPrevious(pagination),
    canGoNext: status !== "loading" && canGoNext(pagination),
    setInputQuery,
    submitSearch,
    searchRecentTerm,
    goNext,
    goPrevious,
    retry,
    selectResult
  };
}

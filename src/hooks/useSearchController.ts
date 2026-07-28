import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SoundProvider } from "../api/soundProvider";
import type { SearchPage, SoundSearchResult } from "../api/types";
import {
  canGoNext,
  canGoPrevious,
  initialPaginationState,
  moveToNextPage,
  moveToPreviousPage,
  startPagination,
  type PaginationState
} from "../lib/pagination";
import { cleanSearchTerm, isValidSearchTerm } from "../lib/recentSearches";
import { useDebouncedValue } from "./useDebouncedValue";
import {
  useSoundSearchRequest,
  type SearchStatus,
  type SoundSearchRequestSnapshot
} from "./useSoundSearchRequest";

export type { SearchStatus } from "./useSoundSearchRequest";

const SEARCH_DEBOUNCE_MS = 500;
const PAGE_SIZE = 6;

export type SuccessfulSearchEvent = {
  id: number;
  term: string;
};

function getPaginationAfterPage(
  snapshot: SoundSearchRequestSnapshot,
  nextCursor: SearchPage["nextCursor"]
): PaginationState {
  if (snapshot.kind === "first") {
    return startPagination(nextCursor);
  }

  if (snapshot.kind === "next") {
    return moveToNextPage(snapshot.pagination, nextCursor);
  }

  return moveToPreviousPage(snapshot.pagination, nextCursor);
}

export function useSearchController(provider: SoundProvider) {
  const [inputQuery, setInputQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState<SoundSearchResult | null>(null);
  const [pagination, setPagination] = useState<PaginationState>(initialPaginationState);
  const [lastSuccessfulSearch, setLastSuccessfulSearch] = useState<SuccessfulSearchEvent | null>(null);

  const debouncedQuery = useDebouncedValue(inputQuery, SEARCH_DEBOUNCE_MS);
  const dedupedDebouncedFirstQueryRef = useRef<string | null>(null);

  const handleRequestSuccess = useCallback((snapshot: SoundSearchRequestSnapshot, page: SearchPage) => {
    setSelectedResult(null);
    setPagination(getPaginationAfterPage(snapshot, page.nextCursor));

    if (snapshot.kind === "first") {
      setLastSuccessfulSearch((currentEvent) => ({
        id: (currentEvent?.id ?? 0) + 1,
        term: snapshot.query
      }));
    }
  }, []);

  const {
    results,
    status,
    errorMessage,
    isLoading,
    resetRequestState: resetSoundSearchRequestState,
    startRequest,
    retry: retryFailedRequest
  } = useSoundSearchRequest(provider, {
    pageSize: PAGE_SIZE,
    onSuccess: handleRequestSuccess
  });

  const resetRequestState = useCallback(
    (nextStatus: SearchStatus, nextActiveQuery = "") => {
      resetSoundSearchRequestState(nextStatus);
      dedupedDebouncedFirstQueryRef.current = null;
      setActiveQuery(nextActiveQuery);
      setSelectedResult(null);
      setPagination(initialPaginationState);
    },
    [resetSoundSearchRequestState]
  );

  const startFirstPageRequest = useCallback(
    (query: string, source: "debounce" | "immediate") => {
      if (source === "debounce" && dedupedDebouncedFirstQueryRef.current === query) {
        dedupedDebouncedFirstQueryRef.current = null;
        return;
      }

      if (source === "immediate") {
        dedupedDebouncedFirstQueryRef.current = query;
      }

      setActiveQuery(query);
      setSelectedResult(null);
      setPagination(initialPaginationState);
      void startRequest({
        kind: "first",
        query,
        cursor: null,
        pagination: initialPaginationState
      });
    },
    [startRequest]
  );

  const searchFirstPage = useCallback(
    (term: string, source: "debounce" | "immediate" = "immediate") => {
      const query = cleanSearchTerm(term);

      if (!query) {
        resetRequestState("idle");
        return;
      }

      if (!isValidSearchTerm(query)) {
        resetRequestState("tooShort", query);
        return;
      }

      startFirstPageRequest(query, source);
    },
    [resetRequestState, startFirstPageRequest]
  );

  useEffect(() => {
    searchFirstPage(debouncedQuery, "debounce");
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
    if (status === "loading") {
      return;
    }

    retryFailedRequest();
  }, [retryFailedRequest, status]);

  const selectResult = useCallback((result: SoundSearchResult) => {
    setSelectedResult(result);
  }, []);

  return useMemo(
    () => ({
      inputQuery,
      activeQuery,
      results,
      selectedResult,
      status,
      errorMessage,
      pagination,
      lastSuccessfulSearch,
      isLoading,
      canGoPrevious: !isLoading && canGoPrevious(pagination),
      canGoNext: !isLoading && canGoNext(pagination),
      setInputQuery,
      submitSearch,
      searchRecentTerm,
      goNext,
      goPrevious,
      retry,
      selectResult
    }),
    [
      activeQuery,
      errorMessage,
      goNext,
      goPrevious,
      inputQuery,
      isLoading,
      lastSuccessfulSearch,
      pagination,
      results,
      retry,
      searchRecentTerm,
      selectedResult,
      selectResult,
      status,
      submitSearch
    ]
  );
}

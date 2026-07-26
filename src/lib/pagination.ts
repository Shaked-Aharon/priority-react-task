import type { SearchCursor } from "../api/types";

export type PaginationState = {
  currentCursor: SearchCursor | null;
  previousCursors: (SearchCursor | null)[];
  nextCursor: SearchCursor | null;
};

export const initialPaginationState: PaginationState = {
  currentCursor: null,
  previousCursors: [],
  nextCursor: null
};

export function startPagination(nextCursor: SearchCursor | null): PaginationState {
  return {
    currentCursor: null,
    previousCursors: [],
    nextCursor
  };
}

export function moveToNextPage(
  state: PaginationState,
  nextCursorFromPage: SearchCursor | null
): PaginationState {
  if (!state.nextCursor) {
    return state;
  }

  return {
    currentCursor: state.nextCursor,
    previousCursors: [...state.previousCursors, state.currentCursor],
    nextCursor: nextCursorFromPage
  };
}

export function moveToPreviousPage(
  state: PaginationState,
  nextCursorFromPage: SearchCursor | null
): PaginationState {
  if (!canGoPrevious(state)) {
    return state;
  }

  const previousCursors = state.previousCursors.slice(0, -1);
  const previousCursor = state.previousCursors[state.previousCursors.length - 1] ?? null;

  return {
    currentCursor: previousCursor,
    previousCursors,
    nextCursor: nextCursorFromPage
  };
}

export function canGoPrevious(state: PaginationState): boolean {
  return state.previousCursors.length > 0;
}

export function canGoNext(state: PaginationState): boolean {
  return state.nextCursor !== null;
}

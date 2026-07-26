import { describe, expect, it } from "vitest";
import {
  canGoNext,
  canGoPrevious,
  initialPaginationState,
  moveToNextPage,
  moveToPreviousPage,
  startPagination
} from "./pagination";
import type { SearchCursor } from "../api/types";

const cursor = (name: string): SearchCursor => ({ url: `https://example.test/${name}` });

describe("pagination helpers", () => {
  it("starts a new search on the first page", () => {
    const state = startPagination(cursor("page-2"));

    expect(state.currentCursor).toBeNull();
    expect(state.previousCursors).toEqual([]);
    expect(canGoPrevious(state)).toBe(false);
    expect(canGoNext(state)).toBe(true);
  });

  it("moves to the next page with the current next cursor", () => {
    const state = moveToNextPage(startPagination(cursor("page-2")), cursor("page-3"));

    expect(state.currentCursor).toEqual(cursor("page-2"));
    expect(state.previousCursors).toEqual([null]);
    expect(state.nextCursor).toEqual(cursor("page-3"));
  });

  it("returns to the previous page using the cursor stack", () => {
    const pageTwo = moveToNextPage(startPagination(cursor("page-2")), cursor("page-3"));
    const firstPage = moveToPreviousPage(pageTwo, cursor("page-2"));

    expect(firstPage.currentCursor).toBeNull();
    expect(firstPage.previousCursors).toEqual([]);
    expect(firstPage.nextCursor).toEqual(cursor("page-2"));
  });

  it("does not move next when no next cursor exists", () => {
    expect(moveToNextPage(initialPaginationState, cursor("ignored"))).toBe(initialPaginationState);
  });

  it("does not move previous when the stack is empty", () => {
    const state = startPagination(cursor("page-2"));

    expect(moveToPreviousPage(state, cursor("ignored"))).toBe(state);
  });

  it("keeps repeated rapid transitions consistent", () => {
    const pageOne = startPagination(cursor("page-2"));
    const pageTwo = moveToNextPage(pageOne, cursor("page-3"));
    const pageThree = moveToNextPage(pageTwo, null);
    const backToTwo = moveToPreviousPage(pageThree, cursor("page-3"));
    const backToOne = moveToPreviousPage(backToTwo, cursor("page-2"));

    expect(pageThree.currentCursor).toEqual(cursor("page-3"));
    expect(canGoNext(pageThree)).toBe(false);
    expect(backToTwo.currentCursor).toEqual(cursor("page-2"));
    expect(backToOne.currentCursor).toBeNull();
    expect(canGoPrevious(backToOne)).toBe(false);
  });
});

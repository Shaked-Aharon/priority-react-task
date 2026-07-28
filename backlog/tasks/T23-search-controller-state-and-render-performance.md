# T23 - Search Controller State And Render Performance

## Goal

Review the search controller for state shape, render stability, and test coverage after the feature work is complete.

## Files To Create Or Edit

- `src/app/App.tsx`
- `src/hooks/useSearchController.ts`
- `src/hooks/useSearchController.test.ts`
- `src/components/SearchResults.tsx`
- `src/components/ResultListItem.tsx`
- `src/components/ResultTile.tsx`
- `src/components/PaginationControls.tsx`
- `src/components/RecentSearches.tsx`

## Steps

1. Review the object returned from `useSearchController` and decide whether wrapping it in `useMemo` improves render stability.
2. Avoid depending on the whole `search` object in `App.tsx`; destructure stable methods and values where that improves readability.
3. Review whether related search state should remain as separate `useState` calls or move to a `useReducer`.
4. Only introduce `useReducer` if it makes search events clearer, such as reset, loading, success, empty, error, retry, page navigation, and selection.
5. Extract shared search validation if it is still duplicated between the controller and UI.
6. Consider `React.memo` for presentational components only after props and callbacks are stable.
7. Add hook-level tests for async search behavior:
   - empty or too-short terms do not search
   - stale responses do not replace newer results
   - retry repeats the failed request
   - pagination sends the correct cursor
   - successful first search emits the recent-search event
8. Keep public behavior unchanged unless a test exposes a bug.

## Done Checks

- Search behavior matches the existing user experience.
- `App.tsx` does not rely on unstable whole-object dependencies unnecessarily.
- Search state ownership is easier to understand.
- Render optimization choices are justified and not speculative.
- Hook-level tests cover the risky async paths.
- Build and tests pass.

## Best Practice Notes

- Do not add `React.memo`, `useMemo`, or `useCallback` everywhere by default.
- Prefer simpler state until a reducer clearly improves the mental model.
- Measure or reason from actual prop stability before optimizing renders.

## Suggested Commit

`refactor: review search state and render performance`

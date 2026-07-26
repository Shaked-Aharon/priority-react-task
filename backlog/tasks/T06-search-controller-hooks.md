# T06 - Search Controller Hooks

## Goal

Create the hook that connects query input, debounce, API calls, cancellation, request states, and pagination.

## Files To Create Or Edit

- `src/hooks/useDebouncedValue.ts`
- `src/hooks/useSearchController.ts`

## Steps

1. Implement `useDebouncedValue(value, delayMs)`.
2. In `useSearchController`, keep state for:
   - input query
   - active query
   - results
   - selected result
   - loading state
   - error state
   - pagination state
3. When the debounced query changes, start a new first-page search.
4. Before each new request, abort the previous request.
5. Use a request id or similar guard so stale responses cannot update state.
6. Add `searchRecentTerm(term)` for recent-search clicks.
7. Add `goNext`, `goPrevious`, `retry`, and `selectResult` actions.
8. Disable `goNext` and `goPrevious` while a request is pending.

## Done Checks

- Fast typing does not show old results.
- Rapid Next/Previous clicks cannot corrupt the visible page.
- Retry uses the latest failed request.
- Hook users do not need to know about `AbortController`.

## Best Practice Notes

- Keep the hook as the only place that coordinates async search state.
- Use the provider interface from `src/api/soundProvider.ts`, not Mixcloud directly.

## Suggested Commit

`feat: add async search controller`

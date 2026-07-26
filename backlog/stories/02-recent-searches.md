# Story 02 - Persistent Recent Searches

## User Story

As a returning user, I want to see and reuse my latest searches so I can quickly repeat previous searches.

## Acceptance Criteria

- Recent searches show the latest 5 terms.
- Searches persist across browser visits.
- Duplicate terms are not shown twice.
- Re-searching an existing term moves it to the top.
- Clicking a recent search starts a new search for that term.
- Storage failures do not break searching.

## Implementation Notes

- Put pure list operations in `src/lib/recentSearches.ts`.
- Put localStorage access behind `src/lib/storage.ts`.
- Expose UI behavior through `src/hooks/useRecentSearches.ts`.
- Render the list with `src/components/RecentSearches.tsx`.

## Related Tasks

- `backlog/tasks/T03-recent-searches-logic.md`
- `backlog/tasks/T04-storage-and-preferences.md`
- `backlog/tasks/T09-recent-searches-ui.md`

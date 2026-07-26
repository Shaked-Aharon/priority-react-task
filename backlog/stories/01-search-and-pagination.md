# Story 01 - Search And Cursor Pagination

## User Story

As a user, I want to search for sound tracks and move between pages of results so I can browse matching audio without the page becoming stale or confusing.

## Acceptance Criteria

- A search box accepts a term and triggers a search.
- Search input is debounced by about 300ms.
- The API request fetches 6 results at a time.
- Results display below the search box.
- Next loads the next 6 results using the API paging cursor.
- Previous returns to the prior result page without relying on a naive offset.
- Next and Previous are disabled when unavailable.
- Loading, empty, and error states are visible and accessible.
- Retry repeats the latest failed request safely.
- Stale or aborted responses never overwrite the current visible results.

## Implementation Notes

- Put the provider contract in `src/api/soundProvider.ts`.
- Put Mixcloud-specific URL, response mapping, and cursor extraction in `src/api/mixcloudProvider.ts`.
- Keep request orchestration in `src/hooks/useSearchController.ts`.
- Keep cursor stack helpers in `src/lib/pagination.ts`.
- Keep result rendering in `src/components/SearchResults.tsx` and child components.

## Related Tasks

- `backlog/tasks/T01-project-foundation.md`
- `backlog/tasks/T02-sound-api-provider.md`
- `backlog/tasks/T05-cursor-pagination-logic.md`
- `backlog/tasks/T06-search-controller-hooks.md`
- `backlog/tasks/T07-search-ui-and-states.md`
- `backlog/tasks/T08-pagination-controls.md`

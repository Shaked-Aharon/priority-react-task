# Front End Exam Backlog

This backlog is based on `docs/Front_End_Developer_Exam Shmuel.pdf`.

The backlog is written for a junior developer. Follow the task numbers in order. Each task is small, has exact files to create or edit, and should become one focused commit.

## Recommended Stack

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- Mixcloud API as the first Sound API provider

## Implementation Order

1. `T01` - Create the project foundation.
2. `T02` - Define typed API/domain models and the Mixcloud provider.
3. `T03` - Build and test recent-search list logic.
4. `T04` - Build safe storage and persistent preference helpers.
5. `T05` - Build and test cursor pagination logic.
6. `T06` - Build debounce and async search controller hooks.
7. `T07` - Build search input, results, and request state UI.
8. `T08` - Build pagination controls.
9. `T09` - Build recent searches UI.
10. `T10` - Build result selection and image preview.
11. `T11` - Build track embed playback.
12. `T12` - Build list/tile view mode with persistence.
13. `T13` - Apply responsive visual design.
14. `T14` - Complete accessibility pass.
15. `T15` - Write README and prepare repository handoff.

## Stories

- `backlog/stories/01-search-and-pagination.md`
- `backlog/stories/02-recent-searches.md`
- `backlog/stories/03-selection-animation-and-playback.md`
- `backlog/stories/04-view-mode-quality-and-delivery.md`

## Proposed Source Structure

```text
src/
  app/
    App.tsx
    App.css
  api/
    types.ts
    soundProvider.ts
    mixcloudProvider.ts
  components/
    ImagePreview.tsx
    PaginationControls.tsx
    PlayerEmbed.tsx
    RecentSearches.tsx
    ResultListItem.tsx
    ResultTile.tsx
    SearchBar.tsx
    SearchResults.tsx
    StateMessage.tsx
    ViewModeControls.tsx
  hooks/
    useDebouncedValue.ts
    usePersistentPreference.ts
    useRecentSearches.ts
    useSearchController.ts
  lib/
    animation.ts
    pagination.ts
    recentSearches.ts
    storage.ts
  test/
    setup.ts
```

## Important Terms

- Provider: the API adapter. Components should not know if data comes from Mixcloud or another Sound API.
- Cursor: an API value that points to the next page of results. Use it instead of page numbers or offsets.
- Stale response: an old API response that finishes after a newer request. It must be ignored.
- Presentational component: a component that receives data and callbacks through props and does not fetch data itself.
- Pure function: a function that returns the same output for the same input and does not read or write external state.

## Definition Of Done

- Search fetches only 6 results per page.
- Next and Previous use provider cursors.
- Search input is debounced by about 300ms.
- In-flight requests are cancelled with `AbortController`.
- Stale responses never overwrite current results.
- Recent searches persist across visits, dedupe terms, and keep the last 5.
- Clicking a recent search runs that search.
- Clicking a result moves it to the image area and fades in the image.
- Clicking the image embeds the track player.
- List/tile mode works and persists across visits.
- Loading, empty, error, retry, disabled, and selected states are visible.
- Core logic has unit tests.
- TypeScript has no `any`.
- README explains setup, architecture, trade-offs, and commands.

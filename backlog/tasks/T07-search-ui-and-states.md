# T07 - Search UI And States

## Goal

Render the search box, results area, and loading/empty/error states.

## Files To Create Or Edit

- `src/components/SearchBar.tsx`
- `src/components/SearchResults.tsx`
- `src/components/ResultListItem.tsx`
- `src/components/StateMessage.tsx`
- `src/app/App.tsx`

## Steps

1. Build `SearchBar` with a text input and Search button.
2. Wire the input value and change handler from `useSearchController`.
3. Build `StateMessage` for loading, empty, and error states.
4. Build `ResultListItem` as a presentational component.
5. Build `SearchResults` to render the current results.
6. Add a Retry button to the error state.
7. Connect result click to `selectResult`.

## Done Checks

- Searching from the input renders results.
- Loading state is visible while waiting.
- Empty state appears when there are no results.
- Error state includes Retry.
- UI components do not fetch data directly.

## Best Practice Notes

- Use a real `<form>` for the search controls.
- Keep each component small and prop-driven.

## Suggested Commit

`feat: render search results and states`

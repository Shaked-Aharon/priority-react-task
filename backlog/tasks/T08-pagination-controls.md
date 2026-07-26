# T08 - Pagination Controls

## Goal

Add Previous and Next buttons and connect them to cursor pagination.

## Files To Create Or Edit

- `src/components/PaginationControls.tsx`
- `src/app/App.tsx`

## Steps

1. Create `PaginationControls`.
2. Add Previous and Next buttons.
3. Pass `canGoPrevious`, `canGoNext`, `isLoading`, `goPrevious`, and `goNext` as props.
4. Disable Previous when no previous cursor exists.
5. Disable Next when no next cursor exists.
6. Disable both controls while loading.
7. Place controls below the search results.

## Done Checks

- Next loads the next 6 results.
- Previous returns to the previous result page.
- Disabled button states match availability.
- Rapid clicks while loading do not start overlapping page transitions.

## Best Practice Notes

- Keep this component presentational.
- Use native disabled buttons instead of custom disabled styling only.

## Suggested Commit

`feat: add pagination controls`

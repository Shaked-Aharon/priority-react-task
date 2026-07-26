# T03 - Recent Searches Logic

## Goal

Build and test the pure logic for the recent-search list before adding browser storage.

## Files To Create Or Edit

- `src/lib/recentSearches.ts`
- `src/lib/recentSearches.test.ts`

## Steps

1. Create a constant for the maximum number of searches: `5`.
2. Add a function that trims a search term.
3. Add a function that compares terms case-insensitively.
4. Add an `addRecentSearch` function.
5. Make `addRecentSearch` remove duplicates.
6. Make re-searching an existing term move it to the top.
7. Make the list keep only the latest 5 terms.
8. Add unit tests for empty input, duplicate terms, ordering, and trimming to 5 items.

## Done Checks

- Tests pass for recent-search logic.
- The functions do not read from or write to `localStorage`.
- Empty or whitespace-only terms are ignored.

## Best Practice Notes

- Keep this file pure. That makes it easy to test and reuse.
- Preserve readable display text, but dedupe in a normalized way.

## Suggested Commit

`test: add recent search logic`

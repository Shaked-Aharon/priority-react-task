# T16 - Minimum Search Length

## Goal

Prevent unnecessary API calls for very short search terms and give the user clear feedback.

## Files To Create Or Edit

- `src/hooks/useSearchController.ts`
- `src/components/SearchBar.tsx`
- `src/components/SearchResults.tsx`
- `src/lib/recentSearches.ts`
- `src/lib/recentSearches.test.ts`
- `README.md`

## Steps

1. Add a shared constant for the minimum search length, probably 3 characters.
2. Trim the query before checking its length.
3. Keep the existing empty-query behavior as the idle state.
4. For queries shorter than the minimum length, do not call the provider.
5. Show a helpful state message explaining the minimum length.
6. Disable the Search button until the trimmed value reaches the minimum length.
7. Make sure recent searches only save valid submitted searches.
8. Add or update tests for query cleaning and minimum-length validation.
9. Update README notes if it describes search behavior.

## Done Checks

- Typing 1 or 2 characters does not send a Mixcloud request.
- Empty input still resets the app to idle.
- Valid searches still debounce, load, paginate, and save to recent searches.
- Tests cover empty, too-short, and valid terms.

## Best Practice Notes

- Keep validation logic close to pure helpers where possible.
- Avoid duplicating the number `3` across components.

## Suggested Commit

`feat: require minimum search length`

# T09 - Recent Searches UI

## Goal

Show the last 5 searches and let the user run them again.

## Files To Create Or Edit

- `src/components/RecentSearches.tsx`
- `src/app/App.tsx`

## Steps

1. Render a Recent Searches region.
2. Show up to 5 terms from `useRecentSearches`.
3. Render each term as a button.
4. On click, call `searchRecentTerm(term)`.
5. After any successful new search, add the term to recent searches.
6. Show a quiet empty state when there are no recent searches yet.

## Done Checks

- Recent searches survive page refresh.
- Duplicate searches do not duplicate the item.
- Re-searching a term moves it to the top.
- Clicking a recent search starts a new search.

## Best Practice Notes

- Use buttons because each item performs an action.
- Do not store result data in recent searches, only terms.

## Suggested Commit

`feat: render recent searches`

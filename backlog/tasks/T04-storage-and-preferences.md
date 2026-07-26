# T04 - Storage And Persistent Preferences

## Goal

Create safe helpers for browser persistence.

## Files To Create Or Edit

- `src/lib/storage.ts`
- `src/hooks/useRecentSearches.ts`
- `src/hooks/usePersistentPreference.ts`
- `src/lib/storage.test.ts`

## Steps

1. In `storage.ts`, create small `loadJson` and `saveJson` helpers.
2. Wrap all `localStorage` calls in `try/catch`.
3. Return a fallback value if storage is unavailable or JSON is invalid.
4. In `useRecentSearches`, load the stored recent searches.
5. Use `addRecentSearch` from `src/lib/recentSearches.ts` when adding a term.
6. Save the updated list after each valid search.
7. In `usePersistentPreference`, support simple string preferences like view mode.
8. Add tests for invalid JSON and storage failure fallback.

## Done Checks

- Storage errors do not crash the app.
- Recent searches can be loaded and saved through the hook.
- Preference values can be loaded and saved through the hook.

## Best Practice Notes

- Components should use hooks, not call `localStorage` directly.
- Keep storage keys in one place so they are easy to change later.

## Suggested Commit

`feat: add safe persistent storage`

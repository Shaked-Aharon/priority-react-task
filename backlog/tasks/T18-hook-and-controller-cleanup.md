# T18 - Hook And Controller Cleanup

## Goal

Review the search controller and app-level hooks so the files are clearer, easier to read, and organized around focused responsibilities. Reduce unnecessary `useEffect` and `useState` usage where state can be derived safely.

## Files To Create Or Edit

- `src/app/App.tsx`
- `src/hooks/useSearchController.ts`
- `src/hooks/useRecentSearches.ts`
- `src/hooks/usePersistentPreference.ts`
- `src/hooks/useDebouncedValue.ts`

## Steps

1. Review every `useEffect` and confirm it represents synchronization with an external system or lifecycle.
2. Remove or rewrite effects that only mirror one piece of state into another when a derived value would be clearer.
3. Review every `useState` and confirm it represents real independent state, not a value that can be calculated from existing state.
4. Keep the debounced search effect if automatic search while typing remains a product requirement.
5. Keep request cleanup inside the search controller.
6. Consider whether player-open state should be derived or remain local state.
7. Check returned hook methods are stable where they are passed to child components.
8. Split responsibilities only when it makes the code easier to follow, for example separating query validation, request lifecycle, and pagination helpers.
9. If a context provider is introduced in a later task, wrap provider actions in `useCallback` and the provider value in `useMemo`.
10. Avoid changing behavior while doing this cleanup.

## Done Checks

- The search flow behaves the same before and after cleanup.
- Files have clearer ownership and fewer moving parts.
- Unnecessary derived state has been removed or justified.
- Unnecessary effects have been removed or justified.
- Hook dependencies are correct and lint-friendly.
- No new context is introduced only for cleanup.
- No callback is memoized without a practical reason.

## Best Practice Notes

- Fewer hooks is not automatically better; clearer ownership is the real goal.
- Prefer small pure helpers before adding more React state.

## Suggested Commit

`refactor: clarify search controller hooks`

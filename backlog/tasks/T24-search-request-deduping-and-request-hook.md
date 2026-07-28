# T24 - Search Request Deduping And Request Hook

## Goal

Stop duplicate search requests and remove the flicker caused by submit/recent-search requests racing with the debounced automatic search. Move the network request lifecycle into a focused `useSoundSearchRequest` hook while keeping product/search intent in `useSearchController`.

## Files To Create Or Edit

- `src/hooks/useSearchController.ts`
- `src/hooks/useSoundSearchRequest.ts`
- `src/hooks/useSoundSearchRequest.test.ts`
- `src/hooks/useSearchController.test.ts`
- `src/api/soundProvider.ts` if the hook needs exported request/page types
- `README.md`

## Steps

1. Reproduce the current duplicate request case in a test:
   - type a valid term
   - submit before the debounce delay finishes
   - verify the provider is called only once for that cleaned query
2. Also cover recent-search behavior:
   - clicking a recent search should run immediately
   - the later debounced input update must not repeat the same request
3. Create a focused hook named `useSoundSearchRequest`.
4. Keep the hook search-specific, not a generic fetch abstraction.
5. The hook should own request lifecycle details:
   - `isLoading`
   - `errorMessage`
   - aborting the previous request
   - request id / stale response protection
   - latest failed request snapshot for retry
   - optional in-memory cache for previously fetched pages
6. The hook should work with the existing `SoundProvider` interface.
7. Keep `useSearchController` responsible for product intent:
   - input query
   - cleaning and validation
   - active query
   - pagination intent: first, next, previous
   - selected result
   - successful first-page recent-search event
8. Add deduping around cleaned submitted queries so a query already started by submit or recent-search is not immediately started again by the debounced effect.
9. If cache is added, keep it conservative:
   - in-memory only
   - no `localStorage`
   - key by cleaned query, cursor URL or first-page marker, and page size
   - cache `SearchPage`, not UI state
   - do not use cache as the main fix for double requests
10. Preserve existing visible states:
    - empty input remains idle
    - too-short input remains the minimum-length message
    - valid search still shows loading skeletons
    - retry still repeats the failed request
    - pagination still uses provider cursors
11. Update README architecture notes to mention `useSoundSearchRequest`.

## Done Checks

- Submitting a query does not cause a second identical request when debounce catches up.
- Clicking a recent search does not cause a second identical request when debounce catches up.
- Debounced typing still searches automatically after 500ms.
- Empty and too-short terms never call the provider.
- Stale responses still cannot replace newer results.
- Retry still repeats the failed request snapshot.
- Pagination still sends the correct cursor.
- Optional cache, if implemented, does not hide loading behavior for genuinely new searches.
- Hook-level tests cover submit/debounce dedupe, recent/debounce dedupe, stale responses, retry, pagination, and recent-search event emission.
- Build and tests pass.

## Best Practice Notes

- Do not create a generic `useFetch` until the app has at least a second real fetch flow.
- Name the hook around the domain: `useSoundSearchRequest`.
- Keep cache invalidation simple; Mixcloud freshness is less important than predictable UI behavior here.
- Avoid clearing existing results during a duplicate no-op request, because that is what causes visible flicker.

## Suggested Commit

`fix: dedupe sound search requests`

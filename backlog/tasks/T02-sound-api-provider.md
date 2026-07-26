# T02 - Typed Sound API Provider

## Goal

Create a typed API layer so Mixcloud can later be replaced without changing UI components.

## Files To Create Or Edit

- `src/api/types.ts`
- `src/api/soundProvider.ts`
- `src/api/mixcloudProvider.ts`

## Steps

1. In `types.ts`, define app-owned types:
   - `SoundSearchResult`
   - `SearchCursor`
   - `SearchPage`
   - `SearchRequest`
2. In `soundProvider.ts`, define a `SoundProvider` interface with a `search` method.
3. Make `search` accept query text, optional cursor, page size, and `AbortSignal`.
4. In `mixcloudProvider.ts`, call `https://api.mixcloud.com/search/`.
5. Use `URL` and `URLSearchParams` to build the request.
6. Request `type=cloudcast` and limit each request to 6 results.
7. Map Mixcloud data into `SoundSearchResult`.
8. Extract the provider next-page cursor or URL into `SearchPage.nextCursor`.
9. Build the embed URL needed later for playback.

## Done Checks

- Components do not import Mixcloud response types.
- The provider returns only app-owned types.
- The provider accepts an `AbortSignal`.
- No `any` is used.

## Best Practice Notes

- Keep unsafe API response parsing inside `mixcloudProvider.ts`.
- If a field can be missing, type it as optional and handle the fallback while mapping.

## Suggested Commit

`feat: add typed sound api provider`

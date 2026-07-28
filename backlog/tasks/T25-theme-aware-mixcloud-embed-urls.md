# T25 - Theme Aware Mixcloud Embed URLs

## Goal

Make Mixcloud player embed URLs react to theme changes after results have already loaded. Provider results should store provider/domain data only, while the player component builds presentation-specific iframe URLs from the current effective theme.

## Files To Create Or Edit

- `src/api/types.ts`
- `src/api/mixcloudProvider.ts`
- `src/components/PlayerEmbed.tsx`
- `src/app/App.tsx`
- `src/hooks/useEffectiveTheme.ts`
- `src/components/ThemeControls.tsx` if theme types need to move
- `src/api/mixcloudProvider.test.ts` if provider mapping tests are added
- `src/components/PlayerEmbed.test.tsx` if component tests are added
- `README.md`

## Steps

1. Remove theme-specific embed URL construction from `mixcloudProvider`.
2. Keep `SoundSearchResult.url` as the Mixcloud feed/source URL returned by the provider.
3. Decide whether to remove `SoundSearchResult.embedUrl` entirely or stop using it.
4. Prefer removing `embedUrl` from `SoundSearchResult` if no other code needs it.
5. Create a small helper for building the Mixcloud iframe URL from:
   - result/source URL
   - effective theme: `light` or `dark`
6. Keep current user-requested embed params from the working implementation:
   - `hide_cover=1`
   - `hide_artwork=1`
   - `light=1` for light effective theme
   - `light=0` for dark effective theme
   - `feed=<result url>`
7. Do not read `document.documentElement.dataset.theme` inside the provider.
8. Add `useEffectiveTheme(themePreference)` or equivalent logic that:
   - returns `light` or `dark`
   - resolves `system` using `window.matchMedia("(prefers-color-scheme: dark)")`
   - updates when the system color scheme changes
9. Pass the effective theme to `PlayerEmbed`.
10. Make sure changing theme while the player is open updates the iframe URL.
11. Make sure changing theme before opening the player uses the current effective theme.
12. Update tests around result mapping or player embed URL generation.
13. Update README notes about theme-aware player embeds.

## Done Checks

- `mixcloudProvider` no longer imports theme UI types or reads DOM theme state.
- Existing search results do not need to be refetched when theme changes.
- Switching light/dark while a player is open updates the iframe `src`.
- `system` theme follows the current OS/browser color scheme.
- Changing system color scheme updates the player URL when preference is `system`.
- Provider data remains independent from UI presentation concerns.
- Build and tests pass.

## Best Practice Notes

- This task intentionally chooses Option A: provider stores source data, `PlayerEmbed` builds the iframe URL.
- Keep the effective-theme helper small and local; do not introduce a theme context unless the app needs it.
- Avoid remapping search results on theme changes.
- Keep the `ThemePreference` type in a neutral location if importing it from `ThemeControls` creates awkward dependencies.

## Suggested Commit

`refactor: build mixcloud embeds from effective theme`

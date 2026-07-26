# T14 - Accessibility Pass

## Goal

Make the full flow keyboard- and screen-reader-friendly.

## Files To Create Or Edit

- `src/app/App.tsx`
- `src/components/SearchBar.tsx`
- `src/components/SearchResults.tsx`
- `src/components/PaginationControls.tsx`
- `src/components/RecentSearches.tsx`
- `src/components/ImagePreview.tsx`
- `src/components/PlayerEmbed.tsx`
- `src/app/App.css`

## Steps

1. Use semantic landmarks: `main`, `section`, and meaningful headings.
2. Use semantic lists for results and recent searches.
3. Make every interactive item reachable by keyboard.
4. Use visible focus styles.
5. Add ARIA labels to icon-only or unclear controls.
6. Announce loading, empty, and error states with an appropriate live region.
7. Move focus to the image region after result selection.
8. Respect `prefers-reduced-motion`.

## Done Checks

- The whole app can be used with keyboard only.
- Screen-reader users get useful state changes.
- Focus order is logical.
- No interactive element is a plain clickable `div`.

## Best Practice Notes

- Prefer native HTML before adding ARIA.
- Do not trap focus.

## Suggested Commit

`fix: improve accessibility flow`

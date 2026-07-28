# T17 - Search Loading Skeletons And Debounce Timing

## Goal

Replace the generic loading message with skeleton UI that matches the selected result view, and tune search debounce timing.

## Files To Create Or Edit

- `src/hooks/useSearchController.ts`
- `src/components/SearchResults.tsx`
- `src/components/ResultListItem.tsx`
- `src/components/ResultTile.tsx`
- `src/app/App.css`
- `README.md`

## Steps

1. Set or confirm the search debounce delay is 500 milliseconds.
2. Update README if it mentions a different debounce delay.
3. Add a small reusable skeleton component or render skeleton markup inside `SearchResults`.
4. Show 6 skeleton items while search status is loading.
5. Match the skeleton shape to the current view mode:
   - list view uses horizontal rows
   - tile view uses square artwork placeholders
6. Keep the search section marked busy while loading.
7. Add subtle shimmer or pulse styling.
8. Respect `prefers-reduced-motion`.
9. Make sure skeletons do not shift the layout when real results appear.

## Done Checks

- Search waits 500 milliseconds after typing before starting an automatic search.
- Loading state looks like the final result layout.
- List and tile modes each have appropriate skeletons.
- Screen-reader users still get a useful loading announcement.
- Reduced-motion users do not get shimmer animation.

## Best Practice Notes

- Skeletons should suggest structure, not fake readable content.
- Use stable dimensions and avoid layout jumps.

## Suggested Commit

`feat: polish search loading behavior`

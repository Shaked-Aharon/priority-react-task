# T12 - List And Tile View Mode

## Goal

Add the bonus List/Tile view toggle and remember the user's choice.

## Files To Create Or Edit

- `src/components/ViewModeControls.tsx`
- `src/components/ResultTile.tsx`
- `src/components/SearchResults.tsx`
- `src/hooks/usePersistentPreference.ts`
- `src/app/App.tsx`
- `src/app/App.css`

## Steps

1. Define a `ViewMode` type with `list` and `tile`.
2. Use `usePersistentPreference` to store the selected mode.
3. Create `ViewModeControls` with List and Tile buttons.
4. Add active and disabled states to the buttons.
5. Create `ResultTile`.
6. Update `SearchResults` to render list items or tiles based on the current mode.
7. Use CSS grid for tile mode.

## Done Checks

- List button switches to list view.
- Tile button switches to tile view.
- Tile mode shows result images in rows.
- The selected mode survives page refresh.
- Both modes support result selection.

## Best Practice Notes

- Reuse the same result selection callback in both modes.
- Keep preference storage small: store only `list` or `tile`.

## Suggested Commit

`feat: add persistent result view mode`

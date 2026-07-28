# T20 - Light And Dark Theme

## Goal

Add light and dark theme support with a persisted user preference.

## Files To Create Or Edit

- `src/app/App.tsx`
- `src/app/App.css`
- `src/components/ThemeControls.tsx`
- `src/hooks/usePersistentPreference.ts`
- `src/lib/storage.ts`
- `README.md`

## Steps

1. Decide supported values: `system`, `light`, and `dark`.
2. Create a small theme control component.
3. Persist the chosen theme using the existing preference helper.
4. Apply a theme attribute to the app root or document element.
5. Use `prefers-color-scheme` when the user chooses `system`.
6. Define light and dark CSS variable values.
7. Check all states in both themes: idle, loading, success, empty, error, selected, disabled, and focus.
8. Document the theme behavior in README.

## Done Checks

- The user can switch between system, light, and dark.
- The preference survives refresh.
- Text contrast remains readable in both themes.
- Result images, skeletons, and player area still look polished.

## Best Practice Notes

- Do not duplicate component CSS for each theme; override variables.
- Keep dark theme calm and readable, not just inverted.

## Suggested Commit

`feat: add persisted light and dark theme`

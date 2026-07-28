# T28 - Remove Unused Preference Control Components

## Goal

Clean up leftover segmented preference-control components that are no longer used after the accessible settings popover replaced them.

## Files To Create Or Edit

- `src/components/LanguageControls.tsx`
- `src/components/ThemeControls.tsx`
- `src/components/SettingsPopover.tsx`
- `src/app/App.tsx`
- `src/app/SearchPanel.tsx`
- `src/app/App.css`
- `README.md` if architecture notes mention removed components

## Steps

1. Confirm `LanguageControls` and `ThemeControls` are not imported by runtime code.
2. Confirm their CSS classes are not still used:
   - `.language-controls`
   - `.theme-controls`
3. Delete `src/components/LanguageControls.tsx` if it is still unused.
4. Delete `src/components/ThemeControls.tsx` if it is still unused.
5. Keep `ThemePreference` exported from `src/hooks/useEffectiveTheme.ts`; do not reintroduce a dependency on `ThemeControls`.
6. Check whether any README or backlog source-structure lists should mention `SettingsPopover` instead of the deleted controls.
7. Do not change the settings popover behavior in this task.

## Done Checks

- `rg "LanguageControls|ThemeControls" src` finds no runtime references.
- Removed components are not imported anywhere.
- Settings popover still controls language and theme preferences.
- TypeScript build passes.
- Tests pass.

## Best Practice Notes

- Remove dead UI surfaces after replacing them, but keep this focused on unused code cleanup.
- Do not delete backlog history files just because they mention old tasks.

## Suggested Commit

`chore: remove unused preference controls`

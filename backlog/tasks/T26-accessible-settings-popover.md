# T26 - Accessible Settings Popover

## Goal

Replace the language and theme segmented button groups with a compact, polished settings popover in the search header. Keep theme and language preferences easy to change without making keyboard or screen-reader behavior worse.

## Files To Create Or Edit

- `src/app/App.tsx`
- `src/app/App.css`
- `src/components/SettingsPopover.tsx`
- `src/components/LanguageControls.tsx` if reused inside the popover
- `src/components/ThemeControls.tsx` if reused inside the popover
- `src/i18n/messages.ts`
- `src/components/SettingsPopover.test.tsx` if component tests are added
- `README.md`

## Steps

1. Replace the always-visible language and theme segmented controls in the search header with a single settings trigger.
2. Use a real `<button>` for the trigger.
3. The trigger should have a clear accessible name from localized messages, for example `Settings`.
4. Add a compact popover panel anchored near the trigger.
5. The popover should contain:
   - language preference: English / Hebrew
   - theme preference: System / Light / Dark
6. Prefer native form controls inside the popover if they produce better accessibility and simpler keyboard behavior:
   - `<select>` for language
   - `<select>` for theme
   - or radio groups if the visual design is clearly better
7. Avoid making the controls look like tabs.
8. Add localized strings for:
   - Settings trigger
   - Settings panel label/title
   - Language field label
   - Theme field label
   - Close action if a close button is used
9. Accessibility behavior must include:
   - trigger opens the popover with keyboard and pointer
   - Escape closes the popover
   - clicking outside closes the popover
   - focus moves into the popover when opened if the panel behaves like a dialog
   - focus returns to the trigger when closed
   - tab order is predictable
   - the current language and theme values are announced by their controls
10. Choose the ARIA pattern deliberately:
    - Use `aria-haspopup="dialog"` if the popover is a small dialog-like panel with multiple controls.
    - Use `role="dialog"` and `aria-modal="false"` for a non-modal settings popover.
    - Do not use tablist/tab/tabpanel roles.
11. Ensure Hebrew RTL layout works:
    - popover aligns naturally in RTL
    - labels and controls do not overlap
    - dropdown text is readable
12. Keep the popover visually compact and polished:
    - no oversized card
    - no nested card styling
    - stable dimensions on desktop and mobile
    - clear hover/focus states
13. Update or remove old `.language-controls` and `.theme-controls` CSS if those components are no longer visible as segmented groups.
14. Keep preferences persisted through existing storage helpers.
15. Update README localization/theme notes if the controls are described there.

## Done Checks

- Header shows one compact settings control instead of two segmented groups.
- Language can still switch English/Hebrew and persists across refresh.
- Theme can still switch System/Light/Dark and persists across refresh.
- Keyboard users can open, use, and close the popover.
- Escape and outside click close the popover.
- Focus returns to the settings trigger after close.
- Screen-reader labels are meaningful.
- Hebrew RTL layout remains clean.
- The UI does not use tabgroup semantics for settings.
- Build and tests pass.

## Best Practice Notes

- Native controls are acceptable and often better here; polish them with layout and labels instead of replacing them with custom widgets too early.
- If a custom dropdown is introduced, it needs full keyboard behavior and tests.
- A non-modal popover is enough; do not trap focus unless the implementation truly acts like a modal dialog.
- Keep the first version simple, accessible, and visually tidy.

## Suggested Commit

`feat: add accessible settings popover`

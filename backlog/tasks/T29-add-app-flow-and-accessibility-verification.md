# T29 - Add App Flow And Accessibility Verification

## Goal

Add focused verification for the most important user-facing flows that are currently covered indirectly or only manually: selecting a result renders the player immediately, settings remain accessible, and Hebrew RTL layout behavior is intentionally checked.

## Files To Create Or Edit

- `src/app/App.test.tsx` if adding app-level integration tests
- `src/components/SettingsPopover.test.tsx`
- `src/components/PlayerEmbed.test.tsx`
- `src/test/setup.ts` if shared browser mocks are needed
- `package.json` if adding an accessibility test helper is explicitly chosen
- `README.md` if documenting manual QA steps

## Steps

1. Add an app-level integration test for the selected-result flow:
   - render the app with a controllable or mocked sound provider if needed
   - run a successful search
   - select a result
   - verify the artwork preview updates
   - verify `PlayerEmbed` is rendered immediately without a second click
2. Add or extend tests for settings behavior if gaps remain:
   - trigger has `aria-haspopup="dialog"`
   - panel uses `role="dialog"` and `aria-modal="false"`
   - Escape closes the panel
   - outside pointer interaction closes the panel
   - focus returns to the trigger
3. Add explicit RTL verification:
   - switch language to Hebrew
   - verify `document.documentElement.dir` becomes `rtl`
   - verify settings labels remain associated with their controls
4. Decide whether to add an automated accessibility helper such as axe:
   - only add a dependency if it meaningfully improves confidence
   - otherwise document a short manual keyboard/screen-reader QA checklist
5. Keep tests focused on behavior, not CSS implementation details.

## Done Checks

- Selecting a result immediately renders the player in a test.
- Settings popover accessibility behavior remains covered.
- Hebrew language switch and RTL document direction are covered.
- Tests pass.
- Build passes.
- README or test names make any remaining manual accessibility checks clear.

## Best Practice Notes

- The app already has strong hook and component tests; this task should add only the missing user-flow confidence.
- Avoid brittle layout pixel tests unless a real visual regression tool is introduced.

## Suggested Commit

`test: cover app player and accessibility flows`

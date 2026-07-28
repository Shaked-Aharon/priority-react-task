# T19 - Theme Design Tokens

## Goal

Prepare the visual design for theming by replacing repeated hard-coded CSS values with named tokens.

## Files To Create Or Edit

- `src/app/App.css`

## Steps

1. Define CSS custom properties in `:root` for core colors, borders, shadows, radius, spacing, and typography.
2. Replace repeated hard-coded color values with variables.
3. Replace repeated border radius values with variables.
4. Keep component selectors and markup unchanged unless a small class name improves clarity.
5. Preserve current visual behavior before introducing dark mode.
6. Scan the CSS after changes to make sure the design does not depend on hidden hard-coded colors.

## Done Checks

- The app looks the same or slightly cleaner after tokenization.
- Important UI states still have distinct colors.
- Focus, hover, selected, disabled, error, and loading states still work.
- Future light/dark theme work can be done mostly by changing variables.

## Best Practice Notes

- Do this before choosing a new palette.
- Use semantic names like `--color-surface` instead of names like `--green-100` for component-level usage.

## Suggested Commit

`style: introduce theme design tokens`

# T22 - Motion Pass

## Goal

Polish interaction transitions after layout, theme, and language behavior are stable.

## Files To Create Or Edit

- `src/app/App.css`
- `src/lib/animation.ts`
- Result, preview, player, or skeleton components if needed

## Steps

1. Review existing selection and preview animation.
2. Add subtle result entrance transitions after successful search.
3. Add skeleton shimmer or pulse if it was not completed earlier.
4. Smoothly reveal the player when it opens.
5. Tune hover and pressed states on result cards and buttons.
6. Animate only `opacity` and `transform` where possible.
7. Keep animation durations short and consistent.
8. Confirm all motion respects `prefers-reduced-motion`.

## Done Checks

- Interactions feel smoother without slowing the app down.
- Motion does not cause layout shift.
- Reduced-motion users get near-instant transitions.
- Existing selection-to-preview animation still works.

## Best Practice Notes

- Motion should support feedback and orientation, not distract from search.
- Do this after visual and layout decisions are settled.

## Suggested Commit

`style: polish interaction motion`

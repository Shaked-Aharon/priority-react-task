# T10 - Selection And Image Preview

## Goal

Show the selected result in the central image container with a fly/fade transition.

## Files To Create Or Edit

- `src/components/ImagePreview.tsx`
- `src/lib/animation.ts`
- `src/app/App.tsx`
- `src/app/App.css`

## Steps

1. Create `ImagePreview`.
2. Show a placeholder state when no result is selected.
3. Show the selected result image and title after selection.
4. Capture the clicked result element and image container element.
5. Animate with `transform` and `opacity`.
6. Fade in the selected image.
7. Respect `prefers-reduced-motion`.
8. Move focus to the image region after a result is selected.

## Done Checks

- Clicking a result updates the image container.
- The result visually moves/fades toward the image area.
- The image fades in.
- Selection still works when reduced motion is enabled.

## Best Practice Notes

- Animate only `transform` and `opacity` for performance.
- Do not let animation code decide which result is selected; state should decide that.

## Suggested Commit

`feat: add selected result preview`

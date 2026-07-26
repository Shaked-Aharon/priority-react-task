# Story 03 - Selection, Image Focus, And Playback

## User Story

As a user, I want a selected result to move visually into focus, show its image, and play when I click the central image.

## Acceptance Criteria

- Clicking a result triggers a fly-to-image-container animation.
- The selected result fades out as the image fades in.
- The image container shows the selected result image.
- Clicking the central image embeds the playable track below the image.
- Playback uses the provider's embed URL or embed HTML safely.
- Focus is moved meaningfully after selection for keyboard and screen-reader users.
- Reduced-motion users get a non-motion fallback.

## Implementation Notes

- Keep selected result state in `src/hooks/useSearchController.ts` or a small dedicated selection hook if it grows.
- Put animation helper calculations in `src/lib/animation.ts`.
- Render the image area with `src/components/ImagePreview.tsx`.
- Render the iframe/embed with `src/components/PlayerEmbed.tsx`.
- Avoid setting raw HTML unless the provider requires it; prefer a typed embed URL.

## Related Tasks

- `backlog/tasks/T10-selection-and-image-preview.md`
- `backlog/tasks/T11-track-embed-playback.md`
- `backlog/tasks/T14-accessibility-pass.md`

# T11 - Track Embed Playback

## Goal

Embed the selected track below the image when the central image is clicked.

## Files To Create Or Edit

- `src/components/PlayerEmbed.tsx`
- `src/components/ImagePreview.tsx`
- `src/app/App.tsx`

## Steps

1. Add local state for whether the selected track player is open.
2. Reset the player to closed when a different result is selected.
3. Make the central image clickable only when a result is selected.
4. Create `PlayerEmbed` with an iframe.
5. Use the embed URL from the mapped `SoundSearchResult`.
6. Add a descriptive iframe `title`.
7. Render the player below the image.

## Done Checks

- Clicking the selected image reveals the embedded player.
- Selecting a different result updates the player.
- The iframe is not rendered before the user clicks the image.
- No raw HTML injection is used.

## Best Practice Notes

- Lazy rendering the iframe avoids loading media before the user asks for it.
- Keep provider-specific embed URL creation in the API layer.

## Suggested Commit

`feat: embed selected track playback`

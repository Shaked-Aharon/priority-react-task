# T27 - Refresh Handoff Docs After Player And Settings Updates

## Goal

Update repository and backlog documentation so it matches the current product behavior after the settings popover and immediate player rendering changes.

## Files To Create Or Edit

- `README.md`
- `backlog/README.md`
- `backlog/implementation-guide.md`

## Steps

1. Update the README opening description:
   - remove wording that says the player is lazily opened
   - describe the current behavior: selecting a result shows artwork and renders the Mixcloud player
2. Update the README accessibility/performance note:
   - remove wording that says the iframe is only rendered after clicking selected artwork
   - keep the theme-aware `PlayerEmbed` note
3. Update `backlog/README.md` Definition Of Done:
   - replace "Clicking the image embeds the track player"
   - use wording that matches immediate player rendering after result selection
4. Update `backlog/implementation-guide.md` Performance Guidance:
   - remove the now-stale lazy-render-after-click instruction
   - replace it with the current performance trade-off for immediate player rendering
5. Keep the documentation factual and concise.
6. Do not change application code in this task.

## Done Checks

- Documentation no longer describes a click-to-open player flow.
- Documentation clearly states the current selected-result/player behavior.
- README still explains setup, architecture, trade-offs, and commands.
- No app behavior changes are included.
- Build is not required unless code changes are accidentally made.

## Best Practice Notes

- Keep handoff docs aligned with the running product.
- Avoid documenting old backlog decisions as current behavior after follow-up refactors.

## Suggested Commit

`docs: refresh player behavior handoff notes`

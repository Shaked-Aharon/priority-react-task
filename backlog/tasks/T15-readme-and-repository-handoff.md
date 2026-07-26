# T15 - README And Repository Handoff

## Goal

Document the project and prepare it for submission.

## Files To Create Or Edit

- `README.md`
- `.gitignore`

## Steps

1. Add install instructions.
2. Add run, build, test, and preview commands.
3. Explain the architecture:
   - API/data layer
   - state/hooks layer
   - pure logic layer
   - reusable UI components
4. Explain why the Sound API can be replaced by editing only the provider layer.
5. Explain async handling: debounce, abort, and stale-response protection.
6. Explain cursor pagination.
7. Explain recent-search storage and view-mode storage.
8. Explain accessibility and performance choices.
9. Confirm `.gitignore` excludes `node_modules` and build output.
10. Initialize Git if needed and make clean incremental commits.

## Done Checks

- A new developer can run the app from the README.
- README explains architecture and trade-offs clearly.
- Repository history is not a single final dump.
- The final app builds and tests pass.

## Best Practice Notes

- Keep README practical and specific to this app.
- Mention any known limitations honestly.

## Suggested Commit

`docs: explain setup and architecture`

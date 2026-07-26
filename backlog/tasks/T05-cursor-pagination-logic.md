# T05 - Cursor Pagination Logic

## Goal

Build and test cursor tracking for Previous and Next.

## Files To Create Or Edit

- `src/lib/pagination.ts`
- `src/lib/pagination.test.ts`

## Steps

1. Define a pagination state type with:
   - current cursor
   - previous cursor stack
   - next cursor
2. Add a helper for starting a new search.
3. Add a helper for moving to the next page.
4. Add a helper for moving to the previous page.
5. Add a helper that tells the UI whether Previous is available.
6. Add a helper that tells the UI whether Next is available.
7. Test first page, next page, previous page, missing next cursor, and repeated rapid transitions.

## Done Checks

- Logic does not use numeric offsets.
- Tests prove Previous and Next availability.
- The helpers are pure functions.

## Best Practice Notes

- Keep the cursor stack independent from React.
- Store only the cursor values needed for navigation.

## Suggested Commit

`test: add cursor pagination logic`

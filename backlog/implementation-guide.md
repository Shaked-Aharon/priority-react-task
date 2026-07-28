# Implementation Guide For A Junior Developer

Use this guide together with the numbered task files in `backlog/tasks/`.

## How To Work

1. Start at `T01`.
2. Finish one task before starting the next.
3. Run the done checks at the end of each task.
4. Make one small commit per task.
5. If a task feels too large, split the checklist into smaller commits, but do not skip ahead.

## Recommended Commit Flow

```text
T01 -> T02 -> T03 -> T04 -> T05 -> T06 -> T07 -> T08 -> T09 -> T10 -> T11 -> T12 -> T13 -> T14 -> T15 -> T16 -> T17 -> T18 -> T19 -> T20 -> T21 -> T22 -> T23
```

## Architecture Rules

- Components render UI only.
- Hooks own browser and React behavior.
- `lib/` contains pure helpers that are easy to test.
- `api/` contains provider-specific details.
- `App.tsx` composes everything together.

## When You Are Unsure Where Code Goes

- API request code goes in `src/api/`.
- Search state, loading state, errors, debounce, and cancellation go in `src/hooks/useSearchController.ts`.
- Reusable visual pieces go in `src/components/`.
- Logic that can be tested without React goes in `src/lib/`.
- Page-level layout goes in `src/app/`.

## Testing Guidance

Write tests early for pure logic:

- Recent search ordering and dedupe.
- Cursor pagination transitions.
- Storage fallback behavior.

Avoid starting with large UI tests. They are useful later, but the fastest value for this exam is proving the core behavior cannot regress.

## Performance Guidance

- Fetch only 6 results per request.
- Do not fetch before the user enters a search term.
- Abort old requests before starting new ones.
- Ignore stale responses.
- Lazy-render the iframe player only after the user clicks the image.
- Animate `transform` and `opacity`, not width, height, top, or left.

## Accessibility Guidance

- Use buttons for actions.
- Use links only for navigation.
- Keep a visible keyboard focus style.
- Use semantic lists for results and recent searches.
- Add live regions for loading and error messages.
- Support `prefers-reduced-motion`.

## Final Submission Checklist

- `npm run build` passes.
- `npm run test` passes.
- App works after refresh.
- Recent searches and view mode persist.
- README explains how to run the app.
- Git history has focused commits instead of one final commit.

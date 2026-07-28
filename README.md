# Sound Search

React + TypeScript exam project for searching Mixcloud cloudcasts, browsing cursor-based pages, saving recent searches, and selecting a result to show its artwork and Mixcloud player.

## Setup

```bash
pnpm install
pnpm run dev
```

Useful commands:

```bash
pnpm run build
pnpm run test
pnpm run preview
```

The app is built with Vite, React, TypeScript, Vitest, and React Testing Library setup.

## Architecture

- `src/api/` owns app-level API types and the provider interface. `mixcloudProvider.ts` is the only Mixcloud-specific adapter, so a different sound API can replace it by implementing `SoundProvider`.
- `src/hooks/` owns browser and React behavior: debounced input, sound search request lifecycle, search intent orchestration, persistent recent searches, and persistent preferences.
- `src/lib/` contains pure helpers for recent-search ordering, cursor pagination, safe storage, and selection animation.
- `src/components/` contains presentational UI: search form, results, pagination, recent searches, preview, player, and view-mode controls.
- `src/app/App.tsx` composes the provider, hooks, and UI.

## Async Search

Search input is debounced at about 500ms, and trimmed terms must be at least 3 characters before a Mixcloud request is sent or saved to recent searches. `useSearchController` owns input, validation, active query, pagination intent, selection, and successful recent-search events. `useSoundSearchRequest` owns the Mixcloud request lifecycle: loading and error state, request aborts, stale response protection, and retrying the latest failed request snapshot. Submitted and recent-search terms are deduped so the later debounce pass does not repeat the same first-page request.

## Pagination

The app requests 6 results per page. Previous and Next use provider cursors instead of numeric offsets. A small cursor stack in `src/lib/pagination.ts` tracks the current cursor, previous cursors, and next cursor.

## Persistence

Recent searches are stored as terms only, deduped case-insensitively, moved to the top when reused, and capped at 5. List/tile view mode, language, and the system/light/dark theme preference persist as small string preferences. Storage helpers catch unavailable storage, invalid JSON, and write failures.

## Localization

The UI uses a lightweight message catalog in `src/i18n/messages.ts` for English and Hebrew. The language preference persists, and Hebrew applies `lang="he"` with right-to-left document direction while Mixcloud result titles and artist names stay unchanged.

## Theme

Language and theme preferences live in a compact settings popover in the search header and continue to persist through the storage helpers. The popover uses native controls in a non-modal dialog pattern, closes on Escape or outside click, and returns focus to its trigger. The theme preference persists as `system`, `light`, or `dark`. `useEffectiveTheme` resolves `system` through `matchMedia("(prefers-color-scheme: dark)")`, so the Mixcloud player can receive a concrete light or dark embed URL without refetching existing results.

## Accessibility And Performance

The UI uses native buttons, forms, semantic sections, list markup, visible focus styles, live regions for request states, and reduced-motion handling. Selecting a result renders the Mixcloud player for that result, and `PlayerEmbed` builds the theme-aware iframe URL from the selected result source URL.

Manual accessibility QA should include keyboard search/result selection, settings popover open and close with focus return, light/dark/system theme selection, and switching to Hebrew to confirm `dir="rtl"` while form labels remain associated with their controls.

## Notes

Mixcloud response parsing is intentionally contained in the provider. If the public API changes shape, the UI should not need changes unless the app-owned `SoundSearchResult` contract changes.

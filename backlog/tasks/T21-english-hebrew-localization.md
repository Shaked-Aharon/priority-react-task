# T21 - English And Hebrew Localization

## Goal

Add lightweight English/Hebrew language support, including RTL layout for Hebrew.

## Files To Create Or Edit

- `src/app/App.tsx`
- `src/components/SearchBar.tsx`
- `src/components/SearchResults.tsx`
- `src/components/PaginationControls.tsx`
- `src/components/RecentSearches.tsx`
- `src/components/ImagePreview.tsx`
- `src/components/PlayerEmbed.tsx`
- `src/components/ViewModeControls.tsx`
- `src/components/LanguageControls.tsx`
- `src/i18n/messages.ts`
- `src/app/App.css`
- `README.md`

## Steps

1. Create a small messages file with English and Hebrew strings.
2. Add a language preference with supported values `en` and `he`.
3. Persist the chosen language.
4. Replace hard-coded user-facing strings with translated messages.
5. Apply `lang` and `dir` attributes based on the current language.
6. Add a compact language control.
7. Verify Hebrew RTL layout for search, results, pagination, preview, and recent searches.
8. Keep API data such as result titles and artist names unchanged.
9. Document the localization approach in README.

## Done Checks

- The user can switch between English and Hebrew.
- The selected language survives refresh.
- Hebrew renders right-to-left without broken spacing or alignment.
- All visible UI labels, placeholders, empty states, loading states, and errors are translated.

## Best Practice Notes

- Keep this lightweight unless the project grows enough to need an i18n library.
- Avoid translating provider data returned by Mixcloud.

## Suggested Commit

`feat: add english and hebrew localization`

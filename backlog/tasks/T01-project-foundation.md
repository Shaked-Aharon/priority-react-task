# T01 - Project Foundation

## Goal

Create the React + TypeScript project and an empty app layout.

## Files To Create Or Edit

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/App.css`
- `src/test/setup.ts`

## Steps

1. Create a Vite React TypeScript app.
2. Add Vitest and React Testing Library.
3. Add scripts: `dev`, `build`, `test`, and `preview`.
4. Enable strict TypeScript.
5. Create the folders listed in `backlog/README.md`.
6. Render three empty layout regions in `App.tsx`: search, image preview, and recent searches.
7. Add simple CSS so the regions are visible while developing.

## Done Checks

- `npm run dev` starts the app.
- `npm run build` passes.
- `npm run test` runs, even if there are no meaningful tests yet.
- No API call happens on first page load.

## Best Practice Notes

- Keep `App.tsx` small. It should compose features, not contain all logic.
- Do not install UI libraries unless they solve a real need.

## Suggested Commit

`chore: initialize react typescript app`

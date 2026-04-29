# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run lint` — run ESLint over the repo (no test runner is configured)

## Architecture

Single-page React 19 + Vite app. The entire user-facing feature lives in one component, [src/Love.jsx](src/Love.jsx); [src/App.jsx](src/App.jsx) and [src/main.jsx](src/main.jsx) are thin shells that mount it.

`Love.jsx` drives a typewriter-style sequence:
- A `sentences` array (memoized) is the script. To change the message flow, edit this array — order matters.
- Two indices, `sentenceIndex` and `charIndex`, advance via a `setTimeout` inside `useEffect` to type one character every 50 ms. The "Next" button skips to the next sentence by resetting `text`/`charIndex` and incrementing `sentenceIndex`.
- When `sentenceIndex >= sentences.length`, `showOptions` flips and the Yes/No buttons render.
- `handleYes` chains two SweetAlert2 popups, then hard-redirects to `https://hashimrahman.github.io/flower/` via `window.location.href`. That URL is a separate companion site — changing flow endings means editing this string.
- A looping background `<video>` (`src/assets/bgl2.mp4`) is imported as a Vite asset and absolutely positioned behind the content.

## Styling

- Tailwind CSS v4 is wired through the `@tailwindcss/vite` plugin in [vite.config.js](vite.config.js) and imported with `@import "tailwindcss";` at the top of [src/index.css](src/index.css) — there is no `tailwind.config.js`.
- Custom font classes (`cursive-text`, `roboto-text`) live in [src/App.css](src/App.css); the matching Google Fonts (`Pacifico`, `Roboto`) are loaded in [index.html](index.html).
- SweetAlert2 popups are styled via the `customClass.popup` option (`custom-swal-popup`, `custom-swal-popup2`) defined in [src/index.css](src/index.css).

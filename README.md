# Terminal Velocity

https://isaiahcampusano.github.io/wpm-/

A polished, dependency-free passage typing test with a retro terminal interface. Each run uses a locally stored, verbatim excerpt from a public-domain work sourced through Project Gutenberg.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm run serve` from this folder.
3. Open `http://127.0.0.1:4173`.

The application itself is static and can also be served by any standard static web server.

## Controls

- Type every character in the passage, including spaces and punctuation.
- An incorrect key blocks progress and counts against accuracy immediately.
- Press **Backspace** to clear the current error; correct progress is locked in.
- Press **Enter** on the results screen to start a new run.
- Changing difficulty or passage length starts a fresh run and saves the selection locally.

## Tests

Run `npm test` for the dependency-free Node test suite. It covers character-level state transitions, passage selection and corpus shape, WPM and accuracy calculations, persisted-state migration, and history limits.

Completed run history is stored only in the browser's `localStorage`; no data is transmitted.

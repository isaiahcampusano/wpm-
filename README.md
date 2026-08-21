# Terminal Velocity

A polished, dependency-free typing speed test with a retro terminal interface.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm run serve` from this folder.
3. Open `http://127.0.0.1:4173`.

The application itself is static and can also be served by any standard static web server.

## Controls

- Type with a physical keyboard.
- Press **Space** to submit each word, including the last word.
- Press **Backspace** to correct the current word.
- Press **Enter** on the results screen to start a new run.
- Changing difficulty or word count starts a fresh run and saves the selection locally.

## Tests

Run `npm test` for the dependency-free Node test suite. It covers WPM and accuracy calculations, persisted-state validation, history limits, and word-list generation.

Completed run history is stored only in the browser's `localStorage`; no data is transmitted.

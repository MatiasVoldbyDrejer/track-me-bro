# CLAUDE.md

## Project

Track Me Bro — a Chrome extension (Manifest V3) that auto-accepts cookie consent banners on every website. Satirical tone, think Oatly.

## Architecture

- **No build tools, no frameworks, no dependencies.** Pure vanilla JS.
- `src/content.js` — Content script injected on all pages (all frames). 4-layer cookie banner detection: platform selectors → generic CSS → text matching → ARIA labels. Uses MutationObserver for dynamically loaded banners.
- `src/background.js` — Service worker. Manages domain deduplication, counter persistence, badge updates. Has its own copy of the LEVELS config (can't share modules in MV3 without bundling).
- `src/popup/` — Extension popup UI. Dark theme (#1a1a2e), accent color driven by CSS variable `--accent` which changes per level.
- `src/quips.js` — Shared by popup. Contains LEVELS config, level helper functions, base quips + tier-specific quip pools.
- `icons/` — Placeholder PNGs (orange circles). Need proper design.
- `tests/test-banners.html` — Manual test page with simulated cookie banners and false-positive traps.

## Key patterns

- State is split: `chrome.storage.sync` for toggle + count (syncs across devices), `chrome.storage.local` for the domain list (can grow large).
- `background.js` gates message handling behind `initPromise` to prevent a race condition where content scripts could overwrite stored data before initialization completes.
- `hasCookieAncestor()` in content.js prevents false positives on text-matched buttons by requiring a cookie-related parent container.
- LEVELS config is duplicated in `quips.js` and `background.js` — keep both in sync when changing levels.

## Adding cookie banner selectors

The most common change. In `src/content.js`:
1. `PLATFORM_SELECTORS` — for known CMPs (prefer IDs over classes)
2. `GENERIC_SELECTORS` — for common CSS patterns
3. `ACCEPT_TEXT_PATTERNS` — regex for button text (guarded by `hasCookieAncestor`)
4. `ARIA_ACCEPT_PATTERNS` — regex for aria-label values

## Testing

Load as unpacked extension in Chrome, open `tests/test-banners.html`. Test on real sites. No automated test suite.

## Branching

Feature branches off `main`, PRs to merge. Branch naming: `feature/thing` or `fix/thing`.

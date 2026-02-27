# CLAUDE.md

## Project

Track Me Bro — a Chrome extension (Manifest V3) that auto-accepts cookie consent banners on every website. Live on the Chrome Web Store. Satirical tone, think Oatly.

## Architecture

- **No build tools, no frameworks, no dependencies.** Pure vanilla JS.
- `src/content.js` — Content script injected on all pages (all frames). 4-layer cookie banner detection: platform selectors → generic CSS → text matching → ARIA labels. Uses MutationObserver for dynamically loaded banners.
- `src/background.js` — Service worker. Manages domain deduplication, counter persistence, badge updates. Has its own copy of the LEVELS config (can't share modules in MV3 without bundling).
- `src/popup/` — Extension popup UI. Dark theme (#1a1a2e), accent color driven by CSS variable `--accent` which changes per level.
- `src/quips.js` — Shared by popup. Contains LEVELS config, level helper functions, base quips + tier-specific quip pools.
- `icons/` — Bro character face PNGs at 16/32/48/128px.
- `docs/privacy.html` — Public privacy policy page for Chrome Web Store listing.
- `store-listing/` — Chrome Web Store assets (screenshots, descriptions) and `package.sh` for manual zip builds.
- `tests/test-banners.html` — Manual test page with simulated cookie banners and false-positive traps.

## Key patterns

- State is split: `chrome.storage.sync` for toggle + count (syncs across devices), `chrome.storage.local` for the domain list (can grow large).
- `background.js` gates message handling behind `initPromise` to prevent a race condition where content scripts could overwrite stored data before initialization completes.
- `hasCookieAncestor()` in content.js prevents false positives on text-matched and ARIA-matched buttons by requiring a cookie-related parent container.
- `ARIA_REJECT_PATTERNS` provides a secondary defense against false positives on non-cookie "Accept" buttons (social/notification contexts).
- LEVELS config is duplicated in `quips.js` and `background.js` — keep both in sync when changing levels.

## Adding cookie banner selectors

The most common change. In `src/content.js`:
1. `PLATFORM_SELECTORS` — for known CMPs (prefer IDs over classes)
2. `GENERIC_SELECTORS` — for common CSS patterns
3. `ACCEPT_TEXT_PATTERNS` — regex for button text (guarded by `hasCookieAncestor`)
4. `ARIA_ACCEPT_PATTERNS` — regex for aria-label values (guarded by `hasCookieAncestor` + `ARIA_REJECT_PATTERNS`)

## Testing

Load as unpacked extension in Chrome, open `tests/test-banners.html`. Test on real sites. No automated test suite.

## Release process

1. Bump `version` in `manifest.json`
2. Update `CHANGELOG.md` with the new version and changes
3. Merge to `main`
4. Tag: `git tag v<version> && git push origin v<version>`
5. GitHub Actions auto-publishes to Chrome Web Store and creates a GitHub Release

## CI/CD

`.github/workflows/release.yml` — triggered on `v*` tags. Validates manifest version matches the tag, packages the extension, uploads to Chrome Web Store via API, and creates a GitHub Release.

Required GitHub secrets:
- `CHROME_EXTENSION_ID` — the extension's Chrome Web Store ID
- `CHROME_CLIENT_ID` — OAuth2 client ID
- `CHROME_CLIENT_SECRET` — OAuth2 client secret
- `CHROME_REFRESH_TOKEN` — OAuth2 refresh token for the Chrome Web Store API

## Branching

Feature branches off `main`, PRs to merge. Branch naming: `feature/thing` or `fix/thing`.

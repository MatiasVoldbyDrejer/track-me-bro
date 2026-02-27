# Changelog

All notable changes to Track Me Bro will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1.0] - 2026-02-27

### Fixed
- LinkedIn false positive: ARIA label matching no longer clicks non-cookie "Accept" buttons (connection requests, invitations, follow requests)
- Removed overly broad `/accept/i` catch-all from ARIA label patterns

### Added
- `ARIA_REJECT_PATTERNS` array to filter out social/notification contexts from ARIA matching
- `hasCookieAncestor()` guard on ARIA label matching layer (was already on text matching)
- LinkedIn-style false-positive test cases in test-banners.html
- GitHub Actions release pipeline: tag a version → auto-publish to Chrome Web Store
- CHANGELOG.md

## [1.0.0] - 2026-02-20

### Added
- 4-layer cookie banner detection: platform selectors, generic CSS, text matching, ARIA labels
- MutationObserver for dynamically injected banners
- Support for 60+ known cookie consent platforms
- Domain deduplication and per-domain tracking
- Leveling system with satirical quips
- Dark theme popup UI with level-driven accent colors
- Privacy policy page
- Chrome Web Store listing assets

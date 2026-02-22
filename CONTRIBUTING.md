# Contributing to Track Me Bro

First off — you're a real one. The marketing world thanks you.

## Local Development Setup

1. Clone the repo
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** and select the `track-me-bro` folder
5. You're live. Go accept some cookies.

## The Most Likely Contribution: New Cookie Selectors

Found a site where Track Me Bro doesn't auto-accept? That's the #1 thing we need help with.

Open `src/content.js` and look at the detection layers:

- **`PLATFORM_SELECTORS`** — For known consent platforms (OneTrust, Cookiebot, etc.). If the site uses a recognizable CMP, add its accept button selector here.
- **`GENERIC_SELECTORS`** — For common CSS patterns like `#accept-cookies` or `.cookie-accept`.
- **`ACCEPT_TEXT_PATTERNS`** — Regex patterns matching button text like "Accept All" or "I Agree".
- **`ARIA_ACCEPT_PATTERNS`** — Patterns matching `aria-label` attributes on consent buttons.

When adding a selector:
1. Inspect the cookie banner on the site
2. Find the "Accept All" button's most stable selector (prefer IDs > classes > text)
3. Add it to the appropriate layer
4. Test it

## Testing Your Changes

### Test page

Open `tests/test-banners.html` in Chrome with the extension loaded. It simulates banners from multiple CMPs and includes false-positive traps.

### Real-world testing

After the test page passes, try your changes on actual websites. Good ones to check:
- nytimes.com (OneTrust)
- bbc.com (custom)
- stackoverflow.com
- ikea.com
- theguardian.com
- Whatever site prompted your fix

### What to verify

- The correct button gets clicked
- No false positives (random non-cookie buttons clicked)
- Badge counter increments (first visit to a domain)
- Extension popup shows updated count

## Submitting a PR

1. Fork the repo
2. Create a branch (`fix/add-cookiebot-v2-selector` or similar)
3. Make your changes
4. Test them (see above)
5. Open a PR with a brief description of what site/CMP you fixed

Keep PRs focused. One fix per PR is ideal.

## Code Style

- No build tools, no frameworks, no dependencies. Just vanilla JS.
- Keep it simple. If your change needs a paragraph to explain, it might be too complex.

## Adding Quips

Quips live in `src/quips.js`. There are two types:

- **`BASE_QUIPS`** — shown at all levels. The general pool.
- **`TIER_QUIPS`** — array of arrays, one per level (0-indexed). Higher-tier quips should be progressively more unhinged. Level 6 quips should read like the ramblings of someone who has fully embraced being a data point.

The bar: would Oatly's copywriter chuckle? If yes, submit it.

## Changing Levels

The level config (`LEVELS` array) lives in two places that **must stay in sync**:
- `src/quips.js` — used by the popup (has titles + colors)
- `src/background.js` — used by the service worker for badge color (colors only)

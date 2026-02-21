# Track Me Bro

**Because marketers have feelings too.**

A Chrome extension that automatically accepts all cookie consent banners on every website you visit. Built by marketers, for marketers, for the marketers who market to the marketers.

You install it. It clicks "Accept All" everywhere. Karen in Marketing finally hits her Q3 targets. Everybody wins.

## What It Does

Every time you visit a website with a cookie consent banner, Track Me Bro finds the "Accept All" button and clicks it for you. Automatically. On every site. No questions asked.

It keeps a running count of how many sites are now tracking you, and delivers a fresh piece of unsolicited commentary each time you check in.

## Installation

### From Source (Developer Mode)

1. Clone this repo or download as ZIP
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the `track-me-bro` folder
6. Start browsing. You're now a hero.

## How It Works

Track Me Bro uses a 4-layer detection system to find and click cookie consent buttons:

1. **Platform selectors** — Recognizes 15+ major consent platforms (OneTrust, Cookiebot, Didomi, Osano, TrustArc, and more) by their known button IDs and classes
2. **Generic CSS patterns** — Catches common patterns like `#accept-cookies`, `.cookie-accept`, `[data-consent="accept"]`
3. **Text matching** — Finds buttons containing "Accept All", "I Agree", "Got it", "OK" — but only if they're inside a cookie-related container (so it won't click "OK" on your "delete everything?" modal)
4. **ARIA labels** — Catches accessibility-labeled consent buttons

It also uses a MutationObserver to handle banners that load after the page, and retries multiple times for the slow ones.

## The Popup

Click the extension icon to see:

- **A toggle** to turn it on/off (labeled "Accepting cookies" or "Taking a break")
- **Your count** under "Bros tracking you:" — the number of unique sites where cookies were auto-accepted
- **A quip** — a randomly selected piece of commentary, such as:

> *"Somewhere, a retargeting algorithm just shed a tear of joy."*

> *"You're not a user. You're a first-party data goldmine."*

> *"A pixel just fired. And it was beautiful."*

> *"That click was worth approximately $0.003 in CPM revenue."*

> *"Third-party cookies may be dying, but not on your watch."*

## Contributing

Found a site where it doesn't work? Got a quip that would make Oatly's copywriter jealous? See [CONTRIBUTING.md](CONTRIBUTING.md).

The most common contribution is adding new cookie banner selectors — check out `src/content.js` and the 4-layer system described above.

## License

[MIT](LICENSE) — do whatever you want with it. Track responsibly.

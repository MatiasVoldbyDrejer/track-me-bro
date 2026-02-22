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

1. **Platform selectors** — Recognizes 60+ major consent platforms (OneTrust, Cookiebot, Didomi, Osano, TrustArc, HubSpot, Sourcepoint, and many more) by their known button IDs and classes
2. **Generic CSS patterns** — Catches common patterns like `#accept-cookies`, `.cookie-accept`, `[data-consent="accept"]`
3. **Text matching** — Finds buttons containing "Accept All", "I Agree", "Got it", "OK" — but only if they're inside a cookie-related container (so it won't click "OK" on your "delete everything?" modal)
4. **ARIA labels** — Catches accessibility-labeled consent buttons

It also uses a MutationObserver to handle banners that load after the page, and retries multiple times for the slow ones.

## The Bro Level System

The more cookies you accept, the higher you rank. It's like a corporate loyalty program, but for surveillance.

| Level | Count | Title | Vibe |
|-------|-------|-------|------|
| 1 | 0–10 | Cookie Rookie | Cool blue. You're still innocent. |
| 2 | 11–50 | Data Donor | Purple. You're getting generous. |
| 3 | 51–150 | Pixel Pal | Warm orange. The pixels know your name. |
| 4 | 151–500 | Tracking Titan | Brand orange. Marketers write case studies about you. |
| 5 | 501–1000 | Attribution Angel | Hot red. Every attribution model leads to you. |
| 6 | 1001+ | Karen's MVP | Hot pink. You've transcended privacy. |

Each level shifts the popup's accent color, unlocks increasingly unhinged quips, and shows a progress bar to the next tier.

## The Popup

Click the extension icon to see:

- **A toggle** to turn it on/off ("Accepting cookies" / "Taking a break")
- **Your count** under "Bros tracking you:"
- **Your level title** and a progress bar to the next rank
- **A quip** — randomly selected, with more unlocking at higher levels:

> *"Somewhere, a retargeting algorithm just shed a tear of joy."*

> *"You're not a user. You're a first-party data goldmine."*

> *"Google's ad personalization just shows a picture of your face."*

> *"They're going to name a martech category after you."*

> *"Third-party cookies may be dying, but not on your watch."*

## Contributing

Found a site where it doesn't work? Got a quip that would make Oatly's copywriter jealous? See [CONTRIBUTING.md](CONTRIBUTING.md).

The most common contribution is adding new cookie banner selectors — check out `src/content.js` and the 4-layer system described above.

## License

[MIT](LICENSE) — do whatever you want with it. Track responsibly.

# Track Me Bro — Chrome Web Store Listing

## Short Description (132 chars max)

Auto-accept ALL cookies everywhere. Be the hero marketers deserve.


## Detailed Description

Track Me Bro automatically accepts every cookie consent banner on every website you visit. You install it. It clicks "Accept All" everywhere. Karen in Marketing finally hits her Q3 targets. Everybody wins.

HOW IT WORKS

Every time you visit a website with a cookie consent banner, Track Me Bro finds the "Accept All" button and clicks it for you. Automatically. On every site. No questions asked.

It uses a 4-layer detection system to find consent buttons:
- Recognizes 60+ major consent platforms (OneTrust, Cookiebot, Didomi, TrustArc, and more)
- Catches common CSS patterns like #accept-cookies and .cookie-accept
- Finds buttons by text ("Accept All", "I Agree", "Got it") only inside cookie-related containers
- Catches accessibility-labeled consent buttons via ARIA attributes

It also handles banners that load after the page using a MutationObserver, and retries for the slow ones.

THE BRO LEVEL SYSTEM

The more cookies you accept, the higher you rank. It's like a corporate loyalty program, but for surveillance.

Level 1: Cookie Rookie (0-10 sites) — You're still innocent.
Level 2: Data Donor (11-50 sites) — You're getting generous with your data.
Level 3: Pixel Pal (51-150 sites) — The pixels know your name.
Level 4: Tracking Titan (151-500 sites) — Marketers write case studies about you.
Level 5: Attribution Angel (501-1000 sites) — Every attribution model leads to you.
Level 6: Karen's MVP (1001+ sites) — You've transcended privacy. You ARE the tracking pixel now.

Each level shifts the accent color, unlocks increasingly unhinged quips, and shows a progress bar to the next tier.

SAMPLE QUIPS

"Somewhere, a retargeting algorithm just shed a tear of joy."
"You're not a user. You're a first-party data goldmine."
"Google's ad personalization just shows a picture of your face."
"Third-party cookies may be dying, but not on your watch."
"That click was worth approximately $0.003 in CPM revenue."
"A marketing intern just got their first qualified lead. Thanks to you."

WHAT IT DOESN'T DO

Track Me Bro does not collect your data, phone home, or run analytics. It doesn't inject ads. It doesn't sell your browsing history. The irony would be too on-the-nose, even for us.

Built with love for the marketers who market to the marketers.


## Category Recommendation

Primary: Fun
Secondary: Productivity


## Privacy Policy

TRACK ME BRO — PRIVACY POLICY

Last updated: February 2026

Track Me Bro is a browser extension that automatically accepts cookie consent banners. This privacy policy explains what data the extension handles and how it is stored.

WHAT WE COLLECT

Track Me Bro stores the following data locally on your device:

1. A count of how many websites have had their cookie banners accepted. This is a single number.
2. A list of domain names where cookie banners were accepted. This is used solely for deduplication so the same site is not counted twice.
3. Your on/off toggle preference.

WHAT WE DO NOT COLLECT

- No personal information (name, email, IP address, etc.)
- No browsing history beyond the domain deduplication list
- No analytics or telemetry of any kind
- No data is sent to any server, third party, or external service
- No advertising identifiers or tracking pixels (yes, we see the irony)

WHERE DATA IS STORED

- The toggle state and acceptance count are stored in chrome.storage.sync, which syncs across your signed-in Chrome browsers via your Google account. This is a standard Chrome API and the data never passes through our servers.
- The domain list is stored in chrome.storage.local, which stays on your device and is never synced or transmitted.

DATA RETENTION

All data persists until you uninstall the extension or clear extension storage. There is no server-side data to delete because there is no server.

THIRD-PARTY SERVICES

Track Me Bro uses zero third-party services, SDKs, or analytics platforms. The extension consists entirely of client-side JavaScript running in your browser.

CHANGES TO THIS POLICY

If we ever update this policy, the updated text will be included in the extension listing and in the project repository.

CONTACT

For questions about this privacy policy, open an issue on our GitHub repository.

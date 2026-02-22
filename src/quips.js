// Level definitions — shared by popup.js and referenced by background.js
const LEVELS = [
  { min: 0, title: 'Cookie Rookie', color: '#4A90D9' },
  { min: 11, title: 'Data Donor', color: '#7B68EE' },
  { min: 51, title: 'Pixel Pal', color: '#E67E22' },
  { min: 151, title: 'Tracking Titan', color: '#FF6B35' },
  { min: 501, title: 'Attribution Angel', color: '#FF4444' },
  { min: 1001, title: "Karen's MVP", color: '#FF1493' },
];

function getLevel(count) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (count >= LEVELS[i].min) return { ...LEVELS[i], index: i };
  }
  return { ...LEVELS[0], index: 0 };
}

function getNextLevel(count) {
  for (const level of LEVELS) {
    if (count < level.min) return level;
  }
  return null;
}

// Base quips — available at all levels
const BASE_QUIPS = [
  "You're basically a saint. A trackable saint.",
  "Your data is out there living its best life.",
  "Somewhere, a retargeting algorithm just shed a tear of joy.",
  "You're the reason Karen in Marketing hit her Q3 targets.",
  "Plot twist: the cookies were tracking you anyway.",
  "Your browser history called. It said you're welcome.",
  "Congrats, you're now in 47 lookalike audiences.",
  "A/B tests everywhere just got more statistically significant.",
  "You just made a CDP very, very happy.",
  "Third-party cookies may be dying, but not on your watch.",
  "A marketing intern just got their first qualified lead. Thanks to you.",
  "Somewhere, a dashboard just turned green.",
  "Your privacy? A small price for better ad relevance.",
  "You're not a user. You're a first-party data goldmine.",
  "Attribution models everywhere just got a little less confused.",
  "A pixel just fired. And it was beautiful.",
  "You're single-handedly keeping the ad-tech ecosystem alive.",
  "That click was worth approximately $0.003 in CPM revenue.",
  "Your data profile just leveled up. Achievement unlocked.",
  "The algorithm sees you. The algorithm loves you.",
];

// Tier quips — unlock progressively as you level up
const TIER_QUIPS = [
  // Level 1: Cookie Rookie (0-10)
  [
    "Baby's first tracking pixel. We're so proud.",
    "You're crawling before you walk. But you're crawling toward the ad server.",
    "10 sites? That's not even a warm-up for Karen.",
  ],
  // Level 2: Data Donor (11-50)
  [
    "You're donating data like it's a blood drive. Type O-negative cookies.",
    "50 sites deep and your digital twin is getting eerily accurate.",
    "A lookalike audience was just built in your image. You should be flattered.",
    "Your data broker just upgraded their office. Thanks to you.",
  ],
  // Level 3: Pixel Pal (51-150)
  [
    "150 sites. You're not browsing anymore — you're performing community service.",
    "Every pixel on the internet knows your name. Well, your cookie ID.",
    "You've been categorized into so many segments, you're basically a pie chart.",
    "A DMP just named a server rack after you.",
  ],
  // Level 4: Tracking Titan (151-500)
  [
    "500 sites. Your data footprint has its own carbon offset program.",
    "Marketers write case studies about users like you.",
    "Your cookie profile is thicker than your LinkedIn resume.",
    "A DSP just sent you a thank-you card. Check your retargeted ads.",
  ],
  // Level 5: Attribution Angel (501-1000)
  [
    "1,000 sites. You're not a user anymore — you're a dataset.",
    "Every multi-touch attribution model leads back to you.",
    "Your data has been enriched so many times it has a PhD.",
    "Ad exchanges fight over your bid requests. You're a hot commodity.",
  ],
  // Level 6: Karen's MVP (1001+)
  [
    "You've transcended privacy. You ARE the tracking pixel now.",
    "Google's ad personalization just shows a picture of your face.",
    "GDPR was written because of someone like you. But in reverse.",
    "Your cookie consent powers a small country's ad economy.",
    "They're going to name a martech category after you.",
  ],
];

function getRandomQuip(count) {
  const level = getLevel(count);
  // Build pool: base quips + all unlocked tier quips up to current level
  let pool = [...BASE_QUIPS];
  for (let i = 0; i <= level.index; i++) {
    pool = pool.concat(TIER_QUIPS[i]);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

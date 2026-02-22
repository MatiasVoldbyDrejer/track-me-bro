// Track Me Bro - Background Service Worker

// Duplicated from quips.js (MV3 service workers can't share modules without bundling)
const LEVELS = [
  { min: 0, color: '#4A90D9' },
  { min: 11, color: '#7B68EE' },
  { min: 51, color: '#E67E22' },
  { min: 151, color: '#FF6B35' },
  { min: 501, color: '#FF4444' },
  { min: 1001, color: '#FF1493' },
];

function getLevelColor(count) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (count >= LEVELS[i].min) return LEVELS[i].color;
  }
  return LEVELS[0].color;
}

let acceptedDomains = new Set();
let totalCount = 0;

async function initialize() {
  const syncData = await chrome.storage.sync.get({
    enabled: true,
    count: 0,
  });
  const localData = await chrome.storage.local.get({
    acceptedDomains: [],
  });

  totalCount = syncData.count;
  acceptedDomains = new Set(localData.acceptedDomains);
  updateBadge(totalCount);
}

const initPromise = initialize();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'COOKIE_ACCEPTED') {
    handleCookieAccepted(message.domain);
    sendResponse({ success: true });
  }

  if (message.type === 'GET_STATE') {
    sendResponse({ count: totalCount });
  }

  return true;
});

async function handleCookieAccepted(domain) {
  await initPromise;
  const normalizedDomain = domain.replace(/^www\./, '');

  if (acceptedDomains.has(normalizedDomain)) return;

  acceptedDomains.add(normalizedDomain);
  totalCount = acceptedDomains.size;

  await chrome.storage.local.set({
    acceptedDomains: Array.from(acceptedDomains),
  });
  await chrome.storage.sync.set({ count: totalCount });

  updateBadge(totalCount);
}

function updateBadge(count) {
  let text = '';
  if (count > 0 && count <= 9999) {
    text = String(count);
  } else if (count > 9999) {
    text = Math.floor(count / 1000) + 'k';
  }
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color: getLevelColor(count) });
}

chrome.runtime.onStartup.addListener(initialize);
chrome.runtime.onInstalled.addListener(initialize);

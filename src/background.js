// Track Me Bro - Background Service Worker

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

initialize();

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
  chrome.action.setBadgeBackgroundColor({ color: '#FF6B35' });
}

chrome.runtime.onStartup.addListener(initialize);
chrome.runtime.onInstalled.addListener(initialize);

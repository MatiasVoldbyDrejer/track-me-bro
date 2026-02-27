// Track Me Bro - Cookie Banner Detection & Auto-Accept
// Because marketers have feelings too.

const CONFIG = {
  INITIAL_DELAY: 800,
  CLICK_DELAY: 300,
  MAX_RETRIES: 5,
  RETRY_INTERVAL: 1500,
  OBSERVER_TIMEOUT: 15000,
  MAX_CLICKS_PER_PAGE: 3,
};

// Layer 1: Platform-specific selectors (highest confidence)
const PLATFORM_SELECTORS = [
  // OneTrust
  '#onetrust-accept-btn-handler',
  '#accept-recommended-btn-handler',
  // Optanon (older OneTrust)
  '.optanon-allow-all',
  // CookiePro (OneTrust subsidiary)
  '#cookiepro-accept',
  // Cookiebot
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '#CybotCookiebotDialogBodyButtonAccept',
  // Osano
  '.osano-cm-accept-all',
  // CookieYes
  '.cky-btn-accept',
  // Quantcast
  '.qc-cmp2-summary-buttons button[mode="primary"]',
  '.qc-cmp2-summary-buttons > button:first-child',
  // TrustArc
  '#truste-consent-button',
  // Didomi
  '#didomi-notice-agree-button',
  // Usercentrics
  '[data-testid="uc-accept-all-button"]',
  // Klaro
  '.klaro .cm-btn-success',
  // Borlabs Cookie (WordPress)
  '#BorlabsCookieBox .brlbs-btn-accept-all',
  // Complianz (WordPress)
  '.cmplz-accept',
  // GDPR Cookie Compliance (WordPress)
  '.moove-gdpr-infobar-allow-all',
  // CookieConsent (popular JS library)
  '.cc-compliance .cc-allow',
  '.cc-btn.cc-allow',
  // Termly
  '[data-tid="banner-accept"]',
  // Cookie Script
  '#cookiescript_accept',
  // Iubenda
  '.iubenda-cs-accept-btn',
  // Evidon
  '#_evidon-accept-button',
  // consentmanager.net
  '.cmpboxbtn.cmpboxbtnyes',
  // Cookie Information (coi)
  '.coi-banner__accept',
  // Cookie Control (Civic)
  '#ccc-close',
  '#ccc-recommended-settings',
  // Tarteaucitron
  '#tarteaucitronAllAllowed',
  '.tarteaucitronAllow',
  // Orejime
  '.orejime-Button--save',
  // EZ Cookie
  '#ez-ok-cookies',
  // HubSpot
  '#hs-eu-confirmation-button',
  // Cookie Notice by dFactory (WordPress)
  '#cn-accept-cookie',
  // Cookie Law Info (WordPress)
  '#cookie_action_close_header',
  // WP AutoTerms
  '.wpautoterms-btn-agree',
  // Axeptio
  '[data-reach="accept"]',
  // CookieHub
  '.ch2-allow-all-btn',
  // Pandectes (Shopify)
  '.pandectes-accept',
  // Sourcepoint
  '.sp_choice_type_11',
  'button[title="Accept all"]',
  // Google Funding Choices
  '.fc-cta-consent',
  // Commanders Act / TrustCommander
  '#consent-accept-button',
  // LiveRamp / Faktor
  '.lfr-btn-accept',
  // CookieFirst
  '.cf-accept-all',
  // Shopify native
  '.shopify-cookie-banner__btn--accept',
  // Admiral
  '.almnd-accept-btn',
  // Sirdata
  '.sd-cmp-KkCkG',
  // Piwik PRO
  '.ppms_cm_agree-to-all',
  // EU Cookie Law plugin (WordPress)
  '#catapult-cookie-bar .has-cookies-btn',
  // GDPR Framework
  '.gdpr-agreement',
  // Securiti
  '.consent-accept-button',
  // Drupal EU Cookie Compliance
  '.agree-button.eu-cookie-compliance-default-button',
  // Magento
  '#btn-cookie-allow',
  // Shopware CookiePermission
  '.cookie-permission--accept-button',
  // Sibbo
  '.sibbo-popup__accept',
  // Adzapier
  '.adz-accept-btn',
  // UniConsent
  '.unic-consent .unic-accept',
  // CMP by Conversant
  '.cmp-accept',
  // Pubtech
  '.pubtech-cmp-accept',
  // Free Cookie Consent
  '.fcc-btn--confirm',
  // Ezoic
  '#ez-accept-all',
];

// Layer 2: Generic CSS patterns
const GENERIC_SELECTORS = [
  '.cookie-accept',
  '.cookie-consent-accept',
  '.cookies-accept-all',
  '#accept-cookies',
  '#accept-consent',
  '#acceptAllCookies',
  '#acceptCookies',
  '[data-action="accept-cookies"]',
  '[data-action="accept"]',
  '[data-response="accept"]',
  '[data-consent="accept"]',
  '[data-cookie-accept]',
  '[data-gdpr="accept"]',
  '[data-cookie="accept"]',
  '[data-cookieconsent="accept"]',
  '[data-cc-action="accept"]',
  '[data-cli-action="accept"]',
  '.js-accept-cookies',
  '.js-cookie-accept',
  '.js-consent-accept',
  '.accept-cookies-button',
  '.cookie-banner__accept',
  '.cookie-bar__accept',
  '.cookie-popup__accept',
  '.cookie-warning__accept',
  '.cookie-alert__accept',
  '.cookie-consent__accept',
  '.cookie-agreement-accept',
  '.cookie-btn-accept',
  '.consent-accept',
  '.consent-banner__accept',
  '.consent-give',
  '.consent-allow',
  '.gdpr-accept',
  '.gdpr-consent-accept',
  '.cc-accept',
  '.cc-dismiss',
  '.cookie-notice-accept',
  '.privacy-accept',
  '.accept-all-cookies',
  '.accept-all',
  '.allow-cookies',
  '#cookie-accept',
  '#cookie-bar-accept',
  '#cookie-banner-accept',
  '#gdpr-accept',
  '#accept-all',
  '#allow-cookies',
  '.btn-cookie-accept',
];

// Layer 3: Button text patterns
const ACCEPT_TEXT_PATTERNS = [
  /^accept\s*all(\s*cookies)?$/i,
  /^allow\s*all(\s*cookies)?$/i,
  /^accept\s*cookies?$/i,
  /^allow\s*cookies?$/i,
  /^i?\s*agree(\s*to\s*all)?$/i,
  /^got\s*it[!.]?$/i,
  /^ok(ay)?[!.]?$/i,
  /^accept\s*(&|and)\s*continue$/i,
  /^accept\s*(&|and)\s*close$/i,
  /^accept\s*(&|and)\s*proceed$/i,
  /^close\s*(&|and)\s*accept$/i,
  /^agree\s*(&|and)\s*continue$/i,
  /^agree\s*(&|and)\s*close$/i,
  /^save\s*(&|and)\s*accept$/i,
  /^continue\s*to\s*site$/i,
  /^continue$/i,
  /^confirm(\s*all)?$/i,
  /^consent$/i,
  /^accept\s*all\s*&\s*visit/i,
  /^yes,?\s*i\s*accept/i,
  /^i\s*accept(\s*all)?$/i,
  /^i\s*understand$/i,
  /^that'?s?\s*ok(ay)?$/i,
  /^accept\s*selected$/i,
  /^enable\s*all$/i,
  /^allow\s*all\s*cookies$/i,
  /^accept$/i,
  /^allow$/i,
];

const REJECT_TEXT_PATTERNS = [
  /reject/i,
  /decline/i,
  /deny/i,
  /refuse/i,
  /manage\s*(my)?\s*(cookie)?/i,
  /customiz/i,
  /preferences/i,
  /settings/i,
  /necessary\s*only/i,
  /essential\s*only/i,
  /more\s*info/i,
  /learn\s*more/i,
  /read\s*more/i,
  /cookie\s*policy/i,
  /privacy\s*policy/i,
];

// Layer 4: ARIA label patterns
const ARIA_ACCEPT_PATTERNS = [
  /accept.*cookie/i,
  /allow.*cookie/i,
  /consent/i,
  /accept\s*all/i,
  /allow\s*all/i,
  /^i\s*accept$/i,
  /^i\s*agree$/i,
  /dismiss.*cookie/i,
  /close.*cookie.*banner/i,
];

const ARIA_REJECT_PATTERNS = [
  /invit/i,
  /connect/i,
  /friend\s*request/i,
  /follow/i,
  /subscribe/i,
  /newsletter/i,
  /notification/i,
  /endorse/i,
  /recommend/i,
];

// Helpers

function isVisible(el) {
  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden') return false;
  if (parseFloat(style.opacity) === 0) return false;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;
  return true;
}

function isClickable(el) {
  return !el.disabled && el.getAttribute('aria-disabled') !== 'true';
}

function hasCookieAncestor(el, maxDepth = 6) {
  let current = el.parentElement;
  let depth = 0;
  while (current && depth < maxDepth) {
    const identifiers = ((current.id || '') + ' ' + (current.className || '')).toLowerCase();
    if (/cookie|consent|gdpr|privacy|banner|cmp|notice|tracking|compliance|overlay|dialog|modal/.test(identifiers)) {
      return true;
    }
    current = current.parentElement;
    depth++;
  }
  return false;
}

function matchesAny(text, patterns) {
  return patterns.some((p) => p.test(text));
}

// Detection layers

function trySelectors(selectors) {
  for (const selector of selectors) {
    try {
      const el = document.querySelector(selector);
      if (el && isVisible(el) && isClickable(el)) return el;
    } catch {
      // Invalid selector, skip
    }
  }
  return null;
}

function tryTextContentMatching() {
  const candidates = document.querySelectorAll(
    'button, [role="button"], a, input[type="submit"], input[type="button"]'
  );
  for (const el of candidates) {
    const text = (el.textContent || '').trim();
    if (text.length === 0 || text.length > 50) continue;
    if (!matchesAny(text, ACCEPT_TEXT_PATTERNS)) continue;
    if (matchesAny(text, REJECT_TEXT_PATTERNS)) continue;
    if (!isVisible(el) || !isClickable(el)) continue;
    if (!hasCookieAncestor(el)) continue;
    return el;
  }
  return null;
}

function tryAriaLabelMatching() {
  const candidates = document.querySelectorAll('[aria-label]');
  for (const el of candidates) {
    const label = el.getAttribute('aria-label') || '';
    if (!matchesAny(label, ARIA_ACCEPT_PATTERNS)) continue;
    if (matchesAny(label, ARIA_REJECT_PATTERNS)) continue;
    if (!isVisible(el) || !isClickable(el)) continue;
    if (!hasCookieAncestor(el)) continue;
    return el;
  }
  return null;
}

function scanForBanner() {
  return (
    trySelectors(PLATFORM_SELECTORS) ||
    trySelectors(GENERIC_SELECTORS) ||
    tryTextContentMatching() ||
    tryAriaLabelMatching()
  );
}

// Click execution

function clickAcceptButton(button) {
  button.scrollIntoView({ behavior: 'instant', block: 'nearest' });

  setTimeout(() => {
    button.click();
    button.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    try {
      chrome.runtime.sendMessage({
        type: 'COOKIE_ACCEPTED',
        domain: window.location.hostname,
      });
    } catch {
      // Extension context may be invalidated, ignore
    }
  }, CONFIG.CLICK_DELAY);
}

// Main orchestration

let clickCount = 0;
let hasAccepted = false;

async function main() {
  // Only run in top frame or frames that look like cookie banners
  // (all_frames: true is set, so we run everywhere)

  const { enabled } = await chrome.storage.sync.get({ enabled: true });
  if (!enabled) return;

  // Phase 1: Initial delayed scan
  setTimeout(() => {
    const button = scanForBanner();
    if (button) {
      clickAcceptButton(button);
      clickCount++;
      hasAccepted = true;
      return;
    }

    // Phase 2: Retry loop
    let retries = 0;
    const retryInterval = setInterval(() => {
      if (hasAccepted || retries >= CONFIG.MAX_RETRIES) {
        clearInterval(retryInterval);
        return;
      }
      const btn = scanForBanner();
      if (btn) {
        clickAcceptButton(btn);
        clickCount++;
        hasAccepted = true;
        clearInterval(retryInterval);
      }
      retries++;
    }, CONFIG.RETRY_INTERVAL);
  }, CONFIG.INITIAL_DELAY);

  // Phase 3: MutationObserver for dynamically injected banners
  let debounceTimer;
  const observer = new MutationObserver((mutations) => {
    if (hasAccepted || clickCount >= CONFIG.MAX_CLICKS_PER_PAGE) return;

    const hasNewNodes = mutations.some((m) => m.addedNodes.length > 0);
    if (!hasNewNodes) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const btn = scanForBanner();
      if (btn) {
        clickAcceptButton(btn);
        clickCount++;
        hasAccepted = true;
        observer.disconnect();
      }
    }, 200);
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Auto-disconnect observer after timeout
  setTimeout(() => {
    observer.disconnect();
  }, CONFIG.OBSERVER_TIMEOUT);
}

// Listen for toggle changes in real time
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.enabled) {
    if (changes.enabled.newValue && !hasAccepted) {
      main();
    }
  }
});

main();

document.addEventListener('DOMContentLoaded', async () => {
  const toggleSection = document.getElementById('cookie-toggle');
  const toggleUI = document.getElementById('toggle-ui');
  const toggleLabel = document.getElementById('toggle-label');
  const statusText = document.getElementById('status-text');
  const broChar = document.getElementById('bro-char');
  const counter = document.getElementById('counter');
  const quipEl = document.getElementById('quip');
  const refreshBtn = document.getElementById('refresh-quip');
  const levelTitle = document.getElementById('level-title');
  const levelNumber = document.getElementById('level-number');
  const progressFill = document.getElementById('progress-fill');
  const nextLevelName = document.getElementById('next-level-name');
  const nextLevelRemaining = document.getElementById('next-level-remaining');

  // Version tag from manifest
  const versionTag = document.getElementById('version-tag');
  versionTag.textContent = 'VER. ' + chrome.runtime.getManifest().version;

  // Load state
  const data = await chrome.storage.sync.get({
    enabled: true,
    count: 0,
  });

  let enabled = data.enabled;
  updateToggleUI(enabled);
  updateCounter(data.count);
  updateLevelUI(data.count);

  // Pick a quip
  if (data.count === 0) {
    quipEl.textContent = 'NO COOKIES ACCEPTED YET. ARE YOU EVEN BROWSING?';
  } else {
    quipEl.textContent = getRandomQuip(data.count);
  }

  // Toggle handler — click on the whole toggle section
  toggleSection.addEventListener('click', async () => {
    enabled = !enabled;
    updateToggleUI(enabled);
    await chrome.storage.sync.set({ enabled });
  });

  // Refresh quip
  refreshBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const count = parseInt(counter.textContent.replace(/,/g, '')) || 0;
    quipEl.textContent = getRandomQuip(count);
  });

  // Real-time count updates while popup is open
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.count) {
      const newCount = changes.count.newValue;
      const oldVal = parseInt(counter.textContent.replace(/,/g, '')) || 0;
      animateCounter(counter, oldVal, newCount);
      updateLevelUI(newCount);
      quipEl.textContent = getRandomQuip(newCount);
    }
  });

  function updateToggleUI(isEnabled) {
    if (isEnabled) {
      toggleUI.classList.add('active');
      toggleLabel.textContent = 'ACCEPTING ALL';
      statusText.textContent = '-> ACTIVE';
      broChar.classList.remove('sad');
      broChar.classList.add('happy');
    } else {
      toggleUI.classList.remove('active');
      toggleLabel.textContent = 'PAUSED';
      statusText.textContent = '-> PAUSED';
      broChar.classList.remove('happy');
      broChar.classList.add('sad');
    }
  }

  function updateCounter(count) {
    counter.textContent = count.toLocaleString();
  }

  function updateLevelUI(count) {
    const level = getLevel(count);
    const next = getNextLevel(count);

    // Set accent color
    document.documentElement.style.setProperty('--accent-color', level.color);

    // Level number (1-indexed, zero-padded)
    const lvlNum = String(level.index + 1).padStart(2, '0');
    levelNumber.textContent = 'LVL.' + lvlNum;

    // Level title
    levelTitle.textContent = level.title;

    // Counter (also update here for initial load)
    updateCounter(count);

    // Progress bar + next level info
    if (next) {
      const prevMin = level.min;
      const progress = ((count - prevMin) / (next.min - prevMin)) * 100;
      progressFill.style.width = Math.min(progress, 100) + '%';
      nextLevelName.textContent = 'NEXT: ' + next.title;
      const remaining = next.min - count;
      nextLevelRemaining.textContent = remaining.toLocaleString() + ' TO GO';
    } else {
      // Max level
      progressFill.style.width = '100%';
      nextLevelName.textContent = 'MAX LEVEL';
      nextLevelRemaining.textContent = 'ABSOLUTE LEGEND';
    }
  }
});

function animateCounter(el, from, to) {
  if (from === to) {
    el.textContent = to.toLocaleString();
    return;
  }
  const duration = 600;
  const start = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (to - from) * eased);
    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

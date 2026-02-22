document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.getElementById('toggle');
  const toggleStatus = document.getElementById('toggle-status');
  const counter = document.getElementById('counter');
  const quipEl = document.getElementById('quip');
  const subtitle = document.querySelector('.subtitle');
  const levelTitle = document.getElementById('level-title');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');

  // Load state
  const data = await chrome.storage.sync.get({
    enabled: true,
    count: 0,
  });

  toggle.checked = data.enabled;
  toggleStatus.textContent = data.enabled ? 'Accepting cookies' : 'Taking a break';
  animateCounter(counter, 0, data.count);
  updateLevelUI(data.count);

  // Pick a quip
  if (data.count === 0) {
    quipEl.textContent = 'No cookies accepted yet. Are you even browsing?';
  } else {
    quipEl.textContent = getRandomQuip(data.count);
  }

  // Toggle handler
  toggle.addEventListener('change', async () => {
    const enabled = toggle.checked;
    toggleStatus.textContent = enabled ? 'Accepting cookies' : 'Taking a break';
    await chrome.storage.sync.set({ enabled });
  });

  // Real-time count updates while popup is open
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.count) {
      const newCount = changes.count.newValue;
      const oldVal = parseInt(counter.textContent) || 0;
      animateCounter(counter, oldVal, newCount);
      updateLevelUI(newCount);
      quipEl.textContent = getRandomQuip(newCount);
    }
  });

  function updateLevelUI(count) {
    const level = getLevel(count);
    const next = getNextLevel(count);

    // Set accent color
    document.documentElement.style.setProperty('--accent', level.color);

    // Set level title in subtitle area
    subtitle.textContent = level.title;
    levelTitle.textContent = level.title;

    // Progress bar
    if (next) {
      const prevMin = level.min;
      const progress = ((count - prevMin) / (next.min - prevMin)) * 100;
      progressFill.style.width = Math.min(progress, 100) + '%';
      progressLabel.textContent = count + ' / ' + next.min + ' to ' + next.title;
    } else {
      // Max level
      progressFill.style.width = '100%';
      progressLabel.textContent = 'Max level. You absolute legend.';
    }
  }
});

function animateCounter(el, from, to) {
  if (from === to) {
    el.textContent = to;
    return;
  }
  const duration = 600;
  const start = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

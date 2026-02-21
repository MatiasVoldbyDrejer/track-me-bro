document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.getElementById('toggle');
  const toggleStatus = document.getElementById('toggle-status');
  const counter = document.getElementById('counter');
  const quipEl = document.getElementById('quip');

  // Load state
  const data = await chrome.storage.sync.get({
    enabled: true,
    count: 0,
  });

  toggle.checked = data.enabled;
  toggleStatus.textContent = data.enabled ? 'Accepting cookies' : 'Taking a break';
  animateCounter(counter, 0, data.count);

  // Pick a quip (or special message for 0)
  if (data.count === 0) {
    quipEl.textContent = 'No cookies accepted yet. Are you even browsing?';
  } else {
    quipEl.textContent = getRandomQuip();
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
      const oldVal = parseInt(counter.textContent) || 0;
      animateCounter(counter, oldVal, changes.count.newValue);
      quipEl.textContent = getRandomQuip();
    }
  });
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

function getRandomQuip() {
  return QUIPS[Math.floor(Math.random() * QUIPS.length)];
}

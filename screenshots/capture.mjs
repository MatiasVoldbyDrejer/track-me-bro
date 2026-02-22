import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 380, height: 600 },
    deviceScaleFactor: 2, // retina-quality screenshots
  });

  // --- Active state ---
  const activePage = await context.newPage();
  await activePage.goto('file://' + join(__dirname, 'mockup.html'));
  await activePage.waitForLoadState('networkidle');
  // Give the font a moment to render
  await activePage.waitForTimeout(1000);
  await activePage.screenshot({
    path: join(__dirname, 'popup-active.png'),
    clip: { x: 0, y: 0, width: 380, height: 600 },
  });
  console.log('Saved popup-active.png');

  // --- Paused state ---
  await activePage.click('#cookie-toggle');
  await activePage.waitForTimeout(300);
  await activePage.screenshot({
    path: join(__dirname, 'popup-paused.png'),
    clip: { x: 0, y: 0, width: 380, height: 600 },
  });
  console.log('Saved popup-paused.png');
  await activePage.close();

  // --- Character close-up ---
  const charContext = await browser.newContext({
    viewport: { width: 400, height: 400 },
    deviceScaleFactor: 2,
  });
  const charPage = await charContext.newPage();
  await charPage.goto('file://' + join(__dirname, 'mockup-character.html'));
  await charPage.waitForLoadState('networkidle');
  await charPage.waitForTimeout(500);
  await charPage.screenshot({
    path: join(__dirname, 'bro-character.png'),
    omitBackground: true, // transparent background
  });
  console.log('Saved bro-character.png');

  await browser.close();
  console.log('Done! Screenshots saved to screenshots/');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});

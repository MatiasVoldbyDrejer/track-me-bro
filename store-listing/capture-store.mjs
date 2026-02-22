import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function capture() {
  const browser = await chromium.launch();

  // Screenshot: 1280x800
  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto('file://' + join(__dirname, 'screenshot.html'));
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: join(__dirname, 'screenshot.png'),
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    console.log('Saved screenshot.png (1280x800)');
    await ctx.close();
  }

  // Promo tile: 440x280
  {
    const ctx = await browser.newContext({
      viewport: { width: 440, height: 280 },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto('file://' + join(__dirname, 'promo-tile.html'));
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: join(__dirname, 'promo-tile.png'),
      clip: { x: 0, y: 0, width: 440, height: 280 },
    });
    console.log('Saved promo-tile.png (440x280)');
    await ctx.close();
  }

  await browser.close();
  console.log('Done!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});

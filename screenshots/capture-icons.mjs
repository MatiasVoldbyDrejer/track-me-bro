import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'icons');

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 128, height: 128 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  await page.goto('file://' + join(__dirname, 'icon-source.html'));
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  // Capture 128px icon
  const buffer = await page.screenshot({
    omitBackground: true,
    clip: { x: 0, y: 0, width: 128, height: 128 },
  });
  await sharp(buffer).png().toFile(join(iconsDir, 'icon-128.png'));
  console.log('Saved icon-128.png');

  // Resize to smaller sizes with nearest-neighbor for pixel-art crispness
  for (const size of [48, 32, 16]) {
    await sharp(buffer)
      .resize(size, size, { kernel: sharp.kernel.nearest })
      .png()
      .toFile(join(iconsDir, `icon-${size}.png`));
    console.log(`Saved icon-${size}.png`);
  }

  await browser.close();
  console.log('Done! Icons saved to icons/');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});

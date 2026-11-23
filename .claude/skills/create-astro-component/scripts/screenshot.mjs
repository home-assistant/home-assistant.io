// Screenshot a page, or one element of it, at a given viewport width.
//
//   node screenshot.mjs <url> <out.png> <width> [selector] [space-above]
//
// With a selector, the image is clipped to that element plus
// `space-above` pixels of the page above it (default 0), so a footer
// can be captured together with the artwork that leads into it.
import { chromium } from "./playwright.mjs";

const [, , url, out, width, selector, above = "0"] = process.argv;
if (!url || !out || !width) {
  console.error("usage: screenshot.mjs <url> <out.png> <width> [selector] [space-above]");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 },
});
await page.goto(url, { waitUntil: "networkidle" });
// Web fonts and icon scripts settle after the network goes idle.
await page.waitForTimeout(1500);

if (selector) {
  const box = await page.locator(selector).first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { y: r.top + window.scrollY, height: r.height };
  });
  const y = Math.max(0, box.y - Number(above));
  await page.screenshot({
    path: out,
    fullPage: true,
    clip: { x: 0, y, width: Number(width), height: box.height + (box.y - y) },
  });
} else {
  await page.screenshot({ path: out, fullPage: true });
}
await browser.close();
console.log(out);

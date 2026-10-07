// Print the box and the computed styles that matter for a visual match
// (font, size, color, weight, margins, padding) for each selector.
//
//   node measure.mjs <url> <width> <selector> [selector...]
//
// Positions are relative to the first selector's box, so the same
// call against the Jekyll page and the Astro stage gives comparable
// numbers even when the component sits at a different page offset.
import { chromium } from "./playwright.mjs";

const [, , url, width, ...selectors] = process.argv;
if (!url || !width || selectors.length === 0) {
  console.error("usage: measure.mjs <url> <width> <selector> [selector...]");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 },
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const rows = await page.evaluate((selectors) => {
  const origin = document.querySelector(selectors[0]);
  const originBox = origin ? origin.getBoundingClientRect() : { top: 0, left: 0 };
  const top = originBox.top + scrollY;
  const left = originBox.left + scrollX;
  return selectors.map((selector) => {
    const el = document.querySelector(selector);
    if (!el) return [selector, null];
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return [
      selector,
      {
        x: r.left + scrollX - left,
        y: r.top + scrollY - top,
        w: r.width,
        h: r.height,
        font: `${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily.split(",")[0]}`,
        color: cs.color,
        margin: cs.margin,
        padding: cs.padding,
        letterSpacing: cs.letterSpacing,
      },
    ];
  });
}, selectors);

for (const [selector, box] of rows) {
  console.log(selector, box ? JSON.stringify(box) : "(not found)");
}
await browser.close();

// Put two screenshots side by side with captions, for the pull request.
//
//   node compare.mjs <out.png> <width> <jekyll.png> <astro.png>
//
// `width` is the viewport width both screenshots were taken at; each
// image is shown at that width so the pair reads at true scale.
import { readFileSync } from "node:fs";
import { chromium } from "./playwright.mjs";

const [, , out, width, jekyll, astro] = process.argv;
if (!out || !width || !jekyll || !astro) {
  console.error("usage: compare.mjs <out.png> <width> <jekyll.png> <astro.png>");
  process.exit(1);
}

const dataUrl = (file) =>
  `data:image/png;base64,${readFileSync(file).toString("base64")}`;
const panel = (caption, file) => `
  <figure style="margin:0">
    <figcaption style="padding:0 0 8px">${caption}</figcaption>
    <img src="${dataUrl(file)}" style="display:block;width:${width}px">
  </figure>`;

const html = `<!doctype html>
<body style="margin:0;background:#666;color:#fff;font:600 14px system-ui">
  <div style="display:flex;gap:16px;padding:16px">
    ${panel("Jekyll (live)", jekyll)}
    ${panel("Astro", astro)}
  </div>
</body>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width) * 2 + 48, height: 600 },
});
await page.setContent(html);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);

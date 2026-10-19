// Shared Playwright loader for the scripts in this directory.
//
// Playwright is not part of the repository. Install it once per
// session into the scratchpad directory (see SKILL.md), then run the
// scripts from that directory or point PLAYWRIGHT_DIR at it.
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.env.PLAYWRIGHT_DIR ?? process.cwd();
const entry = path.join(root, "node_modules/playwright/index.mjs");

let chromium;
try {
  ({ chromium } = await import(pathToFileURL(entry)));
} catch {
  console.error(
    `Playwright not found at ${root}. Install it there (npm i playwright && ` +
      `npx playwright install chromium) or set PLAYWRIGHT_DIR.`,
  );
  process.exit(1);
}

export { chromium };

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Brand logos come from the Open Home Foundation brand assets API
// (https://ohf-brands.netlify.app/api/), the stable, CI-validated
// source for every Open Home Foundation mark. The pages never link
// the API directly: this integration downloads the marks listed in
// `assets` at build time (and when the dev server starts) into
// `src/assets/brands/`, and components import them from there like
// any other local file. The directory is gitignored.
//
// A download that fails falls back to the copy from the previous
// build when there is one, with a warning, so a hiccup at the API
// cannot fail a deploy that has the files already. Without a cached
// copy the build fails, since the pages would ship broken images.
const API = "https://brands.openhomefoundation.org/api/";

export default function brandAssets({ assets, dir = "src/assets/brands" }) {
  return {
    name: "brand-assets",
    hooks: {
      "astro:config:setup": async ({ config, logger }) => {
        const target = path.join(fileURLToPath(config.root), dir);
        await mkdir(target, { recursive: true });
        await Promise.all(
          Object.entries(assets).map(([file, endpoint]) =>
            download(new URL(endpoint, API), path.join(target, file), logger),
          ),
        );
      },
    },
  };
}

async function download(url, file, logger) {
  const name = path.basename(file);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const body = Buffer.from(await response.arrayBuffer());
    // Skip the write (and the file's mtime change) when nothing changed.
    if (existsSync(file) && body.equals(await readFile(file))) return;
    // Write next to the target and rename, so a failed write never
    // leaves a truncated file behind for the next build to use.
    await writeFile(`${file}.tmp`, body);
    await rename(`${file}.tmp`, file);
    logger.info(`Downloaded ${name}`);
  } catch (error) {
    if (existsSync(file)) {
      logger.warn(
        `Could not download ${name} from ${url} (${error.message}); ` +
          `using the copy from the previous build.`,
      );
      return;
    }
    throw new Error(
      `Could not download brand asset ${name} from ${url}: ${error.message}`,
      { cause: error },
    );
  }
}

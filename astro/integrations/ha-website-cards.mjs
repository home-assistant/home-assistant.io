import { createHash } from "node:crypto";
import { cpSync, createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Live dashboard cards (src/components/LiveCard.astro) run on a bundle
// built by the Home Assistant frontend and installed as the
// @home-assistant/website-cards package. The website never builds the
// frontend itself: this integration serves the installed package at
// /ha-cards/ in the dev server and copies it into the build output.
//
// The bundle's entry file keeps its name between builds, so the
// integration hands LiveCard a URL with a hash of its content in it
// (import.meta.env.HA_CARDS_BUNDLE): a new build gets a new URL instead
// of a stale copy from the browser cache.
//
// The package is built and committed with website-cards/build.mjs.
//
// Without the package installed, cards render nothing and the build
// logs a warning instead of failing.
//
// The files end up in the Astro output only (dist/ha-cards/), so the
// Jekyll-built website is not affected.
const PACKAGE = "@home-assistant/website-cards";
const BASE = "/ha-cards/";
const ENTRY = "frontend_latest/ha-website-cards.js";

const CONTENT_TYPES = {
  ".js": "text/javascript",
  ".json": "application/json",
  ".woff2": "font/woff2",
};

export default function haWebsiteCards() {
  let packageDir;

  return {
    name: "ha-website-cards",
    hooks: {
      "astro:config:setup": ({ config, updateConfig, logger }) => {
        const require = createRequire(fileURLToPath(config.root));
        let hash;
        try {
          packageDir = path.dirname(require.resolve(`${PACKAGE}/package.json`));
          hash = createHash("sha256")
            .update(readFileSync(path.join(packageDir, ENTRY)))
            .digest("hex")
            .slice(0, 12);
        } catch {
          logger.warn(
            `${PACKAGE} is not installed, so live cards stay empty.`,
          );
        }
        updateConfig({
          vite: {
            define: {
              // Relative to the site root, see LiveCard.astro.
              "import.meta.env.HA_CARDS_BUNDLE": JSON.stringify(
                hash ? `${BASE.slice(1)}${ENTRY}?v=${hash}` : "",
              ),
            },
          },
        });
      },

      "astro:server:setup": ({ server }) => {
        if (!packageDir) return;
        server.middlewares.use(BASE, (req, res, next) => {
          const file = path.join(packageDir, new URL(req.url, "http://x").pathname);
          if (!file.startsWith(packageDir) || !existsSync(file) || !statSync(file).isFile()) {
            next();
            return;
          }
          res.setHeader(
            "Content-Type",
            CONTENT_TYPES[path.extname(file)] ?? "application/octet-stream",
          );
          createReadStream(file).pipe(res);
        });
      },

      "astro:build:done": ({ dir, logger }) => {
        if (!packageDir) return;
        const target = path.join(fileURLToPath(dir), BASE);
        for (const part of ["frontend_latest", "static"]) {
          cpSync(path.join(packageDir, part), path.join(target, part), {
            recursive: true,
          });
        }
        logger.info(`Copied ${PACKAGE} to ${BASE}`);
      },
    },
  };
}

import { defineConfig } from "astro/config";
import brandAssets from "./integrations/brand-assets.mjs";
import jekyllMarkdown from "./integrations/jekyll-markdown.mjs";

// Astro builds the Home Assistant website alongside Jekyll during the
// migration. The built output must mirror Jekyll's URL scheme exactly:
// directory-style pages with trailing slashes, which build.format
// guarantees. trailingSlash only governs URL matching, and "ignore"
// makes the dev and preview servers accept both slash forms — the
// same way Netlify serves the deployed site.
export default defineConfig({
  site: "https://www.home-assistant.io",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  vite: {
    // Same-origin proxy for the Open Home Foundation livestream API
    // (src/lib/livestream.ts), so the browser isn't blocked by CORS during
    // local development. The deployed site uses the matching rewrite in
    // source/_redirects.
    server: {
      proxy: {
        "/livestream-api": {
          target: "https://web-api.openhomefoundation.org/livestream",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/livestream-api/, ""),
        },
      },
    },
    // The AUX-2 drawing loads these through a lazy import. Bundling them
    // up front keeps the dev server from discovering them late and
    // answering with "Outdated Optimize Dep" after files move.
    optimizeDeps: {
      include: [
        "three",
        "three/addons/controls/OrbitControls.js",
        "three/addons/loaders/GLTFLoader.js",
        "three/addons/libs/meshopt_decoder.module.js",
        "@dimforge/rapier3d-compat",
      ],
    },
    environments: {
      client: {
        build: {
          rolldownOptions: {
            output: {
              // Some lazily loaded chunks and models use bare hashes for
              // names. Everything else keeps Astro's usual name.[hash] pattern.
              chunkFileNames: (chunk) =>
                /^(drawing|engine)$/.test(chunk.name)
                  ? "_astro/[hash].js"
                  : `_astro/${chunk.name.replace(/@_@.*$/, "")}.[hash].js`,
              assetFileNames: (asset) => {
                const name = (asset.names?.[0] ?? "").split("@_@")[0];
                return name.endsWith(".glb") ? "_astro/[hash][extname]" : `_astro/${name.replace(/\.[^.]+$/, "")}.[hash][extname]`;
              },
            },
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Stylesheets shared with the Jekyll build refer to each
          // other from the `sass/` directory (`@use
          // "homeassistant/pages/…"`), the way `rake compile_sass`
          // passes it as a load path.
          loadPaths: ["../sass"],
        },
      },
    },
  },
  integrations: [
    jekyllMarkdown(),
    // Logos from the Open Home Foundation brand assets API, downloaded
    // into src/assets/brands/ at build time (see the integration).
    // Keys are the local file names, values the API endpoint under
    // https://brands.openhomefoundation.org/api/ (URL pattern at
    // https://ohf-brands.netlify.app/api/).
    brandAssets({
      assets: {
        "home-assistant-lockup-color-light.svg":
          "home-assistant/logo/screen/lockup/main/color/light/svg",
        "home-assistant-lockup-monochrome-dark.svg":
          "home-assistant/logo/screen/lockup/main/monochrome/dark/svg",
        "open-home-foundation-lockup-monochrome-dark.svg":
          "open-home-foundation/logo/screen/lockup/main/monochrome/dark/svg",
        "open-home-foundation-lockup-monochrome-light.svg":
          "open-home-foundation/logo/screen/lockup/main/monochrome/light/svg",
      },
    }),
  ],
});

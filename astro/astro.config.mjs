import { defineConfig } from "astro/config";
import brandAssets from "./integrations/brand-assets.mjs";
import jekyllMarkdown from "./integrations/jekyll-markdown.mjs";

// Astro builds the Home Assistant website alongside Jekyll during the
// migration. Output must mirror Jekyll's URL scheme exactly:
// directory-style pages with trailing slashes.
export default defineConfig({
  site: "https://www.home-assistant.io",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  trailingSlash: "ignore",
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
      },
    }),
  ],
});

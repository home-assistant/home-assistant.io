import { defineConfig } from "astro/config";
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
  integrations: [jekyllMarkdown()],
});

# Astro build (migration in progress)

This directory contains the [Astro](https://astro.build) build of the
Home Assistant website. The website is being migrated from Jekyll to
Astro incrementally: both stacks build the site during the migration,
and pages move over section by section.

**Nothing in this directory is served on www.home-assistant.io yet.**
Both stacks build on every deploy (`rake generate` runs the Astro
build after the Jekyll build) and in CI, but the deployed site is
still produced by Jekyll. A failed Astro build fails deploy previews
and CI; on production deploys it only warns, so it cannot block
publishing the Jekyll site while the Astro output is unused. Serving
logic (routing individual pages to their Astro version) lands in a
later change and makes the build fatal everywhere.

On Netlify deploy previews (never in production), the Astro output is
browsable at `<deploy-preview-url>/astro-preview/` — for example,
`/astro-preview/help/`. Internal links on those pages point at the
site root, so following them leads back to the Jekyll-built pages.

There is also a standalone Netlify site that builds and serves only
the Astro output, with no Jekyll involved:
<https://home-assistant-astro.netlify.app>. It serves `astro/dist`
as its site root, so only the sections built by Astro exist there —
for example, [/help/](https://home-assistant-astro.netlify.app/help/).
The site root returns a 404 until the home page is migrated.

Every deploy of the Astro build stays out of search engines until it
becomes the published website: deploy previews already serve a
deny-all `robots.txt`, and `astro/public/` ships its own deny-all
`robots.txt` plus a noindex `_headers` file so that standalone
deploys of `astro/dist` (such as the Astro preview site) are covered
too. Remove both at cutover.

## How it works

- Content is shared with Jekyll. Collections read the existing
  Markdown files in `source/` in place — same paths, same front
  matter, same syntax. Content contributions do not need to change
  during the migration.
- `integrations/jekyll-markdown.mjs` teaches Astro to treat the
  `.markdown` extension the same as `.md`, so the shared content
  files work unmodified.
- Output mirrors Jekyll's URL scheme exactly (directory-style URLs
  with trailing slashes).

## Commands

Run these from the `astro/` directory (requires Node.js >= 22.12):

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm ci`          | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the site to `astro/dist/`              |
| `npm run preview` | Serve the built site locally                 |

## Ground rules

- Keep dependencies to a minimum. Feeds, the sitemap, and the
  Liquid-compatible tag handling are written against what Astro
  ships with, not added as packages.
- Rendered output must match Jekyll's output for a page before that
  page can be served from Astro. Where Jekyll does something odd,
  raise the question of replicating versus changing it — do not
  quietly do either.

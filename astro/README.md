# Astro build (migration in progress)

This directory contains the [Astro](https://astro.build) build of the
Home Assistant website. The website is being migrated from Jekyll to
Astro incrementally: both stacks build the site during the migration,
and pages move over section by section.

**No routes are served from this directory on www.home-assistant.io
yet.** Both stacks build on every deploy (`rake generate` runs the
Astro build after the Jekyll build) and in CI, but every page on the
website is still produced by Jekyll. A failed Astro build fails
deploy previews and CI; on production deploys it only warns, so it
cannot block publishing the Jekyll site. Serving logic (routing
individual pages to their Astro version) lands in a later change and
makes the build fatal everywhere.

The Astro output is browsable on every deploy, production included,
at `/astro-preview/` — for example,
[www.home-assistant.io/astro-preview/help/](https://www.home-assistant.io/astro-preview/help/).
It is not linked from anywhere, and the website's `_headers` file
marks the whole path `noindex` so it never appears in search engines.
Internal links on those pages point at the site root, so following
them leads back to the Jekyll-built pages.

Standalone deploys of `astro/dist` as a site root are covered by
their own noindex rule: `astro/public/` ships a `_headers` file that
sends `X-Robots-Tag: noindex` on every response. Crawling is
deliberately not blocked, so crawlers fetch each page and see the
header. Remove that file at cutover.

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

The Astro workspace uses [pnpm](https://pnpm.io), pinned by the
`packageManager` field in `package.json` and provided through
Corepack — run `corepack enable` once if `pnpm` is not on your path.
Run these from the `astro/` directory (requires Node.js >= 22.12):

| Command                           | Action                                   |
| --------------------------------- | ---------------------------------------- |
| `pnpm install`                    | Install dependencies                     |
| `pnpm run dev`                    | Start the dev server at `localhost:4321` |
| `pnpm run build`                  | Build the site to `astro/dist/`          |
| `pnpm run preview`                | Serve the built site locally             |

## Ground rules

- Keep dependencies to a minimum. Feeds, the sitemap, and the
  Liquid-compatible tag handling are written against what Astro
  ships with, not added as packages.
- Rendered output must match Jekyll's output for a page before that
  page can be served from Astro. Where Jekyll does something odd,
  raise the question of replicating versus changing it — do not
  quietly do either.

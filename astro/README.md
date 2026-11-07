# Astro build (migration in progress)

This directory contains the [Astro](https://astro.build) build of the
Home Assistant website. The website is being migrated from Jekyll to
Astro incrementally: both stacks build the site during the migration,
and pages move over section by section.

**Most pages on www.home-assistant.io are still produced by Jekyll.**
Both stacks build on every deploy (`rake generate` runs the Astro
build after the Jekyll build) and in CI. The pages listed in
`served-routes.json` are served from Astro (see "Serving a page from
Astro" below); everything else Astro builds appears only under the
`/astro-preview/` path described below. A failed Astro build fails
deploy previews and CI; on production deploys it only warns, and the
served routes keep Jekyll's version of their pages, so a broken Astro
build can neither be merged nor block publishing the site.

The Astro output is browsable on every deploy, production included,
at `/astro-preview/` — for example,
[www.home-assistant.io/astro-preview/help/](https://www.home-assistant.io/astro-preview/help/).
It is not linked from anywhere, and the website's `_headers` file
marks the whole path `noindex` so it never appears in search engines.
Internal links on those pages point at the site root, so following
them leads back to the Jekyll-built pages. The build's bundled
stylesheets, scripts and images are the one exception: pages link
them at the root-absolute `/_astro/` path, so the deploy also
publishes that directory at the site root (content-hashed file
names, no clash with Jekyll's output).

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

## Serving a page from Astro

A page is served from Astro by listing its route in
`served-routes.json` (for example `"tos/"`). That does two things:

- The `pages` collection (`src/content.config.mjs`) reads the route's
  Markdown file in place (`source/tos/index.markdown`), and
  `src/pages/[...page].astro` builds it at the same URL Jekyll uses,
  with the `Page` layout: site header, the page in `Prose`, the
  feedback card and the site footer.
- After both builds, `rake generate` copies Astro's page over the one
  Jekyll built at that route (`public/tos/index.html`). Nothing is
  rewritten or redirected: Netlify serves the file it finds, so deploy
  previews show the Astro page at its real URL exactly as production
  will.

Jekyll keeps building the page too, so the Jekyll dev server still
has it and its Markdown stays shared. If the Astro build fails on a
production deploy, the copy is skipped and Jekyll's version is
published instead.

Site settings the layout needs (title, release version, search key)
come from the repository's `_config.yml`, read by `src/lib/site.mjs`,
so both stacks always show the same values.

## Commands

The Astro workspace uses [pnpm](https://pnpm.io), pinned in the
repository root's `devDependencies` (Node.js no longer bundles
Corepack) — run `npm install` in the repository root once to get it.
Run these from the `astro/` directory:

| Command                | Action                                   |
| ---------------------- | ---------------------------------------- |
| `npx pnpm install`     | Install dependencies                     |
| `npx pnpm run dev`     | Start the dev server at `localhost:4321` |
| `npx pnpm run build`   | Build the site to `astro/dist/`          |
| `npx pnpm run preview` | Serve the built site locally             |

## Brand assets

Logos come from the [Open Home Foundation brand assets
API](https://ohf-brands.netlify.app/api/), the stable, CI-validated
source for every Open Home Foundation mark. Pages never link the API
directly: `integrations/brand-assets.mjs` downloads the marks listed
in `astro.config.mjs` into `src/assets/brands/` (gitignored) when the
build or the dev server starts, and components import them from there
like any other local file. To use another mark, add its API endpoint
to that list and import the file. If the API cannot be reached, the
build keeps the copy from the previous build and warns; with no copy
to fall back on, it fails rather than ship broken images.

## Component previews

Components live in `src/components/`. To make a component show up in
the tiled component browser at
[`/astro-preview/component-preview/`](https://www.home-assistant.io/astro-preview/component-preview/),
add a `<Name>.fixtures.mjs` file next to it that describes the
component's representative states as data:

```js
// src/components/Note.fixtures.mjs
export default {
  title: "Note",
  description: "Admonition box for notes.",
  variants: [
    {
      name: "plain",
      slot: "A note with <a href='#'>a link</a>.",
      liquid: "{% note %}\nA note with [a link](#).\n{% endnote %}",
    },
    {
      name: "warning",
      props: { type: "warning" },
      slot: "Careful now.",
      liquid: "{% warning %}\nCareful now.\n{% endwarning %}",
    },
  ],
};
```

The browser discovers fixture files automatically and renders every
variant using the sibling `<Name>.astro` component — there is no
registry to update. Each tile links to a full-screen stage
(`/astro-preview/component-preview/<name>/` on the deployed site)
where the variants render at true viewport width, which is how
full-width components such as the header and footer are best
reviewed. Every tile takes a full row of the browser, so a demo
comes close to the width of the window its media queries are written
for; mark a full-width component's fixture `wide: true` to render it
edge to edge, without the demo padding. A variant meant for dark
backgrounds can set `dark: true` to render on black. Fixtures are
pure data on purpose (no `.astro` imports): the optional `liquid`
field holds the equivalent Jekyll source, so the same variants can drive the Jekyll/Astro
golden-output parity tests. The browser pages are a development aid
and are excluded from the Jekyll/Astro route parity checks.

## Ground rules

- Keep dependencies to a minimum. Feeds, the sitemap, and the
  Liquid-compatible tag handling are written against what Astro
  ships with, not added as packages.
- Rendered output must match Jekyll's output for a page before that
  page can be served from Astro. Where Jekyll does something odd,
  raise the question of replicating versus changing it — do not
  quietly do either.

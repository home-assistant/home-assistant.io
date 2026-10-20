# Connect AUX-2 page (Astro): build notes

Working notes for the Home Assistant Connect AUX-2 product page, the
first page built in Astro from a Figma design rather than ported from
Jekyll. Use this file to pick the work up again: it records where
everything is, what was decided, and what is still open.

## Status

- All sections of the Figma desktop frame are built, top to bottom.
- The page builds at `/connect/aux-2/` in `astro/dist`, so it is only
  published under `/astro-preview/connect/aux-2/`. It is not in
  `served-routes.json`, and the copy step in `rake generate` only
  handles routes Jekyll also builds (see "Not done yet").
- Copy follows the Figma file as the source of truth for now.
- Photos are placeholders exported from Figma.

## Sources

- Figma file "Connect AUX-2", key `ISl6Nx5ob1m5xpxeiWSuDM`, page "V01".
- Desktop frame: node `2002:26211` (1440 wide). Mobile frame: node
  `2022:2963` (393 wide), used as a guide for phone layouts.
- The other frames on the canvas ("Section 2 alt", "FRAME A/B",
  "before", the loose "Card" frames) are experiments. The four loose
  cards (`2546:1203` to `2546:1225`) supply the hotspot card copy.

Each section in `src/pages/connect/aux-2/index.astro` has a comment
naming its Figma frame and node IDs.

## Files

Page:

- `src/pages/connect/aux-2/index.astro`: the page, its section data
  (hotspots, cables, diagram) and page-level styles.
- `src/pages/connect/aux-2/_content.ts`: specifications and FAQ data.

Layouts:

- `src/layouts/Site.astro` (new): head, site header, footer and
  DocSearch. `Page.astro` now wraps it. The ToS page's rendered body is
  byte-identical to before the split.

Components in `src/components/connect/`, each with a `.fixtures.mjs`:

| Component | Section(s) |
| --- | --- |
| `ConnectNav` | Product bar in the hero; folds into a menu below 1140px. |
| `ConnectHero` | Hero photo, tagline, product name (the page's `h1`), lead, collaboration badge. |
| `ConnectSectionHeader` | Centered `h2` and lead ("Audio and so much more", "Incredible audio", "Deep control with serial"). |
| `ConnectFeatureCard` | Dark card with an icon. Variants: `light` (hotspot cards), `large` ("Incredible audio"), `media` slot. |
| `ConnectLabel` | Blue pill label ("The smart home multi-tool", "Connect anywhere"). |
| `ConnectHotspots` | "Connect everything": photo with clickable + points, cards and a connector line. |
| `ConnectPrice` | Price section, `id="buy"`. |
| `ConnectCollaboration` | "Every purchase supports the Open Home" banner. |
| `ConnectSpecs` | Specifications, `id="specs"`. |
| `ConnectFaq` | FAQ accordion, `id="faq"`. |

Shared component: `src/components/CollaborationBadge.astro` ("Designed
and built by"), a port of `source/_includes/collaboration/ohf-x-nabu-casa.html`
for every product page.

Assets:

- `src/assets/connect/aux-2/`: photos, the hero crop, cables, serial
  diagram parts, coverage map, exploded drawing.
- `src/assets/connect/icons/`: card icons exported from Figma.
- `src/assets/collaboration/`: Nabu Casa logos (copied from
  `source/images/collaboration/`; the brand API has no Nabu Casa mark).
- The Open Home Foundation logo comes from the brand assets API
  (added to `astro.config.mjs`).

Other changes:

- `src/styles/tokens.scss`: Connect blue and its shade, glass surface,
  muted text on dark, navy ink colors, hero and section type sizes,
  `--space-xxxlarge` (80px), `--radius-medium` (16px),
  `--layout-product-width` (1300px).
- `astro/tsconfig.json` (new): Astro's base config, so the editor
  resolves `astro:assets` and asset imports. Editor only; the build
  does not use it.
- `.claude/skills/create-astro-component/scripts/compare.mjs`: optional
  fifth argument for the left caption (for example `Figma`).

## Decisions agreed with the user

- Content width 1300px: the page sets `--layout-max-width` to
  `--layout-product-width` on its `main`.
- The + points must be clickable. The photo will later be replaced by
  another photo or a 3D model.
- Export product images from Figma for now, with a note that they need
  replacing.
- Build the desktop frame. The mobile frame guides phone layouts but is
  not followed where it is a different concept.
- Figma copy is the source of truth for now.
- Collaboration badge: copy the live badge's structure and clean the
  styling; larger size from the desk breakpoint (1140px) instead of
  768px; width fits content; Open Home Foundation logo from the brand
  API.

## Deliberate differences from Figma

These are also recorded in each component's header comment.

- Sizes snap to the token scale. Figma's 20px gaps are 24px, and its
  12px radii are 16px.
- The nav uses ZBT-2's link labels (Features, Specs, FAQ). Figma has
  "Link" placeholders. "Docs" is left out until the AUX-2 has help
  pages.
- The hero credits are the shared collaboration badge, not Figma's
  variant (colon, smaller logos). On phones the badge uses 16px logos
  and 12px gaps so it fits on one line.
- The decorative cables are positioned from the content edge, as in
  Figma. Because the content is 1300px wide instead of 1200px, less
  cable shows at 1440px. The cables are hidden below 1140px.
- Hotspots: one point is always selected, so a card always shows. The
  connector line is drawn by script for every point (Figma draws it
  only for Audio). On phones the photo zooms in on the product and the
  card sits below it.
- The "Click to rotate" button is left out until there is something to
  rotate to.
- Diagram, house map, device mockup and glow are rebuilt from exported
  parts and CSS rather than flattened screenshots, except where noted
  under "Low-resolution exports".
- No animation yet. Figma animates the card icons, cards and others.
- The "Powerful options" list sets every lead phrase in bold. Figma
  leaves the first one regular.

## Not done yet (TODO)

Assets:

- Replace the placeholder photos: hero, at-home still, ports,
  best-spot, board, back and board-logos. Several were marked
  "post-produce image" in Figma.
- The hero photo shows a third-party "ADVENT" speaker logo. A Figma
  note suggests removing it.
- "Audio and so much more" is a video in Figma, and the Figma tools
  can't export it. The page shows a 773px still. Swap in the video,
  with the still as its poster.
- Low-resolution exports that need a 2x export or an SVG from design:
  the coverage map (`coverage.png`, 590px) and the exploded drawing
  (`exploded.png`, 500px). The full SVGs are 71 KB and about 1 MB.
- Hotspot card icons: "Extend your network" and "Expand I/O" reuse the
  "Connect anywhere" icon.
- A back-side photo or 3D model, then add the rotate button. Figma's
  mobile frame shows a 3D line-art viewer ("Line art", "Rotate",
  "Export GLB") with spec tables in the cards; that is not built.

Content (check with the product and docs teams):

- Price is not final ("$69 / €59", Figma note).
- Dimensions and weights are empty placeholders in Figma.
- FAQ is placeholder ("Can I speak my mind?" five times). The other
  Connect pages read theirs from `source/_data/product/connect/`.
- The "Best spot" footnote should link to an FAQ entry about which
  adapters work (ZBT-1, ZBT-2, ZWA-2). It links to `#faq` for now.
- Copy issues:
  - "Easily add PoE or WiFi to your ZWA-2." names another product.
  - "WiFi" should be "Wi-Fi".
  - "Digital-to-Audio (DAC) chip": a DAC is a digital-to-analog
    converter.
  - "FLAC, MP3, OPUS, and WA" is probably "WAV".
  - British spelling ("Analogue") on an American English site.
  - "3,5mm" uses a decimal comma.
  - "when you plug in AUX-2 into them" is ungrammatical.
- Mobile copy in Figma differs in places, for example "PoE" instead
  of "Power-over-Ethernet" in the hero. The page uses the desktop copy.

Behavior and integration:

- Buy buttons link to `#buy`. Hook up the shared buy dialog
  (`custom/buy-dialog.html` on the Jekyll pages) when it is ported.
- The product bar is not sticky. The Jekyll Connect pages pin theirs
  on scroll.
- Serve the page at `/connect/aux-2/`. This needs a way to publish
  Astro-only routes: the `rake generate` copy step only replaces pages
  Jekyll also builds.
- Accessibility: the "Rock-solid Bluetooth" banner has gray and white
  text on a pale photo, as in Figma, and the contrast is low. Revisit
  with the final photo.
- Open question: add a 20px step to the spacing scale? Figma uses 20px
  gaps throughout.

## How to check the page

From `astro/`:

```bash
npx pnpm run build
npx pnpm run preview   # http://localhost:4321/connect/aux-2/
```

Component previews are at `/component-preview/` (Connect components
start with "Connect").

Screenshots use the scripts in
`.claude/skills/create-astro-component/scripts/` (Playwright installed
in the scratchpad, see the skill). Two tips from this build:

- Figma renders: `get_screenshot` on the section's node ID, at
  `maxDimension` equal to the frame's width. Compare with
  `compare.mjs out.png <width> figma.png astro.png Figma`.
- Images below the fold are lazy-loaded, so full-page captures can
  miss them. Scroll through the page before capturing, and clip from a
  full-page screenshot so tall sections aren't cut at the viewport
  height.

## Gotchas found while building

- Scoped page styles don't reach child components' root elements. To
  place components in a grid from the page, use `:global()` (see
  `.audio-grid`).
- Astro doesn't allow markup in the frontmatter. Choose the wrapper tag
  in the template (see `ConnectFeatureCard`).
- `z-index: -1` decoration needs an isolated parent
  (`isolation: isolate` on `main.connect`), or it disappears behind
  the page background.
- A grid with a fixed height needs `grid-template-rows: minmax(0, 1fr)`,
  or a tall image sets the row height and pushes content out of view
  (see `.powerful`).
- Figma exports of big vector groups (house map, exploded drawing,
  serial diagram) are too large to pass through the tools. Use the
  per-layer asset URLs from `get_design_context` (as for the cables and
  diagram), or a 1x `get_screenshot`.

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
- Photos are placeholders exported from Figma (updated October 2026).

## Sources

- Figma file "Connect AUX-2", key `ISl6Nx5ob1m5xpxeiWSuDM`, page "V01".
- Desktop frame: node `2002:26211` (1440 wide). Mobile frame: node
  `2022:2963` (393 wide), used as a guide for phone layouts.
- Figma library "Design System - Marketing Website": the source of
  most reusable components (for example "Banner Big"), colors and text
  styles. Its components each have a mobile layout. Check it with
  `search_design_system` and `get_variable_defs`; the variable names
  are noted next to the matching tokens in `src/styles/tokens.scss`.
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
| `BuyDialog` (in `src/components/`) | Where to buy: distributors by shipping region, from `source/_data/products.yml`; opened by any `data-buy-dialog` element or a `#buy` address. Shared with future Green, Yellow and Voice pages. |
| `ConnectNav` | Product bar, sticky over the hero and frosted white once the page scrolls, as on the ZBT-2 page; folds into a menu below 1140px. |
| `ConnectHero` | Hero photo, tagline, product name (the page's `h1`), lead, collaboration badge. |
| `ConnectSectionHeader` | Centered `h2` and lead ("Audio and so much more", "Incredible audio", "Deep control with serial"). |
| `ConnectFeatureCard` | Dark card with an icon; background and border fade out, with a border shimmer on hover. Variants: `light` (hotspot cards), `large` ("Incredible audio"), `media` slot. |
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

- `src/assets/connect/aux-2/`: photos (WebP), cables, serial diagram
  parts, coverage map, the specs drawing's three layers
  (`exploded-*`). See "Photos" below.
- `src/assets/connect/icons/`: card icons exported from Figma.
- `src/assets/collaboration/`: Nabu Casa logos (copied from
  `source/images/collaboration/`; the brand API has no Nabu Casa mark).
- The Open Home Foundation logo comes from the brand assets API
  (added to `astro.config.mjs`).

Photos:

- Exported from Figma with `get_design_context` (the full image fill,
  not a screenshot), then cropped to the area the Figma frame shows and
  saved as WebP at quality 95, so the source loses almost nothing. Astro
  compresses each size once, at `quality={85}` on every photo. Crops
  scale evenly; never resize a crop to a different shape, which
  squashes the photo.
- Some Figma image fills are soft in themselves (back, best-spot,
  ports: they look upscaled at 100%). Re-exporting from Figma will not
  fix them; they need the original photos from design.
- Where the mobile frame frames a photo differently, there is a second
  file with a `-mobile` suffix, used below the desk breakpoint through
  `ArtDirectedImage` (`hero`, `best-spot`, `board`). `back.webp` is cropped to
  cover both the desktop and the phone crop, with `object-position`
  choosing between them.
- `ports.webp` must keep its crop (2732 × 1816, the 1440 × 957 frame):
  the hotspot positions in `index.astro` are measured on it.
- The hero files are 2x crops of the Figma hero frames supplied by
  design (`hero.webp` 2880 × 1640, `hero-mobile.webp` 786 × 1238), so
  they match the frames exactly.

Shared styles, scripts and components:

- `src/components/ArtDirectedImage.astro`: a photo with an optional
  phone crop in one `<picture>` (desktop crop from 1140px), encoded at
  quality 85. Used by the hero and the best-spot and Bluetooth photos.
  Style its `<img>` from the parent with `:global(img)`.
- `src/lib/motion.ts`: `reducedMotion` (the visitor's setting) and
  `reveal(el, options)` for one-off entrance animations. `reveal` adds
  `.is-armed` at once and `.is-revealed` when the element scrolls into
  view, and does nothing with reduced motion, so an element's own
  styles are its final state. Used by the cables, the price glow and
  the specs drawing; the serial loop and the shimmer use
  `reducedMotion`.
- `src/lib/breakpoints.ts`: the tablet and desk breakpoints as media
  queries for `media` and `sizes` attributes. Keep it in step with
  `src/styles/_breakpoints.scss`.
- Three layouts: phones, tablets from 768px (`breakpoints.$tab`) and
  desktop from 1140px (`breakpoints.$desk`). Tablets keep the stacked
  sections of phones, with the feature and serial cards two to a row,
  the three short "Incredible audio" cards in a row above the Music
  Assistant card, the serial diagram at most 640px wide, the house
  map across the column, "Powerful options" and the collaboration
  banner side by side, and the video at its own shape. The photos
  switch to their desktop crops at 1140px, as before.
- `src/styles/_ring.scss`: `ring($width)`, the masked ring along an
  element's edge that the fading border and the shimmer draw on.
- `src/styles/_fade-border.scss`: the ZBT-2 cards' fading Connect-blue
  border as a mixin, `fade-border($angle, $fade)`. The feature cards
  fade from the top (180deg), the "Powerful options" card from the
  bottom (0deg). Include it after the element's `background`.
- `src/styles/shimmer.scss` and `src/lib/shimmer.ts`: the border
  shimmer from the Open Home Foundation web experiment "Card shimmer"
  (<https://web-experiments.openhomefoundation.org/experiments/card-shimmer/>).
  Add `data-shimmer="hover"` (or another mode, see the script) to an
  element with a border radius, import the stylesheet and call
  `initShimmer()`. The comet is on `::after`, not `::before` as in the
  experiment, so elements can keep `::before` for their own border.

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
- Build the desktop frame, and follow the mobile frame for phone
  layouts. Every component has a mobile layout on the marketing design
  system board, and the page should reflect it. (This replaces the
  earlier decision to use the mobile frame only as a guide.)
- Keep colors and text styles consistent with the marketing design
  system's variables.
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
- The decorative cables are positioned from Figma's 1200px column
  (not the page's 1300px content), then pulled 20% of their width
  further out (`--pull`), so they clear the heading and cards. They lie
  over the top of "Connect everything" as in Figma. They draw
  on when the section scrolls into view: each plug fades in, then its
  wire draws out from it (left out for reduced motion; without the
  script they are simply shown). The SVGs are inlined for this, with
  Figma's layer IDs removed and `.wire` and `.plug` classes added. The
  cables are hidden below 1140px.
- Hotspots: one point is always selected, so a card always shows. The
  connector line is drawn by script for every point (Figma draws it
  only for Audio). On phones the photo zooms in on the product and the
  card sits below it.
- The "Click to rotate" button is left out until there is something to
  rotate to.
- Diagram, house map, device mockup and glow are rebuilt from exported
  parts and CSS rather than flattened screenshots, except where noted
  under "Low-resolution exports".
- Animation so far: the hover effects on the dark feature cards
  (border shimmer, icon bounce), the cables drawing on, the serial
  diagram's loop (below), the price glow fading in on scroll (as on
  the ZBT-2 page, 1.5s ease-out, with a slight grow), and the specs
  drawing opening.
- Specs drawing: three layers at their Figma positions (node
  2142:53785): the lid and base shell as SVG (cleaned exports, about
  4 KB and 12 KB with Brotli; 2x WebPs would be 18 KB and 30 KB), and
  the circuit board as a 2x WebP (47 KB; its 5,700 shapes are 1.09 MB
  as SVG). The lid starts lowered by 60% of its height, its black fill
  hiding the board, and lifts to the exploded position when the
  drawing is a quarter in view (1.4s). The halves do not fit exactly when
  closed; at that size and speed it reads as a closed case. Without the
  script, or with reduced motion, the drawing is exploded.
- "Deep control with serial" plays FRAME A and FRAME B (node 2556:4664)
  on a loop while on screen: the lines grow out of the AUX-2, the glows
  pulse for 3 seconds, the lines retract, the devices cross-fade (TV
  and receiver, then solar panel and battery), and again. Figma has no
  animation data for it; the timing is in the page's script. With
  reduced motion, or without the script, FRAME A is a still. The loop
  pauses while the tab is hidden. Only the three line SVGs are inlined
  (referenced IDs prefixed per file, `.wire`, `.glow` and `.dot`
  classes added); the devices are lazy-loaded images. Figma's 90°
  rotation is baked into `solar.svg`.
  Figma also animates the card icons, cards and others.
- Feature cards: the background and border fade out as on the ZBT-2
  page's cards, but the border is a masked ring on top of the card,
  not a pseudo-element behind it (the shimmer isolates the card). The
  border fades out 60% of the way across, sooner than ZBT-2's, so the
  far edge does not show. On hover the shimmer plays, the ring around
  the icon turns white and the icon bounces once (left out when the
  visitor prefers reduced motion). Pointer hover only: the cards are not
  interactive, so they are not made focusable.
- Collaboration banner: the near-flat pale blue from Figma
  (`#a0c4d8`), replacing the lighter gradient.
- The "Powerful options" list sets every lead phrase in bold. Figma
  leaves the first one regular.
- Rock-solid Bluetooth on phones: Figma leaves out the footnote
  ("*not for Bluetooth audio"). The page keeps it because the lead's
  asterisk needs it. The text starts 42% of the card's width down, so
  it stays below the board at any width, and the card grows to fit
  instead of keeping Figma's fixed 345 × 284 shape.

## Not done yet (TODO)

Assets:

- Replace the placeholder photos with the final ones: ports,
  best-spot, board, back and board-logos (and their `-mobile` crops). The October update in Figma removed the
  third-party speaker logo from the hero.
- "Audio and so much more" is a video (`at-home.mp4`, `AutoplayVideo`):
  the source file from design (1920 × 1420, 7.1 MB) re-encoded with
  ffmpeg at 1280px wide, H.264 without sound, CRF 32 with
  `aq-mode=3` against banding on the plain wall, 122 KB. The poster
  (`at-home-poster.webp`) is its first frame. To re-encode:
  `ffmpeg -i source.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset
  veryslow -crf 32 -x264-params aq-mode=3 -pix_fmt yuv420p -movflags
  +faststart at-home.mp4`. CRF 36 (68 KB) blotches the wall.
- The coverage map (`coverage.svg`) is Figma's whole group exported
  as one SVG (after SVGO), with the badge labels as outlined paths.
  Figma's static dotted rings around the ZWA-2, the glow discs behind
  the badges and the glowing dots in the rooms are removed. The
  animated pulses that replace them (`.pulse-zwa`, `.pulse-aux`,
  `.pulse-green`) are not in Figma: they were added to the file by
  hand, under each badge.
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

- The Buy buttons open the buy dialog (`BuyDialog`), which lists the
  distributors under `aux-2` in `source/_data/products.yml`. That list
  is empty for now, so the dialog says distributors are not listed
  yet: add them in the same format as the other products. Without the
  script, the buttons link to the price section (`#buy`).
- The product bar follows the ZBT-2 page's: sticky, 120px over the
  hero, shrinking to an 80px frosted white bar once the page scrolls.
  As on the Jekyll Connect pages, the site header scrolls away
  (`stickyHeader={false}` on `Site`). The ZBT-2 bar also has a "Docs"
  link to Nabu Casa's help center; add one when the AUX-2 has a docs
  page.
- Serve the page at `/connect/aux-2/`. This needs a way to publish
  Astro-only routes: the `rake generate` copy step only replaces pages
  Jekyll also builds.
- Accessibility: the "Rock-solid Bluetooth" banner now uses the
  marketing design system's navy heading and slate body colors. The
  heading has about 8:1 contrast on the photo. The slate body text has
  about 3.6–3.8:1, which passes for the 24px desktop lead (large text)
  but not for the 16px phone lead or the footnote (WCAG AA needs
  4.5:1). Raise it with design: a darker body color on light photos,
  or a lighter photo behind the text.
- Open question: add a 20px step to the spacing scale? Figma uses 20px
  gaps throughout.
- Check every section's phone layout against its mobile layout on the
  marketing design system board (see "Decisions agreed with the
  user"). Done: Rock-solid Bluetooth, and the "Powerful options" card
  and photo stacking. Known differences so far: "Powerful options" on
  phones has four items ("Power your way", "Connect your way", "All at
  once", "Yours to shape"); the page keeps the desktop's three.

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
  diagram), or `download_assets` with `defaultFormat: "svg"`, which
  exports a whole group as one SVG. Its exports include Figma's canvas
  (a pale blue rectangle and the black Desktop frame): remove them.
  PNG exports of a clip group can ignore the clip (the specs board came
  out as a black rectangle); rasterize the SVG export instead.
- After cleaning an SVG export, run it through SVGO (in
  `node_modules/.pnpm/svgo@*/`) with two-decimal precision and
  `cleanupIds`, `collapseGroups`, `mergePaths` and `convertShapeToPath`
  turned off, so the classes, prefixed IDs and `pathLength="1"` the
  animations rely on survive. It took the serial and specs SVGs down
  by 15–62% with no visible change.

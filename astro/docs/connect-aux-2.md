# Connect AUX-2 page (Astro): build notes

Working notes for the Home Assistant Connect AUX-2 product page, the
first page built in Astro from a Figma design rather than ported from
Jekyll. Use this file to pick the work up again: it records where
everything is, what was decided, and what is still open.

## Status

- All sections of the Figma desktop frame are built, top to bottom.
- The page is served at `/connect/aux-2/`: it is in
  `served-routes.json`, and `rake generate` publishes it there (it has
  no Jekyll version). The hardware page
  (`/hardware/`) and the header's "Our hardware" menu link to it, and
  the launch teaser's old address, `/no-device-left-behind/`, redirects
  to it.
- Copy follows "Connect AUX-2 - Website copy.docx" (October 2026);
  Figma was the source before it.
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
  "before", the loose "Card" frames) are experiments.

Each section in `src/pages/connect/aux-2/index.astro` has a comment
naming its Figma frame and node IDs.

## Files

Page:

- `src/pages/connect/aux-2/index.astro`: the page, its section data
  ("Connect everything" ports, diagram) and page-level styles.
- `src/pages/connect/aux-2/_content.ts`: specifications and FAQ data.

Layouts:

- `src/layouts/Site.astro` (new): head, site header, footer and
  DocSearch. `Page.astro` now wraps it. The ToS page's rendered body is
  byte-identical to before the split.

Components in `src/components/connect/aux-2/` (only this page uses them
so far; see "Where files go" in the README), each with a
`.fixtures.mjs` unless noted. `ConnectDrawing` is there too, with its
engine in `src/lib/connect/aux-2/drawing/`:

| Component | Section(s) |
| --- | --- |
| `BuyDialog` (in `src/components/`) | Where to buy: distributors by shipping region, from `source/_data/products.yml`; opened by any `data-buy-dialog` element or a `#buy` address. Shared with future Green, Yellow and Voice pages. |
| `ConnectNav` | Product bar, sticky over the hero and frosted white once the page scrolls, as on the ZBT-2 page; folds into a menu below 1140px. |
| `ConnectHero` | Hero photo, tagline, product name (the page's `h1`), lead, collaboration badge. |
| `ConnectSectionHeader` | Centered `h2` and lead ("Audio and so much more", "Incredible audio", "Deep control with serial"). |
| `ConnectFeatureCard` | Dark card with an icon; background and border fade out, with a border shimmer on hover. Variants: `large` ("Incredible audio"), `animated` (inline icon that plays on hover), `media` slot. |
| `ConnectLabel` | Blue pill label ("The smart home multi-tool", "Connect anywhere"). |
| `ConnectHotspots` | "Connect everything": a photo of the AUX-2 on a pale blue panel, a "+" point under each port, a list of glass cards (one per port, with an icon) that a point or title opens, a line from the open point to its card, and a button that fades to a photo of the back. Port data (`ports`) is in the page. |
| `ConnectPrice` | Price section, `id="buy"`. |
| `ConnectCollaboration` | "Every purchase supports the Open Home" banner, with "Brought to you by" Nabu Casa and "A commercial partner of the" Open Home Foundation. |
| `ConnectSpecs` | Specifications, `id="specs"`. |
| `ConnectFaq` | FAQ accordion, `id="faq"`. |

Shared component: `src/components/CollaborationBadge.astro` ("Designed
and built by"), a port of `source/_includes/collaboration/ohf-x-nabu-casa.html`
for every product page.

"Connect everything" (`ConnectHotspots`):

- `src/assets/connect/aux-2/aux-2-side-audio.webp` and
  `aux-2-side-back.webp` (quality 100, served at 100) are the photos,
  from design's `1.png` and `2.png` (3926 × 2892), both cropped to the
  same 2375 × 1600 frame from 1060, 501 so the product sits left of
  centre. They are shown as the Voice PE page's features are: each
  fills the panel (from the desk width; on phones and tablets, zoomed
  1.5× on the product and faded into the panel above and below),
  "Click to rotate" fades to the other, and each point sits at its
  port's `spot` on the photo (fractions of the photo's width and
  height). The panel is the photos' backdrop blue (#a8c8e3).
- The cards are Figma's frosted glass ("Card 1/end", node 2935:8716),
  all listed, collapsed to their titles; each has an icon from the
  page's other sections (`icon` on a port), which plays once as its
  card opens (the SMIL ones are paused and played from the script). On
  phones and tablets only the open card shows, under the photo.
- From the desk width a Connect-blue line joins the open point to its
  card, with a dot at the card that sits over it.
- October 2026: eight options were shown to the team (a realistic 3D
  model, line art in several styles, and these photos); the photos were
  chosen. The 3D models, their renderer (`src/lib/line-model.ts`,
  `ConnectModel`) and the `three` dependency were then removed; they
  are in the history before that change.

Assets:

- `src/assets/connect/aux-2/`: photos (WebP), serial diagram
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
- Some Figma image fills are soft in themselves (back, best-spot: they
  look upscaled at 100%). Re-exporting from Figma will not
  fix them; they need the original photos from design.
- Where the mobile frame frames a photo differently, there is a second
  file with a `-mobile` suffix, used below the desk breakpoint through
  `ArtDirectedImage` (`hero`, `best-spot`, `board`). `back.webp` is cropped to
  cover both the desktop and the phone crop, with `object-position`
  choosing between them.
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
  styles are its final state. Used by the price glow and the specs
  drawing; the serial loop and the shimmer use
  `reducedMotion`.
- `src/lib/breakpoints.ts`: the tablet and desk breakpoints as media
  queries for `media` and `sizes` attributes. Keep it in step with
  `src/styles/_breakpoints.scss`.
- Three layouts: phones, tablets from 768px (`breakpoints.$tab`) and
  desktop from 1140px (`breakpoints.$desk`). Tablets keep the stacked
  sections of phones, with the feature and serial cards two to a row,
  the four short "Incredible audio" cards two by two above the Music
  Assistant card, the serial diagram at most 640px wide, the house
  map across the column, "Powerful options" and the collaboration
  banner side by side, and the video at its own shape. The photos
  switch to their desktop crops at 1140px, as before.
- `src/styles/_ring.scss`: `ring($width)`, the masked ring along an
  element's edge that the fading border and the shimmer draw on.
- `src/styles/_fade-border.scss`: the ZBT-2 cards' fading Connect-blue
  border as a mixin, `fade-border($angle, $fade)`. The feature cards
  fade from the top (180deg). Include it after the element's
  `background`.
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
- The website copy doc is the source of truth for copy (it replaced
  Figma's copy in October 2026).
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
  and 12px gaps so it fits on one line. On this page it reads
  "Brought to you by" with the Nabu Casa logo only, without
  the Open Home Foundation logo (the hero's `badge` prop); Figma still
  shows "Designed and built by:" with both logos.
- "Hardware with a mission" and its decorative cables are gone (October
  2026): its text is now the lead under "Audio and so much more",
  replacing Figma's "Plug in, or wirelessly connect…" subtext, and
  "Connect everything" has extra space above it instead (80px on
  phones, 104px from the desk width).
- "Connect everything" (`ConnectHotspots`) follows Figma's "Group 162"
  (node 2935:8711): the photo fills the panel, the intro at the top
  left, "Click to rotate" at the bottom left and the cards on the right.
  "Click to rotate" fades to the other photo (0.5s), closing the card,
  then opens one of the new side's cards at random.
  "Stream audio" is open at first, as in Figma (`open`); a "+" or a
  title opens its card, and selecting it again or Escape closes it.
  The open point is white in a halo (tinted Connect blue, where
  Figma's white halo disappears on the product's white). With motion,
  the halo is two rings that each grow out from the dot and fade, half
  a beat apart (2.4s); with reduced motion, it is a still halo. Points
  sit just under their ports: USB-A, RS-232 (between its two jacks;
  Figma has it under Port 2), Grove and audio on the audio side; USB-C
  and Ethernet on the back (Figma's "Section 2 alt", node 2546:1233,
  has no point on the reset button). There is no Wi-Fi and Bluetooth
  point. The cards' padding is tighter than Figma's 20px.
- Diagram, house map, device mockup and glow are rebuilt from exported
  parts and CSS rather than flattened screenshots, except where noted
  under "Low-resolution exports".
- Animation so far: the hover effects on the dark feature cards
  (border shimmer, icon bounce), the serial
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
- "Powerful options" follows the desktop frame's newer layout (node
  2198:82299, October 2026): the heading over two `ConnectFeatureCard`s
  with Figma's "Device" icon (`icons/device.svg`), the back photo
  beside them, 20px apart. The card bodies start with a capital and
  end with a period, like the other cards (Figma: "via Ethernet,
  USB-C, or Wi-Fi"). The mobile frame still shows the older single
  card with a list; phones stack the heading, cards and photo.
- Rock-solid Bluetooth on phones: Figma leaves out the footnote
  ("*not for Bluetooth audio"). The page keeps it because the lead's
  asterisk needs it. The text starts 42% of the card's width down, so
  it stays below the board at any width, and the card grows to fit
  instead of keeping Figma's fixed 345 × 284 shape.
- "Incredible audio" follows Figma's "Mobile Grid" (node 2955:1722),
  which replaces the section's cards in the desktop and mobile frames:
  four short cards in a 396px column beside the "Music Assistant
  ready" card with the devices. The Music Assistant logo sits beside
  the title like the other cards' icons (Figma has it above), and the
  icon stays beside the text on phones too. Figma's 10px between the
  cards is 12px.

## Dev feedback round 1 (October 2026)

Done: a dark scrim behind the product bar over the hero; section
padding one step up the spacing scale (40px phones, 80px desktop);
the hero photo encoded at quality 100 (further optimization by hand); a tighter tagline (line-height
1.05); `NoBreak` (`src/components/NoBreak.astro`, `src/lib/text.ts`)
around the page content, so "Home Assistant" never wraps; the cables
pushed further out (`--pull` 0.35) and drawn in one at a time from
their far ends; no icon bounce on the feature cards; Clelia's animated
icons for "Audio and so much more" (recolored white for the dark
cards, with a reduced-motion rule in each file); an ease-out shimmer;
a `powerfulShimmer` switch in the page (removed when "Powerful options" became feature cards, which always shimmer); TODO comments at the Zigbee
copy. Open: a Sendspin logo for the Sendspin card (it uses the whole
home audio icon), and the other cards' animated icons (blocked on
design and assets). The copy doc drops the "hardware with a mission"
box-out. "Connect everything" is rebuilt as `ConnectHotspots`.

## Not done yet (TODO)

Assets:

- Replace the placeholder photos with the final ones: best-spot, board, back and board-logos (and their `-mobile` crops). The October update in Figma removed the
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
- "Connect everything": the back's card copy (USB-C, Ethernet) is not
  in Figma and needs checking with the product team.

Content (check with the product and docs teams):

- Price is not final. The page shows "$69 / €59" (Figma); the copy doc
  says "$69/€69", waiting for confirmation from Gordon.
- FAQ answers have no calls to action yet. Each item takes an
  optional `cta` (`{ label, href }`) in `_content.ts`, rendered as a
  button under the answer; v2 adds them there.
- The "Best spot" footnote should link to an FAQ entry about which
  adapters work (ZBT-1, ZBT-2, ZWA-2). It links to `#faq` for now.
- Copy issues:
  - British spelling ("Analogue") on an American English site.
  - "3,5mm" uses a decimal comma.
- Mobile copy in Figma differs in places. The page uses the desktop
  copy. Mobile-only differences (checked October 2026): the Music
  Assistant card's body ("But also works out-of-the-box with Home
  Assistant."), "Synced old with new", a fourth "Powerful options"
  item ("All at once - Audio, serial, mesh, and Bluetooth,
  simultaneously."), "59€", and a collaboration text without "Music
  Assistant".
- The hero lead says "Power over Ethernet" (Figma, October 2026); the
  specs still say "Power-over-Ethernet (802.3af)", as in Figma.

Behavior and integration:

- The Buy buttons open the buy dialog (`BuyDialog`), which lists the
  distributors under `aux-2` in `source/_data/products.yml` (the
  partners marked "Received" in the AUX-2 Where to Buy links sheet).
  Without the script, the buttons link to the price section (`#buy`).
- Opening the dialog sends Plausible's "Buy Dialog" event with a
  `context` prop saying where it was opened: `navbar` (the product
  bar's Buy button), `price` (the price section's Buy button) or
  `fragment` (arriving with `#buy` in the address).
- The product bar follows the ZBT-2 page's: sticky, 120px over the
  hero, shrinking to an 80px frosted white bar once the page scrolls.
  As on the Jekyll Connect pages, the site header scrolls away
  (`stickyHeader={false}` on `Site`). The ZBT-2 bar also has a "Docs"
  link to Nabu Casa's help center; add one when the AUX-2 has a docs
  page.
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
  user"). Done: Rock-solid Bluetooth. Known differences so far:
  "Powerful options" on phones is still the older list of four items
  ("Power your way", "Connect your way", "All at once", "Yours to
  shape"); the page uses the desktop's two cards.

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

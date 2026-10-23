// Shimmer border: plays the effect in src/styles/shimmer.scss. Ported
// from the Open Home Foundation web experiment "Card shimmer"
// (https://web-experiments.openhomefoundation.org/experiments/card-shimmer/).
//
// Add data-shimmer to an element, then call initShimmer(). Modes:
//   data-shimmer          plays once when scrolled into view (default)
//   data-shimmer="always" plays every time it scrolls into view
//   data-shimmer="hover"  plays on hover or keyboard focus; on touch
//                         screens (no hover), as it scrolls through the
//                         middle of the screen, one element at a time
//                         (see `band` below). The playing element has
//                         the .is-active class, so its other hover
//                         styles can follow (`:hover, .is-active`)
//   data-shimmer="manual" only plays when you call shimmer(el)

import { reducedMotion } from "./motion";

// Devices that cannot hover, such as phones.
const noHover = matchMedia("(hover: none)");

// On touch screens, "hover" elements take turns in the middle fifth of
// the screen: the first in page order that has not played yet becomes
// .is-active and shimmers; HOLD later the next one does, and so on.
// Cards side by side (a tablet's 2 × 2 grid) reach the middle together
// and play one after the other instead of as a pair. The last one
// stays active until it leaves the middle; leaving resets an element,
// so it plays again next time.
const HOLD = 1200;
const inBand = new Set<HTMLElement>();
const played = new WeakSet<HTMLElement>();
let active: HTMLElement | null = null;
let holding = 0;

function inPageOrder(a: HTMLElement, b: HTMLElement) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

function playNext() {
  if (holding) return;
  const next = [...inBand].sort(inPageOrder).find((el) => !played.has(el));
  if (!next) return;
  active?.classList.remove("is-active");
  active = next;
  next.classList.add("is-active");
  played.add(next);
  shimmer(next);
  holding = window.setTimeout(() => {
    holding = 0;
    playNext();
  }, HOLD);
}

const band = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        inBand.add(el);
      } else {
        inBand.delete(el);
        played.delete(el);
        el.classList.remove("is-active");
        if (active === el) active = null;
      }
    }
    playNext();
  },
  { rootMargin: "-40% 0px -40% 0px" },
);

interface Options {
  selector: string;
  threshold: number;
  rootMargin: string;
  // Milliseconds between elements that enter the viewport together.
  stagger: number;
}

const DEFAULTS: Options = {
  selector: "[data-shimmer]",
  threshold: 0.5,
  rootMargin: "0px 0px -10% 0px",
  stagger: 120,
};

const bound = new WeakSet<Element>();

// Play the shimmer on one element, restarting it if it is already running.
export function shimmer(el: HTMLElement, delay = 0) {
  if (reducedMotion.matches) return;
  el.style.setProperty("--shimmer-delay", `${delay}ms`);
  // Restarting needs a reflow between removing and adding the class.
  if (el.classList.contains("is-shimmering")) {
    el.classList.remove("is-shimmering");
    void el.offsetWidth;
  }
  el.classList.add("is-shimmering");
}

function onAnimationEnd(event: AnimationEvent) {
  if (event.animationName === "shimmer-sweep") {
    (event.currentTarget as HTMLElement).classList.remove("is-shimmering");
  }
}

function onHover(event: Event) {
  const el = event.currentTarget as HTMLElement;
  if (!el.classList.contains("is-shimmering")) shimmer(el);
}

// Wire up every [data-shimmer] element under root. Safe to call again
// for new content.
export function initShimmer(
  options: Partial<Options> = {},
  root: ParentNode = document,
) {
  const opts = { ...DEFAULTS, ...options };
  const els = [...root.querySelectorAll<HTMLElement>(opts.selector)].filter(
    (el) => !bound.has(el),
  );
  const io = new IntersectionObserver(
    (entries) => {
      let i = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        shimmer(el, i++ * opts.stagger);
        if ((el.dataset.shimmer || "once") === "once") io.unobserve(el);
      }
    },
    { threshold: opts.threshold, rootMargin: opts.rootMargin },
  );
  for (const el of els) {
    bound.add(el);
    el.classList.add("shimmer");
    el.addEventListener("animationend", onAnimationEnd);
    const mode = el.dataset.shimmer || "once";
    if (mode === "hover") {
      el.addEventListener("pointerenter", onHover);
      el.addEventListener("focusin", onHover);
      if (noHover.matches) band.observe(el);
    } else if (mode !== "manual") {
      io.observe(el);
    }
  }
}

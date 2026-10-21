// Shimmer border: plays the effect in src/styles/shimmer.scss. Ported
// from the Open Home Foundation web experiment "Card shimmer"
// (https://web-experiments.openhomefoundation.org/experiments/card-shimmer/).
//
// Add data-shimmer to an element, then call initShimmer(). Modes:
//   data-shimmer          plays once when scrolled into view (default)
//   data-shimmer="always" plays every time it scrolls into view
//   data-shimmer="hover"  plays on hover or keyboard focus
//   data-shimmer="manual" only plays when you call shimmer(el)

import { reducedMotion } from "./motion";

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
    } else if (mode !== "manual") {
      io.observe(el);
    }
  }
}

// Shared helpers for decorative motion.

// The visitor's reduced-motion setting. Animations that move things do
// not run while it matches.
export const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

interface RevealOptions extends IntersectionObserverInit {
  // The element to watch, when it is not the element itself.
  target?: Element;
}

// Play a one-off entrance animation when an element scrolls into view.
// The element gets .is-armed straight away (style its "before" state
// on that) and .is-revealed once it is in view. Without the script, or
// when the visitor prefers reduced motion, neither class is set, so the
// element's own styles are its final state.
export function reveal(
  el: Element,
  { target = el, ...options }: RevealOptions = {},
) {
  if (reducedMotion.matches) return;
  el.classList.add("is-armed");
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    el.classList.add("is-revealed");
    io.disconnect();
  }, options);
  io.observe(target);
}

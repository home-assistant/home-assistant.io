import { haptics as H } from "./config.js";

const can = typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
let last = -Infinity;

export function buzz(name, big = false) {
  const pattern = H[name];
  if (!can || !H.on || !pattern) return;
  const now = performance.now();
  if (!big && now - last < H.gap) return;
  last = now;
  try { navigator.vibrate(pattern); } catch { }
}

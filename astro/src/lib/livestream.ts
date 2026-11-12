// Client helpers for the livestream card (src/components/LivestreamCard.astro).
// Ported from the ESPHome website (esphome/esphome.io,
// src/lib/livestream.ts), which shares the API and the card.
//
// Data comes from the Open Home Foundation Web API:
//   https://web-api.openhomefoundation.org/livestream/{slug}
// which reports a channel's current live stream, its soonest upcoming one, or
// the most recent one that ended within the last 24 hours.

// Same-origin proxy path that forwards to
// https://web-api.openhomefoundation.org/livestream, avoiding CORS: the
// site's source/_redirects on Netlify, and astro.config.mjs in development.
export const LIVESTREAM_API_BASE = "/livestream-api";
// The API itself, for fetching at build time (no browser, so no CORS).
export const LIVESTREAM_API_ORIGIN = "https://web-api.openhomefoundation.org/livestream";

export type LivestreamStatus = "live" | "upcoming" | "past" | "none";

// "loading" is a client-only state used before data has been fetched.
export type LivestreamDisplayState = LivestreamStatus | "loading";

export interface LivestreamInfo {
  channel: string;
  channelName: string;
  status: LivestreamStatus;
  title?: string;
  url?: string;
  startTime?: string;
  updatedAt: string;
}

// How far ahead/behind a stream may be and still be shown.
export const UPCOMING_WINDOW_MS = 48 * 60 * 60 * 1000;
export const PAST_WINDOW_MS = 12 * 60 * 60 * 1000;

const EYEBROW: Record<"live" | "upcoming" | "past", string> = {
  live: "Live now",
  upcoming: "Upcoming livestream",
  past: "Our latest stream",
};

// Narrow the raw API status to what the card actually shows, applying the
// tighter 48h upcoming / 12h past windows on top of the API's own logic.
export function resolveDisplayState(
  info: LivestreamInfo | null | undefined,
  now: number = Date.now(),
): LivestreamDisplayState {
  if (!info) return "none";

  switch (info.status) {
    case "live":
      return "live";
    case "upcoming": {
      if (!info.startTime) return "upcoming";
      const start = Date.parse(info.startTime);
      if (Number.isNaN(start)) return "upcoming";
      return start - now <= UPCOMING_WINDOW_MS ? "upcoming" : "none";
    }
    case "past": {
      const updated = Date.parse(info.updatedAt);
      if (Number.isNaN(updated)) return "none";
      return now - updated <= PAST_WINDOW_MS ? "past" : "none";
    }
    default:
      return "none";
  }
}

export function youtubeIdFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }
    const v = parsed.searchParams.get("v");
    if (v) return v;
    const parts = parsed.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => p === "embed" || p === "live" || p === "shorts");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    return null;
  } catch {
    return null;
  }
}

// Non-interactive, muted, autoplaying embed on the privacy-friendly domain.
export function youtubeEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    loop: "1",
    playlist: id,
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function youtubeThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function setThumbnail(thumb: HTMLImageElement, id: string): void {
  // Already showing this video's thumbnail (the one the page was built
  // with): leave it, so the image doesn't swap and jump.
  if (thumb.dataset.videoId === id && thumb.getAttribute("src")) return;
  thumb.dataset.videoId = id;
  thumb.src = youtubeThumbnailUrl(id);
  // maxres isn't guaranteed to exist; fall back to the always-present size.
  thumb.onerror = () => {
    thumb.onerror = null;
    thumb.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  };
}

// Live cards show their thumbnail until the first page interaction, then load
// the real iframe. This keeps the initial page load light (no YouTube embed
// requests) until the visitor actually engages with the page.
let livePlayersArmed = false;
function armLivePlayers(): void {
  if (livePlayersArmed || typeof document === "undefined") return;
  livePlayersArmed = true;

  const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"];
  const init = () => {
    events.forEach((event) => window.removeEventListener(event, init));
    document.querySelectorAll<HTMLElement>('.livestream-card[data-player="pending"]').forEach((card) => {
      const player = card.querySelector<HTMLIFrameElement>(".livestream-card__player");
      const id = card.dataset.videoId;
      if (player && id) player.src = youtubeEmbedUrl(id);
      card.dataset.player = "ready";
    });
  };

  events.forEach((event) => window.addEventListener(event, init, { passive: true }));
}

// Live countdown text for an upcoming stream, e.g. "Live in 2h 15m".
export function formatCountdown(startMs: number, now: number = Date.now()): string {
  let secs = Math.floor((startMs - now) / 1000);
  if (secs <= 0) return "Live soon";

  const days = Math.floor(secs / 86400);
  secs -= days * 86400;
  const hours = Math.floor(secs / 3600);
  secs -= hours * 3600;
  const mins = Math.floor(secs / 60);
  secs -= mins * 60;

  if (days > 0) return `Live in ${days}d ${hours}h`;
  if (hours >= 12) return `Live in ${hours}h`; // only show minutes under 12h
  if (hours > 0) return `Live in ${hours}h ${mins}m`;
  if (mins > 0) return `Live in ${mins}m ${secs}s`;
  return `Live in ${secs}s`;
}

// Absolute start time rendered in the visitor's own locale and timezone.
export function formatLocalStartTime(startTime: string | undefined): string {
  if (!startTime) return "";
  const start = Date.parse(startTime);
  if (Number.isNaN(start)) return "";
  return new Date(start).toLocaleString(undefined, {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Per-card countdown intervals, so a re-render or state change can cancel them.
const countdownTimers = new WeakMap<HTMLElement, ReturnType<typeof setInterval>>();

function stopCountdown(root: HTMLElement): void {
  const timer = countdownTimers.get(root);
  if (timer !== undefined) {
    clearInterval(timer);
    countdownTimers.delete(root);
  }
}

function startCountdown(root: HTMLElement, target: HTMLElement, startTime: string): void {
  stopCountdown(root);
  const startMs = Date.parse(startTime);
  if (Number.isNaN(startMs)) {
    target.textContent = "";
    return;
  }
  const tick = () => {
    target.textContent = formatCountdown(startMs);
    if (startMs - Date.now() <= 0) stopCountdown(root);
  };
  tick();
  countdownTimers.set(root, setInterval(tick, 1000));
}

// Drive an existing card's DOM into the state implied by `info`. Returns the
// resolved state so callers can react (e.g. hide the card when "none").
export function applyLivestreamState(
  root: HTMLElement,
  info: LivestreamInfo | null | undefined,
  now: number = Date.now(),
): LivestreamDisplayState {
  const state = resolveDisplayState(info, now);
  root.dataset.state = state;

  const player = root.querySelector<HTMLIFrameElement>(".livestream-card__player");
  const thumb = root.querySelector<HTMLImageElement>(".livestream-card__thumb");
  const eyebrow = root.querySelector<HTMLElement>(".livestream-card__eyebrow");
  const title = root.querySelector<HTMLElement>(".livestream-card__title");
  const meta = root.querySelector<HTMLElement>(".livestream-card__meta");

  // Always clear the iframe first so a hidden player never keeps playing.
  player?.removeAttribute("src");

  if (state === "none" || state === "loading" || !info) {
    stopCountdown(root);
    delete root.dataset.player;
    delete root.dataset.videoId;
    if (root instanceof HTMLAnchorElement) root.removeAttribute("href");
    return state;
  }

  if (root instanceof HTMLAnchorElement && info.url) {
    root.href = info.url;
  }

  stopCountdown(root);
  if (title) title.textContent = info.title ?? info.channelName;

  // Upcoming streams show a live countdown in the badge and the absolute local
  // start time below; other states use their static eyebrow label.
  const showCountdown = state === "upcoming" && !!info.startTime;
  if (showCountdown && eyebrow) {
    startCountdown(root, eyebrow, info.startTime as string);
  } else if (eyebrow) {
    eyebrow.textContent = EYEBROW[state];
  }
  if (meta) meta.textContent = showCountdown ? formatLocalStartTime(info.startTime) : "";

  const id = youtubeIdFromUrl(info.url);

  // Always show the thumbnail first, even when live, so the YouTube iframe is
  // only loaded once the visitor interacts (see armLivePlayers).
  if (id && thumb) {
    setThumbnail(thumb, id);
  } else if (thumb) {
    thumb.removeAttribute("src");
  }

  if (state === "live" && id && player) {
    root.dataset.videoId = id;
    root.dataset.player = "pending";
    armLivePlayers();
  } else {
    delete root.dataset.player;
    delete root.dataset.videoId;
  }

  return state;
}

export async function fetchLivestream(slug: string, signal?: AbortSignal): Promise<LivestreamInfo | null> {
  try {
    const res = await fetch(`${LIVESTREAM_API_BASE}/${encodeURIComponent(slug)}`, { signal });
    if (!res.ok) return null;
    return (await res.json()) as LivestreamInfo;
  } catch {
    return null;
  }
}

// The channel's stream as the page is built, so the card is in the page
// before any JavaScript runs (and without it). A failure or a slow answer
// means no card at build time; the browser still fetches its own.
export async function fetchLivestreamAtBuild(slug: string, timeoutMs = 5000): Promise<LivestreamInfo | null> {
  try {
    const res = await fetch(`${LIVESTREAM_API_ORIGIN}/${encodeURIComponent(slug)}`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    return (await res.json()) as LivestreamInfo;
  } catch {
    return null;
  }
}

// The start time for a page built without the visitor's time zone, e.g.
// "Wed, November 11, 20:00 UTC". The browser replaces it with local time.
export function formatUtcStartTime(startTime: string | undefined): string {
  if (!startTime) return "";
  const start = Date.parse(startTime);
  if (Number.isNaN(start)) return "";
  const date = new Date(start).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", timeZone: "UTC" });
  const time = new Date(start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
  return `${date}, ${time} UTC`;
}

export const EYEBROW_TEXT = EYEBROW;

// The best thumbnail a video has, checked at build time: the 16:9
// high-resolution one when YouTube has made it, otherwise the standard
// one, which every video has (4:3, with black bars).
export async function bestThumbnailAtBuild(id: string, timeoutMs = 5000): Promise<string> {
  const best = youtubeThumbnailUrl(id);
  try {
    const res = await fetch(best, { method: "HEAD", signal: AbortSignal.timeout(timeoutMs) });
    if (res.ok) return best;
  } catch {
    // Fall through to the one that always exists.
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

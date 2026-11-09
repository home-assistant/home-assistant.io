import { copy } from "./config.js";

const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.14v13.72L19 12z"></path></svg>';

export function createOverlay(box, { onAgain, onAction = () => {}, text = true, height = true }) {
  const el = document.createElement("div");
  el.className = "x3acb";
  el.innerHTML = `
    <p class="x90db" hidden></p>
    <dl class="xe37f" hidden>
      <div><dt>${copy.units}</dt><dd data-units>0</dd></div>
      <div><dt>${copy.total}</dt><dd data-total>0</dd></div>
      <div><dt>${copy.peak}</dt><dd data-peak>0</dd></div>
    </dl>
    <span class="x1e4f" hidden>${copy.close}</span>
    <div class="xc86c" hidden></div>
    <div class="xbf86" hidden></div>
    <p class="x2386" hidden></p>
    <dl class="x4cb2" hidden></dl>
    <div class="xdbc8" hidden>
      <p></p>
      <button type="button" class="xbdb7" aria-label="${copy.again}">${PLAY_ICON}</button>
    </div>
    <button type="button" class="x5250" aria-label="${copy.credits.open}" aria-expanded="false" aria-controls="xa325">?</button>
    <section class="xa325" id="xa325" aria-label="${copy.credits.title}" hidden>
      <h2>${copy.credits.title}</h2>
      <p>${copy.credits.made.replaceAll("<a ", '<a target="_blank" rel="noopener" ')}</p>
      <ul>${copy.credits.notes.map(([what, licence]) => `<li><span>${what}</span><span>${licence}</span></li>`).join("").replaceAll("<a ", '<a target="_blank" rel="noopener" ')}</ul>
    </section>`;
  box.appendChild(el);

  const creditsOpen = el.querySelector(".x5250"), credits = el.querySelector(".xa325");
  function showCredits(on) {
    credits.hidden = !on;
    creditsOpen.setAttribute("aria-expanded", String(on));
  }
  for (const node of [creditsOpen, credits]) node.addEventListener("pointerdown", (e) => e.stopPropagation());
  creditsOpen.addEventListener("click", (e) => { e.stopPropagation(); showCredits(credits.hidden); });
  credits.addEventListener("click", (e) => e.stopPropagation());
  const onOutside = (e) => { if (!credits.hidden && !credits.contains(e.target) && e.target !== creditsOpen) showCredits(false); };
  const onEscape = (e) => {
    if (e.key !== "Escape" || credits.hidden) return;
    e.stopImmediatePropagation();
    e.preventDefault();
    showCredits(false);
    creditsOpen.focus({ preventScroll: true });
  };
  document.addEventListener("pointerdown", onOutside);
  document.addEventListener("keydown", onEscape, true);
  const $ = (s) => el.querySelector(s);
  const counts = $(".xe37f"), units = $("[data-units]"), total = $("[data-total]"), peak = $("[data-peak]");
  const close = $(".x1e4f"), end = $(".xdbc8"), endText = end.querySelector("p");
  const again = end.querySelector("button");
  again.addEventListener("click", (e) => { e.stopPropagation(); onAgain(); });
  again.addEventListener("pointerdown", (e) => e.stopPropagation());
  const heightEl = $(".x90db");
  const actions = $(".xc86c");
  actions.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    e.stopPropagation();
    onAction(b.dataset.kind);
  });

  const thumbAt = new Map();
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  function slide(root) {
    for (const g of root.querySelectorAll(".x3438[data-group]")) {
      let t = g.querySelector(".x2958");
      if (!t) {
        t = document.createElement("span");
        t.className = "x2958";
        t.setAttribute("aria-hidden", "true");
        g.prepend(t);
      }
      const b = g.querySelector(".is-current");
      if (!b || !b.offsetWidth) { t.style.opacity = "0"; continue; }
      const to = { x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight };
      const from = thumbAt.get(g.dataset.group);
      const put = (p) => {
        t.style.transform = `translate(${p.x}px, ${p.y}px)`;
        t.style.width = `${p.w}px`;
        t.style.height = `${p.h}px`;
      };
      if (from && !still.matches) {
        t.style.transition = "none";
        put(from);
        void t.offsetWidth;
        t.style.transition = "";
      }
      put(to);
      t.style.opacity = "1";
      thumbAt.set(g.dataset.group, to);
      if (g.scrollWidth > g.clientWidth) {
        const pad = 24, left = to.x - pad, right = to.x + to.w + pad;
        if (left < g.scrollLeft) g.scrollTo({ left, behavior: still.matches ? "auto" : "smooth" });
        else if (right > g.scrollLeft + g.clientWidth) g.scrollTo({ left: right - g.clientWidth, behavior: still.matches ? "auto" : "smooth" });
      }
    }
    edges(root);
  }

  function edges(root) {
    for (const g of root.querySelectorAll(".x3438.x66bf")) {
      const max = g.scrollWidth - g.clientWidth;
      g.classList.toggle("is-more-left", max > 1 && g.scrollLeft > 1);
      g.classList.toggle("is-more-right", max > 1 && g.scrollLeft < max - 1);
    }
  }
  actions.addEventListener("scroll", () => edges(actions), { capture: true, passive: true });
  actions.addEventListener("wheel", (e) => {
    const g = e.target.closest?.(".x3438.x66bf");
    if (!g || g.scrollWidth <= g.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    g.scrollLeft += e.deltaY;
  }, { passive: false });
  const resized = new ResizeObserver(() => { slide(actions); slide(benchEl); });
  resized.observe(actions);
  actions.addEventListener("pointerdown", (e) => e.stopPropagation());
  const benchEl = $(".xbf86");
  benchEl.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { e.stopPropagation(); onAction(b.dataset.kind); }
  });
  benchEl.addEventListener("pointerdown", (e) => e.stopPropagation());
  const scores = $(".x4cb2");
  const cm = (mm) => (mm < 100 ? (mm / 10).toFixed(1) : Math.round(mm / 10)) + " cm";
  const pop = (text, cls, x, y) => {
    const p = document.createElement("span");
    p.className = `x5607 ${cls}`;
    p.textContent = text;
    if (x != null) { p.style.left = `${x * 100}%`; p.style.top = `${y * 100}%`; }
    el.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  };
  let closeTimer = 0;
  const none = () => {};

  if (!text) {
    counts.remove();
    close.remove();
    end.remove();
  }
  return {
    actions({ destroy = false, modes = false, styles = null, rebuild = false } = {}, current) {
      actions.hidden = !destroy && !modes && !styles && !rebuild;
      const mode = (m) => `<button type="button" class="x7a97${m === current ? " is-current" : ""}" data-kind="m:${m}" aria-pressed="${m === current}">${copy.modes[m]}</button>`;
      actions.innerHTML = [
        destroy && !styles ? `<button type="button" class="x5612" data-kind="k1">${copy.destroy}</button>` : "",
        styles ? `<div class="x3438 x66bf">${styles.map((s) => `<button type="button" class="x7a97" data-kind="s:${s}">${copy.styles[s]}</button>`).join("")}</div>` : "",
        rebuild ? `<button type="button" class="x5612" data-kind="k2">${copy.rebuild}</button>` : "",
        modes ? `<div class="x3438" data-group="modes">${Object.keys(copy.modes).map(mode).join("")}</div>` : "",
        modes ? `<button type="button" class="xf7ca" data-kind="k4">${copy.play}</button>` : "",
      ].join("");
      slide(actions);
    },
    scores(bests, current, beaten) {
      const played = Object.keys(copy.modes).filter((m) => m in bests);
      scores.hidden = !played.length;
      scores.innerHTML = `<p class="x148c">${copy.best}</p>` + played.map((m) => `<div class="${m === current ? "is-current" : ""}${m === current && beaten ? " x6d9d" : ""}"><dt>${copy.modes[m]}</dt><dd>${cm(bests[m])}</dd></div>`).join("");
    },
    secret(dark, unlocked = true) {
      const dim = document.createElement("div");
      dim.className = "xd172";
      el.appendChild(dim);
      pop(copy.goal, "xd861 x7e9a");
      const a = dim.animate([{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], { duration: 3000, easing: "ease-in-out", fill: "forwards" });
      setTimeout(dark, 1500);
      a.finished.then(() => { dim.remove(); if (unlocked) pop(copy.unlocked, "xd861"); }, () => dim.remove());
    },
    perfect(x, y) { pop(copy.perfect, "xd38b", x, y); },
    benchStats(text) {
      const el = benchEl.querySelector(".x1126");
      if (el) el.textContent = text;
    },
    hint(text) {
      const h = $(".x2386");
      h.hidden = !text;
      if (text) h.textContent = text;
    },
    bench(auto) {
      benchEl.hidden = false;
      const opt = (k, label) => `<button type="button" class="x7a97${(auto ?? "off") === k ? " is-current" : ""}" data-kind="a:${k}" aria-pressed="${(auto ?? "off") === k}">${label}</button>`;
      benchEl.innerHTML = `<p class="x5e93">${copy.bench.title}</p>
        <p class="xddb6">${copy.bench.autostack}</p>
        <div class="x3438" data-group="auto">${opt("off", copy.bench.off)}${opt("perfect", copy.bench.perfect)}${opt("close", copy.bench.close)}</div>
        <button type="button" class="x1da6" data-kind="k3">${copy.bench.add}</button>
        <button type="button" class="x1da6" data-kind="k2">${copy.bench.build}</button>
        <p class="x1126"></p>`;
      slide(benchEl);
    },
    newBest() { pop(copy.newBest, "xd861"); },
    height: height
      ? (mm) => {
          heightEl.hidden = mm == null;
          if (mm == null) return;
          heightEl.textContent = mm < 1000 ? `${Math.round(mm)} mm` : `${(mm / 1000).toFixed(2)} m`;
        }
      : none,
    ...(text ? {} : { counts: none, close: none, end: none, clearEnd: none }),
    counts(u, t, p) {
      counts.hidden = false;
      units.textContent = u;
      total.textContent = t;
      peak.textContent = p;
    },
    close(x, y) {
      clearTimeout(closeTimer);
      close.hidden = false;
      close.style.left = `${x * 100}%`;
      close.style.top = `${y * 100}%`;
      close.classList.remove("is-on");
      void close.offsetWidth;
      close.classList.add("is-on");
      closeTimer = setTimeout(() => (close.hidden = true), 900);
    },
    end(u, t) {
      endText.textContent = copy.end(u, t);
      end.hidden = false;
    },
    clearEnd() {
      end.hidden = true;
    },
    dispose() {
      clearTimeout(closeTimer);
      resized.disconnect();
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape, true);
      el.remove();
    },
  };
}

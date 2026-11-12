import { marker as M, heights, copy } from "./config.js";

const cm = (mm) => (mm < 100 ? (mm / 10).toFixed(1) : Math.round(mm / 10)) + " cm";

export function createMarker(parent, project) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "x8c25");
  svg.setAttribute("aria-hidden", "true");
  const make = (tag, cls) => {
    const el = document.createElementNS(NS, tag);
    el.setAttribute("class", cls);
    svg.appendChild(el);
    return el;
  };
  const ghost = make("line", "x65fd");
  const ghostTick = make("line", "x54f8");
  const ghostText = make("text", "x2086");
  const pbLine = make("line", "x9fb2");
  const pbTick = make("line", "x84d0");
  const pbText = make("text", "xf772");
  const dash = make("line", "x4433");
  const tick = make("line", "x6ffa");
  const label = make("text", "x4f05");
  svg.style.display = "none";
  parent.appendChild(svg);

  let shown = 0, target = 0, mm = 0, on = false, next = -1, best = 0, step = 25;
  const mmPerUnit = () => (target > 0 ? mm / target : 100);

  return {
    set(height, millimetres, unitMm = 25) {
      target = height;
      mm = millimetres;
      step = unitMm;
      on = true;
    },
    best(millimetres) {
      best = millimetres > 0 ? millimetres : 0;
    },
    reset() {
      shown = target = mm = 0;
      next = -1;
      on = false;
      svg.style.display = "none";
    },
    step(dt, instant) {
      if (!on) return false;
      const k = instant ? 1 : 1 - Math.exp(-M.rate * dt);
      shown += (target - shown) * k;
      if (Math.abs(target - shown) < 1e-4) { shown = target; return false; }
      return true;
    },
    draw(width, height) {
      if (!on || !width || !height) return;
      svg.style.display = "";
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const inView = (y) => {
        if (project(M.x, y, M.z)[2]) return y;
        let lo = shown, hi = y;
        for (let k = 0; k < 20; k++) { const mid = (lo + hi) / 2; if (project(M.x, mid, M.z)[2]) lo = mid; else hi = mid; }
        return lo;
      };
      const at = (y) => {
        const [cx, cy] = project(M.x, y, M.z);
        const [ox, oy] = project(M.x + M.dirX, y, M.z + M.dirZ);
        const px = cx * width, py = cy * height;
        const dx = ox * width - px, dy = oy * height - py, len = Math.hypot(dx, dy) || 1;
        return [px, py, dx / len, dy / len];
      };
      const [bx, by] = at(0);
      const [cx1, cy1, ux, uy] = at(shown);
      const x0 = bx - M.gap, y0 = by, x1 = cx1 - M.gap, y1 = cy1;
      const ex = cx1 + ux * M.tick, ey = cy1 + uy * M.tick;
      dash.setAttribute("x1", x0); dash.setAttribute("y1", y0);
      dash.setAttribute("x2", x1); dash.setAttribute("y2", y1);
      tick.setAttribute("x1", cx1); tick.setAttribute("y1", cy1);
      tick.setAttribute("x2", ex); tick.setAttribute("y2", ey);
      label.setAttribute("x", x1 - 10);
      label.setAttribute("y", y1 + 5);
      const now = target > 0 ? mm * (shown / target) : 0;
      label.textContent = cm(now);

      const i = heights.findIndex((h) => h.cm * 10 > now + 0.5);
      if (i !== next) {
        next = i;
        if (i >= 0) ghostText.textContent = `${heights[i].name} · ${cm(heights[i].cm * 10)}`;
      }
      for (const el of [ghost, ghostTick, ghostText]) el.style.display = i >= 0 ? "" : "none";
      if (i >= 0) {
        const from = i > 0 ? heights[i - 1].cm * 10 : 0, to = heights[i].cm * 10;
        const near = Math.min(1, Math.max(0, (now - from) / (to - from)));
        const end = to - step, start = from + Math.max(0, end - from) * M.ghostFade;
        const fade = end > start ? 1 - Math.min(1, Math.max(0, (now - start) / (end - start))) : now >= end ? 0 : 1;
        const y = heights[i].cm * 10 / mmPerUnit();
        const [rx, ry, rux, ruy] = at(inView(y));
        const gx = rx - M.gap;
        ghost.setAttribute("x1", x1); ghost.setAttribute("y1", y1);
        ghost.setAttribute("x2", gx); ghost.setAttribute("y2", ry);
        ghost.style.opacity = M.ghostLine[0] + (M.ghostLine[1] - M.ghostLine[0]) * near * near;
        const half = M.refTick / 2;
        ghostTick.setAttribute("x1", gx - rux * half); ghostTick.setAttribute("y1", ry - ruy * half);
        ghostTick.setAttribute("x2", gx + rux * half); ghostTick.setAttribute("y2", ry + ruy * half);
        ghostTick.style.opacity = fade;
        const left = gx - 10, room = left - ghostText.getComputedTextLength() >= 4;
        ghostText.setAttribute("x", room ? left : gx + 10);
        ghostText.setAttribute("y", ry + 5);
        ghostText.style.textAnchor = room ? "end" : "start";
        ghostText.style.opacity = Math.abs(ry - y1) < 22 ? 0 : fade;
      }

      const ahead = best > now + 1;
      const want = ahead ? best / mmPerUnit() : 0, seen = ahead ? inView(want) : 0;
      const [px, py, vx, vy] = ahead ? at(seen) : [0, 0, 0, 0];
      const pbOn = ahead && seen >= want - 1e-3 && py >= 0;
      for (const el of [pbLine, pbTick, pbText]) el.style.display = pbOn ? "" : "none";
      if (pbOn) {
        const bx1 = px - M.gap, ox = -vx * M.pbTick, oy = -vy * M.pbTick;
        pbLine.setAttribute("x1", x1); pbLine.setAttribute("y1", y1);
        pbLine.setAttribute("x2", bx1); pbLine.setAttribute("y2", py);
        pbTick.setAttribute("x1", bx1); pbTick.setAttribute("y1", py);
        pbTick.setAttribute("x2", bx1 + ox); pbTick.setAttribute("y2", py + oy);
        pbText.textContent = `${copy.pb} ${cm(best)}`;
        pbText.setAttribute("x", bx1 + ox - 6);
        pbText.setAttribute("y", py + oy + 5);
        pbText.style.opacity = Math.abs(py - y1) < 22 ? 0 : 1;
      }
    },
    dispose() { svg.remove(); },
  };
}

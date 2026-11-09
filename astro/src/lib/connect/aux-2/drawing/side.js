import { CARRY, DROP, FALL, DONE, BLAST, IDLE } from "./sim.js";
import { sideView as M, column as C } from "./config.js";

export function createSideView(parent) {
  const el = document.createElement("canvas");
  el.className = "x1044";
  el.setAttribute("aria-hidden", "true");
  el.hidden = true;
  parent.appendChild(el);
  const ctx = el.getContext("2d");

  const cap = C.capacity;
  const snap = {
    n: 0, x: new Float32Array(cap), y: new Float32Array(cap), z: new Float32Array(cap),
    hx: new Float32Array(cap), hy: new Float32Array(cap), hz: new Float32Array(cap), exact: new Uint8Array(cap),
  };
  let scale = Infinity, lastCount = 0, frozen = false;

  function take(col, n) {
    snap.n = Math.min(n, cap);
    for (let i = 0; i < snap.n; i++) {
      snap.x[i] = col.pos[i * 3];
      snap.y[i] = col.pos[i * 3 + 1];
      snap.z[i] = col.pos[i * 3 + 2];
      snap.hx[i] = col.half[i];
      snap.hy[i] = col.height[i] / 2;
      snap.hz[i] = col.halfZ[i];
      snap.exact[i] = col.exact[i];
    }
  }

  const grey = (v) => { const g = Math.round(Math.min(1, v) * 255); return `rgb(${g} ${g} ${g})`; };

  function draw(col, face = [1, 1]) {
    if (col.count < lastCount) { scale = Infinity; frozen = false; }
    lastCount = col.count;
    const fallen = col.state === FALL || col.state === DONE || col.state === BLAST;
    if (fallen && frozen) return;
    if (!fallen) frozen = false;
    if (col.state === IDLE && col.placed <= 1) { el.hidden = true; return; }
    el.hidden = false;

    const carrying = col.state === CARRY || col.state === DROP;
    if (!fallen) take(col, col.placed);

    const dpr = Math.min(2, devicePixelRatio || 1);
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    const W = Math.round(w * dpr), H = Math.round(h * dpr);
    if (el.width !== W || el.height !== H) { el.width = W; el.height = H; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const [fx, fz] = face;
    const base = [snap.x[0] || 0, snap.z[0] || 0];
    const proj = (x, y, z) => {
      const X = (x - base[0]) * fx, Z = (z - base[1]) * fz;
      return [X - Z, (X + Z) / 2 - y];
    };

    const boxes = [];
    for (let i = 0; i < snap.n; i++) {
      boxes.push({ x: snap.x[i], y: snap.y[i], z: snap.z[i], hx: snap.hx[i], hy: snap.hy[i], hz: snap.hz[i], shade: i === 0 ? M.base : snap.exact[i] ? M.exact : M.unit });
    }
    if (carrying) {
      const c = col.count - 1;
      boxes.push({ x: col.pos[c * 3], y: col.pos[c * 3 + 1], z: col.pos[c * 3 + 2], hx: col.half[c], hy: col.height[c] / 2, hz: col.halfZ[c], shade: M.carry });
    }

    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
    const stack = carrying ? boxes.length - 1 : boxes.length;
    for (let b = 0; b < stack; b++) {
      const B = boxes[b];
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
        const [u, v] = proj(B.x + sx * B.hx, B.y + sy * B.hy, B.z + sz * B.hz);
        minU = Math.min(minU, u); maxU = Math.max(maxU, u); minV = Math.min(minV, v); maxV = Math.max(maxV, v);
      }
    }
    if (minU === Infinity) minU = maxU = minV = maxV = 0;
    const pad = Math.round(M.padding * dpr);
    const spanU = Math.max(maxU - minU, M.minWidth), spanV = Math.max((maxV - minV) * M.headroom, M.minHeight);
    scale = Math.min(scale, (W - pad * 2) / spanU, (H - pad * 2) / spanV);
    const ox = Math.round(W / 2 - ((minU + maxU) / 2) * scale), oy = Math.round(H - pad - maxV * scale);
    const at = (x, y, z, lift = 0) => { const [u, v] = proj(x, y, z); return [ox + Math.round(u * scale), oy + Math.round(v * scale) - lift]; };

    const dim = fallen ? M.fallenTone : 1;
    const rx = (snap.hx[0] || 0.53) + M.floorMargin, rz = (snap.hz[0] || 0.315) + M.floorMargin;
    const floor = [at(base[0] - rx * fx, 0, base[1] - rz * fz), at(base[0] + rx * fx, 0, base[1] - rz * fz), at(base[0] + rx * fx, 0, base[1] + rz * fz), at(base[0] - rx * fx, 0, base[1] + rz * fz)];
    poly(floor, grey(M.floor * dim));

    boxes.sort((a, b) => a.y - b.y);
    for (const B of boxes) {
      const tall = 2 * B.hy * scale, lift = tall > 3 ? 1 : 0;
      const c = (sx, sy, sz) => at(B.x + sx * B.hx * fx, B.y + sy * B.hy, B.z + sz * B.hz * fz, sy < 0 ? lift : 0);
      poly([c(1, -1, -1), c(1, -1, 1), c(1, 1, 1), c(1, 1, -1)], grey(B.shade * M.right * dim));
      poly([c(-1, -1, 1), c(1, -1, 1), c(1, 1, 1), c(-1, 1, 1)], grey(B.shade * M.left * dim));
      poly([c(-1, 1, -1), c(1, 1, -1), c(1, 1, 1), c(-1, 1, 1)], grey(B.shade * dim));
    }
    if (fallen) frozen = true;
  }

  function poly(points, colour) {
    ctx.beginPath();
    points.forEach(([x, y], n) => (n ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
  }

  return {
    draw,
    dispose() { el.remove(); },
  };
}

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { toCreasedNormals } from "three/addons/utils/BufferGeometryUtils.js";
import { createRenderer, loadModel, fetchModel, END_CAMERA, CENTER } from "./renderer.js";
import { createColumnView } from "./parts.js";
import { Column, loadPhysics, IDLE, CARRY, FALL, DONE, BLAST } from "./sim.js";
import { createOverlay } from "./overlay.js";
import { createSideView } from "./side.js";
import { createMarker } from "./scale.js";
import { buzz } from "./haptics.js";
import { render as R, camera as CAM, column as C, modes, styles, copy, peakKey, showText, showHeight, realHeight, allStyles, canvasLabel, events } from "./config.js";

import MODEL from "../../../../assets/connect/aux-2/a2.glb?url";
import LEVELS from "../../../../assets/connect/aux-2/a2b.glb?url";
import CAP_MODEL from "../../../../assets/connect/aux-2/a2c.glb?url";

export const preload = () => Promise.all([fetchModel(MODEL), fetchModel(LEVELS), fetchModel(CAP_MODEL)]);

const TAP_MOVE = 6, TAP_TIME = 400;
const MODES = Object.keys(modes);
const STYLES = Object.keys(styles);
const SALT = "a2-c0lumn-7f3e";
const hash = (str) => {
  let h1 = 0xdeadbeef ^ 0x51ed, h2 = 0x41c6ce57 ^ 0x51ed;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
};
const sign = (data) => hash(SALT + JSON.stringify(data));
const MAX_MM = C.capacity * realHeight.side;
const blank = () => ({ mode: "easy", bests: {}, unlocked: false, hinted: false });
const readStore = () => {
  try {
    const { d, s } = JSON.parse(localStorage.getItem(peakKey)) ?? {};
    if (!d || typeof d !== "object" || s !== sign(d)) return blank();
    const bests = {};
    for (const m of MODES) {
      const v = d.bests?.[m];
      if (v === undefined) continue;
      if (!Number.isFinite(v) || v < 0 || v > MAX_MM) return blank();
      bests[m] = v;
    }
    return { mode: MODES.includes(d.mode) ? d.mode : "easy", bests, unlocked: d.unlocked === true, hinted: d.hinted === true };
  } catch {
    return blank();
  }
};
const writeStore = (data) => {
  const d = { mode: data.mode, bests: data.bests, unlocked: !!data.unlocked, hinted: !!data.hinted };
  try { localStorage.setItem(peakKey, JSON.stringify({ d, s: sign(d) })); } catch {}
};

const track = (name, props = {}) => {
  try {
    window.plausible?.(name, { props: Object.fromEntries(Object.entries(props).map(([k, v]) => [k, String(v)])) });
  } catch {}
};

export async function mount(box, { video = null, model: modelUrl = MODEL, reducedMotion = false, holdGrid = false }) {
  const canvas = document.createElement("canvas");
  canvas.className = "x3ac9";
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", canvasLabel);
  box.appendChild(canvas);

  const gfx = createRenderer(canvas);
  const { camera } = gfx;
  let square = R.matchSize, fitMode = R.fit, laidOut = "";
  const fit = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    const key = `${w}x${h}/${square}/${fitMode}`;
    if (key === laidOut) return false;
    laidOut = key;
    gfx.layout(w, h, square, fitMode);
    return true;
  };
  box.style.setProperty("--drawing-crossfade", `${R.crossfade}s`);
  fit();

  const gltf = await loadModel(modelUrl);
  gfx.scene.add(gltf.scene);
  gltf.scene.traverse((o) => { if (o.isMesh) o.material = gfx.fill; });
  // The device as the video ends on it, kept aside for park(): starting
  // a game turns the model's own geometry into the stackable unit.
  const homeModel = gltf.scene.clone(true);
  homeModel.traverse((o) => { if (o.isMesh) o.geometry = o.geometry.clone(); });
  homeModel.visible = false;
  gfx.scene.add(homeModel);
  const view = createColumnView(gfx, gltf);
  loadModel(LEVELS).then((levels) => view.levels(levels)).catch(() => {});

  const controls = new OrbitControls(camera, canvas);
  Object.assign(controls, { enableDamping: true, dampingFactor: 0.08, enableZoom: false, enablePan: false, enabled: false });
  controls.maxPolarAngle = Math.PI / 2 - CAM.horizon;
  controls.screenSpacePanning = true;
  canvas.style.touchAction = "pan-y";
  function freeCamera(on) {
    if (on) controls.enabled = true;
    controls.enableZoom = controls.enablePan = on;
    canvas.style.touchAction = on ? "none" : "pan-y";
  }

  const homeQuat = new THREE.Quaternion().fromArray(END_CAMERA.quat);
  const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(homeQuat);
  const homePos = new THREE.Vector3().fromArray(END_CAMERA.pos);
  const homeTarget = homePos.clone().addScaledVector(forward, CENTER.clone().sub(homePos).dot(forward));
  homePos.addScaledVector(forward, -homeTarget.distanceTo(homePos) * (CAM.flatten - 1));
  const homeDist = homePos.distanceTo(homeTarget);
  controls.minDistance = homeDist * 0.2;
  controls.maxDistance = homeDist * 10;
  camera.position.copy(homePos);
  camera.quaternion.copy(homeQuat);
  controls.target.copy(homeTarget);
  controls.update();
  camera.quaternion.copy(homeQuat);
  gfx.draw();

  const rig = {
    on: false,
    target: new THREE.Vector3(), dist: homeDist, quat: new THREE.Quaternion(),
    toTarget: new THREE.Vector3(), toDist: homeDist, rate: CAM.followRate,
    returnLeft: 0,
  };
  const tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
  function rigFromCamera() {
    rig.target.copy(controls.target);
    rig.dist = camera.position.distanceTo(controls.target);
    rig.quat.copy(camera.quaternion);
    rig.returnLeft = reducedMotion ? 0 : CAM.returnTime;
    rig.on = true;
  }
  function placeCamera(target, dist, quat, out = camera) {
    out.quaternion.copy(quat);
    out.position.copy(target).addScaledVector(tmp2.set(0, 0, -1).applyQuaternion(quat), -dist);
  }
  function rigStep(dt) {
    if (!rig.on) return false;
    const k = reducedMotion ? 1 : 1 - Math.exp(-rig.rate * dt);
    const before = rig.target.y + rig.dist;
    rig.target.lerp(rig.toTarget, k);
    rig.dist += (rig.toDist - rig.dist) * k;
    let turning = false;
    if (rig.returnLeft > 0) {
      rig.returnLeft = Math.max(0, rig.returnLeft - dt);
      rig.quat.slerp(homeQuat, rig.returnLeft ? Math.min(1, dt / (rig.returnLeft + dt)) : 1);
      turning = true;
    }
    placeCamera(rig.target, rig.dist, rig.quat);
    return turning || Math.abs(rig.target.y + rig.dist - before) > 1e-6 || rig.target.distanceToSquared(rig.toTarget) > 1e-10;
  }

  function aim(col) {
    if (col.state === FALL || col.state === DONE || col.state === BLAST) {
      const blast = col.state === BLAST;
      let { x, y, z, radius, share } = spread(col, !!col.wellView);
      const w = col.wellView;
      if (w) {
        const toHole = 1 - Math.min(1, share);
        x += (w.c[0] - x) * toHole; y += (0 - y) * toHole; z += (w.c[1] - z) * toHole;
        radius += (w.radius * CAM.holeFrame - radius) * toHole;
      }
      view.toWorld(rig.toTarget, x, y, z);
      const visible = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * Math.min(gfx.view.w, gfx.view.h);
      const fit = (radius * 0.1 * CAM.fitMargin) / visible;
      rig.toDist = Math.min(homeDist * CAM.failMaxZoom, Math.max(homeDist * (blast ? CAM.blastMinZoom : CAM.failMinZoom), fit));
      rig.rate = blast ? CAM.blastRate : CAM.fitRate;
    } else follow(col.count > 0 ? col.pos[(col.count - 1) * 3 + 1] : 0);
  }
  const near = [], px = [], py = [], pz = [];
  function spread(col, above = false) {
    const k = col.pieces.length, low = above ? -0.3 : -100;
    let all = 0;
    px.length = py.length = pz.length = 0;
    const add = (x, y, z) => { px.push(x); py.push(y); pz.push(z); };
    for (let i = 0; i < col.count; i++) {
      if (!col.apart[i]) { all++; if (col.pos[i * 3 + 1] > low) add(col.pos[i * 3], col.pos[i * 3 + 1], col.pos[i * 3 + 2]); }
      else for (let p = 0; p < k; p++) { const j = (i * k + p) * 3; all++; if (col.piecePos[j + 1] > low) add(col.piecePos[j], col.piecePos[j + 1], col.piecePos[j + 2]); }
    }
    const n = px.length;
    if (!n) return { x: 0, y: 0, z: 0, radius: C.unit.length, share: 0 };
    const stride = Math.max(1, Math.floor(n / CAM.debrisSample));
    const median = (a) => {
      near.length = 0;
      for (let i = 0; i < n; i += stride) near.push(a[i]);
      near.sort((p, q) => p - q);
      return near[near.length >> 1];
    };
    const cx = median(px), cy = median(py), cz = median(pz);
    near.length = 0;
    for (let i = 0; i < n; i += stride) near.push(Math.hypot(px[i] - cx, py[i] - cy, pz[i] - cz));
    near.sort((a, b) => a - b);
    const radius = Math.max(C.unit.length, near[Math.min(near.length - 1, Math.floor(near.length * CAM.debrisShare))] + C.unit.length / 2);
    return { x: cx, y: cy, z: cz, radius, share: n / Math.max(1, all) };
  }

  let playDist = null;
  const baseDist = () => homeDist * (gfx.view.h > gfx.view.w ? CAM.tallZoom : 1);
  function follow(y) {
    rig.toTarget.copy(homeTarget).setY(homeTarget.y + Math.max(0, y * 0.1 - CAM.followFrom));
    rig.toDist = playDist ?? baseDist();
    rig.rate = CAM.followRate;
  }

  const probe = new THREE.PerspectiveCamera();
  function travelFor(index, y, axis = 0) {
    playDist = null;
    follow(y);
    probe.copy(camera);
    const edge = gfx.view.h > gfx.view.w ? C.tallTravelEdge : C.travelEdge;
    const fits = (dist) => {
      placeCamera(rig.toTarget, dist, homeQuat, probe);
      probe.updateMatrixWorld();
      for (const x of [C.travel, -C.travel]) {
        view.toWorld(tmp, axis === 2 ? 0 : x, y, axis === 2 ? x : 0).project(probe);
        if (Math.abs(tmp.x) > edge || Math.abs(tmp.y) > edge) return false;
      }
      return true;
    };
    let dist = baseDist();
    if (!fits(dist)) {
      let lo = dist, hi = dist * 4;
      for (let i = 0; i < 18; i++) {
        const mid = (lo + hi) / 2;
        if (fits(mid)) hi = mid; else lo = mid;
      }
      dist = hi;
    }
    if (gfx.view.h > gfx.view.w) dist *= CAM.tallPlay;
    playDist = dist;
    rig.toDist = dist;
    return C.travel;
  }

  function facing() {
    camera.updateMatrixWorld();
    const o = screen(0, 0, 0);
    return [Math.sign(screen(1, 0, 0)[0] - o[0]) || 1, Math.sign(screen(0, 0, 1)[1] - o[1]) || 1];
  }

  function screen(x, y, z) {
    view.toWorld(tmp, x, y, z).project(camera);
    return [(tmp.x + 1) / 2, (1 - tmp.y) / 2, tmp.z < 1];
  }

  let column = null, starting = null;
  const store = readStore();
  const touch = matchMedia("(hover: none) and (pointer: coarse)");
  const bench = new URLSearchParams(location.search).has(atob("Z2FtZWJlbmNo"));
  let mode = store.mode, beaten = false;
  let shown = {};
  const show = (which) => { shown = which; overlay.actions(which, mode); };
  const overlay = createOverlay(box, {
    onAgain: () => act(),
    onAction: (kind) => {
      if (kind === "k1") destroy();
      else if (kind.startsWith("s:")) destroy(kind.slice(2));
      else if (kind === "k2") rebuild();
      else if (kind === "k3") addUnits(C.benchAdd);
      else if (kind.startsWith("a:")) { autoMode = kind === "a:off" ? null : kind.slice(2); overlay.bench(autoMode); }
      else if (kind === "k4") act(mode);
      else if (kind.startsWith("m:")) { mode = kind.slice(2); overlay.actions(shown, mode); marker.best(store.bests[mode]); }
    },
    text: showText,
    height: showHeight,
  });
  const map = createSideView(box);
  const marker = createMarker(box, (x, y, z) => screen(x, y, z));
  const stepMm = () => (modes[mode].lie === "side" ? realHeight.side : realHeight.flat);
  const mmFor = (units) => {
    let mm = 0;
    for (let i = 0; i < units; i++) mm += column.height[i] > C.unit.height ? realHeight.side : realHeight.flat;
    return mm;
  };
  function showTall(units) {
    let mm = 0;
    for (let i = 0; i < units; i++) mm += column.height[i] > C.unit.height ? realHeight.side : realHeight.flat;
    overlay.height(mm);
  }
  function popPerfect(x, top, z = 0) {
    buzz("perfect", true);
    camera.updateMatrixWorld();
    const [sx, sy] = screen(x, top, z);
    overlay.perfect(sx, sy);
  }
  const hooks = {
    travel: travelFor,
    changed() {
      dirty = true;
    },
    placed(n, close, x, top) {
      const mm = mmFor(n + 1);
      marker.set(top, mm, stepMm());
      const best = store.bests[mode];
      if (!(best >= mm)) {
        if (best > 0 && !beaten) { beaten = true; overlay.newBest(); buzz("best", true); }
        store.bests[mode] = mm;
        writeStore(store);
      }
      overlay.scores(store.bests, mode, beaten);
      if (close && !column.live) popPerfect(x, top);
    },
    goal() {
      store.unlocked = true;
      writeStore(store);
      overlay.secret(() => { if (column && (column.state === BLAST || column.state === DONE)) freshStart(); }, !allStyles);
      buzz("goal", true);
    },
    stuck() {
      buzz("thunk", true);
    },
    perfect(i, x, top, z) {
      popPerfect(x, top, z);
      dirty = true;
    },
    fell(units) {
      buzz("fall", true);
      clearTimeout(overTimer);
      overTimer = setTimeout(() => gameOver(units), CAM.overDelay * 1000);
    },
    end(units, total) {
      gameOver(units);
      overlay.end(units, total);
      showTall(units);
      rig.on = false;
      controls.target.copy(rig.target);
      controls.enabled = true;
      dirty = true;
    },
  };

  let overTimer = 0, over = false;
  function gameOver(units) {
    clearTimeout(overTimer);
    if (over || !column) return;
    over = true;
    marker.best(store.bests[mode]);
    if (!bench && Number.isInteger(units) && units >= 1 && units <= C.capacity) track(events.name, { action: events.end, mode, score: units });
    show({ destroy: true, styles: allStyles || store.unlocked || bench ? STYLES : null, modes: true });
    freeCamera(true);
  }

  async function ensureColumn() {
    if (column) return column;
    starting ||= loadPhysics().then((solver) => {
      view.build();
      column = new Column(solver, view.pieces(), hooks, mode);
      gfx.depthCenter.copy(homeTarget);
      return column;
    });
    starting.catch(() => (starting = null));
    return starting;
  }

  async function act(pick) {
    if (!handed) return;
    const col = await ensureColumn().catch(() => null);
    if (!col) return;
    const restart = col.state === IDLE || col.state === DONE || col.state === BLAST || (col.state === FALL && over);
    if (col.state === FALL && !over) return;
    if (restart) {
      over = false;
      clearTimeout(overTimer);
      if (MODES.includes(pick)) mode = pick;
      col.mode = mode;
      store.mode = mode;
      writeStore(store);
      beaten = false;
      if (!bench) track(events.name, { action: events.start, mode });
      if (!store.hinted) overlay.hint(touch.matches ? copy.hintTouch : copy.hintKeys);
      overlay.scores(store.bests, mode, false);
      overlay.clearEnd();
      show({});
      marker.best(store.bests[mode]);
      clearTimeout(againTimer);
      clearTimeout(homeTimer);
      overlay.height(null);
      controls.enabled = false;
      freeCamera(false);
      rigFromCamera();
      runResolution();
      gfx.setSlopeAware(true);
    }
    const fresh = restart;
    if (!fresh && !store.hinted) { store.hinted = true; writeStore(store); overlay.hint(null); }
    if (!fresh) buzz("drop");
    col.press();
    if (fresh) { marker.reset(); marker.set(col.tops[0], mmFor(1), stepMm()); }
    aim(col);
    dirty = true;
    wake();
  }

  let againTimer = 0;
  function destroy(style = "bowling") {
    if (!column || !(column.state === DONE || column.state === BLAST || (column.state === FALL && over))) return;
    buzz(style === "quake" ? "quake" : style === "sinkhole" ? "sinkhole" : "launch", style === "quake" || style === "sinkhole");
    if (rig.on) { rig.on = false; controls.target.copy(rig.target); }
    controls.enabled = true;
    column.fire(style);
    dirty = true;
    wake();
  }

  async function rebuild() {
    const col = await ensureColumn().catch(() => null);
    if (!col) return;
    clearTimeout(againTimer);
    col.mode = mode;
    col.prebuild(C.benchUnits);
    marker.reset();
    marker.set(col.topOf(col.count - 1), mmFor(col.count), stepMm());
    controls.enabled = false;
    rigFromCamera();
    runResolution();
    gfx.setSlopeAware(true);
    aim(col);
    show({ styles: STYLES, modes: true });
    dirty = true;
    wake();
  }

  async function addUnits(n) {
    let col = await ensureColumn().catch(() => null);
    if (!col) return;
    if (col.state !== CARRY) { await act(mode); col = column; }
    if (!col.stackUp(n)) return;
    marker.set(col.topOf(col.count - 2), mmFor(col.count - 1), stepMm());
    aim(col);
    dirty = true;
    wake();
  }

  let homeTimer = 0;
  function freshStart() {
    clearTimeout(againTimer);
    column?.reset();
    marker.reset();
    rigFromCamera();
    follow(0);
    clearTimeout(homeTimer);
    homeTimer = setTimeout(() => { rig.on = false; controls.target.copy(rig.target); controls.enabled = true; }, CAM.returnTime * 1000 + 600);
    show({ modes: true });
    dirty = true;
    wake();
  }

  const solid = (geo, id = 9999) => {
    const n = geo.attributes.position.count;
    geo.setAttribute("_pid", new THREE.BufferAttribute(new Float32Array(n).fill(id), 1));
    geo.setAttribute("_acc", new THREE.BufferAttribute(new Float32Array(n), 1));
    return geo;
  };
  const merge = (parts) => {
    const names = ["position", "normal", "_pid", "_acc"], out = new THREE.BufferGeometry();
    for (const name of names) {
      const arrays = parts.map((g) => g.toNonIndexed().attributes[name].array);
      const all = new Float32Array(arrays.reduce((n, a) => n + a.length, 0));
      let o = 0;
      for (const a of arrays) { all.set(a, o); o += a.length; }
      out.setAttribute(name, new THREE.BufferAttribute(all, name === "position" || name === "normal" ? 3 : 1));
    }
    return out;
  };
  const ballGeo = solid(new THREE.SphereGeometry(1, 32, 20));
  const seamPts = Array.from({ length: 360 }, (_, i) => {
    const t = (i / 360) * Math.PI * 2, a = 0.7, b = 0.3, c = 2 * Math.sqrt(a * b);
    return new THREE.Vector3(a * Math.cos(t) + b * Math.cos(3 * t), a * Math.sin(t) - b * Math.sin(3 * t), c * Math.sin(2 * t)).normalize();
  });
  const SEAM = 0.09;
  const tennisGeo = (() => {
    const g = new THREE.SphereGeometry(1, 160, 112).toNonIndexed(), pos = g.attributes.position, n = pos.count;
    const pid = new Float32Array(n), mid = new THREE.Vector3(), d = new THREE.Vector3(), side = new THREE.Vector3();
    for (let t = 0; t < n; t += 3) {
      mid.set(0, 0, 0);
      for (let c = 0; c < 3; c++) mid.add(d.fromBufferAttribute(pos, t + c));
      mid.normalize();
      let best = 0, bd = Infinity;
      for (let i = 0; i < seamPts.length; i++) { const q = seamPts[i].distanceToSquared(mid); if (q < bd) { bd = q; best = i; } }
      const s = seamPts[best], next = seamPts[(best + 1) % seamPts.length];
      side.subVectors(next, s).cross(s);
      const id = Math.sqrt(bd) < SEAM / 2 ? 9700 : side.dot(d.subVectors(mid, s)) > 0 ? 9500 : 9600;
      pid.fill(id, t, t + 3);
    }
    g.setAttribute("_pid", new THREE.BufferAttribute(pid, 1));
    g.setAttribute("_acc", new THREE.BufferAttribute(new Float32Array(n), 1));
    return g;
  })();
  const CAP_CREASE = THREE.MathUtils.degToRad(60);
  let capGeo = new THREE.BufferGeometry();
  loadModel(CAP_MODEL).then((m) => {
    let src = null;
    m.scene.traverse((o) => { if (o.isMesh && !src) src = o.geometry; });
    if (!src) return;
    const geo = toCreasedNormals(src, CAP_CREASE);
    solid(geo, 9800);
    styles.cap.hull = new Float32Array(src.attributes.position.array);
    capGeo = geo;
    for (const mesh of pools.cap) mesh.geometry = capGeo;
  }).catch(() => {});
  const bowlingGeo = merge([ballGeo, ...[[0, 0.62, 0.12], [0.24, -0.3, 0.1], [-0.24, -0.3, 0.1]].map(([a, b, r], n) => {
    const dir = new THREE.Vector3(a, 1, b).normalize();
    const hole = solid(new THREE.CylinderGeometry(r, r, 0.3, 20).translate(0, 0.86, 0), 9998 - n);
    return hole.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir));
  })]);
  const A = styles.arrow, ar = A.radius, al = A.length;
  const arrowGeo = merge([
    solid(new THREE.CylinderGeometry(ar, ar, al * 0.86, 10).translate(0, -al * 0.04, 0), 9999),
    solid(new THREE.ConeGeometry(ar * 2.6, al * 0.13, 12).translate(0, al * 0.435, 0), 9998),
    ...[0, 1, 2].map((n) => solid(new THREE.BoxGeometry(ar * 0.3, al * 0.16, ar * 4).translate(0, -al * 0.38, ar * 2.4).rotateY((n * 2 * Math.PI) / 3), 9990 + n)),
  ]);
  const holeRingGeo = solid(new THREE.TorusGeometry(1.8, 0.12, 12, 48).rotateX(Math.PI / 2.4), 9970);
  const MAX_LINKS = 400, LINK_PITCH = 0.2;
  const linkGeo = solid(new THREE.TorusGeometry(0.06, 0.018, 8, 16).scale(1, 1.6, 1), 9960);
  linkGeo.setAttribute("tint", new THREE.InstancedBufferAttribute(new Float32Array(MAX_LINKS), 1));
  const chain = new THREE.InstancedMesh(linkGeo, gfx.fillInstanced, MAX_LINKS);
  chain.frustumCulled = false;
  chain.visible = false;
  view.root.add(chain);
  const linkM = new THREE.Matrix4(), linkQ = new THREE.Quaternion(), linkTwist = new THREE.Quaternion(), linkV = new THREE.Vector3(), linkD = new THREE.Vector3(), linkS = new THREE.Vector3(1, 1, 1), up = new THREE.Vector3(0, 1, 0);
  const quarter = [new THREE.Quaternion(), new THREE.Quaternion().setFromAxisAngle(up, Math.PI / 2)];
  function syncChain() {
    let n = 0;
    for (const T of column?.thrown ?? []) {
      const a = T.chainFrom, b = T.drawBallPos ?? T.ballPos;
      if (!a || !b) continue;
      linkD.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      const len = Math.max(0, linkD.length() - (T.ballScale ?? 0)), m = Math.min(MAX_LINKS - n, Math.max(1, Math.round(len / LINK_PITCH)));
      linkD.normalize();
      linkQ.setFromUnitVectors(up, linkD);
      for (let k = 0; k < m; k++) {
        const d = (k + 0.5) * (len / m);
        linkV.set(a[0] + linkD.x * d, a[1] + linkD.y * d, a[2] + linkD.z * d);
        linkTwist.copy(linkQ).multiply(quarter[k % 2]);
        chain.setMatrixAt(n++, linkM.compose(linkV, linkTwist, linkS));
      }
    }
    chain.visible = n > 0;
    chain.count = n;
    if (n) chain.instanceMatrix.needsUpdate = true;
  }

  const wellAt = new THREE.Vector3();
  function syncWell() {
    const w = column?.wellView;
    if (!w) { gfx.setWell(false); return; }
    view.toWorld(wellAt, w.c[0], 0, w.c[1]);
    gfx.setWell(true, wellAt.x, wellAt.z, w.radius * 0.1, w.throat * 0.1, w.depth * 0.01, w.deep * 0.1, w.soft * 0.1, w.tube);
  }

  const pools = { ball: [], arrow: [], cap: [] };
  function meshFor(kind, n) {
    const pool = pools[kind];
    if (!pool[n]) {
      if (kind === "arrow" || kind === "cap") {
        pool[n] = new THREE.Mesh(kind === "arrow" ? arrowGeo : capGeo, gfx.fill);
      } else {
        const m = new THREE.Mesh(ballGeo, gfx.fill);
        m.add(new THREE.Mesh(holeRingGeo, gfx.fill));
        pool[n] = m;
      }
      view.root.add(pool[n]);
    }
    return pool[n];
  }
  function syncBall() {
    const used = { ball: 0, arrow: 0, cap: 0 };
    for (const T of column?.thrown ?? []) {
      const p = T.drawBallPos ?? T.ballPos;
      if (!p) continue;
      const kind = T.ballKind === "arrow" || T.ballKind === "cap" ? T.ballKind : "ball";
      const m = meshFor(kind, used[kind]++);
      m.visible = true;
      m.position.fromArray(p);
      if (kind === "ball") {
        m.geometry = T.style === "bowling" ? bowlingGeo : T.style === "tennis" ? tennisGeo : ballGeo;
        m.scale.setScalar(Math.max(1e-3, T.ballScale ?? C.ballRadius));
        const ring = m.children[0];
        ring.visible = T.ballKind === "hole";
        if (ring.visible) ring.rotation.y += 0.04;
      }
      const r = T.drawBallRot ?? T.ballRot;
      if (r && T.ballKind !== "hole") m.quaternion.fromArray(r);
    }
    for (const kind of Object.keys(pools)) for (let k = used[kind]; k < pools[kind].length; k++) pools[kind][k].visible = false;
  }

  let quality = 1;
  function runResolution(fresh = true) {
    if (fresh) quality = 1;
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    const ref = fitMode === "cover" ? Math.max(w, h) : Math.min(w, h);
    const area = (w * h) / (ref * ref);
    const s = Math.min(R.matchSize, Math.floor(Math.sqrt((R.runPixelBudget * quality) / (R.supersample ** 2 * area))));
    if (s !== square) { square = s; fit(); }
  }
  const pace = { sum: 0, n: 0, from: 0, prev: 0 };
  function adaptFrame(now, steady) {
    const gap = now - pace.prev;
    pace.prev = now;
    if (!steady || !column || gap > 100) { pace.sum = pace.n = 0; pace.from = now; return; }
    pace.sum += gap; pace.n++;
    if (now - pace.from < R.adapt.window) return;
    const slow = pace.sum / pace.n > R.adapt.slow;
    pace.sum = pace.n = 0; pace.from = now;
    if (slow && quality > R.adapt.floor) {
      quality = Math.max(R.adapt.floor, quality * R.adapt.down);
      runResolution(false);
    }
  }

  let autoMode = null;
  let side = 0, aimX = null;
  function stackFor(col) {
    if (col.state !== CARRY) { side = 0; aimX = null; return; }
    const i = col.count - 1;
    if (aimX === null) {
      const [lo, hi] = C.autoMiss;
      const miss = autoMode === "close" ? (Math.random() < 0.5 ? -1 : 1) * (col.speed * C.closeTolerance + lo + Math.random() * (hi - lo)) : 0;
      const under = col.at(i - 1);
      aimX = (col.axis === 2 ? under.z : under.x) + miss;
    }
    const a = col.axis ?? 0, s = Math.sign(col.pos[i * 3 + a] - aimX);
    if (side && s !== side) { col.pos[i * 3 + a] = aimX; side = 0; aimX = null; col.press(); aim(col); }
    else side = s;
  }

  const stats = { frames: 0, from: 0, physics: 0, triangles: 0, seen: 0 };
  if (bench) gfx.renderer.info.autoReset = false;
  function countFrame(now) {
    if (!stats.from) stats.from = now;
    stats.frames++;
    stats.seen = now;
    const span = now - stats.from;
    if (span < 500) return;
    let pace = "";
    if (column?.state === CARRY) {
      const i = column.count - 1, now = C.speed(column.mode, i), next = C.speed(column.mode, i + 1);
      pace = ` · speed ${now.toFixed(2)} (+${(next - now).toFixed(2)} a unit) · slides ${(column.travel ?? 0).toFixed(2)}`;
    }
    overlay.benchStats(`${Math.round((stats.frames * 1000) / span)} fps · ${(span / stats.frames).toFixed(1)} ms · physics ${(stats.physics / stats.frames).toFixed(1)} ms · ${Math.round(stats.triangles / 1000)}k triangles${pace}`);
    stats.frames = 0; stats.physics = 0; stats.from = now;
  }
  const statsTimer = bench && setInterval(() => { if (!raf && performance.now() - stats.seen > 1000) { overlay.benchStats("idle (nothing moving)"); stats.from = 0; } }, 1000);

  let raf = 0, last = 0, dirty = false, inView = true, dragging = false, settleUntil = 0, gridT = 0, gridOn = !holdGrid, handed = false, steady = false;
  // Parked: the game is closed and the drawing is back to the device as
  // the video ends on it. The column keeps its state for unpark().
  let parked = false, builtView = false;
  // The camera's way home on park(): from where it is to the starting
  // view in a set time, eased at both ends, landing exactly there.
  let homing = null;
  const homingTarget = new THREE.Vector3();
  function homeStep(now) {
    if (!homing) return false;
    const t = Math.min(1, (now - homing.from) / homing.ms);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    homingTarget.lerpVectors(homing.target, homeTarget, e);
    const dist = homing.dist + (homeDist - homing.dist) * e;
    placeCamera(homingTarget, dist, rig.quat.copy(homing.quat).slerp(homeQuat, e));
    gfx.setDistance(dist / homeDist);
    if (t === 1) { const done = homing.done; homing = null; done(); }
    return true;
  }
  function wake() {
    if (!raf && inView) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }
  function frame(now) {
    raf = 0;
    if (bench) countFrame(now);
    adaptFrame(now, steady);
    const dt = Math.min((now - last) / 1000, C.maxFrame);
    last = now;
    let keep = false;
    if (column && !parked) {
      if (autoMode) stackFor(column);
      const p0 = performance.now();
      if (column.update(dt)) dirty = true;
      stats.physics += performance.now() - p0;
      if (column.state !== IDLE && column.state !== DONE && column.state !== BLAST) aim(column);
      keep ||= column.busy;
    }
    if (handed && gridOn && gridT < 1 && !parked) {
      gridT = reducedMotion ? 1 : Math.min(1, gridT + dt / R.gridDraw);
      const t = Math.max(0, gridT);
      gfx.setGrid(R.gridStrength * Math.min(1, t * 6), homeTarget);
      gfx.setGridFront(t < 1 ? R.gridReach * t * t * (3 - 2 * t) : 1e4);
      dirty = keep = true;
    }
    if (homeStep(now)) dirty = keep = true;
    if (rigStep(dt)) {
      dirty = keep = true;
      if (!parked) gfx.depthCenter.copy(rig.target);
      gfx.setDistance(rig.dist / homeDist);
    }
    if (marker.step(dt, reducedMotion)) dirty = keep = true;
    const q = column?.quakeOffset, shake = q && !reducedMotion ? [q[0] * 0.06, q[1] * 0.04] : null;
    if (shake) dirty = keep = true;
    if (controls.enabled && !rig.on) {
      if (controls.update()) dirty = true;
      keep ||= dragging || now < settleUntil;
    }
    if (dirty) {
      dirty = false;
      if (column) { view.sync(column, dt, camera); syncBall(); syncChain(); syncWell(); map.draw(column, facing()); }
      if (bench) gfx.renderer.info.reset();
      if (shake) { camera.position.x += shake[0]; camera.position.y += shake[1]; }
      gfx.draw();
      if (shake) { camera.position.x -= shake[0]; camera.position.y -= shake[1]; }
      if (bench) stats.triangles = gfx.renderer.info.render.triangles;
      marker.draw(canvas.clientWidth, canvas.clientHeight);
    }
    if (view.fading) { dirty = keep = true; }
    steady = keep;
    if (keep) wake();
  }
  controls.addEventListener("change", () => { dirty = true; wake(); });
  controls.addEventListener("start", () => {
    if (rig.on) { rig.on = false; controls.target.copy(rig.target); }
    dragging = true;
    wake();
  });
  controls.addEventListener("end", () => { dragging = false; settleUntil = performance.now() + 1500; wake(); });

  let down = null;
  function onPointerDown(e) {
    if (!handed || parked || e.button > 0) return;
    if (column?.state === CARRY) { e.preventDefault(); act(); return; }
    down = { x: e.clientX, y: e.clientY, t: performance.now() };
  }
  function onPointerUp(e) {
    if (!down) return;
    const tap = Math.hypot(e.clientX - down.x, e.clientY - down.y) < TAP_MOVE && performance.now() - down.t < TAP_TIME;
    down = null;
    if (tap && (!column || column.state === IDLE)) act();
  }
  function onKey(e) {
    if (e.code !== "Space" || !handed || parked || !box.classList.contains("is-expanded")) return;
    if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
    e.preventDefault();
    if (!e.repeat) act();
  }
  const warmPhysics = () => { if (handed) loadPhysics(); };
  canvas.addEventListener("pointerenter", warmPhysics, { once: true });
  canvas.addEventListener("pointerdown", warmPhysics, { once: true });
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", () => (down = null));
  document.addEventListener("keydown", onKey);

  function handoff() {
    if (handed) return;
    handed = true;
    if (!holdGrid) gridT = -R.crossfade / R.gridDraw;
    box.classList.add("is-live");
    show({ modes: true });
    if (bench) overlay.bench(autoMode);
    marker.best(store.bests[mode]);
    overlay.scores(store.bests, mode, false);
    controls.enabled = true;
    const focus = document.activeElement;
    if (!focus || focus === document.body || box.contains(focus)) canvas.focus({ preventScroll: true });
    else canvas.addEventListener("focus", warmPhysics, { once: true });
    wake();
  }

  function refit() {
    if (fit()) { gfx.draw(); dirty = false; }
    if (column) map.draw(column, facing());
    camera.updateMatrixWorld();
    marker.draw(canvas.clientWidth, canvas.clientHeight);
    wake();
  }
  if (!video || video.ended || video.error) handoff();
  else {
    video.addEventListener("ended", handoff, { once: true });
    video.addEventListener("error", handoff, { once: true });
    const near = () => video.duration - video.currentTime <= R.crossfadeLead;
    if (video.requestVideoFrameCallback) {
      const watch = () => { if (handed) return; if (near()) handoff(); else video.requestVideoFrameCallback(watch); };
      video.requestVideoFrameCallback(watch);
    } else {
      const watch = () => { if (near()) { video.removeEventListener("timeupdate", watch); handoff(); } };
      video.addEventListener("timeupdate", watch);
    }
  }

  const resize = new ResizeObserver(refit);
  resize.observe(box);
  const seen = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) wake();
    else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  });
  seen.observe(box);

  const PARK_TIME = 0.9, PARK_FADE = 0.5;
  // Lays the frame on screen over the canvas as a still and fades it
  // out, so a change to the scene underneath cross-fades instead of
  // cutting.
  function fadeFrom(change) {
    gfx.draw();
    const still = document.createElement("canvas");
    still.className = canvas.className;
    still.setAttribute("aria-hidden", "true");
    still.style.pointerEvents = "none";
    still.width = canvas.width;
    still.height = canvas.height;
    still.getContext("2d").drawImage(canvas, 0, 0);
    canvas.after(still);
    change();
    gfx.draw();
    return still.animate([{ opacity: 1 }, { opacity: 0 }], { duration: PARK_FADE * 1000, easing: "ease-in-out" })
      .finished.then(() => still.remove(), () => still.remove());
  }
  const api = {
    canvas,
    // Back to the drawing as the video ends on it: the game freezes, its
    // pieces give way to the device, the grid goes, and the camera eases
    // home. Resolves once the camera is exactly there, so the page can
    // cross-fade to the video's last frame without a jump.
    park() {
      if (parked) return Promise.resolve();
      parked = true;
      clearTimeout(homeTimer);
      freeCamera(false);
      controls.enabled = false;
      dragging = false;
      if (rig.on) controls.target.copy(rig.target);
      rig.on = false;
      // First the pieces and the grid fade away where the camera is,
      // leaving the device; then the camera eases home.
      // Everything back to how the drawing starts (as mount() sets it
      // up), so it matches the video's last frame: the shading centre,
      // the plain edge detection, no ground well, full resolution.
      const clear = () => {
        builtView = view.root.visible;
        if (builtView) { view.root.visible = false; homeModel.visible = true; }
        gfx.setGrid(0, homeTarget);
        gfx.setGridFront(1e4);
        gfx.setWell(false);
        gfx.setSlopeAware(false);
        gfx.depthCenter.copy(CENTER);
        if (square !== R.matchSize) { square = R.matchSize; fit(); }
        gridT = 0;
      };
      const faded = reducedMotion ? (clear(), Promise.resolve()) : fadeFrom(clear);
      return faded.then(() => new Promise((resolve) => {
        const arrive = () => {
          placeCamera(homeTarget, homeDist, homeQuat);
          controls.target.copy(homeTarget);
          gfx.setDistance(1);
          dirty = true;
          wake();
          resolve();
        };
        if (reducedMotion) { arrive(); return; }
        // Where the camera looks: the point on its line of sight level
        // with the starting target, as the orbit controls keep it.
        const target = controls.target.clone();
        homing = {
          from: performance.now(),
          ms: PARK_TIME * 1000,
          target,
          dist: camera.position.distanceTo(target),
          quat: camera.quaternion.clone(),
          done: arrive,
        };
        dirty = true;
        wake();
      }));
    },
    // The game again, as it was left: its pieces return and the grid
    // draws back in.
    unpark() {
      if (!parked) return;
      parked = false;
      if (builtView) { homeModel.visible = false; view.root.visible = true; }
      if (column) {
        gfx.setSlopeAware(true);
        gfx.depthCenter.copy(homeTarget);
        runResolution();
      }
      gridT = 0;
      controls.enabled = true;
      dirty = true;
      wake();
    },
    setFit(mode) { fitMode = mode; refit(); },
    drawGrid() { if (!gridOn) { gridOn = true; gridT = 0; wake(); } },
    get handedOff() { return handed; },
    get column() { return column; },
    snapshot() { gfx.draw(); return canvas.toDataURL("image/png"); },
    dispose() {
      cancelAnimationFrame(raf);
      clearTimeout(againTimer);
      clearTimeout(overTimer);
      clearTimeout(homeTimer);
      clearInterval(statsTimer);
      document.removeEventListener("keydown", onKey);
      resize.disconnect();
      seen.disconnect();
      controls.dispose();
      column?.dispose();
      view.dispose();
      homeModel.traverse((o) => { if (o.isMesh) o.geometry.dispose(); });
      for (const g of [ballGeo, tennisGeo, capGeo, bowlingGeo, arrowGeo, holeRingGeo, linkGeo]) g.dispose();
      overlay.dispose();
      map.dispose();
      marker.dispose();
      gfx.dispose();
      canvas.remove();
    },
  };
  return api;
}

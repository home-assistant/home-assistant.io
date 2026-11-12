import * as THREE from "three";
import { toCreasedNormals } from "three/addons/utils/BufferGeometryUtils.js";
import { CENTER } from "./renderer.js";
import { column as C, render as RC } from "./config.js";

const TO_WORLD = new THREE.Matrix4().makeRotationY(-Math.PI / 2).scale(new THREE.Vector3(0.1, 0.1, 0.1));
const TO_UNIT = new THREE.Matrix4()
  .makeScale(10, 10, 10)
  .multiply(new THREE.Matrix4().makeRotationY(Math.PI / 2))
  .multiply(new THREE.Matrix4().makeTranslation(0, -CENTER.y, 0));

const PARTS = [
  { mesh: /^shell$/, whole: true, group: "case", collide: true, shape: "tray" },
  { mesh: /^lid$/, whole: true, group: "lid", collide: true, shape: "lid" },
  { mesh: /^foot_\d+$/, whole: true, group: "own", collide: true, hitY: [-0.124, -0.118] },
  { mesh: /^pcb$/, whole: false, group: "pcb", collide: true, half: [0.42, 0.091, 0.285] },
  { mesh: /^screw_\d+$/, whole: false, group: "own", collide: true },
];

const PORT_DEPTH = 0.06;
const LEVEL_UPTO = [11.5, 29, 57];
const CREASE = Math.PI / 6;
const CULL_RADIUS = 0.09;
const frustum = new THREE.Frustum(), screenM = new THREE.Matrix4(), sphere = new THREE.Sphere(), world = new THREE.Vector3(), camAt = new THREE.Vector3();

function splitBy(geo, key) {
  const idx = geo.index.array;
  const names = ["position", "normal", "_pid", "_acc"];
  const out = new Map();
  for (let t = 0; t < idx.length; t += 3) {
    const id = key(idx, t);
    if (id === null) continue;
    let part = out.get(id);
    if (!part) out.set(id, (part = { remap: new Map(), verts: [], index: [] }));
    for (let c = 0; c < 3; c++) {
      const v = idx[t + c];
      let n = part.remap.get(v);
      if (n === undefined) { n = part.verts.length; part.remap.set(v, n); part.verts.push(v); }
      part.index.push(n);
    }
  }
  return [...out.values()].map(({ verts, index }) => {
    const g = new THREE.BufferGeometry();
    for (const name of names) {
      const src = geo.attributes[name];
      const arr = new Float32Array(verts.length * src.itemSize);
      verts.forEach((v, i) => { for (let s = 0; s < src.itemSize; s++) arr[i * src.itemSize + s] = src.getComponent(v, s); });
      g.setAttribute(name, new THREE.BufferAttribute(arr, src.itemSize));
    }
    g.setIndex(index);
    return g;
  });
}

function lightBoard(geo, ports, box) {
  const pos = geo.attributes.position, counts = new Map();
  for (let i = 0; i < pos.count; i++) {
    const k = Math.round(pos.getY(i) * 500);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const [a, b] = [...counts].sort((p, q) => q[1] - p[1]).slice(0, 2).map(([k]) => k / 500);
  const lo = Math.min(a, b), hi = Math.max(lo + 0.016, Math.max(a, b));
  const board = new THREE.BoxGeometry(box.max.x - box.min.x, Math.min(hi - lo, 0.03), C.unit.width - 2 * PORT_DEPTH)
    .translate((box.min.x + box.max.x) / 2, (lo + hi) / 2, (box.min.z + box.max.z) / 2).toNonIndexed();
  const id = geo.attributes._pid.getX(0);
  const n = board.attributes.position.count;
  board.setAttribute("_pid", new THREE.BufferAttribute(new Float32Array(n).fill(id), 1));
  board.setAttribute("_acc", new THREE.BufferAttribute(new Float32Array(n), 1));
  const p = ports.toNonIndexed(), out = new THREE.BufferGeometry();
  for (const name of ["position", "normal", "_pid", "_acc"]) {
    const x = board.attributes[name].array, y = p.attributes[name].array, all = new Float32Array(x.length + y.length);
    all.set(x); all.set(y, x.length);
    out.setAttribute(name, new THREE.BufferAttribute(all, name === "position" || name === "normal" ? 3 : 1));
  }
  return out;
}

function instanced(geo, material) {
  const mesh = new THREE.InstancedMesh(geo, material, C.capacity);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.count = 0;
  const tint = new THREE.InstancedBufferAttribute(new Float32Array(C.capacity), 1);
  tint.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute("tint", tint);
  return mesh;
}

export function createColumnView(gfx, model) {
  const root = new THREE.Group();
  root.matrixAutoUpdate = false;
  root.matrix.copy(TO_WORLD);
  root.visible = false;
  gfx.scene.add(root);

  const meshes = {};
  model.scene.updateMatrixWorld(true);
  model.scene.traverse((o) => { if (o.isMesh) meshes[o.name] = o; });

  const kinds = [];
  let ports = null;
  let built = false;

  function build() {
    if (built) return;
    built = true;
    const box = new THREE.Box3(), size = new THREE.Vector3();
    for (const part of PARTS) {
      for (const name of Object.keys(meshes).filter((n) => part.mesh.test(n)).sort()) {
        let geo = meshes[name].geometry;
        geo.applyMatrix4(TO_UNIT.clone().multiply(meshes[name].matrixWorld));
        geo.computeBoundingBox();
        box.copy(geo.boundingBox);
        if (name === "pcb") {
          const pos = geo.attributes.position;
          const edge = C.unit.width / 2 - PORT_DEPTH;
          const near = (v) => Math.abs(pos.getZ(v)) > edge;
          const [portGeo] = splitBy(geo, (idx, t) => (near(idx[t]) || near(idx[t + 1]) || near(idx[t + 2]) ? 0 : null));
          ports = instanced(portGeo, gfx.fillInstanced);
          root.add(ports);
          geo = lightBoard(geo, portGeo, box);
        }
        const center = box.getCenter(new THREE.Vector3());
        geo.translate(-center.x, -center.y, -center.z);
        box.getSize(size);
        const half = [Math.max(size.x / 2, 0.01), Math.max(size.y / 2, 0.01), Math.max(size.z / 2, 0.01)];
        const mesh = instanced(geo, gfx.fillInstanced);
        root.add(mesh);
        let hit = part.half ?? half, hitCenter = center.toArray();
        if (part.hitY) {
          const [lo, hi] = part.hitY;
          hit = [hit[0], (hi - lo) / 2, hit[2]];
          hitCenter = [hitCenter[0], (lo + hi) / 2 - (box.min.y + box.max.y) / 2 + center.y, hitCenter[2]];
        }
        kinds.push({ mesh, name, whole: part.whole, group: part.group === "own" ? name : part.group, collide: part.collide, shape: part.shape, hit, hitCenter, center, half });
      }
    }
    model.scene.visible = false;
    root.visible = true;
    if (waiting) { levels(waiting); waiting = null; }
  }

  const shade = new Float32Array(C.capacity), flashed = new Uint8Array(C.capacity);
  function doneMesh(mesh, n) {
    mesh.count = n;
    mesh.instanceMatrix.clearUpdateRanges();
    mesh.instanceMatrix.addUpdateRange(0, n * 16);
    mesh.instanceMatrix.needsUpdate = true;
    const tint = mesh.geometry.attributes.tint;
    tint.clearUpdateRanges();
    tint.addUpdateRange(0, n);
    tint.needsUpdate = true;
  }
  let fading = false;

  const v = new THREE.Vector3(), at = new THREE.Vector3(), q = new THREE.Quaternion(), m = new THREE.Matrix4(), one = new THREE.Vector3(1, 1, 1);

  function sync(col, dt = 0, camera) {
    const k = kinds.length;
    const stepT = RC.exactFade > 0 ? dt / RC.exactFade : 1;
    fading = false;
    for (let i = 0; i < col.count; i++) {
      if (col.exact[i] && !flashed[i]) { flashed[i] = 1; shade[i] = 1; }
      else if (!col.exact[i]) flashed[i] = 0;
      if (shade[i] > 0) { shade[i] = Math.max(0, shade[i] - stepT); fading = true; }
    }
    camera.updateMatrixWorld();
    frustum.setFromProjectionMatrix(screenM.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    const seen = (p) => frustum.intersectsSphere(sphere.set(world.copy(p).applyMatrix4(TO_WORLD), CULL_RADIUS));
    const done = doneMesh;
    camAt.setFromMatrixPosition(camera.matrixWorld);
    if (lods) {
      const used = lods.map(() => 0);
      for (let i = 0; i < col.count; i++) {
        if (col.apart[i]) continue;
        v.fromArray(col.drawPos, i * 3);
        if (!seen(v)) continue;
        const far = world.distanceTo(camAt) * 10;
        let L = 0;
        while (L < LEVEL_UPTO.length && far > LEVEL_UPTO[L]) L++;
        const mesh = lods[L];
        mesh.setMatrixAt(used[L], m.compose(v, q.fromArray(col.drawRot, i * 4), one));
        mesh.geometry.attributes.tint.array[used[L]++] = shade[i];
      }
      lods.forEach((mesh, L) => done(mesh, used[L]));
    }
    for (let p = 0; p < k; p++) {
      const { mesh, whole, center } = kinds[p];
      const tint = mesh.geometry.attributes.tint.array;
      let n = 0;
      if (whole) {
        for (let i = 0; i < col.count; i++) {
          if (lods && !col.apart[i]) continue;
          if (col.apart[i]) {
            const j = i * k + p;
            v.fromArray(col.drawPiecePos, j * 3);
            q.fromArray(col.drawPieceRot, j * 4);
          } else {
            q.fromArray(col.drawRot, i * 4);
            v.copy(center).applyQuaternion(q).add(at.fromArray(col.drawPos, i * 3));
          }
          if (!seen(v)) continue;
          mesh.setMatrixAt(n, m.compose(v, q, one));
          tint[n++] = shade[i];
        }
      } else {
        for (let a = 0; a < col.apartCount; a++) {
          const u = col.apartOrder[a], j = u * k + p;
          v.fromArray(col.drawPiecePos, j * 3);
          q.fromArray(col.drawPieceRot, j * 4);
          if (!seen(v)) continue;
          mesh.setMatrixAt(n, m.compose(v, q, one));
          tint[n++] = shade[u];
        }
      }
      done(mesh, n);
    }
    if (ports && lods) done(ports, 0);
    if (ports && !lods) {
      let n = 0;
      for (let i = 0; i < col.count; i++) {
        if (col.apart[i] || !seen(v.fromArray(col.drawPos, i * 3))) continue;
        ports.geometry.attributes.tint.array[n] = shade[i];
        ports.setMatrixAt(n++, m.compose(v, q.fromArray(col.drawRot, i * 4), one));
      }
      done(ports, n);
    }
  }

  let lods = null, waiting = null;
  function levels(gltf) {
    if (!built) { waiting = gltf; return; }
    const found = [];
    gltf.scene.traverse((o) => { if (o.isMesh && /^lod\d+$/.test(o.name)) found[+o.name.slice(3)] = o.geometry; });
    if (!found.length || lods) return;
    const make = (g) => {
      const geo = toCreasedNormals(g, CREASE);
      geo.setAttribute("_acc", new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count), 1));
      const mesh = instanced(geo, gfx.fillInstanced);
      root.add(mesh);
      return mesh;
    };
    lods = found.map(make);
    gltf.scene.traverse((o) => {
      const kind = o.isMesh && kinds.find((k) => `loose_${k.name}` === o.name || (o.name === "board0" && k.name === "pcb"));
      if (!kind) return;
      const c = kind.center, old = kind.mesh;
      kind.mesh = make(o.geometry.clone().translate(-c.x, -c.y, -c.z));
      root.remove(old);
      old.geometry.dispose();
      old.dispose();
    });
  }

  return {
    root,
    build,
    levels,
    sync,
    get fading() { return fading; },
    pieces: () => kinds.map(({ center, hit, hitCenter, group, collide, shape }) => ({ center: center.toArray(), hitCenter, half: hit, group, collide, shape })),
    toWorld: (out, x, y, z) => out.set(x, y, z).applyMatrix4(TO_WORLD),
    dispose() {
      for (const { mesh } of kinds) { mesh.geometry.dispose(); mesh.dispose(); }
      ports?.geometry.dispose();
      ports?.dispose();
      gfx.scene.remove(root);
    },
  };
}

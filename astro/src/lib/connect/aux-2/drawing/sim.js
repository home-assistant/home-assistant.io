import { column as C, modes, styles } from "./config.js";

let solverPromise = null;
export function loadPhysics() {
  solverPromise ||= import("./engine.js").then(async (m) => {
    const R = m.default;
    await R.init();
    return R;
  });
  return solverPromise;
}

const rand = (a, b) => a + Math.random() * (b - a);
const along = (v) => {
  const l = Math.hypot(v.x, v.y, v.z) || 1, x = v.z / l, z = -v.x / l, w = 1 + v.y / l, n = Math.hypot(x, z, w) || 1;
  return n < 1e-6 ? { x: 1, y: 0, z: 0, w: 0 } : { x: x / n, y: 0, z: z / n, w: w / n };
};
const turn = (q, v) => {
  const tx = 2 * (q.y * v.z - q.z * v.y), ty = 2 * (q.z * v.x - q.x * v.z), tz = 2 * (q.x * v.y - q.y * v.x);
  return { x: v.x + q.w * tx + (q.y * tz - q.z * ty), y: v.y + q.w * ty + (q.z * tx - q.x * tz), z: v.z + q.w * tz + (q.x * ty - q.y * tx) };
};
const mul = (a, b) => ({
  x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
  y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
  z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
});

const JUMP = 1;
const THROWN = ["ball", "ballCollider", "ballPos", "ballRot", "ballKind", "ballScale", "ballAge", "style", "hole", "pivot", "chainFrom", "goal", "stuck"];

export const IDLE = "idle", CARRY = "carry", DROP = "drop", FALL = "fall", DONE = "done", BLAST = "blast";

export class Column {
  constructor(R, pieces, hooks, mode = "easy") {
    this.mode = mode;
    this.R = R;
    this.pieces = pieces;
    this.hooks = hooks;
    const n = C.capacity;
    const k = pieces.length;
    this.pos = new Float32Array(n * 3);
    this.rot = new Float32Array(n * 4);
    this.rest = new Float32Array(n * 4);
    this.half = new Float32Array(n);
    this.halfZ = new Float32Array(n);
    this.height = new Float32Array(n);
    this.tops = new Float32Array(n);
    this.upAxis = new Int8Array(n);
    this.apart = new Uint8Array(n);
    this.exact = new Uint8Array(n);
    this.age = new Float32Array(n);
    this.bodies = new Array(n).fill(null);
    this.piecePos = new Float32Array(n * k * 3);
    this.pieceRot = new Float32Array(n * k * 4);
    this.pieceBodies = new Array(n * k).fill(null);
    this.drawPos = new Float32Array(n * 3); this.prevPos = new Float32Array(n * 3);
    this.drawRot = new Float32Array(n * 4); this.prevRot = new Float32Array(n * 4);
    this.drawPiecePos = new Float32Array(n * k * 3); this.prevPiecePos = new Float32Array(n * k * 3);
    this.drawPieceRot = new Float32Array(n * k * 4); this.prevPieceRot = new Float32Array(n * k * 4);
    this.prevCount = 0; this.prevApart = 0; this.lastMoved = false;
    this.groups = [...new Set(pieces.map((p) => p.group))];
    this.pieceGroup = Int8Array.from(pieces, (p) => this.groups.indexOf(p.group));
    this.groupCenter = this.groups.map((_, g) => {
      const own = pieces.filter((p, i) => this.pieceGroup[i] === g && p.collide);
      const c = [0, 0, 0];
      for (const p of own) for (let a = 0; a < 3; a++) c[a] += p.center[a] / own.length;
      return c;
    });
    this.groupBodies = [];
    this.apartOrder = new Int16Array(n);
    this.apartCount = 0;
    this.world = null;
    this.peak = 0;
    this.reset();
  }

  reset() {
    const R = this.R;
    this.world?.free();
    this.world = new R.World({ x: 0, y: C.gravity, z: 0 });
    this.world.timestep = C.step;
    this.world.lengthUnit = C.lengthUnit;
    this.world.numSolverIterations = C.solverIterations;
    this.world.numInternalPgsIterations = C.pgsIterations;
    this.ground = null;
    this.floorParts = [];
    this.well = null;
    this.layFloor();
    this.bodies.fill(null);
    this.pieceBodies.fill(null);
    this.groupBodies = [];
    this.thrown = [];
    this.unload();
    this.shaker = null;
    this.well = null;
    this.wellView = null;
    this.pivot = null;
    this.chainFrom = null;
    this.quakeOffset = null;
    this.apart.fill(0);
    this.exact.fill(0);
    this.apartCount = 0;
    this.piecesAwake = false;
    this.count = 0;
    this.total = 0;
    this.acc = 0;
    this.timer = 0;
    this.lastApart = 0;
    this.state = IDLE;
    this.facing(0);
    this.addUnit(0, 0, 0, true);
    this.world.integrationParameters.contact_natural_frequency = C.contactFrequency;
    this.hooks.changed?.();
  }

  get placed() {
    return this.state === CARRY || this.state === DROP ? this.count - 1 : this.count;
  }

  get top() {
    const n = this.placed;
    return n > 0 ? this.tops[n - 1] : 0;
  }

  facing(index) {
    const lie = index > 0 ? modes[this.mode].lie : "flat";
    const turns = lie === "turn" ? Math.floor(Math.random() * 4) : lie === "side" ? 1 : 0;
    const narrow = turns % 2 === 1, side = lie === "side";
    const yaw = turns * (Math.PI / 2);
    const roll = side ? Math.PI / 2 : 0;
    const sy = Math.sin(yaw / 2), cy = Math.cos(yaw / 2), sr = Math.sin(roll / 2), cr = Math.cos(roll / 2);
    this.rest.set([cy * sr, cr * sy, -sy * sr, cy * cr], index * 4);
    this.half[index] = side ? C.unit.height / 2 : narrow ? C.halfShort : C.halfLong;
    this.halfZ[index] = side ? C.unit.length / 2 : narrow ? C.halfLong : C.halfShort;
    this.height[index] = side ? C.unit.width : C.unit.height;
    this.upAxis[index] = side ? (roll > 0 ? -2 : 2) : 1;
  }

  addUnit(index, x, base, fixed) {
    this.count = index + 1;
    this.setPose(index, x, base + this.height[index] / 2, 0);
    this.tops[index] = base + this.height[index];
    this.apart[index] = 0;
    if (fixed) this.bodies[index] = this.makeBody(index, this.live ? this.R.RigidBodyDesc.dynamic().setCanSleep(C.sleep) : this.R.RigidBodyDesc.fixed());
  }

  setPose(i, x, y, z) {
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.rot.set(this.rest.subarray(i * 4, i * 4 + 4), i * 4);
  }

  upright(i) {
    const qx = this.rot[i * 4], qy = this.rot[i * 4 + 1], qz = this.rot[i * 4 + 2], qw = this.rot[i * 4 + 3];
    const a = this.upAxis[i];
    if (a === 1) return 1 - 2 * (qx * qx + qz * qz);
    return Math.sign(a) * 2 * (qy * qz - qx * qw);
  }

  makeBody(i, desc) {
    const R = this.R, p = this.pos, q = this.rot;
    if (this.live) desc.setLinearDamping(C.linearDamping).setAngularDamping(C.angularDamping);
    desc.setTranslation(p[i * 3], p[i * 3 + 1], p[i * 3 + 2])
      .setRotation({ x: q[i * 4], y: q[i * 4 + 1], z: q[i * 4 + 2], w: q[i * 4 + 3] });
    const body = this.world.createRigidBody(desc);
    const u = C.unit, F = C.feet;
    const box = (hx, hy, hz, x, y, z) => this.world.createCollider(
      R.ColliderDesc.cuboid(hx, hy, hz).setTranslation(x, y, z)
        .setFriction(C.friction).setRestitution(C.restitution).setContactSkin(C.contactSkin),
      body,
    );
    box(u.length / 2, (u.height - F.below) / 2, u.width / 2, 0, F.below / 2, 0);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      box(F.half[0], F.half[1], F.half[2], sx * F.x, -u.height / 2 + F.half[1], sz * F.z);
    }
    return body;
  }

  press() {
    if (this.state === IDLE) this.spawn();
    else if (this.state === CARRY) this.release();
    else if (this.state === DONE || this.state === BLAST || this.state === FALL) { this.reset(); this.spawn(); }
  }

  spawn() {
    const index = this.count;
    this.facing(index);
    const base = this.topOf(index - 1) + C.releaseGap;
    this.axis = Math.random() < 0.5 ? 0 : 2;
    this.travel = this.hooks.travel?.(index, base + this.height[index] / 2, this.axis) ?? 3;
    const side = index % 2 ? -1 : 1, under = this.at(index - 1);
    this.addUnit(index, 0, base, false);
    this.pos[index * 3] = this.axis === 0 ? under.x + side * this.travel : under.x;
    this.pos[index * 3 + 2] = this.axis === 2 ? under.z + side * this.travel : under.z;
    this.slideFrom = this.axis === 0 ? under.x : under.z;
    this.dir = -side;
    this.speed = C.speed(this.mode, index);
    this.state = CARRY;
    this.hooks.changed?.();
  }

  get live() {
    return C.mode === "physics";
  }

  at(i) {
    const b = this.live ? this.bodies[i] : null;
    if (!b) return { x: this.pos[i * 3], y: this.pos[i * 3 + 1], z: this.pos[i * 3 + 2] };
    const t = b.translation();
    return { x: t.x, y: t.y, z: t.z };
  }

  topOf(i) {
    return this.live ? this.at(i).y + this.height[i] / 2 : this.tops[i];
  }

  offBelow(i, p) {
    const under = this.at(i - 1);
    const gap = p.y - this.height[i] / 2 - (under.y + this.height[i - 1] / 2);
    const clear = Math.abs(p.x - under.x) > this.half[i] + this.half[i - 1]
      || Math.abs(p.z - under.z) > this.halfZ[i] + this.halfZ[i - 1];
    return gap < -this.height[i] * C.sinkLimit || clear;
  }

  release() {
    const i = this.count - 1;
    this.perfectDrop = false;
    if (this.live) {
      const under = this.at(i - 1);
      if (Math.abs(this.pos[i * 3] - under.x) <= this.speed * C.closeTolerance && Math.abs(this.pos[i * 3 + 2] - under.z) <= this.speed * C.closeTolerance) {
        this.pos[i * 3] = under.x;
        this.pos[i * 3 + 2] = under.z;
        this.perfectDrop = true;
        this.exact[i] = 1;
        this.hooks.perfect?.(i, under.x, this.topOf(i - 1) + this.height[i], under.z);
      }
    }
    const desc = this.R.RigidBodyDesc.dynamic().setCanSleep(C.sleep).setCcdEnabled(true);
    if (!this.live) desc.lockRotations();
    const body = this.makeBody(i, desc);
    body.setLinvel({ x: this.live ? 0 : this.dir * this.speed, y: 0, z: 0 }, true);
    this.bodies[i] = body;
    this.timer = 0;
    this.state = DROP;
  }

  update(dt) {
    if (!this.world) return false;
    if (this.state === IDLE) { this.blend(1); return false; }
    const scale = this.state === BLAST ? C.blastTimeScale
      : this.state === FALL || this.state === DONE ? C.fallTimeScale : C.playTimeScale;
    this.world.timestep = C.step * scale;
    const loose = this.state === FALL || this.state === DONE || this.state === BLAST;
    this.world.numSolverIterations = loose ? C.looseIterations : C.solverIterations;
    this.world.numInternalPgsIterations = loose ? C.loosePgs : C.pgsIterations;
    this.acc = Math.min(this.acc + Math.min(dt, C.maxFrame), C.step * C.maxSteps);
    let moved = false;
    while (this.acc >= C.step) {
      this.acc -= C.step;
      if (this.acc < C.step) {
        if (moved) { this.readPoses(); this.readBalls(); }
        this.keepPrev();
      }
      this.fixedStep(C.step);
      moved = true;
    }
    if (moved) { this.readPoses(); this.readBalls(); }
    this.blend(this.acc / C.step);
    const changed = moved || this.lastMoved;
    this.lastMoved = moved;
    return changed;
  }

  readBalls() {
    for (const T of this.thrown) {
      if (!T.ball) continue;
      const t = T.ball.translation(), q = T.ball.rotation();
      T.ballPos = [t.x, t.y, t.z];
      T.ballRot = [q.x, q.y, q.z, q.w];
    }
  }

  keepPrev() {
    const k = this.pieces.length;
    this.prevPos.set(this.pos.subarray(0, this.count * 3));
    this.prevRot.set(this.rot.subarray(0, this.count * 4));
    for (let a = 0; a < this.apartCount; a++) {
      const i = this.apartOrder[a];
      this.prevPiecePos.set(this.piecePos.subarray(i * k * 3, (i + 1) * k * 3), i * k * 3);
      this.prevPieceRot.set(this.pieceRot.subarray(i * k * 4, (i + 1) * k * 4), i * k * 4);
    }
    this.prevCount = this.count;
    this.prevApart = this.apartCount;
    for (const T of this.thrown) {
      T.prevBallPos = T.ballPos ? [...T.ballPos] : null;
      T.prevBallRot = T.ballRot ? [...T.ballRot] : null;
    }
  }

  blend(f) {
    const k = this.pieces.length;
    const fresh = this.count < this.prevCount;
    const pos = (from, to, out, j, snap) => {
      const x = to[j], y = to[j + 1], z = to[j + 2];
      if (snap || Math.abs(from[j] - x) + Math.abs(from[j + 1] - y) + Math.abs(from[j + 2] - z) > JUMP) {
        out[j] = x; out[j + 1] = y; out[j + 2] = z;
        return true;
      }
      out[j] = from[j] + (x - from[j]) * f; out[j + 1] = from[j + 1] + (y - from[j + 1]) * f; out[j + 2] = from[j + 2] + (z - from[j + 2]) * f;
      return false;
    };
    const rot = (from, to, out, j, snap) => {
      if (snap) { out[j] = to[j]; out[j + 1] = to[j + 1]; out[j + 2] = to[j + 2]; out[j + 3] = to[j + 3]; return; }
      const s = from[j] * to[j] + from[j + 1] * to[j + 1] + from[j + 2] * to[j + 2] + from[j + 3] * to[j + 3] < 0 ? -1 : 1;
      let l = 0;
      for (let c = 0; c < 4; c++) { out[j + c] = from[j + c] * (1 - f) + to[j + c] * s * f; l += out[j + c] * out[j + c]; }
      l = 1 / Math.sqrt(l);
      for (let c = 0; c < 4; c++) out[j + c] *= l;
    };
    for (let i = 0; i < this.count; i++) {
      const snap = pos(this.prevPos, this.pos, this.drawPos, i * 3, fresh || i >= this.prevCount);
      rot(this.prevRot, this.rot, this.drawRot, i * 4, snap);
    }
    for (let a = 0; a < this.apartCount; a++) {
      const i = this.apartOrder[a], isNew = fresh || a >= this.prevApart;
      for (let p = 0; p < k; p++) {
        const j = i * k + p;
        const snap = pos(this.prevPiecePos, this.piecePos, this.drawPiecePos, j * 3, isNew);
        rot(this.prevPieceRot, this.pieceRot, this.drawPieceRot, j * 4, snap);
      }
    }
    for (const T of this.thrown) {
      const a = T.prevBallPos, b = T.ballPos;
      if (!b) { T.drawBallPos = null; continue; }
      T.drawBallPos = a && Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) <= JUMP
        ? [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f] : b;
      if (T.ballRot && T.prevBallRot && T.drawBallPos !== b) {
        const out = T.drawBallRot ?? (T.drawBallRot = [0, 0, 0, 1]);
        rot(T.prevBallRot, T.ballRot, out, 0, false);
      } else T.drawBallRot = T.ballRot;
    }
  }

  fixedStep(h) {
    if (this.state === CARRY) {
      const i = this.count - 1, a = this.axis ?? 0, c = this.slideFrom ?? 0;
      let x = this.pos[i * 3 + a] - c + this.dir * this.speed * h;
      if (x > this.travel) { x = 2 * this.travel - x; this.dir = -1; }
      else if (x < -this.travel) { x = -2 * this.travel - x; this.dir = 1; }
      this.pos[i * 3 + a] = c + x;
    }
    this.world.step();
    if (this.live && (this.state === CARRY || this.state === DROP) && this.watch()) return;
    if (this.state === DROP) {
      this.timer += h;
      if (this.timer >= C.settle) (this.live ? this.land() : this.check());
    } else if (this.state === FALL) {
      this.timer += h;
      this.fallStep(h);
    } else if (this.state === BLAST) this.blastStep();
  }

  check() {
    const n = this.count - 1;
    const body = this.bodies[n];
    const t = body.translation();
    let x = t.x;
    this.pos[n * 3] = x;
    let sum = 0;
    for (let i = n; i >= 1; i--) {
      sum += this.pos[i * 3];
      const mean = sum / (n - i + 1);
      const below = this.pos[(i - 1) * 3];
      if (Math.abs(mean - below) > this.half[i - 1]) return this.fall(i - 1, Math.sign(mean - below) || 1);
    }
    const below = this.pos[(n - 1) * 3];
    const close = Math.abs(x - below) <= this.speed * C.closeTolerance;
    if (close) x = below;
    const base = this.tops[n - 1];
    this.setPose(n, x, base + this.height[n] / 2, 0);
    this.tops[n] = base + this.height[n];
    const r = this.rest;
    body.setBodyType(this.R.RigidBodyType.Fixed, false);
    body.setTranslation({ x, y: this.pos[n * 3 + 1], z: 0 }, false);
    body.setRotation({ x: r[n * 4], y: r[n * 4 + 1], z: r[n * 4 + 2], w: r[n * 4 + 3] }, false);
    this.exact[n] = close ? 1 : 0;
    this.total += C.placedAdds + (close ? C.closeAdds : 0);
    if (this.total > this.peak) this.peak = this.total;
    this.hooks.placed?.(n, close, x, this.tops[n]);
    if (this.count >= C.capacity) {
      let mean = 0;
      for (let i = 1; i < this.count; i++) mean += this.pos[i * 3];
      this.fall(0, Math.sign(mean) || (Math.random() < 0.5 ? -1 : 1), this.count);
    } else this.spawn();
  }

  watch() {
    for (let i = 1; i < this.placed; i++) {
      if (!this.bodies[i]) continue;
      const p = this.at(i);
      if (this.upright(i) < C.tiltLimit || this.offBelow(i, p)) {
        this.fall(i - 1, Math.sign(p.x - this.at(i - 1).x) || 1, this.placed, false);
        return true;
      }
    }
    return false;
  }

  land() {
    const n = this.count - 1;
    const body = this.bodies[n];
    const t = body.translation();
    if (this.offBelow(n, t)) {
      return this.fall(n - 1, Math.sign(t.x - this.at(n - 1).x) || 1, n, false);
    }
    const x = t.x, close = this.perfectDrop;
    this.pos[n * 3] = x;
    this.tops[n] = t.y + this.height[n] / 2;
    this.exact[n] = close ? 1 : 0;
    this.total += C.placedAdds + (close ? C.closeAdds : 0);
    if (this.total > this.peak) this.peak = this.total;
    this.hooks.placed?.(n, close, x, this.tops[n]);
    if (this.count >= C.capacity) this.fall(0, Math.random() < 0.5 ? -1 : 1, this.count, false);
    else this.spawn();
  }

  fall(pivot, lean, placed = this.count - 1, kick = true) {
    const R = this.R;
    if (this.state === CARRY) this.count -= 1;
    this.state = FALL;
    this.hooks.fell?.(placed);
    this.fellAt = placed;
    this.timer = 0;
    this.lastApart = 0;
    for (let i = 0; i < this.count; i++) {
      const body = this.bodies[i];
      if (!body) continue;
      body.setBodyType(R.RigidBodyType.Dynamic, true);
      body.lockRotations(false, true);
      body.setLinearDamping(0);
      body.setAngularDamping(0);
      this.age[i] = 0;
      if (!kick) continue;
      const swing = i > pivot ? C.swingAbove : C.swingBelow;
      const y = this.pos[i * 3 + 1];
      const side = rand(-C.sideJitter, C.sideJitter) + rand(-1, 1) * C.sideSpread * y;
      body.setLinvel({ x: lean * swing * y, y: 0, z: side }, true);
      body.setAngvel({ x: 0, y: 0, z: -lean * swing }, true);
    }
    this.hooks.changed?.();
  }

  fallStep(h) {
    let moving = 0;
    for (let i = 0; i < this.count; i++) {
      if (this.apart[i]) continue;
      this.age[i] += h;
      if (this.age[i] >= C.apartMinAge && this.upright(i) < C.apartUpY) {
        this.disperse(i);
        this.lastApart = this.timer;
      } else if (!this.resting(i)) moving++;
    }
    const settled = moving === 0 || this.timer >= C.fallMaxTime;
    if (settled && this.timer - this.lastApart >= C.endDelay) {
      this.state = DONE;
      this.hooks.end?.(this.fellAt, this.total);
    }
  }

  resting(i) {
    const b = this.bodies[i];
    if (!b || b.isSleeping()) return true;
    const v = b.linvel(), w = b.angvel();
    return v.x * v.x + v.y * v.y + v.z * v.z < C.restSpeed ** 2 && w.x * w.x + w.y * w.y + w.z * w.z < C.restSpeed ** 2;
  }

  disperse(i, calm = false) {
    const R = this.R, body = this.bodies[i];
    let vx = 0, vy = 0, vz = 0, wx = 0, wy = 0, wz = 0;
    if (body) {
      const t = body.translation(), q = body.rotation(), v = body.linvel(), w = body.angvel();
      this.pos[i * 3] = t.x; this.pos[i * 3 + 1] = t.y; this.pos[i * 3 + 2] = t.z;
      this.rot[i * 4] = q.x; this.rot[i * 4 + 1] = q.y; this.rot[i * 4 + 2] = q.z; this.rot[i * 4 + 3] = q.w;
      vx = v.x; vy = v.y; vz = v.z; wx = w.x; wy = w.y; wz = w.z;
      this.world.removeRigidBody(body);
      this.bodies[i] = null;
    }
    this.apart[i] = 1;
    this.apartOrder[this.apartCount++] = i;
    const k = this.pieces.length;
    const px = this.pos[i * 3], py = this.pos[i * 3 + 1], pz = this.pos[i * 3 + 2];
    const qx = this.rot[i * 4], qy = this.rot[i * 4 + 1], qz = this.rot[i * 4 + 2], qw = this.rot[i * 4 + 3];
    const turn = (c) => {
      const tx = 2 * (qy * c[2] - qz * c[1]), ty = 2 * (qz * c[0] - qx * c[2]), tz = 2 * (qx * c[1] - qy * c[0]);
      return [c[0] + qw * tx + (qy * tz - qz * ty), c[1] + qw * ty + (qz * tx - qx * tz), c[2] + qw * tz + (qx * ty - qy * tx)];
    };
    for (let g = 0; g < this.groups.length; g++) {
      const [ox, oy, oz] = turn(this.groupCenter[g]);
      let len = Math.hypot(ox, oz), dx = ox, dz = oz;
      if (len < 0.05) { const a = Math.random() * Math.PI * 2; dx = Math.cos(a); dz = Math.sin(a); len = 1; }
      const lid = !calm && this.groups[g] === "lid", out = calm ? 0 : rand(C.apartSpeed[0], C.apartSpeed[1]) + (lid ? rand(C.lidSlide[0], C.lidSlide[1]) : 0);
      const lift = calm ? 0 : rand(C.apartLift[0], C.apartLift[1]) + (lid ? rand(C.lidLift[0], C.lidLift[1]) : 0), spin = calm ? 0 : C.apartSpin;
      const gb = this.world.createRigidBody(
        R.RigidBodyDesc.dynamic()
          .setTranslation(px, py, pz)
          .setRotation({ x: qx, y: qy, z: qz, w: qw })
          .setLinvel(
            vx + (wy * oz - wz * oy) + (dx / len) * out,
            vy + (wz * ox - wx * oz) + lift,
            vz + (wx * oy - wy * ox) + (dz / len) * out,
          )
          .setAngvel({ x: rand(-1, 1) * spin, y: rand(-1, 1) * spin, z: rand(-1, 1) * spin }),
      );
      for (let p = 0; p < k; p++) {
        if (this.pieceGroup[p] !== g) continue;
        const { center: c, hitCenter, half, collide, shape } = this.pieces[p];
        if (collide) this.partHitbox(gb, hitCenter ?? c, half, shape);
        const j = i * k + p;
        this.pieceBodies[j] = gb;
        const [wxp, wyp, wzp] = turn(c);
        this.piecePos[j * 3] = px + wxp; this.piecePos[j * 3 + 1] = py + wyp; this.piecePos[j * 3 + 2] = pz + wzp;
        this.pieceRot.set(this.rot.subarray(i * 4, i * 4 + 4), j * 4);
      }
      this.groupBodies.push(gb);
    }
    this.hooks.changed?.();
  }

  partHitbox(body, c, h, shape) {
    const box = (hx, hy, hz, x, y, z) => this.world.createCollider(
      this.R.ColliderDesc.cuboid(hx, hy, hz).setTranslation(x, y, z)
        .setFriction(C.pieceFriction).setRestitution(C.pieceRestitution).setContactSkin(C.contactSkin),
      body,
    );
    const t = C.wall / 2;
    if (shape === "lid") return box(C.unit.length / 2, t, C.unit.width / 2, c[0], c[1] + h[1] + t + C.contactSkin, c[2]);
    if (shape !== "tray" && shape !== "cap") return box(h[0], h[1], h[2], c[0], c[1], c[2]);
    box(h[0], t, h[2], c[0], shape === "tray" ? c[1] - h[1] + t : c[1] + h[1] - t, c[2]);
    box(t, h[1], h[2], c[0] - h[0] + t, c[1], c[2]);
    box(t, h[1], h[2], c[0] + h[0] - t, c[1], c[2]);
    box(h[0] - 2 * t, h[1], t, c[0], c[1], c[2] - h[2] + t);
    box(h[0] - 2 * t, h[1], t, c[0], c[1], c[2] + h[2] - t);
  }

  prebuild(units) {
    this.reset();
    this.world.timestep = C.step;
    for (let i = 1; i < units; i++) {
      this.facing(i);
      this.addUnit(i, 0, this.topOf(i - 1) + C.contactSkin * 2, false);
      this.bodies[i] = this.makeBody(i, this.R.RigidBodyDesc.dynamic().setCanSleep(C.sleep));
      for (let k = 0; k < C.prebuildSettle; k++) this.world.step();
    }
    for (let k = 0; k < C.prebuildSettle * 4; k++) this.world.step();
    this.readPoses();
    this.blend(1);
    this.fellAt = this.count;
    this.state = DONE;
    this.hooks.changed?.();
  }

  stackUp(n) {
    if (this.state !== CARRY) return false;
    this.count -= 1;
    this.world.timestep = C.step;
    for (let k = 0; k < n && this.count < C.capacity - 1; k++) {
      const i = this.count, under = this.at(i - 1);
      this.facing(i);
      this.addUnit(i, under.x, this.topOf(i - 1) + C.contactSkin * 2, false);
      this.pos[i * 3 + 2] = under.z;
      this.bodies[i] = this.makeBody(i, this.R.RigidBodyDesc.dynamic().setCanSleep(C.sleep));
      for (let s = 0; s < C.prebuildSettle; s++) this.world.step();
    }
    this.readPoses();
    this.blend(1);
    this.spawn();
    return true;
  }

  fire(style = "bowling") {
    if (this.state !== DONE && this.state !== FALL && this.state !== BLAST) return;
    const S = styles[style] ?? styles.bowling;
    if (S.kind === "well" && this.well) return;
    if ((S.kind === "hole" || S.kind === "wrecking") && this.thrown.some((T) => T.style === style)) return;
    if (S.kind === "quake" && this.shaker) { this.shaker.age = 0; return; }
    this.unload();
    this.launch(style);
    if (this.ball || this.hole) {
      const T = {};
      this.save(T);
      this.thrown.push(T);
    }
    this.unload();
  }

  load(T) { for (const f of THROWN) this[f] = T[f] ?? null; }
  save(T) { for (const f of THROWN) T[f] = this[f]; }
  unload() { for (const f of THROWN) this[f] = null; }

  eachBall(fn) {
    for (const T of this.thrown) {
      const live = T === this.current, b = live ? this.ball : T.ball;
      if (b) fn(b, T, live);
    }
  }

  dropBall(T, live) {
    const at = live ? this : T;
    this.world.removeRigidBody(at.ball);
    at.ball = null;
    at.ballCollider = null;
    at.ballPos = null;
  }

  launch(style) {
    const S = styles[style] ?? styles.bowling;
    this.state = BLAST;
    this.style = style;
    this.ballKind = S.kind;
    this.ballScale = S.radius ?? C.ballRadius;
    let n = 0, ax = 0, az = 0, top = 0, low = Infinity;
    for (let i = 0; i < this.count; i++) {
      if (this.apart[i] || !this.bodies[i]) continue;
      const t = this.bodies[i].translation();
      n++; ax += t.x; az += t.z;
      top = Math.max(top, t.y + this.height[i] / 2);
      low = Math.min(low, t.y);
    }
    if (!n) { ax = this.pos[0]; az = this.pos[2]; top = C.unit.height; low = 0; }
    else { ax /= n; az /= n; }
    const R = this.R;
    for (let i = 0; i < this.count; i++) {
      const b = this.bodies[i];
      if (!b || this.apart[i]) continue;
      b.setBodyType(R.RigidBodyType.Dynamic, true);
      b.lockRotations(false, true);
      b.setLinearDamping(0);
      b.setAngularDamping(0);
      this.age[i] = C.apartMinAge;
    }
    this.goal = null;

    if (S.kind === "hole") {
      const m = this.middle() ?? { x: ax, y: 0, z: az };
      this.hole = { at: [m.x, Math.max(m.y, top * S.at[1], S.radius), m.z], age: 0 };
      this.ballPos = [...this.hole.at];
      this.ballScale = 0;
      this.hooks.changed?.();
      return;
    }

    let radius = S.radius ?? C.ballRadius;
    const gap = style === "bowling" ? this.goalGap() : 0;
    if (gap > 0) radius = Math.min(radius, Math.max(C.goalBallMin, (gap * C.goalBallFit) / 2));
    this.ballScale = radius;
    const ty = S.kind === "roll" ? radius + 0.01 : Math.max(low, top * S.aim, radius + 0.02);

    if (S.kind === "wrecking") {
      const px = ax, py = ty + S.chain, pz = az + S.ahead;
      this.pivot = this.world.createRigidBody(R.RigidBodyDesc.fixed().setTranslation(px, py, pz));
      const dy = -Math.cos(S.swing), dz = -Math.sin(S.swing);
      const bx = px, by = py + dy * (S.chain + radius), bz = pz + dz * (S.chain + radius);
      this.ball = this.world.createRigidBody(R.RigidBodyDesc.dynamic().setTranslation(bx, by, bz).setCcdEnabled(true).setLinearDamping(0.15).setAngularDamping(0.5));
      this.ballCollider = this.world.createCollider(R.ColliderDesc.ball(radius).setDensity(S.density).setFriction(0.6).setRestitution(0.1), this.ball);
      this.world.createImpulseJoint(R.JointData.rope(S.chain + radius, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }), this.pivot, this.ball, true);
      this.chainFrom = [px, py, pz];
      this.ballPos = [bx, by, bz];
      this.hooks.changed?.();
      return;
    }

    if (S.kind === "well") {
      const m = this.middle(), R2 = S.radius, c = m ? [m.x, m.z] : [ax, az - R2 * S.offset];
      this.well = { c, age: 0, steps: 0, mesh: null };
      this.layFloor();
      this.eachBall((b) => b.wakeUp());
      this.wellStep();
      this.hooks.changed?.();
      return;
    }

    if (S.kind === "quake") {
      this.shaker = { kind: "quake", age: 0 };
      if (!this.ground) {
        this.ground = this.world.createRigidBody(R.RigidBodyDesc.kinematicPositionBased());
        this.layFloor();
        if (this.well) this.well.relay = true;
      }
      this.eachBall((b) => b.wakeUp());
      this.hooks.changed?.();
      return;
    }

    if (S.kind === "cap") {
      const goal = this.randomUnit() ?? { x: ax, y: top * 0.5, z: az };
      const from = { x: goal.x + S.from[0], y: goal.y + S.rise, z: goal.z + S.from[1] };
      const dx = goal.x - from.x, dz = goal.z - from.z, flat = Math.hypot(dx, dz), time = flat / S.speed;
      const g = C.gravity * (1 - S.lift);
      this.ball = this.world.createRigidBody(R.RigidBodyDesc.dynamic().setTranslation(from.x, from.y, from.z).setCcdEnabled(true)
        .setLinvel((dx / flat) * S.speed, (goal.y - from.y) / time - 0.5 * g * time, (dz / flat) * S.speed)
        .setAngvel({ x: 0, y: S.spin, z: 0 }));
      const shape = (S.hull && R.ColliderDesc.convexHull(S.hull)) || R.ColliderDesc.ball(1);
      this.ballCollider = this.world.createCollider(shape.setDensity(S.density).setFriction(0.8).setRestitution(0.1), this.ball);
      this.ballPos = [from.x, from.y, from.z];
      this.ballAge = 0;
      this.hooks.changed?.();
      return;
    }

    if (S.kind === "arrow") {
      const goal = this.randomUnit() ?? { x: ax, y: top * S.aim, z: az };
      const tx = goal.x + rand(-S.spread, S.spread), tz = goal.z;
      const tyA = Math.max(goal.y + rand(-S.spread, S.spread) * 0.3, 0.1);
      const from = { x: tx + S.from[0], y: tyA + S.rise, z: tz + S.from[1] };
      const dx = tx - from.x, dz = tz - from.z, flat = Math.hypot(dx, dz), time = flat / S.speed;
      const v = { x: (dx / flat) * S.speed, y: (tyA - from.y) / time - 0.5 * C.gravity * time, z: (dz / flat) * S.speed };
      this.ball = this.world.createRigidBody(R.RigidBodyDesc.dynamic().setTranslation(from.x, from.y, from.z).setLinvel(v.x, v.y, v.z).setRotation(along(v)));
      this.ballCollider = this.world.createCollider(R.ColliderDesc.capsule(S.length / 2, S.radius).setMass(S.mass).setSensor(true), this.ball);
      this.ballPos = [from.x, from.y, from.z];
      this.ballAge = 0;
      this.stuck = null;
      const arrows = this.thrown.filter((T) => T.style === "arrow" && T.ball);
      if (arrows.length >= S.keep) this.dropBall(arrows[0], false);
      this.hooks.changed?.();
      return;
    }

    const from = { x: ax + S.from[0], y: ty, z: az + S.from[1] };
    const dx = ax - from.x, dz = az - from.z, flat = Math.hypot(dx, dz);
    const time = flat / S.speed, vy = S.kind === "roll" ? 0 : -0.5 * C.gravity * time;
    const desc = R.RigidBodyDesc.dynamic().setTranslation(from.x, from.y, from.z).setCcdEnabled(true)
      .setLinvel((dx / flat) * S.speed, vy, (dz / flat) * S.speed);
    if (S.kind === "roll") desc.setAngvel({ x: (dz / flat) * S.speed / radius, y: 0, z: -(dx / flat) * S.speed / radius });
    this.ball = this.world.createRigidBody(desc);
    this.ballCollider = this.world.createCollider(
      R.ColliderDesc.ball(radius).setDensity(S.density).setFriction(C.ballFriction).setRestitution(S.bounce ?? C.ballRestitution),
      this.ball,
    );
    this.ballPos = [from.x, from.y, from.z];
    this.ballAge = 0;
    if (style === "bowling") this.watchGoal(radius);
    this.hooks.changed?.();
  }

  pull(x, y, z, strength, range) {
    const h = this.world.timestep;
    const tug = (b, share = 1) => {
      if (!b) return;
      const s = strength * share;
      const t = b.translation(), dx = x - t.x, dy = y - t.y, dz = z - t.z, d = Math.hypot(dx, dy, dz);
      if (d > range || d < 1e-4) return;
      const a = Math.min(s / (d * d + 0.05), 400) * h / d, v = b.linvel();
      b.setLinvel({ x: v.x + dx * a, y: v.y + dy * a, z: v.z + dz * a }, true);
    };
    for (let i = 0; i < this.count; i++) if (!this.apart[i]) tug(this.bodies[i]);
    for (const b of this.groupBodies) tug(b);
    this.eachBall((b) => tug(b));
  }

  arrowStep(t) {
    const S = styles.arrow, b = this.ball;
    if (this.stuck) {
      if (this.stuck.heavy && (this.stuck.age = (this.stuck.age ?? 0) + this.world.timestep) > S.heavyFor) {
        this.stuck.heavy = false;
        this.ballCollider.setMass(S.restMass);
      }
      if (this.stuck.body && this.world.getRigidBody(this.stuck.body.handle) !== this.stuck.body) {
        const u = this.stuck.unit ?? -1, k = this.pieces.length, c = this.pieces.findIndex((p) => p.group === "case");
        const into = u >= 0 && this.apart[u] && c >= 0 ? this.pieceBodies[u * k + c] : null;
        if (into) { this.stickTo(into, b); this.stuck.body = into; this.stuck.unit = -1; return; }
        this.stuck = null;
        this.ballCollider.setSensor(false);
        b.wakeUp();
      }
      return;
    }
    if (this.ballCollider && !this.ballCollider.isSensor()) return;
    const v = b.linvel(), speed = Math.hypot(v.x, v.y, v.z) || 1;
    b.setRotation(along(v), true);
    b.setAngvel({ x: 0, y: 0, z: 0 }, true);
    const d = { x: v.x / speed, y: v.y / speed, z: v.z / speed }, reach = S.length / 2;
    const tip = { x: t.x + d.x * reach, y: t.y + d.y * reach, z: t.z + d.z * reach };
    const inside = (body, c, half) => {
      const p = body.translation(), q = body.rotation();
      const x = tip.x - p.x, y = tip.y - p.y, z = tip.z - p.z;
      const ix = -q.x, iy = -q.y, iz = -q.z, w = q.w;
      const tx = 2 * (iy * z - iz * y), ty = 2 * (iz * x - ix * z), tz = 2 * (ix * y - iy * x);
      const lx = x + w * tx + (iy * tz - iz * ty) - c[0], ly = y + w * ty + (iz * tx - ix * tz) - c[1], lz = z + w * tz + (ix * ty - iy * tx) - c[2];
      return Math.abs(lx) < half[0] && Math.abs(ly) < half[1] && Math.abs(lz) < half[2];
    };
    let hit = null;
    const unitHalf = [C.unit.length / 2, C.unit.height / 2, C.unit.width / 2];
    for (let i = 0; i < this.count && !hit; i++) {
      if (!this.apart[i] && this.bodies[i] && inside(this.bodies[i], [0, 0, 0], unitHalf)) hit = this.bodies[i];
    }
    const k = this.pieces.length;
    for (let a = 0; a < this.apartCount && !hit; a++) {
      const i = this.apartOrder[a];
      for (let p = 0; p < k && !hit; p++) {
        const body = this.pieceBodies[i * k + p], piece = this.pieces[p];
        if (body && piece.collide && inside(body, piece.hitCenter ?? piece.center, piece.half)) hit = body;
      }
    }
    const overHole = this.well && Math.hypot(tip.x - this.well.c[0], tip.z - this.well.c[1]) < styles.sinkhole.radius;
    if (!hit && tip.y <= 0 && !overHole) hit = this.floor.parent() ?? "floor";
    if (!hit) return;
    if (hit === "floor") {
      b.setLinvel({ x: 0, y: 0, z: 0 }, true);
      b.setBodyType(this.R.RigidBodyType.Fixed, true);
      this.ballCollider.setMass(S.restMass);
      this.stuck = { body: null };
    } else {
      this.stickTo(hit, b);
      this.stuck = { body: hit, heavy: true, unit: this.bodies.indexOf(hit) };
    }
    this.hooks.stuck?.();
  }

  stickTo(hit, b) {
    const t = b.translation(), p = hit.translation(), q = hit.rotation();
    const iq = { x: -q.x, y: -q.y, z: -q.z, w: q.w };
    const rel = turn(iq, { x: t.x - p.x, y: t.y - p.y, z: t.z - p.z });
    this.world.createImpulseJoint(this.R.JointData.fixed(rel, mul(iq, b.rotation()), { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0, w: 1 }), hit, b, true);
    hit.wakeUp();
  }

  layFloor() {
    const R = this.R, L = 60;
    for (const c of this.floorParts) this.world.removeCollider(c, true);
    const slab = (hx, hz, x, z) => this.world.createCollider(R.ColliderDesc.cuboid(hx, 1, hz).setTranslation(x, -1, z).setFriction(C.floorFriction), this.ground ?? undefined);
    if (!this.well) {
      this.floorParts = [slab(L, L, 0, 0)];
    } else {
      const [cx, cz] = this.well.c, R2 = styles.sinkhole.radius, x0 = cx - R2, x1 = cx + R2, z0 = cz - R2, z1 = cz + R2;
      this.floorParts = [
        slab((x0 + L) / 2, L, (x0 - L) / 2, 0),
        slab((L - x1) / 2, L, (x1 + L) / 2, 0),
        slab(R2, (z0 + L) / 2, cx, (z0 - L) / 2),
        slab(R2, (L - z1) / 2, cx, (z1 + L) / 2),
      ];
    }
    this.floor = this.floorParts[0];
  }

  wellStep() {
    const S = styles.sinkhole, W = this.well, R = this.R;
    W.age += this.world.timestep;
    const ss = (x) => x * x * (3 - 2 * x), k = Math.min(1, W.age / S.grow);
    const e = (ss(S.start + (1 - S.start) * k) - ss(S.start)) / (1 - ss(S.start));
    const radius = S.radius, depth = S.depth * e, soft = S.radius * Math.pow(S.soft / S.radius, e), tube = k === 1;
    const span = radius - S.throat, rim = 1 / Math.sqrt(span * span + soft * soft);
    const f = (r) => { const x = Math.max(r - S.throat, 0); return r >= radius ? 0 : Math.max(-S.deep, -depth * (1 / Math.sqrt(x * x + soft * soft) - rim)); };
    this.wellView = { c: W.c, radius, throat: S.throat, depth, deep: S.deep, soft, tube };
    if (W.steps++ % S.rebuild === 0 || (tube && !W.opened) || W.relay) {
      W.opened = tube;
      W.relay = false;
      const N = S.grid, [cx, cz] = W.c, side = S.radius * 2;
      const v = new Float32Array(N * N * 3), idx = new Uint32Array((N - 1) * (N - 1) * 6);
      for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) {
        const x = cx - S.radius + (q * side) / (N - 1), z = cz - S.radius + (r * side) / (N - 1), i = (r * N + q) * 3;
        v[i] = x; v[i + 1] = f(Math.hypot(x - cx, z - cz)); v[i + 2] = z;
      }
      let n = 0;
      for (let r = 0; r < N - 1; r++) for (let q = 0; q < N - 1; q++) {
        const a = r * N + q, b = a + 1, c = a + N, d = c + 1;
        idx.set([a, c, b, b, c, d], n); n += 6;
      }
      if (W.mesh) this.world.removeCollider(W.mesh, true);
      W.mesh = this.world.createCollider(R.ColliderDesc.trimesh(v, idx).setFriction(C.floorFriction), this.ground ?? undefined);
    }
    const gone = -S.swallow;
    for (let i = 0; i < this.count; i++) {
      const b = this.bodies[i];
      if (!b || this.apart[i] || b.translation().y > gone) continue;
      this.world.removeRigidBody(b);
      this.bodies[i] = null;
      this.pos[i * 3 + 1] = -1000;
    }
    for (let g = this.groupBodies.length - 1; g >= 0; g--) {
      const b = this.groupBodies[g];
      if (b.translation().y > gone) continue;
      for (let j = 0; j < this.pieceBodies.length; j++) if (this.pieceBodies[j] === b) { this.pieceBodies[j] = null; this.piecePos[j * 3 + 1] = -1000; }
      this.world.removeRigidBody(b);
      this.groupBodies.splice(g, 1);
    }
    this.eachBall((b, T, live) => { if (b.translation().y <= gone) this.dropBall(T, live); });
    if (W.age > S.life) W.done = true;
  }

  shakeStep() {
    const K = this.shaker, S = styles.quake;
    K.age += this.world.timestep;
    const t = K.age;
    const amp = S.amplitude * Math.min(1, t / S.rise) * Math.max(0, 1 - Math.max(0, t - (S.last - S.rise)) / S.rise);
    const w = 2 * Math.PI * S.frequency;
    this.quakeOffset = [Math.sin(w * t) * amp, Math.sin(w * 1.3 * t + 1) * amp * 0.6];
    this.ground.setNextKinematicTranslation({ x: this.quakeOffset[0], y: 0, z: this.quakeOffset[1] });
    if (t > S.last) {
      this.quakeOffset = null;
      this.shaker = null;
    }
  }

  holeStep() {
    const S = styles.blackhole, H = this.hole;
    H.age += this.world.timestep;
    const r = S.radius * Math.min(1, H.age / S.grow);
    this.ballScale = r;
    const [x, y, z] = H.at;
    this.pull(x, y, z, S.strength * (r / S.radius), S.range);
    for (let i = 0; i < this.count; i++) {
      if (this.apart[i] || !this.bodies[i]) continue;
      const t = this.bodies[i].translation();
      if (Math.hypot(t.x - x, t.y - y, t.z - z) < r * S.breakAt) this.disperse(i);
    }
    const k = this.pieces.length;
    for (let g = this.groupBodies.length - 1; g >= 0; g--) {
      const b = this.groupBodies[g], t = b.translation();
      if (Math.hypot(t.x - x, t.y - y, t.z - z) > r * S.eat) continue;
      for (let j = 0; j < this.pieceBodies.length; j++) {
        if (this.pieceBodies[j] !== b) continue;
        this.pieceBodies[j] = null;
        this.piecePos[j * 3 + 1] = -1000;
      }
      this.world.removeRigidBody(b);
      this.groupBodies.splice(g, 1);
    }
    this.eachBall((b, T, live) => {
      const t = b.translation();
      if (Math.hypot(t.x - x, t.y - y, t.z - z) < r * S.eat + (T.ballScale ?? C.ballRadius)) this.dropBall(T, live);
    });
    this.hole.done = H.age > S.life;
    if (this.hole.done) { this.hole = null; this.ballPos = null; }
  }

  randomUnit() {
    const k = this.pieces.length, c = this.pieces.findIndex((p) => p.group === "case"), at = [];
    for (let i = 0; i < this.count; i++) {
      if (!this.apart[i]) {
        if (this.bodies[i]) { const t = this.bodies[i].translation(); at.push({ i, x: t.x, y: t.y, z: t.z }); }
      } else if (c >= 0 && this.pieceBodies[i * k + c]) {
        const j = (i * k + c) * 3;
        if (this.piecePos[j + 1] > -50) at.push({ i, x: this.piecePos[j], y: this.piecePos[j + 1], z: this.piecePos[j + 2] });
      }
    }
    const pool = at.length > 1 ? at.filter((u) => u.i !== this.lastTarget) : at;
    const pick = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    this.lastTarget = pick?.i ?? -1;
    return pick;
  }

  middle() {
    const k = this.pieces.length;
    let n = 0, x = 0, y = 0, z = 0;
    for (let i = 0; i < this.count; i++) {
      if (!this.apart[i]) {
        if (!this.bodies[i]) continue;
        const t = this.bodies[i].translation();
        n++; x += t.x; y += t.y; z += t.z;
        continue;
      }
      for (let p = 0; p < k; p++) {
        const j = (i * k + p) * 3;
        if (!this.pieceBodies[i * k + p] || this.piecePos[j + 1] < -50) continue;
        n++; x += this.piecePos[j]; y += this.piecePos[j + 1]; z += this.piecePos[j + 2];
      }
    }
    return n ? { x: x / n, y: y / n, z: z / n } : null;
  }

  goalGap() {
    if (this.count !== 2 || this.apart[0] || this.apart[1] || !this.bodies[0] || !this.bodies[1]) return 0;
    const a = this.bodies[0].translation(), b = this.bodies[1].translation();
    const onFloor = (t, i) => t.y < this.height[i] * 0.75;
    const across = Math.abs(a.x - b.x), along = Math.abs(a.z - b.z);
    if (!onFloor(a, 0) || !onFloor(b, 1) || across <= along) return 0;
    return Math.max(0, across - this.half[0] - this.half[1]);
  }

  watchGoal(radius = C.ballRadius) {
    this.goal = null;
    if (!this.goalGap()) return;
    const a = this.bodies[0].translation(), b = this.bodies[1].translation();
    const reach = C.unit.width / 2 + radius;
    this.goal = {
      left: Math.min(a.x, b.x), right: Math.max(a.x, b.x),
      front: Math.min(a.z, b.z) - reach, line: Math.max(a.z, b.z) + reach,
      lifted: false, radius,
    };
  }

  goalStep(t) {
    const g = this.goal;
    if (!g) return;
    const between = t.x > g.left && t.x < g.right;
    if (between && t.z > g.front && t.z <= g.line && t.y > g.radius + C.goalLift) g.lifted = true;
    if (t.z <= g.line) return;
    this.goal = null;
    if (between && !g.lifted) this.hooks.goal?.();
  }

  blastStep() {
    if (this.well && (!this.well.done || this.well.relay)) this.wellStep();
    if (this.shaker) this.shakeStep();
    for (let k = this.thrown.length - 1; k >= 0; k--) {
      const T = this.thrown[k];
      this.current = T;
      this.load(T);
      this.thrownStep();
      this.save(T);
      this.current = null;
      if (!T.ball && !T.hole) this.thrown.splice(k, 1);
    }
    this.unload();
    this.tipApart();
  }

  thrownStep() {
    if (this.hole) this.holeStep();
    if (!this.ball) return;
    const t = this.ball.translation();
    this.ballPos = [t.x, t.y, t.z];
    this.goalStep(t);
    const S = styles[this.style] ?? styles.bowling;
    this.ballAge = (this.ballAge ?? 0) + this.world.timestep;
    if (S.pull && this.ballAge < S.pullFor) this.pull(t.x, t.y, t.z, S.pull, S.range);
    if (S.kind === "cap" && this.ballAge < S.liftFor) {
      const v = this.ball.linvel();
      this.ball.setLinvel({ x: v.x, y: v.y - C.gravity * S.lift * this.world.timestep, z: v.z }, true);
    }
    if (S.kind === "arrow") {
      this.arrowStep(t);
      if (this.stuck) return;
      if (t.y < -3 && !this.well) { this.dropBall(null, true); return; }
    }
    if (Math.hypot(t.x - this.pos[0], t.z - this.pos[2]) > C.ballGone) {
      this.world.removeRigidBody(this.ball);
      this.ball = null;
      this.ballPos = null;
    }
  }

  tipApart() {
    for (let i = 0; i < this.count; i++) {
      const b = this.bodies[i];
      if (this.apart[i] || !b) continue;
      if (this.upright(i) < C.apartUpY) this.disperse(i);
    }
  }

  moving(b) {
    const v = b.linvel(), w = b.angvel();
    return v.x * v.x + v.y * v.y + v.z * v.z > C.restSpeed ** 2 || w.x * w.x + w.y * w.y + w.z * w.z > C.restSpeed ** 2;
  }

  readPoses() {
    let moving = false;
    for (let i = 0; i < this.count; i++) {
      const b = this.bodies[i];
      if (!b || b.isFixed() || b.isSleeping()) continue;
      const t = b.translation(), q = b.rotation();
      this.pos[i * 3] = t.x; this.pos[i * 3 + 1] = t.y; this.pos[i * 3 + 2] = t.z;
      this.rot[i * 4] = q.x; this.rot[i * 4 + 1] = q.y; this.rot[i * 4 + 2] = q.z; this.rot[i * 4 + 3] = q.w;
      if (!moving) moving = this.moving(b);
    }
    this.piecesAwake = moving;
    const k = this.pieces.length;
    for (let a = 0; a < this.apartCount; a++) {
      const i = this.apartOrder[a];
      for (let p = 0; p < k; p++) {
        const j = i * k + p, b = this.pieceBodies[j];
        if (!b || b.isSleeping()) continue;
        if (!this.piecesAwake) this.piecesAwake = this.moving(b);
        const t = b.translation(), q = b.rotation(), c = this.pieces[p].center;
        const tx = 2 * (q.y * c[2] - q.z * c[1]), ty = 2 * (q.z * c[0] - q.x * c[2]), tz = 2 * (q.x * c[1] - q.y * c[0]);
        this.piecePos[j * 3] = t.x + c[0] + q.w * tx + (q.y * tz - q.z * ty);
        this.piecePos[j * 3 + 1] = t.y + c[1] + q.w * ty + (q.z * tx - q.x * tz);
        this.piecePos[j * 3 + 2] = t.z + c[2] + q.w * tz + (q.x * ty - q.y * tx);
        this.pieceRot[j * 4] = q.x; this.pieceRot[j * 4 + 1] = q.y; this.pieceRot[j * 4 + 2] = q.z; this.pieceRot[j * 4 + 3] = q.w;
      }
    }
  }

  get busy() {
    return this.state === CARRY || this.state === DROP || this.state === FALL || this.piecesAwake
      || (this.state === BLAST && (this.thrown.some((T) => (T.ball && !T.stuck && !T.ball.isSleeping()) || T.hole) || !!this.shaker || (!!this.well && !this.well.done)));
  }

  get blasted() {
    return this.state === BLAST;
  }

  dispose() {
    this.world?.free();
    this.world = null;
  }
}

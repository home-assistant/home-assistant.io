const text = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob("eyJjb3B5Ijp7ImNyZWRpdHMiOnsib3BlbiI6IkNyZWRpdHMiLCJ0aXRsZSI6IkNyZWRpdHMiLCJtYWRlIjoiTWFkZSBieSA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL21yZGFycmVuZ3JpZmZpblwiPm1yZGFycmVuZ3JpZmZpbjwvYT4gYW5kIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vZGFuLWxvbmctZGV2XCI+ZGFuLWxvbmctZGV2PC9hPiIsIm5vdGVzIjpbWyJDYXA6IDxhIGhyZWY9XCJodHRwczovL3BvbHkucGl6emEvbS9hYUM1R2djV0VoTVwiPkJhc2ViYWxsIGNhcDwvYT4gYnkgUG9seSBieSBHb29nbGUiLCI8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC9cIj5DQyBCWSAzLjA8L2E+Il0sWyJCdWlsdCB3aXRoIDxhIGhyZWY9XCJodHRwczovL3RocmVlanMub3JnXCI+dGhyZWUuanM8L2E+IiwiTUlUIl0sWyJQaHlzaWNzIGJ5IDxhIGhyZWY9XCJodHRwczovL3JhcGllci5yc1wiPlJhcGllcjwvYT4iLCJBcGFjaGUgMi4wIl1dfSwidW5pdHMiOiJVbml0cyIsInRvdGFsIjoiVG90YWwiLCJwZWFrIjoiUGVhayIsImNsb3NlIjoiKzIiLCJlbmQiOiJUaGUgY29sdW1uIGZlbGwgYXQge3V9IHVuaXRzLiBUb3RhbCB7dH0uIiwiYWdhaW4iOiJSZXBsYXkiLCJkZXN0cm95IjoiRGVzdHJveSIsInBsYXlBZ2FpbiI6IlBsYXkgYWdhaW4iLCJtb2RlcyI6eyJlYXN5IjoiRWFzeSIsIm1lZGl1bSI6Ik1lZGl1bSIsImhhcmQiOiJIYXJkIn0sImJlc3QiOiJQZXJzb25hbCBiZXN0IiwicGIiOiJQQiIsInBsYXkiOiJQbGF5IiwicGVyZmVjdCI6IlBlcmZlY3QiLCJoaW50S2V5cyI6IlByZXNzIFNwYWNlIG9yIGNsaWNrIHRvIHBsYWNlIiwiaGludFRvdWNoIjoiVGFwIHRvIHBsYWNlIiwibmV3QmVzdCI6Ik5ldyBwZXJzb25hbCBiZXN0IiwiZ29hbCI6Ik9oLCB5b3UgdGhpbmsgeW914oCZcmUgY2xldmVyLCBodWg/IiwidW5sb2NrZWQiOiJEZXN0cm95IHN0eWxlcyB1bmxvY2tlZCIsInJlYnVpbGQiOiJSZWJ1aWxkIiwiYmVuY2giOnsidGl0bGUiOiJHYW1lIGJlbmNoIiwiYXV0b3N0YWNrIjoiQXV0b3N0YWNrIiwib2ZmIjoiT2ZmIiwicGVyZmVjdCI6IlBlcmZlY3QiLCJjbG9zZSI6IkNsb3NlIiwiYWRkIjoiKzEwIHVuaXRzIiwiYnVpbGQiOiJCdWlsZCB0b3dlciJ9LCJzdHlsZXMiOnsidGVubmlzIjoiVGVubmlzIGJhbGwiLCJjYXAiOiJDYXAiLCJib3dsaW5nIjoiQm93bGluZyBiYWxsIiwiYXJyb3ciOiJCb3cgYW5kIGFycm93Iiwid3JlY2tpbmciOiJXcmVja2luZyBiYWxsIiwicXVha2UiOiJFYXJ0aHF1YWtlIiwic2lua2hvbGUiOiJTaW5raG9sZSIsImJsYWNraG9sZSI6IkJsYWNrIGhvbGUifX0sImhlaWdodHMiOlsiU29kYSBjYW4iLCJDb25uZWN0IFpCVC0yIiwiV2F0ZXIgYm90dGxlLCA1MDAgbWwiLCIxMi1pbmNoIHZpbnlsIHJlY29yZCIsIkNvbm5lY3QgWldBLTIiLCJCb3dsaW5nIHBpbiIsIklLRUEgQUxFWCBkcmF3ZXIgdW5pdCIsIktpdGNoZW4gY291bnRlciIsIklLRUEgS0FMTEFYIHNoZWxmLCAyIMOXIDQiLCJJbnRlcmlvciBkb29yIiwiUm9vbSBjZWlsaW5nIiwiQmFza2V0YmFsbCBob29wIiwiRG91YmxlLWRlY2tlciBidXMiLCJHaXJhZmZlIl0sImtleSI6ImNvbm5lY3QtYXV4LTItZHJhd2luZyIsImNhbnZhcyI6IkxpbmUgZHJhd2luZyBvZiB0aGUgQ29ubmVjdCBBVVgtMi4gRHJhZyB0byB0dXJuIGl0LiIsImV2ZW50cyI6eyJuYW1lIjoiRWFzdGVyIEVnZyIsInN0YXJ0Ijoic3RhcnQiLCJlbmQiOiJnYW1lIG92ZXIifX0="), (c) => c.charCodeAt(0))));

export const render = {
  matchSize: 1300,
  supersample: 2,
  fit: "cover",
  runPixelBudget: 4.5e6,
  adapt: { slow: 20, window: 1000, down: 0.85, floor: 0.6 },
  crossfade: 0.5,
  crossfadeLead: 0.3,
  gridCell: 0.02,
  gridRadius: 3,
  gridStrength: 0.5,
  gridDraw: 2.4,
  gridReach: 3,
  gridLag: 1.8,
  gridSoft: 0.004,
  lineFade: 0.35,
  lineFloor: 0.65,
  gridFade: 1,
  exactColor: [0.6, 0.6, 0.6],
  exactAlpha: 0.45,
  exactFade: 0.6,
};

export const camera = {
  followRate: 4,
  fitRate: 2.2,
  followFrom: 0.075,
  fitMargin: 1.25,
  tallZoom: 0.6,
  tallPlay: 0.65,
  flatten: 1,
  returnTime: 0.45,
  horizon: 0.08,
  debrisShare: 0.65,
  debrisSample: 400,
  failMinZoom: 1.4,
  blastMinZoom: 1.5,
  failMaxZoom: 4,
  overDelay: 1.2,
  holeFrame: 0.6,
  blastRate: 1.2,
};

export const column = {
  mode: "physics",
  tiltLimit: 0.93,
  sinkLimit: 0.5,

  unit: { width: 0.63, height: 0.248, length: 1.06 },
  feet: {
    half: [0.0385, 0.0205, 0.038],
    x: 0.4505,
    z: 0.235,
    below: 0.008,
  },
  gravity: -98.1,
  step: 1 / 120,
  maxSteps: 3,
  lengthUnit: 1,
  solverIterations: 12,
  pgsIterations: 3,
  looseIterations: 8,
  loosePgs: 2,
  sleep: true,
  contactFrequency: 150,
  contactSkin: 0.002,
  linearDamping: 0.1,
  angularDamping: 0.4,
  maxFrame: 0.05,
  friction: 0.4,
  restitution: 0,
  floorFriction: 0.8,
  releaseGap: 0.015,
  capacity: 1000,
  benchUnits: 20,
  benchAdd: 10,
  prebuildSettle: 12,
  settle: 0.22,

  speed(mode, index) {
    const { start, step, accel = 0, max } = modes[mode].speed, n = Math.max(index - 1, 0);
    return Math.min(start + step * n + accel * n * n, max);
  },
  travel: 2.2,
  travelEdge: 0.96,
  tallTravelEdge: 1.3,

  halfLong: 0.53,
  halfShort: 0.315,

  placedAdds: 1,
  closeAdds: 2,
  closeTolerance: 0.015,
  autoMiss: [0.005, 0.03],

  swingAbove: 0.6,
  swingBelow: 0.45,
  sideJitter: 0.125,
  sideSpread: 0.35,
  playTimeScale: 0.8,
  fallTimeScale: 0.45,
  blastTimeScale: 0.5,
  apartUpY: 0.92,
  apartMinAge: 0.12,
  restSpeed: 0.05,
  fallMaxTime: 8,
  endDelay: 2.2,

  wall: 0.01,
  apartSpeed: [0.4, 1.4],
  apartLift: [0.3, 1],
  lidLift: [3, 5],
  lidSlide: [2, 4],
  apartSpin: 3,
  pieceFriction: 0.25,
  pieceRestitution: 0.05,

  ballRadius: 0.4,
  goalLift: 0.15,
  goalBallFit: 0.9,
  goalBallMin: 0.12,
  ballDensity: 1.1,
  ballRestitution: 0,
  ballFriction: 0.8,
  ballSpeed: 60,
  ballFrom: [0, -6],
  ballAim: 0.35,
  ballGone: 12,
};

export const sideView = {
  minWidth: 3,
  minHeight: 3,
  headroom: 1.15,
  padding: 6,
  unit: 0.55,
  exact: 0.85,
  base: 0.35,
  carry: 0.3,
  floor: 0.12,
  floorMargin: 0.25,
  right: 0.72,
  left: 0.52,
  fallenTone: 0.55,
};

export const marker = {
  x: 0.61,
  z: -0.395,
  dirX: -1,
  dirZ: 0,
  gap: 0,
  tick: 48,
  rate: 6,
  ghostLine: [0.12, 0.55],
  ghostFade: 0.5,
  refTick: 10,
  pbTick: 18,
};

export const heights = [12.2, 17.9, 21, 30.5, 31.5, 38.1, 70, 90, 147, 203, 240, 305, 438, 550].map((cm, i) => ({ cm, name: text.heights[i] }));

export const styles = {
  bowling: { kind: "ball", radius: 0.3, density: 6, speed: column.ballSpeed, from: column.ballFrom, aim: column.ballAim },
  quake: { kind: "quake", amplitude: 0.12, frequency: 5, rise: 0.8, last: 4 },
  wrecking: { kind: "wrecking", radius: 0.5, aim: 0.35, chain: 7, ahead: -0.9, swing: 1.15, density: 5 },
  sinkhole: { kind: "well", radius: 7, offset: 0.45, throat: 1.2, soft: 0.05, depth: 2.5, deep: 60, grow: 2.6, start: 0.6, rebuild: 4, grid: 80, swallow: 12, life: 9 },
  tennis: { kind: "ball", radius: 0.335, density: 0.35, bounce: 0.75, speed: 36, from: [0, -6], aim: 0.5 },
  blackhole: { kind: "hole", radius: 0.3, at: [0, 0.4, -2], grow: 1, strength: 900, range: 8, breakAt: 6, eat: 1, life: 5 },
  arrow: { kind: "arrow", radius: 0.02, length: 1.6, mass: 0.25, restMass: 0.004, heavyFor: 0.3, speed: 30, from: [-3, -10], rise: 0.5, aim: 0.55, spread: 0.15, keep: 30 },
  cap: { kind: "cap", density: 0.15, speed: 22, from: [-9, 1], rise: 0.4, spin: 18, lift: 0.7, liftFor: 1.2 },
};

export const modes = {
  easy: { lie: "flat", speed: { start: 1.8, step: 0.1, accel: 0, max: 10 } },
  medium: { lie: "turn", speed: { start: 2, step: 0.1, accel: 0, max: 11 } },
  hard: { lie: "side", speed: { start: 2.2, step: 0.1, accel: 0, max: 12 } },
};

export const haptics = {
  on: true,
  gap: 60,
  drop: 8,
  perfect: [10, 45, 14],
  best: [12, 70, 12, 70, 26],
  fall: 22,
  launch: 10,
  thunk: 14,
  quake: [14, 110, 14, 110, 14, 110, 12, 130, 10, 150, 8],
  sinkhole: 30,
  goal: [10, 60, 10, 60, 10, 140, 32],
};

export const allStyles = true;

export const showText = false;
export const showHeight = false;
export const realHeight = { flat: 25, side: 63 };

export const copy = { ...text.copy, end: (units, total) => text.copy.end.replace("{u}", units).replace("{t}", total) };
export const peakKey = text.key;
export const canvasLabel = text.canvas;
export const events = text.events;

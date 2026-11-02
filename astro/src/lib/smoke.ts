/*
 * Adapted from the Music Assistant website hero (music-assistant.io,
 * src/components/home/smoke.ts, Apache-2.0) for the No device left behind
 * page (src/pages/no-device-left-behind/index.astro): Home Assistant
 * colours, full-page (no top/bottom fade), the music notes behind a switch
 * (NOTES), and hidden words (WORD_LINES). The smoke keeps a fading memory
 * of the brightest it has been at each spot. Where the smoke over a letter
 * has thinned well below that (the wake behind the cursor, mostly), the
 * letter shows through as a dim copy of the remembered smoke, and fades
 * out again as the memory does. The smoke and notes pass straight through
 * the letters.
 *
 * Smoke for the homepage hero: a small fluid simulation (advection,
 * vorticity and a pressure solve, after Jos Stam's "Stable Fluids") that the
 * cursor stirs. The pointer trails smoke in the album-art colours from the
 * hero glow, and moments later the smoke gathers into music notes that
 * float up and fade. A few soft patches of colour sit in the hero from the
 * start, so there's something to see before anyone moves; the cursor
 * scatters them and they slowly gather back. Notes only come from the
 * cursor moving. The colours follow whichever shelf cover is "now playing" (setColors).
 *
 * A finger stirs it just like a mouse (the page doesn't scroll, so a swipe
 * is free to). Until someone touches it, every few seconds an unseen hand
 * makes one slow sweep near the edges, with a single cluster of notes, kept
 * above the screenshot (`covered`) where it can be seen.
 *
 * WebGL2 with half-float render targets. If that's missing, nothing starts
 * and the CSS glow carries the hero. If the visitor prefers reduced motion,
 * the patches are drawn once, still, with no cursor or notes, and redrawn
 * only when the colours, theme or size change.
 */

const SIM_RESOLUTION = 128;
const DYE_RESOLUTION = 768;
// Touch screens get coarser smoke (it's soft anyway) and every screen a cap
// on canvas pixels, so tablets and big displays don't pay for detail no one
// can see.
const TOUCH_DYE_RESOLUTION = 512;
const MAX_CANVAS_PIXELS = 1_200_000;
const PRESSURE_ITERATIONS = 20;
const CURL = 5;
const VELOCITY_DISSIPATION = 0.25;
const DYE_DISSIPATION = 1.3;
const PRESSURE_DECAY = 0.8;
// The cursor's reach. It's a Gaussian's variance, so it grows with the
// square of the radius: 0.004 was the original, and 1.3² widens it by 30%.
const SPLAT_RADIUS = 0.004 * 1.3 ** 2;
// A finger stirs four times the area (twice the radius), so a few swipes
// are enough on a small screen.
const TOUCH_SPLAT_AREA = 4;
const SPLAT_FORCE = 560;
// The resting patches: where they sit (0–1, y up), how big, how dense at
// rest, and how hard each one gently churns.
const PATCHES = [
  { x: 0.1, y: 0.7 },
  { x: 0.9, y: 0.66 },
  { x: 0.2, y: 0.3 },
  { x: 0.82, y: 0.28 },
];
const PATCH_RADIUS = 0.03;
const PATCH_DENSITY = 0.45;
const PATCH_CHURN = 1.5;

// A little cluster of up to NOTE_BURST notes every this much cursor travel,
// as a fraction of the hero's height. NOTE_LIMIT caps how many are held at
// once.
const NOTE_SPACING = 0.08;
const NOTE_BURST = 3;
const NOTE_LIMIT = 24;
const NOTE_SIZE = 0.075;
// A note's life in seconds: a pause while the trail is plain smoke, the
// smoke gathering into it, holding, then fading away. It rises throughout
// (hero heights per second).
const NOTE_DELAY = 0.3;
const NOTE_GATHER = 0.9;
const NOTE_HOLD = 1.2;
const NOTE_FADE = 0.6;
const NOTE_LIFE = NOTE_DELAY + NOTE_GATHER + NOTE_HOLD + NOTE_FADE;
const NOTE_RISE = 0.04;

// The hidden words: one line each, left-aligned as a block centred on the
// page, in Figtree at WORD_WEIGHT. The block's width as a fraction of the
// page, capped by its height; and the line spacing (in ems).
const WORD_LINES = ["No device", "left behind"];
const WORD_WEIGHT = 500;
const WORD_HEIGHT = 0.5;
const WORD_WIDTH = 0.72;
// On narrow screens (below this many CSS pixels, matching the page's own
// breakpoint), one word to a line, allowed a little more of the height.
const NARROW_WIDTH = 600;
const NARROW_HEIGHT = 0.6;
// Space kept clear above the words, and between them and whatever the page
// puts below them (`below`), as fractions of the height and in CSS pixels.
const WORD_TOP_MARGIN = 0.06;
const WORD_GAP = 24;
const LINE_HEIGHT = 0.95;
const WORD_FONT = `${WORD_WEIGHT} 100px Figtree, "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif`;
// Uncovering: how bright an uncovered part is (the remembered smoke at this
// opacity), and how long the memory takes to fade (seconds).
const REVEAL_SHADE = 0.4;
const MEMORY_TIME = 12;

// The music notes gathering out of the smoke.
const NOTES = true;

// Touch screens: a sweep every SWEEP_EVERY to SWEEP_EVERY + SWEEP_JITTER
// seconds, lasting SWEEP_TIME and covering SWEEP_LENGTH of the hero.
const SWEEP_EVERY = 4;
const SWEEP_JITTER = 3;
const SWEEP_TIME = 1.6;
const SWEEP_LENGTH = 0.3;

// On load, an unseen cursor sweeps once across the words, left to right,
// to show the page can be stirred: after INTRO_DELAY seconds, taking
// INTRO_TIME. It stops as soon as anyone moves a mouse or finger.
const INTRO_DELAY = 0.8;
const INTRO_TIME = 2.2;

// Frames closer together than this are skipped, capping at about 60fps.
// After IDLE_AFTER seconds with nothing happening (no cursor, sweep, notes
// or colour change) it drops to about 30fps: the patches drift so slowly
// that no one can tell, and it halves the GPU work while the hero just sits
// there.
const MIN_FRAME_MS = 1000 / 70;
const IDLE_FRAME_MS = 1000 / 35;
const IDLE_AFTER = 5;

// How long the smoke takes to blend into a new palette, in seconds.
const PALETTE_BLEND = 1.2;

// Home Assistant blues, with a violet to keep the trail from going flat.
const DEFAULT_PALETTE: number[][] = [
  [24, 188, 242],
  [3, 105, 200],
  [65, 189, 245],
  [124, 77, 255],
].map(([r, g, b]) => [r / 255, g / 255, b / 255]);

const VERTEX = `#version 300 es
in vec2 aPos;
uniform vec2 texel;
out vec2 vUv, vL, vR, vT, vB;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(texel.x, 0.0);
  vR = vUv + vec2(texel.x, 0.0);
  vT = vUv + vec2(0.0, texel.y);
  vB = vUv - vec2(0.0, texel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const frag = (body: string) => `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
${body}`;

// Adds a frame's worth of soft round splats in one pass: each a point and
// radius, and the colour (or velocity) it adds.
const MAX_SPLATS = 8;
const SPLAT = frag(`
#define MAX ${MAX_SPLATS}
uniform sampler2D target;
uniform float aspect;
uniform int count;
uniform vec3 points[MAX];
uniform vec3 colors[MAX];
void main() {
  vec3 sum = texture(target, vUv).xyz;
  for (int i = 0; i < MAX; i++) {
    if (i >= count) break;
    vec2 p = vUv - points[i].xy;
    p.x *= aspect;
    sum += exp(-dot(p, p) / points[i].z) * colors[i];
  }
  o = vec4(sum, 1.0);
}`);

// Condenses dye into every live note in one pass. Each is a glyph from the
// strip, rotated and scaled at a point (places: x, y, size, angle): inside
// the shape the dye moves toward the note's colour by \`pull\`, and a halo
// around it thins by \`drain\`, as if the smoke nearby were drawn in
// (looks: glyph, pull, drain).
const STAMP = frag(`
#define MAX ${NOTE_LIMIT}
uniform sampler2D target, glyphs;
uniform float aspect, glyphCount;
uniform int count;
uniform vec4 places[MAX];
uniform vec4 looks[MAX];
uniform vec3 colors[MAX];
void main() {
  vec3 dye = texture(target, vUv).xyz;
  for (int i = 0; i < MAX; i++) {
    if (i >= count) break;
    vec4 at = places[i];
    vec2 p = vUv - at.xy;
    p.x *= aspect;
    float size = at.z;
    if (dot(p, p) > size * size * 1.5) continue;
    p = mat2(cos(at.w), -sin(at.w), sin(at.w), cos(at.w)) * p;
    vec2 g = p / size + 0.5;
    float m = 0.0;
    if (g.x >= 0.0 && g.x <= 1.0 && g.y >= 0.0 && g.y <= 1.0)
      m = textureLod(glyphs, vec2((looks[i].x + g.x) / glyphCount, g.y), 0.0).a;
    float halo = smoothstep(size * 1.1, size * 0.4, length(p)) * (1.0 - m);
    dye = mix(dye, colors[i], looks[i].y * m) * (1.0 - looks[i].z * halo);
  }
  o = vec4(dye, 1.0);
}`);

const ADVECT = frag(`
uniform sampler2D velocity, source;
uniform vec2 texel;
uniform float dt, dissipation;
void main() {
  vec2 from = vUv - dt * texture(velocity, vUv).xy * texel;
  o = vec4(texture(source, from).xyz / (1.0 + dissipation * dt), 1.0);
}`);

const DIVERGENCE = frag(`
uniform sampler2D velocity;
void main() {
  vec2 c = texture(velocity, vUv).xy;
  float l = vL.x < 0.0 ? -c.x : texture(velocity, vL).x;
  float r = vR.x > 1.0 ? -c.x : texture(velocity, vR).x;
  float t = vT.y > 1.0 ? -c.y : texture(velocity, vT).y;
  float b = vB.y < 0.0 ? -c.y : texture(velocity, vB).y;
  o = vec4(0.5 * (r - l + t - b), 0.0, 0.0, 1.0);
}`);

const CURL_SHADER = frag(`
uniform sampler2D velocity;
void main() {
  float l = texture(velocity, vL).y;
  float r = texture(velocity, vR).y;
  float t = texture(velocity, vT).x;
  float b = texture(velocity, vB).x;
  o = vec4(0.5 * (r - l - t + b), 0.0, 0.0, 1.0);
}`);

const VORTICITY = frag(`
uniform sampler2D velocity, curl;
uniform float strength, dt;
void main() {
  float l = texture(curl, vL).x;
  float r = texture(curl, vR).x;
  float t = texture(curl, vT).x;
  float b = texture(curl, vB).x;
  float c = texture(curl, vUv).x;
  vec2 force = 0.5 * vec2(abs(t) - abs(b), abs(r) - abs(l));
  force *= strength * c / (length(force) + 1e-4);
  force.y *= -1.0;
  vec2 v = texture(velocity, vUv).xy + force * dt;
  o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`);

const PRESSURE = frag(`
uniform sampler2D pressure, divergence;
void main() {
  float l = texture(pressure, vL).x;
  float r = texture(pressure, vR).x;
  float t = texture(pressure, vT).x;
  float b = texture(pressure, vB).x;
  o = vec4((l + r + b + t - texture(divergence, vUv).x) * 0.25, 0.0, 0.0, 1.0);
}`);

const GRADIENT = frag(`
uniform sampler2D pressure, velocity;
void main() {
  float l = texture(pressure, vL).x;
  float r = texture(pressure, vR).x;
  float t = texture(pressure, vT).x;
  float b = texture(pressure, vB).x;
  o = vec4(texture(velocity, vUv).xy - vec2(r - l, t - b), 0.0, 1.0);
}`);

const SCALE = frag(`
uniform sampler2D source;
uniform float value;
void main() { o = value * texture(source, vUv); }`);

// Premultiplied output: soft tone-mapped colour, as opaque as it is bright,
// fading out at the top and bottom edges of the hero. On the light page the
// colour is deepened (darker, more saturated) so pale smoke doesn't vanish
// into the pale background.
// Inside the word, the smoke as it is or a dim copy of the remembered
// smoke, whichever is brighter: where smoke sits as it was, nothing shows;
// where it has cleared, the letter does.
const DISPLAY = frag(`
uniform sampler2D dye, memory, solid;
uniform float strength, deepen, shade;
vec4 look(vec3 dyed) {
  vec3 c = 1.0 - exp(-dyed * 1.4);
  float a = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0) * strength;
  c = mix(c, pow(c, vec3(1.8)) * 1.3, deepen);
  return vec4(c * strength, a);
}
void main() {
  vec4 now = look(texture(dye, vUv).rgb);
  float letter = texture(solid, vUv).r;
  if (letter > 0.001) {
    vec4 ghost = look(texture(memory, vUv).rgb) * shade;
    o = mix(now, max(now, ghost), letter);
    return;
  }
  o = now;
}`);

// The memory holds the brightest smoke that has been at each spot, fading
// by `keep` each frame, so it never drops below the smoke as it is now.
const MEMORY = frag(`
uniform sampler2D dye, memory;
uniform float keep;
void main() {
  o = vec4(max(texture(dye, vUv).rgb, texture(memory, vUv).rgb * keep), 1.0);
}`);

// White note shapes drawn side by side on a 2D canvas, one per 128px cell:
// a quaver, a crotchet and a beamed pair.
const GLYPH_COUNT = 3;
function drawGlyphs() {
  const cell = 128;
  const c = document.createElement("canvas");
  c.width = cell * GLYPH_COUNT;
  c.height = cell;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  const head = (x: number, y: number) => {
    ctx.beginPath();
    ctx.ellipse(x, y, 19, 13, -0.4, 0, Math.PI * 2);
    ctx.fill();
  };
  const stem = (x: number, top: number, bottom: number) =>
    ctx.fillRect(x - 3.5, top, 7, bottom - top);

  // Quaver.
  head(52, 96);
  stem(68, 22, 92);
  ctx.beginPath();
  ctx.moveTo(64.5, 22);
  ctx.bezierCurveTo(72, 44, 102, 50, 92, 84);
  ctx.bezierCurveTo(96, 58, 78, 52, 64.5, 46);
  ctx.fill();

  // Crotchet.
  ctx.translate(cell, 0);
  head(56, 96);
  stem(72, 20, 92);

  // Beamed pair.
  ctx.translate(cell, 0);
  head(32, 100);
  head(92, 88);
  stem(48, 30, 96);
  stem(108, 18, 84);
  ctx.beginPath();
  ctx.moveTo(44.5, 30);
  ctx.lineTo(111.5, 16);
  ctx.lineTo(111.5, 32);
  ctx.lineTo(44.5, 46);
  ctx.fill();
  return c;
}

// The word in white on black, centred and sized to the page's shape. Its
// bottom stays above `room` (a fraction of the height from the top): it
// moves up from the centre if it has to, and shrinks if it still doesn't
// fit. Returns where its bottom edge and its middle fall, as the same kind
// of fraction.
function drawWord(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  narrow: boolean,
  room = 1,
) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.font = WORD_FONT;
  const texts = narrow ? WORD_LINES.join(" ").split(" ") : WORD_LINES;
  const lines = texts.map((text) => ctx.measureText(text));
  const last = lines.length - 1;
  // In font units, from the first baseline: the block's ink, top to bottom.
  const top = -lines[0].actualBoundingBoxAscent;
  const bottom = last * LINE_HEIGHT * 100 + lines[last].actualBoundingBoxDescent;
  const textW = Math.max(...lines.map((m) => m.actualBoundingBoxRight + m.actualBoundingBoxLeft));
  const textH = bottom - top;
  const height = narrow ? NARROW_HEIGHT : WORD_HEIGHT;
  const space = Math.max(0.1, room - WORD_TOP_MARGIN) * h;
  const scale = Math.min(
    (w * WORD_WIDTH) / textW,
    (h * height) / textH,
    space / textH,
  );
  const half = (textH * scale) / 2;
  const centre = Math.min(h / 2, room * h - half);
  ctx.save();
  ctx.translate(w / 2, centre);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  texts.forEach((text, i) =>
    ctx.fillText(
      text,
      -textW / 2 + lines[i].actualBoundingBoxLeft,
      i * LINE_HEIGHT * 100 - (top + bottom) / 2,
    ),
  );
  ctx.restore();
  return { bottom: (centre + half) / h, middle: centre / h };
}

type Target = {
  fbo: WebGLFramebuffer;
  tex: WebGLTexture;
  w: number;
  h: number;
  texel: [number, number];
};
type Double = { read: Target; write: Target; swap(): void };
type Program = {
  use(): void;
  set(name: string, ...v: number[]): void;
  setInt(name: string, v: number): void;
  setVec3s(name: string, v: Float32Array): void;
  setVec4s(name: string, v: Float32Array): void;
  bind(name: string, target: { tex: WebGLTexture }, unit: number): void;
};

export function startSmoke(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  covered?: Element | null,
  // Anything shown under the words, which they must not run into.
  below?: HTMLElement | null,
) {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let still = reduceMotion.matches;
  // Only a mouse or trackpad stirs the smoke; anything else gets sweeps.
  // Some frames (an embedded viewer, a touch laptop) report no hover even
  // with a mouse, so any real mouse or finger moving counts too.
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let mouseSeen = false;
  // Whether the last stroke came from a finger.
  let touching = false;
  let ready = false;

  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  // Half-float render targets need one of these; some mobile GPUs only have
  // the second. The framebuffer check below backs out if neither works.
  if (
    !gl ||
    !(
      gl.getExtension("EXT_color_buffer_float") ||
      gl.getExtension("EXT_color_buffer_half_float")
    )
  )
    return;

  // Shaders and full-screen quad.
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX);
  const program = (src: string): Program | null => {
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, src));
    gl.bindAttribLocation(p, 0, "aPos");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
    const loc = new Map<string, WebGLUniformLocation | null>();
    const at = (n: string) => {
      if (!loc.has(n)) loc.set(n, gl.getUniformLocation(p, n));
      return loc.get(n)!;
    };
    return {
      use: () => gl.useProgram(p),
      set: (n, ...v) =>
        v.length === 1
          ? gl.uniform1f(at(n), v[0])
          : v.length === 2
            ? gl.uniform2f(at(n), v[0], v[1])
            : gl.uniform3f(at(n), v[0], v[1], v[2]),
      setInt: (n, v) => gl.uniform1i(at(n), v),
      setVec3s: (n, v) => gl.uniform3fv(at(n), v),
      setVec4s: (n, v) => gl.uniform4fv(at(n), v),
      bind: (n, t, unit) => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, t.tex);
        gl.uniform1i(at(n), unit);
      },
    };
  };
  const programs = [
    SPLAT,
    STAMP,
    ADVECT,
    DIVERGENCE,
    CURL_SHADER,
    VORTICITY,
    PRESSURE,
    GRADIENT,
    SCALE,
    DISPLAY,
    MEMORY,
  ].map(program);
  if (programs.some((p) => !p)) return;
  const [
    splatP,
    stampP,
    advectP,
    divergenceP,
    curlP,
    vorticityP,
    pressureP,
    gradientP,
    scaleP,
    displayP,
    memoryP,
  ] = programs as Program[];

  // The word, on texture unit 3 (the passes use 0 and 1).
  const SOLID_UNIT = 3;
  const solid = gl.createTexture()!;
  gl.activeTexture(gl.TEXTURE0 + SOLID_UNIT);
  gl.bindTexture(gl.TEXTURE_2D, solid);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.activeTexture(gl.TEXTURE0);
  displayP.use();
  displayP.setInt("solid", SOLID_UNIT);
  // Where the words sit (0–1, y up), for the intro sweep.
  let wordMiddle = 0.5;
  const wordCanvas = document.createElement("canvas");
  const wordCtx = wordCanvas.getContext("2d")!;
  const drawSolid = () => {
    wordCanvas.width = canvas.width;
    wordCanvas.height = canvas.height;
    // The page can place things under the word with --word-bottom.
    const narrow = host.clientWidth < NARROW_WIDTH;
    // How far down the words can reach. Where `below` is pinned to the foot
    // of the page (narrow screens), above its top; where it follows the
    // words, far enough up that it still fits underneath.
    let room = 1;
    if (below) {
      const r = host.getBoundingClientRect();
      const b = below.getBoundingClientRect();
      const followsWords = getComputedStyle(below).top !== "auto" && !narrow;
      const limit = followsWords
        ? r.height - b.height - WORD_GAP
        : b.top - r.top - WORD_GAP;
      room = Math.min(1, Math.max(0, limit / Math.max(1, r.height)));
    }
    const word = drawWord(wordCtx, canvas.width, canvas.height, narrow, room);
    host.style.setProperty("--word-bottom", `${word.bottom * 100}%`);
    // The fluid's y runs bottom up.
    wordMiddle = 1 - word.middle;
    gl.activeTexture(gl.TEXTURE0 + SOLID_UNIT);
    gl.bindTexture(gl.TEXTURE_2D, solid);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      wordCanvas,
    );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.activeTexture(gl.TEXTURE0);
  };

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const glyphs = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, glyphs);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    drawGlyphs(),
  );
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // Render targets, sized to the hero's shape when the page loads.
  const size = (res: number) => {
    const aspect = host.clientWidth / Math.max(1, host.clientHeight);
    const long = Math.round(res * Math.max(aspect, 1 / aspect));
    return aspect >= 1 ? [long, res] : [res, long];
  };
  const target = (w: number, h: number): Target | null => {
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA16F,
      w,
      h,
      0,
      gl.RGBA,
      gl.HALF_FLOAT,
      null,
    );
    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      tex,
      0,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
      return null;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { fbo, tex, w, h, texel: [1 / w, 1 / h] };
  };
  const double = (w: number, h: number): Double | null => {
    const a = target(w, h);
    const b = target(w, h);
    if (!a || !b) return null;
    const d = {
      read: a,
      write: b,
      swap() {
        [d.read, d.write] = [d.write, d.read];
      },
    };
    return d;
  };
  const [simW, simH] = size(SIM_RESOLUTION);
  const [dyeW, dyeH] = size(
    finePointer.matches ? DYE_RESOLUTION : TOUCH_DYE_RESOLUTION,
  );
  const velocity = double(simW, simH);
  const dye = double(dyeW, dyeH);
  const pressure = double(simW, simH);
  const divergence = target(simW, simH);
  const curl = target(simW, simH);
  const memory = double(dyeW, dyeH);
  if (!velocity || !dye || !pressure || !divergence || !curl || !memory) return;

  // Remembers the smoke.
  const remember = (dt: number) => {
    memoryP.use();
    memoryP.set("texel", ...dye.read.texel);
    memoryP.set("keep", Math.exp(-dt / MEMORY_TIME));
    memoryP.bind("dye", dye.read, 0);
    memoryP.bind("memory", memory.read, 1);
    draw(memory.write);
    memory.swap();
  };

  const draw = (dest: Target | null) => {
    if (dest) {
      gl.viewport(0, 0, dest.w, dest.h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, dest.fbo);
    } else {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  // Splats queue up and go into the fluid together: one pass for velocity,
  // one for colour.
  const splatPoints = new Float32Array(MAX_SPLATS * 3);
  const splatForces = new Float32Array(MAX_SPLATS * 3);
  const splatColors = new Float32Array(MAX_SPLATS * 3);
  let splatCount = 0;
  const flushSplats = () => {
    if (!splatCount) return;
    splatP.use();
    splatP.set("texel", ...velocity.read.texel);
    splatP.set("aspect", canvas.width / Math.max(1, canvas.height));
    splatP.setInt("count", splatCount);
    splatP.setVec3s("points", splatPoints);
    splatP.bind("target", velocity.read, 0);
    splatP.setVec3s("colors", splatForces);
    draw(velocity.write);
    velocity.swap();
    splatP.bind("target", dye.read, 0);
    splatP.setVec3s("colors", splatColors);
    draw(dye.write);
    dye.swap();
    splatCount = 0;
  };
  // Pushes velocity and colour into the fluid at a point (0–1, y up).
  const splat = (
    x: number,
    y: number,
    dx: number,
    dy: number,
    color: number[],
    radius = SPLAT_RADIUS,
  ) => {
    if (splatCount === MAX_SPLATS) flushSplats();
    const aspect = canvas.width / Math.max(1, canvas.height);
    const i = splatCount++ * 3;
    splatPoints.set([x, y, radius * Math.max(1, aspect)], i);
    splatForces.set([dx, dy, 0], i);
    splatColors.set(color, i);
  };

  // Notes rise on their own path, condensed into the dye every frame so
  // they stay crisp while the flow carries smoke past them.
  type Note = {
    x: number;
    y: number;
    size: number;
    angle: number;
    glyph: number;
    color: number[];
    age: number;
    sway: number;
    rise: number;
  };
  let notes: Note[] = [];
  const notePlaces = new Float32Array(NOTE_LIMIT * 4);
  const noteLooks = new Float32Array(NOTE_LIMIT * 4);
  const noteColors = new Float32Array(NOTE_LIMIT * 3);
  // A loose cluster around the point: each note its own shape, size,
  // shade of the current colour and rising speed, so the cluster spreads.
  const addNotes = (
    x: number,
    y: number,
    hue: number,
    intensity: number,
    count: number,
  ) => {
    const aspect = canvas.width / Math.max(1, canvas.height);
    for (let i = 0; i < count && notes.length < NOTE_LIMIT; i++) {
      const spread = i === 0 ? 0 : 0.05;
      const n = {
        x: x + ((Math.random() - 0.5) * spread) / aspect,
        y: y + (Math.random() - 0.5) * spread,
        size: NOTE_SIZE * (0.55 + Math.random() * 0.8),
        angle: (Math.random() - 0.5) * 0.7,
        glyph: Math.floor(Math.random() * GLYPH_COUNT),
        color: colorAt(hue + (Math.random() - 0.5) * 0.6, intensity),
        age: 0,
        sway: Math.random() * Math.PI * 2,
        rise: NOTE_RISE * (0.6 + Math.random() * 0.8),
      };
      notes.push(n);
    }
  };
  const updateNotes = (dt: number) => {
    let count = 0;
    for (const n of notes) {
      n.age += dt;
      n.y += n.rise * dt;
      n.x += Math.sin(n.sway + n.age * 3) * 0.01 * dt;
      const gather = (n.age - NOTE_DELAY) / NOTE_GATHER;
      const fade = (n.age - NOTE_DELAY - NOTE_GATHER - NOTE_HOLD) / NOTE_FADE;
      if (gather <= 0) continue;
      // Ease in (a gentle pull at first, firming up into the shape, while
      // the smoke around it thins), hold, then fade.
      const ease = Math.min(gather, 1) ** 2;
      const pull = Math.min(1, dt * (gather < 1 ? 6 * ease : 8));
      const drain = gather < 1 ? dt * 2.5 : 0;
      const amount = fade < 0 ? ease : Math.max(0, 1 - fade);
      notePlaces.set([n.x, n.y, n.size, n.angle], count * 4);
      noteLooks.set([n.glyph, pull, drain, 0], count * 4);
      noteColors.set(
        n.color.map((v) => v * amount),
        count * 3,
      );
      count++;
    }
    notes = notes.filter((n) => n.age < NOTE_LIFE);
    if (!count) return;
    stampP.use();
    stampP.set("texel", ...dye.read.texel);
    stampP.set("aspect", canvas.width / Math.max(1, canvas.height));
    stampP.set("glyphCount", GLYPH_COUNT);
    stampP.setInt("count", count);
    stampP.setVec4s("places", notePlaces);
    stampP.setVec4s("looks", noteLooks);
    stampP.setVec3s("colors", noteColors);
    stampP.bind("target", dye.read, 0);
    stampP.bind("glyphs", { tex: glyphs }, 1);
    draw(dye.write);
    dye.swap();
  };

  const step = (dt: number) => {
    const texel = velocity.read.texel;

    curlP.use();
    curlP.set("texel", ...texel);
    curlP.bind("velocity", velocity.read, 0);
    draw(curl);

    vorticityP.use();
    vorticityP.set("texel", ...texel);
    vorticityP.bind("velocity", velocity.read, 0);
    vorticityP.bind("curl", curl, 1);
    vorticityP.set("strength", CURL);
    vorticityP.set("dt", dt);
    draw(velocity.write);
    velocity.swap();

    divergenceP.use();
    divergenceP.set("texel", ...texel);
    divergenceP.bind("velocity", velocity.read, 0);
    draw(divergence);

    scaleP.use();
    scaleP.set("texel", ...texel);
    scaleP.bind("source", pressure.read, 0);
    scaleP.set("value", PRESSURE_DECAY);
    draw(pressure.write);
    pressure.swap();

    pressureP.use();
    pressureP.set("texel", ...texel);
    pressureP.bind("divergence", divergence, 0);
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
      pressureP.bind("pressure", pressure.read, 1);
      draw(pressure.write);
      pressure.swap();
    }

    gradientP.use();
    gradientP.set("texel", ...texel);
    gradientP.bind("pressure", pressure.read, 0);
    gradientP.bind("velocity", velocity.read, 1);
    draw(velocity.write);
    velocity.swap();

    advectP.use();
    advectP.set("texel", ...texel);
    advectP.set("dt", dt);
    advectP.bind("velocity", velocity.read, 0);
    advectP.bind("source", velocity.read, 1);
    advectP.set("dissipation", VELOCITY_DISSIPATION);
    draw(velocity.write);
    velocity.swap();

    advectP.bind("velocity", velocity.read, 0);
    advectP.bind("source", dye.read, 1);
    advectP.set("dissipation", DYE_DISSIPATION);
    draw(dye.write);
    dye.swap();
  };

  // The palette in use, blending from the previous one after a change.
  let palette = DEFAULT_PALETTE;
  let fromPalette = DEFAULT_PALETTE;
  let toPalette = DEFAULT_PALETTE;
  let blendStart = -Infinity;
  const blendPalette = (now: number) => {
    // Nothing to do once the blend has finished.
    if (palette === toPalette) return;
    const f = Math.min(1, (now - blendStart) / 1000 / PALETTE_BLEND);
    if (f >= 1) {
      palette = toPalette;
      return;
    }
    const e = f * f * (3 - 2 * f);
    palette = toPalette.map((to, k) => {
      const from = fromPalette[k % fromPalette.length];
      return to.map((v, c) => from[c] + (v - from[c]) * e);
    });
  };

  // Colour drifts around the palette over time, so a trail fades from one
  // cover colour into the next.
  const colorAt = (t: number, intensity: number) => {
    const n = palette.length;
    // Wrapped so that t can go below zero.
    const i = ((Math.floor(t) % n) + n) % n;
    const a = palette[i];
    const b = palette[(i + 1) % n];
    const f = t - Math.floor(t);
    return a.map((v, k) => (v + (b[k] - v) * f) * intensity);
  };

  // The light page needs deeper colour to read as the same smoke.
  let strength = 0.45;
  let deepen = 0;
  const readTheme = () => {
    const light = getComputedStyle(host).colorScheme === "light";
    strength = light ? 0.55 : 0.45;
    deepen = light ? 1 : 0;
    if (still && ready) renderStill();
  };

  const resize = () => {
    const area = Math.max(1, host.clientWidth * host.clientHeight);
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      1.5,
      Math.sqrt(MAX_CANVAS_PIXELS / area),
    );
    canvas.width = Math.max(1, Math.round(host.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(host.clientHeight * dpr));
    drawSolid();
    if (still && ready) renderStill();
  };
  resize();
  const sizes = new ResizeObserver(resize);
  sizes.observe(host);
  if (below) sizes.observe(below);
  // The word's face may still be loading: redraw it once it's there.
  document.fonts?.load(WORD_FONT).then(() => {
    drawSolid();
    if (still && ready) renderStill();
  });
  readTheme();
  new MutationObserver(readTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  matchMedia("(prefers-color-scheme: light)").addEventListener(
    "change",
    readTheme,
  );

  // The visitor's pointer.
  let pointer: { x: number; y: number } | null = null;
  let moved = { x: 0, y: 0, dx: 0, dy: 0, pending: false };
  host.addEventListener("pointermove", (e) => {
    if (still) return;
    mouseSeen = true;
    touching = e.pointerType === "touch";
    const r = host.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = 1 - (e.clientY - r.top) / r.height;
    if (pointer) {
      moved = {
        x,
        y,
        dx: moved.pending ? moved.dx + x - pointer.x : x - pointer.x,
        dy: moved.pending ? moved.dy + y - pointer.y : y - pointer.y,
        pending: true,
      };
    }
    pointer = { x, y };
  });
  // A lifted finger starts its next swipe afresh, not from where it left.
  const lift = () => {
    pointer = null;
  };
  for (const type of ["pointerleave", "pointerup", "pointercancel"])
    host.addEventListener(type, lift);

  // Switch between still and moving if reduced motion changes mid-visit.
  reduceMotion.addEventListener("change", (e) => {
    still = e.matches;
    if (stopped) return;
    if (still) renderStill();
    else {
      last = performance.now();
      queue();
    }
  });

  // Stop for good, leaving the CSS glow, if the GPU drops the context
  // (phones do when backgrounded).
  let stopped = false;
  canvas.addEventListener("webglcontextlost", () => {
    stopped = true;
    canvas.classList.remove("is-ready");
  });

  // Nothing runs while the hero is off-screen. Only one frame is ever
  // queued, so leaving and coming back within a frame can't start a
  // second loop.
  let visible = true;
  let queued = 0;
  const queue = () => {
    if (!queued) queued = requestAnimationFrame(frame);
  };
  new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting;
    if (visible && !was && !stopped && !still) {
      last = performance.now();
      queue();
    }
  }).observe(host);

  let last = performance.now();
  let lastActive = last;

  // Each patch drifts a little around its spot, slowly shifting colour, and
  // is topped up just enough to hold its density against the fade.
  const patchAt = (i: number, t: number) => ({
    x: PATCHES[i].x + 0.03 * Math.sin(t * 0.13 + i * 1.7),
    y: PATCHES[i].y + 0.03 * Math.sin(t * 0.17 + i * 2.3),
  });
  const updatePatches = (t: number, dt: number) => {
    PATCHES.forEach((_, i) => {
      const p = patchAt(i, t);
      const turn = t * 0.4 + i * 1.6;
      splat(
        p.x,
        p.y,
        Math.cos(turn) * PATCH_CHURN * dt,
        Math.sin(turn) * PATCH_CHURN * dt,
        colorAt(i + t * 0.05, PATCH_DENSITY * DYE_DISSIPATION * dt),
        PATCH_RADIUS,
      );
    });
  };
  // Start with them already there, in whatever colours are playing by the
  // first frame.
  const seedPatches = (t: number) =>
    PATCHES.forEach((_, i) => {
      const p = patchAt(i, t);
      splat(p.x, p.y, 0, 0, colorAt(i, PATCH_DENSITY), PATCH_RADIUS);
    });
  let travel = 0;

  // The automatic sweep for touch screens: a gentle arc starting near the
  // left or right edge, eased in and out, with notes halfway along.
  let sweep: {
    start: number;
    x: number;
    y: number;
    angle: number;
    bend: number;
    noted: boolean;
  } | null = null;
  let nextSweep = 0;
  const sweepAt = (s: NonNullable<typeof sweep>, f: number) => {
    const e = f * f * (3 - 2 * f);
    const angle = s.angle + s.bend * e;
    return {
      x: s.x + Math.cos(angle) * SWEEP_LENGTH * e,
      y: s.y + Math.sin(angle) * SWEEP_LENGTH * e,
    };
  };
  const updateSweep = (t: number) => {
    if (!sweep) {
      if (!nextSweep) nextSweep = t + 1.5;
      if (t < nextSweep) return;
      // Only the part of the hero above the screenshot, which hides
      // whatever is behind it (y is 0–1, bottom up).
      const r = host.getBoundingClientRect();
      const top = covered?.getBoundingClientRect().top;
      const floor =
        top === undefined
          ? 0.2
          : Math.min(0.6, Math.max(0.2, (r.bottom - top) / r.height + 0.08));
      const y = floor + Math.random() * (0.9 - floor);
      // Heading inwards, drifting and curving towards the middle of that
      // band so it doesn't wander behind the screenshot.
      const toward = y < (floor + 0.9) / 2 ? 1 : -1;
      const tilt = toward * Math.random() * 0.5;
      const bend = toward * Math.random() * 0.6;
      const left = Math.random() < 0.5;
      sweep = {
        start: t,
        x: left ? 0.05 + Math.random() * 0.15 : 0.8 + Math.random() * 0.15,
        y,
        angle: left ? tilt : Math.PI - tilt,
        bend: left ? bend : -bend,
        noted: false,
      };
    }
    const f = Math.min(1, (t - sweep.start) / SWEEP_TIME);
    const prev = sweepAt(sweep, Math.max(0, f - 1 / 60 / SWEEP_TIME));
    const p = sweepAt(sweep, f);
    moved = {
      x: p.x,
      y: p.y,
      dx: p.x - prev.x,
      dy: p.y - prev.y,
      pending: true,
    };
    if (NOTES && !sweep.noted && f > 0.5) {
      sweep.noted = true;
      addNotes(p.x, p.y, t * 0.12, 0.7, 1 + Math.floor(Math.random() * 2));
    }
    if (f >= 1) {
      sweep = null;
      nextSweep = t + SWEEP_EVERY + Math.random() * SWEEP_JITTER;
    }
  };
  // The intro sweep: across the words with a gentle wave, eased in and out.
  // Its clock runs on the frames actually drawn, so a slow start (shaders
  // compiling on a slow phone) pauses it rather than skipping it.
  let intro = true;
  let introClock = -INTRO_DELAY;
  let introAt = { x: 0, y: 0 };
  const introPath = (f: number) => {
    const e = f * f * (3 - 2 * f);
    return { x: 0.05 + 0.9 * e, y: wordMiddle + 0.05 * Math.sin(e * Math.PI * 2) };
  };
  const updateIntro = (dt: number) => {
    if (mouseSeen) {
      intro = false;
      return;
    }
    introClock += dt;
    if (introClock < 0) {
      introAt = introPath(0);
      return;
    }
    const f = introClock / INTRO_TIME;
    const p = introPath(Math.min(1, f));
    moved = {
      x: p.x,
      y: p.y,
      dx: p.x - introAt.x,
      dy: p.y - introAt.y,
      pending: true,
    };
    introAt = p;
    if (f >= 1) intro = false;
  };
  // Draws the dye to the page, fading the canvas in the first time.
  const present = () => {
    displayP.use();
    displayP.set("texel", 1 / canvas.width, 1 / canvas.height);
    displayP.set("strength", strength);
    displayP.set("deepen", deepen);
    displayP.set("shade", REVEAL_SHADE);
    displayP.bind("memory", memory.read, 1);
    displayP.bind("dye", dye.read, 0);
    draw(null);
    if (!ready) {
      ready = true;
      canvas.classList.add("is-ready");
    }
  };

  // Reduced motion: just the patches at rest, in the current colours.
  const renderStill = () => {
    if (stopped) return;
    notes = [];
    for (const t of [velocity.read, velocity.write, dye.read, dye.write, memory.read, memory.write]) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    palette = fromPalette = toPalette;
    seedPatches(0);
    flushSplats();
    present();
  };

  const frame = (now: number) => {
    queued = 0;
    if (!visible || stopped || still) return;
    // About 60fps at most: faster screens skip frames rather than doing
    // twice the work for no visible gain.
    const busy =
      now - lastActive < IDLE_AFTER * 1000 ||
      notes.length > 0 ||

      palette !== toPalette;
    if (ready && now - last < (busy ? MIN_FRAME_MS : IDLE_FRAME_MS)) {
      queue();
      return;
    }
    // Real elapsed time, so the smoke moves at the same speed at 30fps, but
    // capped so a long gap (a backgrounded tab) doesn't jolt it.
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    const t = now / 1000;
    const hue = t * 0.12;
    blendPalette(now);
    if (!ready) seedPatches(t);
    const auto = !finePointer.matches && !mouseSeen;
    if (intro && ready) updateIntro(dt);
    else if (auto) updateSweep(t);

    if (moved.pending) {
      lastActive = now;
      const aspect = canvas.width / Math.max(1, canvas.height);
      const dx = moved.dx * (aspect < 1 ? aspect : 1);
      const dy = moved.dy * (aspect > 1 ? 1 / aspect : 1);
      const speed = Math.min(Math.hypot(dx, dy) * 40, 1);
      splat(
        moved.x,
        moved.y,
        dx * SPLAT_FORCE,
        dy * SPLAT_FORCE,
        colorAt(hue, 0.03 + 0.075 * speed),
        touching || auto ? SPLAT_RADIUS * TOUCH_SPLAT_AREA : SPLAT_RADIUS,
      );
      travel += Math.hypot(moved.dx * aspect, moved.dy);
      if (NOTES && !auto && travel > NOTE_SPACING) {
        travel = 0;
        addNotes(
          moved.x,
          moved.y,
          hue,
          0.7,
          1 + Math.floor(Math.random() * NOTE_BURST),
        );
      }
      moved.pending = false;
    }

    updatePatches(t, dt);
    flushSplats();
    updateNotes(dt);
    step(dt);
    remember(dt);
    present();
    queue();
  };
  if (still) renderStill();
  else queue();

  return {
    /** Blends to new colours (hex). */
    setColors(colors: string[]) {
      const next = colors.map((hex) =>
        [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255),
      );
      const now = performance.now();
      if (still || !ready) {
        palette = fromPalette = toPalette = next;
        if (still) renderStill();
        return;
      }
      blendPalette(now);
      fromPalette = palette;
      toPalette = next;
      blendStart = now;
    },
  };
}

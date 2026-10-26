// A 3D model drawn as a line illustration: a black-filled silhouette
// with light strokes along its outline, part seams and creases, that
// the visitor can turn by dragging. Used by ConnectModel.astro, which
// loads this file (and three.js with it) only when the model nears the
// screen.
//
// How it draws:
// 1. The model is rendered into two textures: each pixel's view-space
//    normal and coverage, and its depth and part number (parts are told
//    apart by material name).
// 2. A full-screen pass draws a line wherever coverage (the outline),
//    part number, depth or normal direction (a crease) changes within
//    the stroke's radius. Outline strokes are heavier than inner ones.
// 3. Anti-aliasing: while the model turns, each frame is drawn once and
//    smoothed with FXAA. Once it stops, the next frames are drawn with
//    the camera shifted by a fraction of a pixel each and averaged,
//    which settles on a supersampled image; then nothing is drawn until
//    the view changes again.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { FullScreenQuad } from "three/addons/postprocessing/Pass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";

export interface LineModelOptions {
  // URL of a GLB model; meshopt compression is supported.
  src: string;
  // Stroke and fill colours, as CSS colours.
  line: string;
  fill: string;
  // The direction the camera looks from at the start, from the model's
  // centre (glTF axes: Y up).
  view: [number, number, number];
}

// Stroke widths in CSS pixels, the normal change (degrees) that counts
// as a crease, and how many frames are averaged once the view is still.
const OUTER = 1.6;
const INNER = 1;
const CREASE = 32;
const SAMPLES = 16;
// How long (ms) the view must be still before the averaging starts.
const SETTLE = 120;

const renderTarget = (options: object) =>
  new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    ...options,
  });

const pass = (uniforms: object, fragmentShader: string) =>
  new FullScreenQuad(
    new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms,
      vertexShader:
        "out vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
      fragmentShader: "precision highp float; in vec2 vUv; out vec4 outColor;\n" + fragmentShader,
    }),
  );

// The material every part is drawn with into the two textures.
const partMaterial = (id: number) =>
  new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    side: THREE.DoubleSide,
    uniforms: { uId: { value: id } },
    vertexShader: `precision highp float;
      uniform mat4 modelViewMatrix, projectionMatrix;
      uniform mat3 normalMatrix;
      in vec3 position;
      in vec3 normal;
      out vec3 vNormal;
      out float vDepth;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalMatrix * normal;
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `precision highp float;
      uniform float uId;
      in vec3 vNormal;
      in float vDepth;
      layout(location = 0) out vec4 normalCoverage;
      layout(location = 1) out vec4 depthId;
      void main() {
        vec3 n = normalize(vNormal);
        if (!gl_FrontFacing) n = -n;
        normalCoverage = vec4(n, 1.0);
        depthId = vec4(vDepth, uId, 0.0, 1.0);
      }`,
  });

// Halton sequence: well-spread sub-pixel offsets for the averaging.
const halton = (i: number, base: number) => {
  let f = 1;
  let r = 0;
  while (i > 0) {
    f /= base;
    r += f * (i % base);
    i = Math.floor(i / base);
  }
  return r;
};

export async function createLineModel(
  canvas: HTMLCanvasElement,
  { src, line, fill, view }: LineModelOptions,
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(22, 1, 1, 10);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  // The wheel and pinch scroll the page, not the model, and on touch
  // screens vertical swipes scroll too: only sideways drags turn it.
  controls.enableZoom = false;
  canvas.style.touchAction = "pan-y";

  const gbuffer = renderTarget({ count: 2, type: THREE.HalfFloatType });
  const lines = renderTarget({ depthBuffer: false });
  let accRead = renderTarget({ type: THREE.HalfFloatType, depthBuffer: false });
  let accWrite = renderTarget({ type: THREE.HalfFloatType, depthBuffer: false });

  const edges = pass(
    {
      tNormal: { value: gbuffer.textures[0] },
      tDepth: { value: gbuffer.textures[1] },
      texel: { value: new THREE.Vector2() },
      rOuter: { value: 1 },
      rInner: { value: 1 },
      cosCrease: { value: Math.cos(THREE.MathUtils.degToRad(CREASE)) },
      lineColor: { value: new THREE.Color(line) },
      fillColor: { value: new THREE.Color(fill) },
    },
    `uniform sampler2D tNormal, tDepth;
    uniform vec2 texel;
    uniform float rOuter, rInner, cosCrease;
    uniform vec3 lineColor, fillColor;
    float cC, zC, idC;
    vec3 nC;
    // Inner line strength (0-1) between this pixel and a neighbour:
    // a change of part, a step in depth or a crease.
    float inner(vec2 uv) {
      vec4 a = texture(tNormal, uv);
      vec4 b = texture(tDepth, uv);
      float cov = a.w;
      if (cov < 0.02) return 0.0;
      float k = 1.0 / cov;
      vec3 n = normalize(a.xyz * k + 1e-6);
      float z = b.x * k, id = b.y * k;
      float eId = clamp(abs(id - idC), 0.0, 1.0);
      // Surfaces seen edge-on change depth quickly: not a step.
      float slope = 1.0 + 6.0 * (1.0 - abs(nC.z));
      float eZ = smoothstep(0.008, 0.016, abs(z - zC) / min(z, zC) / slope);
      float eN = 1.0 - smoothstep(cosCrease - 0.05, cosCrease + 0.05, dot(nC, n));
      return max(eId, max(eZ, eN)) * min(cov, cC);
    }
    // A step in coverage: the outline against the background.
    float outer(vec2 uv) { return abs(texture(tNormal, uv).w - cC); }
    void main() {
      vec4 a = texture(tNormal, vUv);
      vec4 b = texture(tDepth, vUv);
      cC = a.w;
      float k = 1.0 / max(cC, 1e-4);
      nC = normalize(a.xyz * k + 1e-6);
      zC = b.x * k;
      idC = b.y * k;
      float eo = 0.0, ei = 0.0;
      for (int i = 0; i < 8; i++) {
        float angle = (float(i) + 0.5) * 0.7853982;
        vec2 d = vec2(cos(angle), sin(angle)) * texel;
        eo = max(eo, max(outer(vUv + d * rOuter), outer(vUv + d * rOuter * 0.5)));
        if (cC > 0.02) ei = max(ei, max(inner(vUv + d * rInner), inner(vUv + d * rInner * 0.5)));
      }
      float l = max(eo, ei);
      // Premultiplied alpha.
      outColor = vec4(fillColor * cC * (1.0 - l) + lineColor * l, l + cC * (1.0 - l));
    }`,
  );
  const blend = pass(
    { tPrev: { value: null }, tCur: { value: null }, weight: { value: 1 } },
    `uniform sampler2D tPrev, tCur;
    uniform float weight;
    void main() { outColor = mix(texture(tPrev, vUv), texture(tCur, vUv), weight); }`,
  );
  const copy = pass(
    { tSrc: { value: null } },
    "uniform sampler2D tSrc; void main() { outColor = texture(tSrc, vUv); }",
  );
  const fxaa = new FullScreenQuad(
    new THREE.ShaderMaterial({
      ...FXAAShader,
      uniforms: THREE.UniformsUtils.clone(FXAAShader.uniforms),
    }),
  );
  fxaa.material.uniforms.tDiffuse.value = lines.texture;

  // The model: every material name becomes a part number.
  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(src);
  const ids = new Map<string, number>();
  gltf.scene.traverse((object: THREE.Object3D) => {
    if (!(object instanceof THREE.Mesh)) return;
    const name = object.material.name || object.name;
    if (!ids.has(name)) ids.set(name, ids.size + 1);
    object.material = partMaterial(ids.get(name)!);
  });
  scene.add(gltf.scene);

  // Start from the given direction; the distance fits the whole model
  // in the canvas at any aspect ratio, and follows its resizes.
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = box.getCenter(new THREE.Vector3());
  const radius = box.getSize(new THREE.Vector3()).length() / 2;
  controls.target.copy(center);
  camera.position.copy(center).add(new THREE.Vector3(...view));
  camera.near = radius * 0.2;
  camera.far = radius * 20;
  const frame = () => {
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const fit = Math.min(halfFov, Math.atan(Math.tan(halfFov) * camera.aspect));
    const offset = camera.position.clone().sub(center).normalize();
    camera.position.copy(center).addScaledVector(offset, (radius / Math.sin(fit)) * 0.95);
    controls.update();
  };

  // Frames in the running average (0: start again).
  let samples = 0;
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const ratio = Math.min(devicePixelRatio, 2);
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    frame();
    const w = Math.round(width * ratio);
    const h = Math.round(height * ratio);
    for (const target of [gbuffer, lines, accRead, accWrite]) target.setSize(w, h);
    const u = edges.material.uniforms;
    u.texel.value.set(1 / w, 1 / h);
    u.rOuter.value = OUTER * ratio;
    u.rInner.value = INNER * ratio;
    fxaa.material.uniforms.resolution.value.set(1 / w, 1 / h);
    samples = 0;
  };
  resize();

  // jx/jy shift the view by a fraction of a pixel.
  const drawLines = (jx = 0, jy = 0) => {
    if (jx || jy) {
      camera.setViewOffset(gbuffer.width, gbuffer.height, jx, jy, gbuffer.width, gbuffer.height);
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setRenderTarget(gbuffer);
    renderer.clear();
    renderer.render(scene, camera);
    if (jx || jy) camera.clearViewOffset();
    renderer.setRenderTarget(lines);
    renderer.clear();
    edges.render(renderer);
  };
  const accumulate = (weight: number) => {
    const u = blend.material.uniforms;
    u.tPrev.value = accRead.texture;
    u.tCur.value = lines.texture;
    u.weight.value = weight;
    renderer.setRenderTarget(accWrite);
    blend.render(renderer);
    [accRead, accWrite] = [accWrite, accRead];
  };
  const draw = (moving: boolean) => {
    if (moving || samples === 0) {
      drawLines();
      accumulate(1);
      samples = moving ? 0 : 1;
      renderer.setRenderTarget(null);
      renderer.clear();
      fxaa.render(renderer);
    } else {
      drawLines(halton(samples + 1, 2) - 0.5, halton(samples + 1, 3) - 0.5);
      accumulate(1 / (samples + 1));
      samples++;
      copy.material.uniforms.tSrc.value = accRead.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      copy.render(renderer);
    }
  };

  // The controls also move the camera from their own pointer handlers,
  // so watch the camera itself for changes.
  const last = new Float64Array(17);
  const cameraChanged = () => {
    camera.updateMatrixWorld();
    const e = camera.matrixWorld.elements;
    let changed = last[16] !== camera.projectionMatrix.elements[0];
    last[16] = camera.projectionMatrix.elements[0];
    for (let i = 0; i < 16; i++) {
      if (last[i] !== e[i]) {
        changed = true;
        last[i] = e[i];
      }
    }
    return changed;
  };
  let lastMove = -Infinity;
  const tick = () => {
    const now = performance.now();
    controls.update();
    if (cameraChanged()) {
      lastMove = now;
      samples = 0;
    }
    const moving = now - lastMove < SETTLE;
    if (moving || samples < SAMPLES) draw(moving);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  return {
    // Draw while the model is on screen; stop when it is not.
    start: () => renderer.setAnimationLoop(tick),
    stop: () => renderer.setAnimationLoop(null),
  };
}

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { render as cfg, camera as CAM } from "./config.js";

export const END_CAMERA = {
  pos: [0.41512930393218994, 0.42752930521965027, -0.41512930393218994],
  quat: [-0.1159168928861618, 0.8804762363433838, 0.2798480987548828, 0.36470523476600647],
  lens: 79.45479583740234,
  sensor: 36.0,
  clip: [0.01, 20.0],
};
export const CENTER = new THREE.Vector3(0, 0.0124, 0);

const toSRGB = (v) => (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
const SIDE = toSRGB(0.0062), TOP = toSRGB(0.0125), LINE = toSRGB(0.16), BG = 11 / 255;
const CREASE = Math.cos(Math.PI - 2.44);

const FILL_VS = `
  in float _pid; in float _acc;
  out vec3 vN; out float vDepth; flat out float vPid; flat out float vAcc;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vec4 vp = viewMatrix * wp; vDepth = -vp.z;
    vPid = _pid; vAcc = _acc;
    gl_Position = projectionMatrix * vp;
  }`;
const FILL_VS_INSTANCED = FILL_VS.replace(
  "vec4 wp = modelMatrix * vec4(position, 1.0);\n    vN = normalize(mat3(modelMatrix) * normal);",
  "mat4 m = modelMatrix * instanceMatrix;\n    vec4 wp = m * vec4(position, 1.0);\n    vN = normalize(mat3(m) * normal);",
);
const FILL_FS = `
  precision highp float;
  uniform float side, top, depthOff;
  in vec3 vN; in float vDepth; flat in float vPid; flat in float vAcc;
  layout(location = 0) out vec4 gColor;
  layout(location = 1) out vec4 gNormal;
  void main() {
    vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;
    float t = clamp((n.y - 0.2) / 0.7, 0.0, 1.0);
    vec3 fill = vec3(mix(side, top, t));
    gColor = vec4(fill, floor(vPid + 0.5) + 1.0);
    gNormal = vec4(n, vDepth - depthOff);
  }`;
const FILL_VS_TINTED = FILL_VS_INSTANCED
  .replace("in float _pid; in float _acc;", "in float _pid; in float _acc; in float tint; flat out float vTint;")
  .replace("vPid = _pid; vAcc = _acc;", "vPid = _pid; vAcc = _acc; vTint = tint;");
const FILL_FS_TINTED = FILL_FS
  .replace("uniform float side, top, depthOff;", "uniform float side, top, depthOff; uniform vec3 tintColor; uniform float tintAlpha; flat in float vTint;")
  .replace("vec3 fill = vec3(mix(side, top, t));", "vec3 fill = mix(vec3(mix(side, top, t)), tintColor, tintAlpha * vTint);");
const QUAD_VS = `out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const EDGE_FS = `
  precision highp float;
  uniform sampler2D tColor, tNormal; uniform vec2 texel; uniform float crease, depthTh, line, bg;
  uniform mat4 invViewProj; uniform vec3 camPos, gridCenter;
  uniform float gridAlpha, gridCell, gridRadius, edgeGain, slopeAware, gridFront, gridLag, gridSoft;
  uniform float wellOn, wellR, wellRt, wellK, wellDeep, wellSoft, wellTube, depthOff; uniform vec2 wellC; uniform vec3 camFwd;
  float wellY(vec2 q) {
    float r = length(q - wellC);
    if (r >= wellR) return 0.0;
    float x = max(r - wellRt, 0.0), e = wellR - wellRt, s2 = wellSoft * wellSoft;
    return max(-wellDeep, -wellK * (inversesqrt(x * x + s2) - inversesqrt(e * e + s2)));
  }
  in vec2 vUv; out vec4 outColor;
  void main() {
    vec4 c = texture(tColor, vUv); vec4 g = texture(tNormal, vUv);
    bool geo = c.a > 0.5; float edge = 0.0;
    for (int y = -1; y <= 1 && edge < 0.5; y++) for (int x = -1; x <= 1; x++) {
      if (x == 0 && y == 0) continue;
      vec2 o = vUv + vec2(x, y) * texel;
      vec4 cn = texture(tColor, o); vec4 gn = texture(tNormal, o);
      bool geoN = cn.a > 0.5;
      if (geo != geoN) { edge = 1.0; break; }
      if (!geo) continue;
      if (abs(cn.a - c.a) > 0.5) edge = 1.0;
      else if (dot(g.xyz, gn.xyz) < crease) edge = 1.0;
      else {
        float d = abs(gn.w - g.w);
        if (slopeAware > 0.5) d = abs(gn.w + texture(tNormal, vUv - vec2(x, y) * texel).w - 2.0 * g.w);
        if (d > depthTh) edge = 1.0;
      }
      if (edge > 0.5) break;
    }
    vec4 far = invViewProj * vec4(vUv * 2.0 - 1.0, 1.0, 1.0); far.xyz /= far.w;
    vec3 dir = normalize(far.xyz - camPos);
    float t = dir.y < -1e-5 ? -camPos.y / dir.y : 0.0;
    vec2 p = camPos.xz + dir.xz * t;
    float depth = 0.0;
    bool wellHit = false;
    if (wellOn > 0.5 && t > 0.0 && length(p - wellC) < wellR) {
      float tMax = (camPos.y + wellDeep) / max(-dir.y, 1e-4), a = t, b = t, last = t;
      bool hit = false;
      for (int k = 1; k <= 96; k++) {
        float f = float(k) / 96.0;
        float tt = t + (tMax - t) * f * f;
        vec3 q = camPos + dir * tt;
        if (q.y <= wellY(q.xz)) { a = last; b = tt; hit = true; break; }
        last = tt;
      }
      if (hit) {
        for (int k = 0; k < 8; k++) { float m = (a + b) * 0.5; vec3 q = camPos + dir * m; if (q.y <= wellY(q.xz)) b = m; else a = m; }
        t = b;
        p = camPos.xz + dir.xz * t;
        depth = -(camPos.y + dir.y * t);
        wellHit = true;
      } else depth = wellDeep;
      float wallDepth = wellHit ? t * dot(dir, camFwd) : 1e9;
      if (geo && (g.w + depthOff) > wallDepth + 0.002) { geo = false; edge = 0.0; }
    }
    vec2 cc = p / gridCell; vec2 w = max(fwidth(cc), vec2(1e-6));
    vec2 gg = abs(fract(cc - 0.5) - 0.5) / w;
    vec2 d = abs(p - gridCenter.xz);
    float drawX = clamp((gridFront - d.y - d.x * gridLag) / gridSoft, 0.0, 1.0);
    float drawZ = clamp((gridFront - d.x - d.y * gridLag) / gridSoft, 0.0, 1.0);
    float lines = max((1.0 - min(gg.x, 1.0)) * drawX, (1.0 - min(gg.y, 1.0)) * drawZ);
    float gl = lines * (1.0 - smoothstep(0.15, 0.4, max(w.x, w.y))) * exp(-depth * 1.2);
    float near = wellOn * smoothstep(0.0, 0.04, depth);
    float fade = t > 0.0 ? 1.0 - smoothstep(gridRadius * 0.45, gridRadius, length(p - gridCenter.xz)) : 0.0;
    vec3 back = mix(vec3(bg), vec3(line), gl * max(fade * gridAlpha, near * 0.95));
    vec3 col = geo ? c.rgb : back;
    outColor = vec4(mix(col, vec3(line), edge * edgeGain), 1.0);
  }`;

const models = new Map();
const files = new Map();
export function fetchModel(url) {
  if (!files.has(url)) {
    files.set(url, fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return r.arrayBuffer();
    }));
  }
  return files.get(url);
}

export function loadModel(url) {
  if (!models.has(url)) {
    models.set(url, fetchModel(url).then((bytes) => new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(bytes, "")));
  }
  return models.get(url);
}

export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(1);
  const rtOpts = { type: THREE.HalfFloatType, depthBuffer: true };
  const gbuf = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, count: 2, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
  const edgeRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });

  const fillUniforms = { side: { value: SIDE }, top: { value: TOP }, depthOff: { value: 0 } };
  const fillOpts = { glslVersion: THREE.GLSL3, side: THREE.DoubleSide, uniforms: fillUniforms, fragmentShader: FILL_FS };
  const fill = new THREE.ShaderMaterial({ ...fillOpts, vertexShader: FILL_VS });
  const fillInstanced = new THREE.ShaderMaterial({
    ...fillOpts,
    uniforms: {
      ...fillUniforms,
      tintColor: { value: new THREE.Vector3(...cfg.exactColor) },
      tintAlpha: { value: cfg.exactAlpha },
    },
    vertexShader: FILL_VS_TINTED,
    fragmentShader: FILL_FS_TINTED,
  });
  const edge = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: {
      tColor: { value: null }, tNormal: { value: null }, texel: { value: new THREE.Vector2() },
      crease: { value: CREASE }, depthTh: { value: 0.0015 }, line: { value: LINE }, bg: { value: BG },
      invViewProj: { value: new THREE.Matrix4() }, camPos: { value: new THREE.Vector3() }, gridCenter: { value: new THREE.Vector3() },
      gridAlpha: { value: 0 }, gridCell: { value: cfg.gridCell }, gridRadius: { value: cfg.gridRadius }, edgeGain: { value: 1 },
      slopeAware: { value: 0 },
      gridFront: { value: 1e4 }, gridLag: { value: cfg.gridLag }, gridSoft: { value: cfg.gridSoft },
      wellOn: { value: 0 }, wellR: { value: 1 }, wellRt: { value: 0.1 }, wellK: { value: 0 }, wellDeep: { value: 1 }, wellSoft: { value: 1 }, wellTube: { value: 0 }, wellC: { value: new THREE.Vector2() },
      camFwd: { value: new THREE.Vector3() }, depthOff: fillUniforms.depthOff,
    },
    vertexShader: QUAD_VS,
    fragmentShader: EDGE_FS,
  });
  const down = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: { tEdge: { value: null } },
    vertexShader: QUAD_VS,
    fragmentShader: `precision highp float; uniform sampler2D tEdge; in vec2 vUv; out vec4 outColor;
      void main(){ outColor = texture(tEdge, vUv); }`,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  const quadScene = new THREE.Scene();
  quadScene.add(quad);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const scene = new THREE.Scene();
  const flat = CAM.flatten;
  const camera = new THREE.PerspectiveCamera(20, 1, END_CAMERA.clip[0] * flat, END_CAMERA.clip[1] * flat);
  camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(END_CAMERA.sensor / 2 / END_CAMERA.lens / flat));

  const view = { w: 1, h: 1, width: 0, height: 0, square: 0 };
  const depthCenter = CENTER.clone();
  const gridU = edge.uniforms;
  let resGain = 1, far = 1, gridBase = 0;
  const applyGain = () => {
    gridU.edgeGain.value = resGain * Math.max(cfg.lineFloor, Math.min(1, Math.pow(far, -cfg.lineFade)));
    gridU.depthTh.value = 0.0015 * far;
    gridU.gridAlpha.value = gridBase * Math.min(1, Math.pow(far, -cfg.gridFade));
  };

  function layout(cssW, cssH, square, fit = cfg.fit, ss = cfg.supersample) {
    const ref = fit === "cover" ? Math.max(cssW, cssH) : Math.min(cssW, cssH);
    let k = square / ref;
    const longest = Math.max(cssW, cssH) * k * ss;
    if (longest > renderer.capabilities.maxTextureSize) {
      const shrink = renderer.capabilities.maxTextureSize / longest;
      k *= shrink;
      square = Math.max(1, Math.floor(square * shrink));
    }
    const W = Math.max(1, Math.round(cssW * k)), H = Math.max(1, Math.round(cssH * k));
    Object.assign(view, { w: W / square, h: H / square, width: W, height: H, square, ss });
    renderer.setSize(W, H, false);
    gbuf.setSize(W * ss, H * ss);
    edgeRT.setSize(W * ss, H * ss);
    gridU.texel.value.set(1 / (W * ss), 1 / (H * ss));
    resGain = Math.min(1, square / cfg.matchSize);
    applyGain();
    camera.aspect = 1;
    camera.setViewOffset(square, square, (square - W) / 2, (square - H) / 2, W, H);
    camera.updateProjectionMatrix();
  }

  function draw() {
    camera.updateMatrixWorld();
    fillUniforms.depthOff.value = camera.position.distanceTo(depthCenter);
    gridU.invViewProj.value.multiplyMatrices(camera.matrixWorld, camera.projectionMatrixInverse);
    gridU.camPos.value.copy(camera.position);
    camera.getWorldDirection(gridU.camFwd.value);
    renderer.setRenderTarget(gbuf);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    renderer.render(scene, camera);
    gridU.tColor.value = gbuf.textures[0];
    gridU.tNormal.value = gbuf.textures[1];
    quad.material = edge;
    renderer.setRenderTarget(edgeRT);
    renderer.render(quadScene, quadCam);
    down.uniforms.tEdge.value = edgeRT.texture;
    quad.material = down;
    renderer.setRenderTarget(null);
    renderer.render(quadScene, quadCam);
  }

  return {
    renderer, scene, camera, view, layout, draw, fill, fillInstanced,
    depthCenter,
    setDistance(ratio) {
      far = Math.max(1, ratio);
      applyGain();
    },
    setSlopeAware(on) {
      gridU.slopeAware.value = on ? 1 : 0;
    },
    setWell(on, cx = 0, cz = 0, r = 1, rt = 0.1, k = 0, deep = 1, soft = 1, tube = false) {
      gridU.wellOn.value = on ? 1 : 0;
      if (!on) return;
      gridU.wellC.value.set(cx, cz);
      gridU.wellR.value = r; gridU.wellRt.value = rt; gridU.wellK.value = k; gridU.wellDeep.value = deep;
      gridU.wellSoft.value = soft; gridU.wellTube.value = tube ? 1 : 0;
    },
    setGridFront(front) {
      gridU.gridFront.value = front;
    },
    setGrid(alpha, center) {
      gridBase = alpha;
      applyGain();
      if (center) gridU.gridCenter.value.copy(center);
    },
    maxTexture: renderer.capabilities.maxTextureSize,
    dispose() {
      gbuf.dispose(); edgeRT.dispose(); fill.dispose(); fillInstanced.dispose(); edge.dispose(); down.dispose();
      quad.geometry.dispose();
      renderer.dispose();
    },
  };
}

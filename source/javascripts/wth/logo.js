// The "What the Heck?!" wordmark in 3D.
//
// Builds the wordmark with three.js from the live text in
// source/wth/components/_wordmark.html, so the words stay editable there. The
// CSS version of the wordmark stays on the page as the fallback and is only
// hidden once the 3D version has drawn its first frame.
//
// The lettering comes from logo-font.json, a three.js typeface file made with
// facetype.js (https://gero3.github.io/facetype.js/) from Figtree Black. To
// change the font, convert it there with "Restrict character set" on and
// replace that file.
//
// Every letter is extruded into its own solid object first: the white face,
// and the sky outline with its dark sides. The letters are then placed in 3D
// space, word by word, and lit. The mint sticker is drawn in 2D on top of the
// rendered image: it traces the silhouette of the whole scene on screen.

import {
    AmbientLight,
    Box3,
    Color,
    DirectionalLight,
    ExtrudeGeometry,
    FloatType,
    Font,
    Group,
    Mesh,
    MeshStandardMaterial,
    NearestFilter,
    OrthographicCamera,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    Shape,
    Vector2,
    Vector3,
    WebGLRenderTarget,
    WebGLRenderer,
} from 'three';

const FONT_URL = new URL('logo-font.json', import.meta.url).href;

// Sizes in world units, where 1 is the font size of the large line.
const SIZE_SM = 0.68;
const TRACKING = -0.01;
// Gaps between the outlines of neighbouring words and lines.
const WORD_GAP = 0.1;
const LINE_GAP = 0.1;
// Each line sits this far in front of the one below it, as in the key visual.
const LINE_DEPTH = 0.35;
// How far the sky outline reaches beyond the letter.
const STROKE = 0.08;
// How far the mint sticker reaches beyond the silhouette, as a share of the
// canvas width.
const STICKER = 0.022;
// Depth of each layer, front to back.
const FACE_DEPTH = 0.05;
const BODY_DEPTH = 0.24;
const CURVE_SEGMENTS = 6;

// Per-word orientation in degrees, keyed by the word's modifier class
// (`wth-mark__word--what`), matching the CSS version of the wordmark. Words
// turn on their left edge.
const POSES = {
    what: { rx: 0, ry: 12, rz: 2 },
    the: { rx: 0, ry: -14, rz: 4 },
    heck: { rx: 0, ry: -20, rz: -3 },
};

// The resting view, turned so the left and bottom sides of the letters show,
// as in the key visual. In radians.
const VIEW = { x: -0.2, y: 0.3 };
// How far the wordmark turns towards the pointer, in radians.
const TILT = { x: 0.14, y: 0.22 };
// The camera distance, in world units, sets how strong the perspective is:
// closer is stronger.
const CAMERA_DISTANCE = 6;
// Room around the wordmark for the sticker and the tilt.
const MARGIN = 1.14;
// The intro: words rise from the back one after another, overshoot a little
// and bob into place, like a ball coming up to the surface of water. Depth in
// world units, times in seconds.
const INTRO = { depth: 3.5, scale: 0.6, duration: 1.4, stagger: 0.18 };

const DEG = Math.PI / 180;

// Eases from 0 to 1, overshooting and bobbing around 1 before it settles.
function bob(progress) {
    return 1 - Math.exp(-6.5 * progress) * Math.cos(3 * Math.PI * progress);
}

function cssColor(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return new Color(value || fallback);
}

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return Boolean(canvas.getContext('webgl2'));
    } catch {
        return false;
    }
}

// Extrudes shapes so their front sits at z = `front`.
function extrude(shapes, depth, front, bevel = 0) {
    const geometry = new ExtrudeGeometry(shapes, {
        depth: depth - bevel * 2,
        curveSegments: CURVE_SEGMENTS,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelOffset: -bevel,
        bevelSegments: 2,
    });
    geometry.translate(0, 0, front - depth + bevel);
    return geometry;
}

// Grows shapes outwards by `radius` with round corners, like a stroke in a
// design tool: the shapes themselves, plus a capsule along every edge of
// their outlines (holes included, which closes small counters).
function grow(shapes, radius) {
    const grown = [...shapes];

    shapes.forEach((shape) => {
        const { shape: outline, holes } = shape.extractPoints(CURVE_SEGMENTS);
        [outline, ...holes].forEach((points) => {
            points.forEach((a, i) => {
                const b = points[(i + 1) % points.length];
                const length = a.distanceTo(b);
                const disc = new Shape();
                disc.absarc(a.x, a.y, radius, 0, Math.PI * 2, false);
                grown.push(disc);
                if (length === 0) return;

                const nx = ((a.y - b.y) / length) * radius;
                const ny = ((b.x - a.x) / length) * radius;
                grown.push(new Shape([
                    new Vector2(a.x + nx, a.y + ny),
                    new Vector2(b.x + nx, b.y + ny),
                    new Vector2(b.x - nx, b.y - ny),
                    new Vector2(a.x - nx, a.y - ny),
                ]));
            });
        });
    });
    return grown;
}

// The box around a set of meshes, as placed in the world.
function boxOf(meshes) {
    const box = new Box3();
    meshes.forEach((mesh) => box.expandByObject(mesh, true));
    return box;
}

// The 2D sticker, as full-screen passes. It works out, for every pixel, the
// distance to the nearest pixel of the rendered letters with a jump flood
// (https://en.wikipedia.org/wiki/Jump_flooding_algorithm), then fills
// everything within the sticker's reach behind the letters.
const FULLSCREEN_VERTEX = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
`;

// Marks every pixel the letters cover as its own nearest letter pixel.
const SEED_FRAGMENT = `
    uniform sampler2D tScene;
    varying vec2 vUv;
    void main() {
        gl_FragColor = texture2D(tScene, vUv).a > 0.5 ? vec4(gl_FragCoord.xy, 0.0, 1.0) : vec4(-1.0);
    }
`;

// Passes the nearest letter pixel on to neighbours `jump` pixels away.
const FLOOD_FRAGMENT = `
    uniform sampler2D tSeeds;
    uniform vec2 resolution;
    uniform float jump;
    void main() {
        vec2 here = gl_FragCoord.xy;
        vec4 best = vec4(-1.0);
        float bestDistance = 1e20;
        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec2 there = here + vec2(x, y) * jump;
                if (any(lessThan(there, vec2(0.0))) || any(greaterThan(there, resolution))) continue;
                vec4 seed = texture2D(tSeeds, there / resolution);
                if (seed.x < 0.0) continue;
                float distance = length(seed.xy - here);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    best = seed;
                }
            }
        }
        gl_FragColor = best;
    }
`;

// Puts the letters over the sticker. The rendered letters are premultiplied.
const COMPOSITE_FRAGMENT = `
    uniform sampler2D tScene;
    uniform sampler2D tSeeds;
    uniform vec3 color;
    uniform float radius;
    varying vec2 vUv;
    void main() {
        vec4 letters = texture2D(tScene, vUv);
        vec4 seed = texture2D(tSeeds, vUv);
        float sticker = seed.x < 0.0
            ? 0.0
            : 1.0 - smoothstep(radius - 1.0, radius + 1.0, length(seed.xy - gl_FragCoord.xy));
        float behind = sticker * (1.0 - letters.a);
        gl_FragColor = vec4(letters.rgb + color * behind, letters.a + behind);
        #include <colorspace_fragment>
    }
`;

class WthLogo {
    constructor(mark, font) {
        this.mark = mark;
        this.font = font;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        const material = (color) => new MeshStandardMaterial({ color, roughness: 0.75, metalness: 0 });
        this.materials = {
            face: material(cssColor('--wth-bg', '#F2F4F9')),
            sky: material(cssColor('--wth-sky', '#5AB9EE')),
            ink: material(cssColor('--wth-ink', '#1E2126')),
        };

        this.scene = new Scene();
        this.scene.add(new AmbientLight(0xffffff, 2));
        const sun = new DirectionalLight(0xffffff, 1.4);
        sun.position.set(0.4, 0.6, 1);
        this.scene.add(sun);

        this.root = new Group();
        this.scene.add(this.root);
        this.words = [];
        this.build();

        this.camera = new PerspectiveCamera(30, 1, 0.1, 100);
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'wth-logo-3d';
        this.canvas.setAttribute('aria-hidden', 'true');
        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.setUpSticker(cssColor('--wth-mint', '#16F3BE'));

        this.fit();
        this.words.forEach((word) => { word.rest = word.group.position.clone(); });
        this.introPlaying = !this.reducedMotion.matches;
        if (this.introPlaying) this.intro(0);
        this.mark.after(this.canvas);

        this.pointer = { x: 0, y: 0 };
        this.tilt = { x: 0, y: 0 };
        this.visible = true;
        this.listen();
        this.resize();
        this.mark.classList.add('wth-mark--replaced');
    }

    // One solid object per letter, with its origin on the baseline at the
    // left of the glyph.
    buildLetter(char, size) {
        const { materials } = this;
        const shapes = this.font.generateShapes(char, size);
        const letter = new Group();

        const face = new Mesh(extrude(shapes, FACE_DEPTH, FACE_DEPTH, 0.012), [materials.face, materials.face]);
        const body = new Mesh(extrude(grow(shapes, STROKE), BODY_DEPTH, 0), [materials.sky, materials.ink]);

        letter.add(body, face);
        return letter;
    }

    // Places the letters of a word side by side. The word's origin is at its
    // left edge, halfway up the letters, so it turns on that edge.
    buildWord(text, size) {
        const scale = size / this.font.data.resolution;
        const group = new Group();
        const inner = new Group();
        group.add(inner);

        let x = 0;
        for (const char of text) {
            const glyph = this.font.data.glyphs[char] || this.font.data.glyphs['?'];
            if (char !== ' ') {
                const letter = this.buildLetter(char, size);
                letter.position.x = x;
                inner.add(letter);
            }
            x += glyph.ha * scale + TRACKING * size;
        }

        const meshes = [];
        inner.traverse((object) => { if (object.isMesh) meshes.push(object); });
        // Measured rather than taken from the font, so any typeface file fits.
        const height = boxOf(meshes).max.y;
        inner.position.y = -height / 2;

        return { group, meshes };
    }

    // Lays the words out in lines like the CSS version. Words are placed by
    // the outlines they have once rotated, so lines stay left-aligned and
    // tight whatever the poses are.
    build() {
        let top = 0;
        let depth = 0;

        // Bottom line first, so each line can sit on top of the one below.
        [...this.mark.querySelectorAll('.wth-mark__line')].reverse().forEach((line) => {
            const size = line.classList.contains('wth-mark__line--lg') ? 1 : SIZE_SM;
            const words = [...line.querySelectorAll('.wth-mark__word')].map((word) => {
                const variant = [...word.classList]
                    .map((name) => name.match(/^wth-mark__word--(.+)$/)?.[1])
                    .find(Boolean);
                const built = this.buildWord((word.dataset.text || word.textContent).trim(), size);
                const pose = POSES[variant] || {};
                built.group.rotation.set((pose.rx || 0) * DEG, (pose.ry || 0) * DEG, (pose.rz || 0) * DEG);
                this.root.add(built.group);
                built.group.updateMatrixWorld(true);
                return built;
            });

            let x = 0;
            const boxes = words.map((word) => {
                const box = boxOf(word.meshes);
                word.group.position.x = x - box.min.x;
                x += box.max.x - box.min.x + WORD_GAP;
                return box;
            });
            const height = Math.max(...boxes.map((box) => box.max.y - box.min.y));
            words.forEach((word, i) => {
                word.group.position.y = top + LINE_GAP + height / 2 - (boxes[i].max.y + boxes[i].min.y) / 2;
                word.group.position.z = depth;
            });
            top += LINE_GAP + height;
            depth += LINE_DEPTH;
            // Keep reading order, which the intro follows.
            this.words.unshift(...words);
        });

        // Centre the whole wordmark on the origin.
        this.root.updateMatrixWorld(true);
        const centre = new Box3().setFromObject(this.root).getCenter(new Vector3());
        this.root.children.forEach((group) => group.position.sub(centre));
    }

    // Frames the wordmark at its resting view as the camera sees it,
    // perspective included, and sizes the canvas to match.
    fit() {
        const { camera, root } = this;
        camera.position.set(0, 0, CAMERA_DISTANCE);
        camera.updateMatrixWorld();
        root.rotation.set(VIEW.x, VIEW.y, 0);

        // Bounds of the letters as seen from the camera: x and y divided by
        // distance.
        const measure = () => {
            root.updateMatrixWorld(true);
            const bounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
            const point = new Vector3();
            this.words.forEach(({ meshes }) => meshes.forEach((mesh) => {
                const position = mesh.geometry.attributes.position;
                for (let i = 0; i < position.count; i++) {
                    point.fromBufferAttribute(position, i)
                        .applyMatrix4(mesh.matrixWorld)
                        .applyMatrix4(camera.matrixWorldInverse);
                    const x = point.x / -point.z;
                    const y = point.y / -point.z;
                    bounds.minX = Math.min(bounds.minX, x);
                    bounds.maxX = Math.max(bounds.maxX, x);
                    bounds.minY = Math.min(bounds.minY, y);
                    bounds.maxY = Math.max(bounds.maxY, y);
                }
            }));
            return bounds;
        };

        let bounds = measure();
        root.position.x -= ((bounds.minX + bounds.maxX) / 2) * CAMERA_DISTANCE;
        root.position.y -= ((bounds.minY + bounds.maxY) / 2) * CAMERA_DISTANCE;
        bounds = measure();

        const width = (bounds.maxX - bounds.minX) * MARGIN;
        const height = (bounds.maxY - bounds.minY) * MARGIN;
        camera.fov = (2 * Math.atan(height / 2)) / DEG;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        this.canvas.style.aspectRatio = camera.aspect.toFixed(4);
    }

    listen() {
        new ResizeObserver(() => this.resize()).observe(this.canvas);

        new IntersectionObserver(([entry]) => {
            this.visible = entry.isIntersecting;
            if (this.visible) this.start();
        }).observe(this.canvas);

        window.addEventListener('pointermove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const clamp = (v) => Math.max(-1, Math.min(1, v));
            this.pointer.x = clamp((event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2));
            this.pointer.y = clamp((event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2));
        }, { passive: true });

        this.reducedMotion.addEventListener('change', () => this.start());
    }

    resize() {
        const { clientWidth: width, clientHeight: height } = this.canvas;
        if (!width || !height) return;
        this.renderer.setSize(width, height, false);
        const size = this.renderer.getDrawingBufferSize(new Vector2());
        [this.targets.scene, ...this.targets.seeds].forEach((target) => target.setSize(size.x, size.y));
        this.passes.flood.uniforms.resolution.value.copy(size);
        this.passes.composite.uniforms.radius.value = size.x * STICKER;
        this.render();
    }

    // Places the words as they are `elapsed` seconds into the intro, and
    // returns whether it is still playing.
    intro(elapsed) {
        let playing = false;
        this.words.forEach((word, i) => {
            const progress = (elapsed - i * INTRO.stagger) / INTRO.duration;
            const amount = progress >= 1 ? 1 : bob(Math.max(progress, 0));
            playing ||= progress < 1;
            word.group.visible = progress > 0;
            word.group.position.z = word.rest.z - INTRO.depth * (1 - amount);
            word.group.scale.setScalar(INTRO.scale + (1 - INTRO.scale) * amount);
        });
        return playing;
    }

    start() {
        if (this.running || this.reducedMotion.matches) {
            this.render();
            return;
        }
        this.running = true;
        const tick = (time) => {
            if (!this.visible || this.reducedMotion.matches) {
                this.running = false;
                // Skip to the end of the intro if it was cut short.
                if (this.introPlaying) this.introPlaying = this.intro(Infinity);
                this.root.rotation.set(VIEW.x, VIEW.y, 0);
                this.render();
                return;
            }
            this.introStart ??= time;
            if (this.introPlaying) this.introPlaying = this.intro((time - this.introStart) / 1000);

            const idle = time / 1000;
            this.tilt.x += (this.pointer.y * TILT.x - this.tilt.x) * 0.06;
            this.tilt.y += (this.pointer.x * TILT.y - this.tilt.y) * 0.06;
            this.root.rotation.x = VIEW.x + this.tilt.x + Math.sin(idle * 0.7) * 0.03;
            this.root.rotation.y = VIEW.y + this.tilt.y + Math.sin(idle * 0.5) * 0.05;
            this.render();
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    setUpSticker(color) {
        const seeds = () => new WebGLRenderTarget(1, 1, {
            type: FloatType,
            minFilter: NearestFilter,
            magFilter: NearestFilter,
            depthBuffer: false,
        });
        this.targets = { scene: new WebGLRenderTarget(1, 1, { samples: 4 }), seeds: [seeds(), seeds()] };

        const pass = (fragmentShader, uniforms) => new ShaderMaterial({
            vertexShader: FULLSCREEN_VERTEX, fragmentShader, uniforms, depthTest: false, depthWrite: false,
        });
        this.passes = {
            seed: pass(SEED_FRAGMENT, { tScene: { value: this.targets.scene.texture } }),
            flood: pass(FLOOD_FRAGMENT, {
                tSeeds: { value: null }, resolution: { value: new Vector2() }, jump: { value: 1 },
            }),
            composite: pass(COMPOSITE_FRAGMENT, {
                tScene: { value: this.targets.scene.texture },
                tSeeds: { value: null },
                color: { value: color },
                radius: { value: 1 },
            }),
        };
        this.screen = new Mesh(new PlaneGeometry(2, 2));
        this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    }

    render() {
        const { renderer, targets, passes, screen, screenCamera } = this;
        const draw = (material, target) => {
            screen.material = material;
            renderer.setRenderTarget(target);
            renderer.render(screen, screenCamera);
        };

        renderer.setRenderTarget(targets.scene);
        renderer.clear();
        renderer.render(this.scene, this.camera);

        let [from, to] = targets.seeds;
        draw(passes.seed, from);
        // Halve the jump each pass, starting just above the sticker's reach.
        let jump = 2 ** Math.ceil(Math.log2(passes.composite.uniforms.radius.value + 1));
        for (; jump >= 1; jump /= 2) {
            passes.flood.uniforms.tSeeds.value = from.texture;
            passes.flood.uniforms.jump.value = jump;
            draw(passes.flood, to);
            [from, to] = [to, from];
        }

        passes.composite.uniforms.tSeeds.value = from.texture;
        draw(passes.composite, null);
    }
}

async function init() {
    const mark = document.querySelector('.wth-mark[data-wth-logo]');
    if (!mark || !supportsWebGL()) return;

    try {
        const response = await fetch(FONT_URL);
        if (!response.ok) return;
        new WthLogo(mark, new Font(await response.json())).start();
    } catch (error) {
        // Keep the CSS wordmark if anything goes wrong.
        console.warn('WTH logo: falling back to the CSS wordmark.', error);
    }
}

init();

const VERSION = new URL(import.meta.url).search;

let htmlToImage;
let TEMPLATES;

async function loadDependencies() {
  const [templates] = await Promise.all([
    import(`./templates.js${VERSION}`),
    import(`./html-to-image.js${VERSION}`),
  ]);
  TEMPLATES = templates.TEMPLATES;

  htmlToImage = window.htmlToImage;
}

const PIXEL_RATIO = 2;

const DIALOG_MARGIN = 32;

const STATUS_CLEAR_MS = 4000;

const FONT_FAMILY = "HA Asset Figtree";
const FONT_URL = "/images/community/asset-generator/figtree-variable.woff2";

let tpl = null;
let baseHeight = 0;
let currentHeight = 0;
let fontEmbedCSS = null;
let building = null;
let listenersAttached = false;

const layerRecords = [];

let stageEl;
let scalerEl;
let controlsEl;
let downloadBtn;
let statusEl;

async function loadFont() {
  if (fontEmbedCSS) return;
  const response = await fetch(FONT_URL);
  if (!response.ok) throw new Error(`Could not load the font (${response.status})`);
  const blob = await response.blob();
  const dataUri = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  fontEmbedCSS =
    `@font-face { font-family: '${FONT_FAMILY}'; font-style: normal; ` +
    `font-weight: 300 900; font-display: block; ` +
    `src: url(${dataUri}) format('woff2'); }`;

  const style = document.createElement("style");
  style.textContent = fontEmbedCSS;
  document.head.appendChild(style);
  await document.fonts.ready;
}

function applyFont(el, font, color, titleCase) {
  if (font) {
    if (font.weight) el.style.fontWeight = font.weight;
    if (font.size) el.style.fontSize = `${font.size}px`;
    if (font.lineHeight) el.style.lineHeight = `${font.lineHeight}px`;
    if (font.letterSpacing != null) el.style.letterSpacing = `${font.letterSpacing}px`;
  }
  if (color) el.style.color = color;

  if (titleCase) el.style.textTransform = "capitalize";
}

const fields = [];

const txState = new Map();

function getTx(el) {
  let t = txState.get(el);
  if (!t) {
    t = { shiftY: 0, collapseY: 0, scale: 1, ox: 0, oy: 0 };
    txState.set(el, t);
  }
  return t;
}

function applyTx(el) {
  const t = getTx(el);
  const parts = [];
  const ty = t.shiftY + t.collapseY;
  if (ty) parts.push(`translateY(${ty}px)`);
  if (t.scale !== 1) {
    parts.push(`scale(${t.scale})`);
    el.style.transformOrigin = `${t.ox}px ${t.oy}px`;
  }
  el.style.transform = parts.join(" ");
}

const optionalLayers = [];

const shiftEls = [];

function applyOptional(opt) {
  opt.el.style.display = opt.on ? "" : "none";
  for (const input of opt.inputs) input.disabled = !opt.on;
  if (opt.collapseShift) {
    for (const el of shiftEls) {
      getTx(el).collapseY = opt.on ? 0 : opt.collapseShift;
      applyTx(el);
    }
  }
}

const optionalLayerForField = (field) => optionalLayers.find((o) => o.fields.has(field));

const selectLayers = [];

let datePicker = null;

function parseLocalDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const DATE_PARTS = {
  weekday: (dt) => `${dt.toLocaleDateString("en-US", { weekday: "long" })},`,
  monthday: (dt) => dt.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
};

function formatDatePart(value, part) {
  const fn = DATE_PARTS[part];
  return fn ? fn(parseLocalDate(value)) : value;
}

function makeImage(layer) {
  const img = document.createElement("img");
  img.className = "ag-layer-image";
  img.alt = layer.alt ?? "";
  if (layer.select) {
    const sel = layer.select;
    const opt = sel.options.find((o) => o.value === sel.default) || sel.options[0];
    img.src = opt.src;
    selectLayers.push({ field: sel.field, label: sel.label, options: sel.options, el: img });
  } else {
    img.src = layer.src;
  }
  if (layer.w) img.style.width = `${layer.w}px`;
  if (layer.h) img.style.height = `${layer.h}px`;
  if (layer.cover) img.style.objectFit = "cover";
  return img;
}

function makeTextSpan(child, parentFont, parentColor, parentTitleCase) {
  const span = document.createElement("span");
  span.className = "ag-seg";
  span.textContent = child.editable ? child.default : child.text;

  applyFont(span, Object.assign({}, parentFont, child.font), parentColor, parentTitleCase);
  if (child.editable) {
    span.dataset.field = child.field;
    fields.push({
      field: child.field,
      label: child.label,
      default: child.default,
      el: span,
      datePart: child.datePart,
    });
  }
  return span;
}

function buildLayer(layer) {
  if (layer.kind === "image") {
    const img = makeImage(layer);
    img.style.left = `${layer.x}px`;
    img.style.top = `${layer.y}px`;
    return img;
  }

  if (layer.kind === "text") {
    const el = document.createElement("div");
    el.className = "ag-layer-text";
    el.style.left = `${layer.x}px`;
    el.style.top = `${layer.y}px`;
    if (layer.w) el.style.width = `${layer.w}px`;
    el.textContent = layer.text;
    applyFont(el, layer.font, layer.color, layer.titleCase);
    return el;
  }

  if (layer.kind === "row") {
    const row = document.createElement("div");
    row.className = "ag-layer-row";
    row.style.left = `${layer.x}px`;
    row.style.top = `${layer.y}px`;
    row.style.gap = `${layer.gap || 0}px`;
    if (layer.align) row.style.alignItems = layer.align;
    if (layer.padding != null) row.style.padding = `${layer.padding}px`;
    if (layer.radius != null) row.style.borderRadius = `${layer.radius}px`;
    if (layer.background) row.style.background = layer.background;

    for (const child of layer.children) {
      if (child.kind === "image") {
        row.appendChild(makeImage(child));
      } else {
        row.appendChild(makeTextSpan(child, layer.font, layer.color, layer.titleCase));
      }
    }
    return row;
  }

  return document.createDocumentFragment();
}

function buildStage() {
  stageEl.style.width = `${tpl.width}px`;
  stageEl.style.fontFamily = `'${FONT_FAMILY}', sans-serif`;
  baseHeight = tpl.height;
  stageEl.innerHTML = "";

  fields.length = 0;
  optionalLayers.length = 0;
  shiftEls.length = 0;
  selectLayers.length = 0;
  layerRecords.length = 0;
  txState.clear();
  datePicker = null;

  for (const layer of tpl.layers) {
    if (layer.datePicker) datePicker = layer.datePicker;
    const el = buildLayer(layer);
    layerRecords.push({ el, layer });
    if (layer.shiftOnCollapse) shiftEls.push(el);
    if (layer.optional) {
      const opt = {
        label: layer.optionLabel || "Show layer",
        el,
        on: layer.defaultOn !== false,
        fields: new Set((layer.children || []).filter((c) => c.editable).map((c) => c.field)),
        inputs: [],
        collapseShift: layer.collapseShift || 0,
      };
      optionalLayers.push(opt);
      el.style.display = opt.on ? "" : "none";
    }
    stageEl.appendChild(el);
  }

  const sizes = tpl.sizes || [{ value: "base", height: tpl.height }];
  const def = sizes.find((s) => s.value === tpl.defaultSize) || sizes[0];
  applySize(def.height);
  for (const opt of optionalLayers) applyOptional(opt);
}

function applySize(height) {
  currentHeight = height;
  stageEl.style.height = `${height}px`;
  const delta = height - baseHeight;
  for (const { el, layer } of layerRecords) {
    if (layer.scaleWithSize) {
      const t = getTx(el);
      t.scale = height / baseHeight;
      t.ox = tpl.width / 2 - (layer.x || 0);
      t.oy = 0 - (layer.y || 0);
      applyTx(el);
    } else if (layer.backdrop) {
      if (layer.cover) el.style.height = `${height}px`;
    } else {
      getTx(el).shiftY = delta;
      applyTx(el);
    }
  }
  fitPreview();
}

function makeCheckbox(checked, labelText, onChange) {
  const wrap = document.createElement("label");
  wrap.className = "ag-toggle";
  const box = document.createElement("input");
  box.type = "checkbox";
  box.checked = checked;
  box.addEventListener("change", () => onChange(box.checked));
  const span = document.createElement("span");
  span.textContent = labelText;
  wrap.appendChild(box);
  wrap.appendChild(span);
  return wrap;
}

function makeField(labelText, control) {
  const wrap = document.createElement("label");
  wrap.className = "ag-field";
  const span = document.createElement("span");
  span.className = "ag-field-label";
  span.textContent = labelText;
  wrap.appendChild(span);
  wrap.appendChild(control);
  return wrap;
}

function makeSelect(sel) {
  const select = document.createElement("select");
  for (const o of sel.options) {
    const optEl = document.createElement("option");
    optEl.value = o.value;
    optEl.textContent = o.label;
    select.appendChild(optEl);
  }
  select.addEventListener("change", () => {
    const o = sel.options.find((x) => x.value === select.value);
    if (o) sel.el.src = o.src;
  });
  return makeField(sel.label, select);
}

function todayValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function makeDatePicker(spec, dateFields) {
  const input = document.createElement("input");
  input.type = "date";
  const today = todayValue();
  input.min = today;

  input.value = spec.default && spec.default > today ? spec.default : today;
  const apply = () => {
    if (!input.value) return;
    for (const f of dateFields) f.el.textContent = formatDatePart(input.value, f.datePart);
  };
  input.addEventListener("input", apply);
  input.addEventListener("change", () => {
    if (input.value && input.value < today) input.value = today;
    apply();
  });
  apply();
  return makeField(spec.label, input);
}

function makeSizePicker() {
  const select = document.createElement("select");
  for (const s of tpl.sizes) {
    const o = document.createElement("option");
    o.value = s.value;
    o.textContent = s.label;
    if (s.value === tpl.defaultSize) o.selected = true;
    select.appendChild(o);
  }
  select.addEventListener("change", () => {
    const s = tpl.sizes.find((x) => x.value === select.value);
    if (s) applySize(s.height);
  });
  return makeField("Size", select);
}

function buildControls() {
  controlsEl.innerHTML = "";

  if (tpl.sizes && tpl.sizes.length > 1) controlsEl.appendChild(makeSizePicker());
  for (const sel of selectLayers) controlsEl.appendChild(makeSelect(sel));

  const dateFields = fields.filter((f) => f.datePart);
  if (datePicker && dateFields.length) {
    controlsEl.appendChild(makeDatePicker(datePicker, dateFields));
  }

  const emittedToggles = new Set();
  for (const f of fields) {
    if (f.datePart) continue;
    const opt = optionalLayerForField(f.field);
    if (opt && !emittedToggles.has(opt)) {
      emittedToggles.add(opt);
      controlsEl.appendChild(
        makeCheckbox(opt.on, opt.label, (on) => {
          opt.on = on;
          applyOptional(opt);
        })
      );
    }

    const input = document.createElement("input");
    input.type = "text";
    input.value = f.default;
    input.addEventListener("input", () => {
      f.el.textContent = input.value || " ";
    });
    controlsEl.appendChild(makeField(f.label, input));

    if (opt) {
      opt.inputs.push(input);
      input.disabled = !opt.on;
    }
  }
}

function fitPreview() {
  if (!scalerEl) return;
  const box = scalerEl.parentElement;
  const card = box.parentElement;
  const dialog = card.closest("dialog");
  const styles = getComputedStyle(box);
  const availWidth =
    box.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);

  const dialogChrome = dialog ? dialog.offsetHeight - dialog.clientHeight +
    parseFloat(getComputedStyle(dialog).paddingTop) +
    parseFloat(getComputedStyle(dialog).paddingBottom) : 0;
  const cardChrome = card.offsetHeight - box.offsetHeight;
  const availHeight =
    document.documentElement.clientHeight - DIALOG_MARGIN - dialogChrome - cardChrome -
    parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);

  if (availWidth <= 0 || availHeight <= 0) return;

  const scale = Math.min(availWidth / tpl.width, availHeight / currentHeight, 1);
  stageEl.style.transform = `scale(${scale})`;

  scalerEl.style.width = `${tpl.width * scale}px`;
  scalerEl.style.height = `${currentHeight * scale}px`;
}

let statusTimer;

function setStatus(text, clearAfter = 0) {
  clearTimeout(statusTimer);
  statusEl.textContent = text;
  if (clearAfter) {
    statusTimer = setTimeout(() => {
      statusEl.textContent = "";
    }, clearAfter);
  }
}

async function exportPng() {
  setStatus("Rendering…");
  downloadBtn.disabled = true;
  try {
    await loadFont();
    await document.fonts.ready;

    const options = {
      pixelRatio: PIXEL_RATIO,
      width: tpl.width,
      height: currentHeight,

      style: { transform: "none", transformOrigin: "top left" },
      fontEmbedCSS,
    };

    await htmlToImage.toPng(stageEl, options);
    const dataUrl = await htmlToImage.toPng(stageEl, options);

    const cityField = fields.find((f) => f.field === "city");
    const slug =
      (cityField ? cityField.el.textContent : tpl.id)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || tpl.id;

    const link = document.createElement("a");
    link.download = `${tpl.id}_${tpl.width}x${currentHeight}_${slug}.png`;
    link.href = dataUrl;
    link.click();
    setStatus("Downloaded", STATUS_CLEAR_MS);
  } catch (err) {
    console.error(err);

    setStatus("Download failed. Please try again.");
  } finally {
    downloadBtn.disabled = false;
  }
}

export function init(root) {
  if (!building) {
    building = build(root).catch((err) => {
      building = null;
      throw err;
    });
  }
  return building;
}

async function build(root) {
  stageEl = root.querySelector("[data-ag-stage]");
  scalerEl = root.querySelector("[data-ag-scaler]");
  controlsEl = root.querySelector("[data-ag-controls]");
  downloadBtn = root.querySelector("[data-ag-download]");
  statusEl = root.querySelector("[data-ag-status]");

  await loadDependencies();
  tpl = TEMPLATES[0];
  await loadFont();
  buildStage();
  buildControls();

  if (!listenersAttached) {
    listenersAttached = true;
    downloadBtn.addEventListener("click", exportPng);
    window.addEventListener("resize", fitPreview);
  }
  document.fonts.ready.then(fitPreview);
}

export function refresh() {
  fitPreview();
}

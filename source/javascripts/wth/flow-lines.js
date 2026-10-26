// Moves the lines in the hero and closing card backgrounds as the page scrolls.
//
// Each background marks where its lines show with `data-flow-shown`, a media
// query matching its `bp()` in sass/homeassistant/pages/wth/_sections.scss.
// Inside it, every solid line marked `wth-flow` gets a pulse: a short, brighter
// copy of the line that travels along it. Dashed lines marked
// `wth-flow--dashed` march their dashes instead. Both are done with
// `stroke-dashoffset`, driven by the scroll position, so they move only while
// the page scrolls and run backwards when it scrolls back up.
//
// The lines are in source/wth/components/_hero-background.html and
// source/wth/components/_cta-background.html.

const SVG_NS = 'http://www.w3.org/2000/svg';
// Length of a pulse, in the artwork's units.
const PULSE = 80;
// How far pulses and dashes move along their lines per pixel scrolled.
const SPEED = { pulse: 1.4, dashes: 0.3 };

function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('[data-flow-shown]').forEach((background) => {
        // Hidden lines cannot be measured, so wait until they show.
        const shown = window.matchMedia(background.dataset.flowShown);
        if (shown.matches) {
            animate(background);
        } else {
            shown.addEventListener('change', () => animate(background), { once: true });
        }
    });
}

function animate(background) {
    const flows = [];

    // The pulses sit just above the faded artwork they run along, so they show
    // at full strength.
    background.querySelectorAll('.wth-flow-art').forEach((art) => {
        const pulses = document.createElementNS(SVG_NS, 'g');
        pulses.setAttribute('class', 'wth-flow-pulses');
        art.after(pulses);
        maskShapes(art, pulses);

        art.querySelectorAll('.wth-flow').forEach((line) => {
            const index = flows.length;

            if (line.classList.contains('wth-flow--dashed')) {
                const period = line.getAttribute('stroke-dasharray')
                    .split(/[\s,]+/)
                    .reduce((sum, value) => sum + Number(value), 0);
                flows.push({ element: line, period, start: 0, speed: SPEED.dashes });
                return;
            }

            // One dash the length of the pulse, then a gap longer than the line,
            // so only one pulse is ever on it.
            const length = line.getTotalLength();
            const pulse = line.cloneNode();
            pulse.removeAttribute('class');
            pulse.setAttribute('stroke-dasharray', `${PULSE} ${length + PULSE}`);
            pulses.append(pulse);

            const period = length + PULSE * 2;
            // Spread the pulses out, so they are not all at the start of their line.
            flows.push({ element: pulse, period, start: ((index * 0.37) % 1) * period, speed: SPEED.pulse });
        });
    });

    let frame = 0;
    const update = () => {
        frame = 0;
        const { top, bottom } = background.getBoundingClientRect();
        if (bottom < 0 || top > window.innerHeight) return;
        const scrolled = window.scrollY;
        flows.forEach(({ element, period, start, speed }) => {
            element.style.strokeDashoffset = String(-((start + scrolled * speed) % period));
        });
    };

    update();
    window.addEventListener('scroll', () => {
        frame ||= requestAnimationFrame(update);
    }, { passive: true });
}

// The nodes and cards marked `wth-flow-shapes` hide the lines beneath them
// because they share the faded artwork group. The pulses sit above that
// group, so they are cut out where the shapes are, with a mask made from
// black copies of the shapes.
let masks = 0;

function maskShapes(art, pulses) {
    const shapes = art.querySelector('.wth-flow-shapes');
    if (!shapes) return;

    const mask = document.createElementNS(SVG_NS, 'mask');
    mask.id = `wth-flow-mask-${masks++}`;
    mask.setAttribute('maskUnits', 'userSpaceOnUse');

    const visible = document.createElementNS(SVG_NS, 'rect');
    Object.entries({ x: -10000, y: -10000, width: 20000, height: 20000, fill: '#fff' })
        .forEach(([name, value]) => visible.setAttribute(name, value));

    const cutout = shapes.cloneNode(true);
    [cutout, ...cutout.querySelectorAll('*')].forEach((element) => {
        ['fill', 'stroke'].forEach((paint) => {
            const value = element.getAttribute(paint);
            if (value && value !== 'none') element.setAttribute(paint, '#000');
        });
    });

    mask.append(visible, cutout);
    art.ownerSVGElement.append(mask);
    pulses.setAttribute('mask', `url(#${mask.id})`);
}

init();

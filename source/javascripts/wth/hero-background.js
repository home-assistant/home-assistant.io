// Moves the lines in the hero background as the page scrolls.
//
// Every solid line marked `wth-flow` in source/wth/components/_hero-background.html
// gets a pulse: a short, brighter copy of the line that travels along it.
// Dashed lines marked `wth-flow--dashed` march their dashes instead. Both are
// done with `stroke-dashoffset`, driven by the scroll position, so they move
// only while the page scrolls and run backwards when it scrolls back up.

const SVG_NS = 'http://www.w3.org/2000/svg';

// Where the lines show, matching `bp(tablet)` in
// sass/homeassistant/pages/wth/_sections.scss. Phones get the gradient alone.
const SHOWN = '(min-width: 768px)';
// Length of a pulse, in the artwork's units.
const PULSE = 80;
// How far pulses and dashes move along their lines per pixel scrolled.
const SPEED = { pulse: 1.4, dashes: 0.3 };

function init() {
    const background = document.querySelector('.wth-hero-bg');
    if (!background || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hidden lines cannot be measured, so wait until they show.
    const shown = window.matchMedia(SHOWN);
    if (shown.matches) {
        animate(background);
    } else {
        shown.addEventListener('change', () => animate(background), { once: true });
    }
}

function animate(background) {
    const art = background.querySelector('.wth-hero-bg__art');
    const pulses = document.createElementNS(SVG_NS, 'g');
    pulses.setAttribute('class', 'wth-hero-bg__pulses');
    art.after(pulses);

    const flows = [...art.querySelectorAll('.wth-flow')].map((line, index) => {
        if (line.classList.contains('wth-flow--dashed')) {
            const period = line.getAttribute('stroke-dasharray')
                .split(/[\s,]+/)
                .reduce((sum, value) => sum + Number(value), 0);
            return { element: line, period, start: 0, speed: SPEED.dashes };
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
        return { element: pulse, period, start: ((index * 0.37) % 1) * period, speed: SPEED.pulse };
    });

    let frame = 0;
    const update = () => {
        frame = 0;
        if (background.getBoundingClientRect().bottom < 0) return;
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

init();

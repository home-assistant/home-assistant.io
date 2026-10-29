// Plays the WTH statements in "What is a WTH" as a sea of chat bubbles: they
// drift along the pipes, one is picked out and brought to the front, the reply
// pops up under it, and after a while another one is picked.
//
// The markup is source/what-the-heck/components/_what.html and its Astro twin,
// astro/src/components/what-the-heck/WthChat.astro. The drifting is CSS; this
// script only picks. The first exchange is at the front in the markup, so
// without this script the section shows that one, with the sea behind it.
//
// It follows the WAI carousel pattern: it stops while the pointer is over it or
// focus is inside it, and announces exchanges only once someone steps through
// them, never while it plays on its own. The pause button also stops the
// drifting. With reduced motion nothing drifts or flies and it does not play
// on its own; the previous and next buttons still step through the exchanges.

// How long a bubble takes to fly to the front, how long the typing dots show,
// and how long a reply stays before the next bubble is picked.
const FLIGHT = 900;
const TYPING = 1100;
const HOLD = 4500;
// How many of the last statements are not picked again.
const RECENT = 6;

function init() {
    document.querySelectorAll('[data-wth-chat]').forEach(setUp);
}

function setUp(chat) {
    const pairs = [...chat.querySelectorAll('.wth-chat-pair')];
    if (pairs.length < 2) return;

    const sea = chat.querySelector('.wth-sea');
    const bubbles = [...chat.querySelectorAll('.wth-sea-bubble')];
    const list = chat.querySelector('.wth-chat-list');
    const toggle = chat.querySelector('[data-wth-chat-toggle]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let index = 0;
    let timer;
    let flight;
    // The bubble in the sea whose statement is at the front, hidden meanwhile.
    let picked = null;
    let paused = reducedMotion;
    // Reasons it is held still for now: the pointer, focus, or being off screen.
    const holds = new Set();
    // The statements shown so far, for the previous button and to avoid repeats.
    const history = [0];

    chat.querySelector('.wth-chat-controls').hidden = false;
    toggle.hidden = reducedMotion;

    const playing = () => !paused && holds.size === 0;

    // Bubbles fully inside the sea, which are the ones that can be picked.
    function inView() {
        const box = sea.getBoundingClientRect();
        return bubbles.filter((bubble) => {
            const { left, right } = bubble.getBoundingClientRect();
            return left >= box.left + 16 && right <= box.right - 16;
        });
    }

    function present(next, source) {
        pairs[index].classList.remove('is-active', 'is-typing', 'is-replied');
        picked?.classList.remove('is-picked');
        picked = null;
        flight?.cancel();
        flight = null;

        index = next;
        const pair = pairs[index];
        pair.classList.add('is-active');
        if (reducedMotion) return;

        const statement = pair.querySelector('.wth-chat-statement');
        const to = statement.getBoundingClientRect();
        const easing = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

        if (source) {
            // Fly the statement in from where its bubble is drifting.
            const from = source.getBoundingClientRect();
            const scale = from.width / to.width;
            source.classList.add('is-picked');
            picked = source;
            flight = statement.animate([
                { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${scale})`, opacity: 0.6 },
                { transform: 'none', opacity: 1 },
            ], { duration: FLIGHT, easing });
        } else {
            // Its bubble is out of sight, so it rises from the sea instead.
            flight = statement.animate([
                { transform: 'translateY(24px) scale(0.92)', opacity: 0 },
                { transform: 'none', opacity: 1 },
            ], { duration: FLIGHT / 2, easing });
        }
    }

    function reply() {
        pairs[index].classList.remove('is-typing');
        pairs[index].classList.add('is-replied');
    }

    function schedule() {
        clearTimeout(timer);
        list.setAttribute('aria-live', playing() ? 'off' : 'polite');

        const pair = pairs[index];
        if (!playing()) {
            // Standing still, the reply shows as soon as the statement lands.
            if (pair.classList.contains('is-replied')) return;
            if (flight?.playState === 'running') flight.finished.then(reply, () => {});
            else reply();
            return;
        }

        if (pair.classList.contains('is-replied')) {
            timer = setTimeout(pick, HOLD);
        } else if (pair.classList.contains('is-typing')) {
            timer = setTimeout(() => {
                reply();
                schedule();
            }, TYPING);
        } else {
            timer = setTimeout(() => {
                pair.classList.add('is-typing');
                schedule();
            }, FLIGHT);
        }
    }

    // Picks a bubble drifting in view that has not been shown lately, or the
    // next statement in order when none is.
    function pick() {
        const recent = history.slice(-RECENT);
        const options = inView().filter((bubble) => !recent.includes(Number(bubble.dataset.index)));
        const source = options[Math.floor(Math.random() * options.length)];
        const next = source ? Number(source.dataset.index) : (index + 1) % pairs.length;
        history.push(next);
        present(next, source);
        schedule();
    }

    chat.querySelector('[data-wth-chat-next]').addEventListener('click', pick);

    chat.querySelector('[data-wth-chat-prev]').addEventListener('click', () => {
        if (history.length < 2) return;
        history.pop();
        const previous = history[history.length - 1];
        present(previous, inView().find((bubble) => Number(bubble.dataset.index) === previous));
        schedule();
    });

    toggle.addEventListener('click', () => {
        paused = !paused;
        chat.classList.toggle('is-paused', paused);
        toggle.setAttribute('aria-label', paused ? 'Play' : 'Pause');
        schedule();
    });

    chat.addEventListener('mouseenter', () => hold('pointer', true));
    chat.addEventListener('mouseleave', () => hold('pointer', false));

    // Focus on the play button itself does not hold it, or it could never be
    // started again from the keyboard.
    chat.addEventListener('focusin', (event) => hold('focus', event.target !== toggle));
    chat.addEventListener('focusout', (event) => {
        if (!chat.contains(event.relatedTarget)) hold('focus', false);
    });

    new IntersectionObserver(([entry]) => {
        chat.classList.toggle('is-offscreen', !entry.isIntersecting);
        hold('offscreen', !entry.isIntersecting);
    }).observe(chat);

    function hold(reason, on) {
        if (on) holds.add(reason);
        else holds.delete(reason);
        schedule();
    }

    schedule();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

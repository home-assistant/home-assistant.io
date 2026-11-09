// Plays the sea of pull requests in "Fix a WTH": cards drifting along the
// same pipes as the WTHs in "What is a WTH". The drifting is CSS; this script
// adds what CSS cannot do.
//
// The markup is source/what-the-heck/components/_pull-requests.html and its
// Astro twin, astro/src/components/what-the-heck/WthPullRequests.astro.
// Without this script the sea still drifts, and stops while the pointer is
// over it or focus is inside it (in the styles).
//
// - A pause button, because anything that moves on its own for more than a
//   few seconds has to be stoppable. It is hidden until this runs, and with
//   reduced motion nothing drifts, so it stays hidden.
// - It stops while it is off screen, as the sea of WTHs does.
// - When focus lands on a card that has drifted out of sight, the lane is
//   moved so the card is in view. Focus holds the sea still, so it stays.

function init() {
    document.querySelectorAll('[data-wth-prs]').forEach(setUp);
}

function setUp(prs) {
    const sea = prs.querySelector('.wth-prs-sea');
    const toggle = prs.querySelector('[data-wth-prs-toggle]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sea || !toggle || reducedMotion) return;

    toggle.hidden = false;
    toggle.addEventListener('click', () => {
        const paused = prs.classList.toggle('is-paused');
        toggle.setAttribute('aria-label', paused ? 'Play' : 'Pause');
    });

    new IntersectionObserver(([entry]) => {
        prs.classList.toggle('is-offscreen', !entry.isIntersecting);
    }).observe(prs);

    prs.addEventListener('focusin', (event) => {
        const card = event.target.closest('.wth-prs-card');
        if (card) show(sea, card);
    });
}

// Moves the lane the card is in, along its loop, until the card is inside the
// sea, with the same margin as the picking in wth-chat.js.
function show(sea, card) {
    // Focusing a card also makes the browser scroll the sea itself.
    sea.scrollLeft = 0;

    const box = sea.getBoundingClientRect();
    const { left, right } = card.getBoundingClientRect();
    let delta = 0;
    if (left < box.left + 16) delta = box.left + 16 - left;
    else if (right > box.right - 16) delta = box.right - 16 - right;
    if (delta === 0) return;

    const track = card.closest('.wth-prs-track');
    // The drift is the only animation on a track.
    const drift = track?.getAnimations()[0];
    if (!drift) return;

    // The drift moves the track by half its width over the animation's
    // duration, leftwards, or rightwards when the lane runs in reverse.
    const duration = drift.effect.getComputedTiming().duration;
    const along = (track.offsetWidth / 2) * (getComputedStyle(track).animationDirection === 'reverse' ? -1 : 1);
    // The drift repeats forever, so its time keeps growing past one loop;
    // take where it is within the current loop before moving it.
    const now = ((Number(drift.currentTime) % duration) + duration) % duration;
    const time = now - (delta * duration) / along;
    // The card is only in the first run, so it cannot be moved past one loop.
    // The track starts a little in from the edge, so the cards are all
    // within reach of the sea.
    drift.currentTime = Math.min(Math.max(time, 0), duration);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

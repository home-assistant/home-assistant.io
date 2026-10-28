// Eases the speed of the doodle in the "WTH" header button.
//
// The speed is the `--wth-speed` custom property on the button, which the
// stylesheet (sass/homeassistant/base/_nav_wth.scss) raises on hover and
// focus and transitions there and back. Changing `animation-duration` instead
// would jump every dash to a new place in its loop, so while the property
// eases, this hands its current value to the button's animations as their
// playback rate, which keeps each dash where it is and changes only its pace.
// Temporary, like the button: remove it with the rest of the item.

function follow(button) {
    let frame = 0;
    const update = () => {
        const speed = parseFloat(getComputedStyle(button).getPropertyValue('--wth-speed')) || 1;
        button.getAnimations({ subtree: true }).forEach((animation) => {
            animation.playbackRate = speed;
        });
    };
    const run = () => {
        update();
        frame = requestAnimationFrame(run);
    };

    // Only while the property is easing; between transitions it holds still.
    button.addEventListener('transitionrun', (event) => {
        if (event.propertyName !== '--wth-speed') return;
        cancelAnimationFrame(frame);
        run();
    });
    button.addEventListener('transitionend', (event) => {
        if (event.propertyName !== '--wth-speed') return;
        cancelAnimationFrame(frame);
        update();
    });
    button.addEventListener('transitioncancel', (event) => {
        if (event.propertyName !== '--wth-speed') return;
        cancelAnimationFrame(frame);
        update();
    });
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.nav-wth__button').forEach(follow);
}

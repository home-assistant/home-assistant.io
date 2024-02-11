'use strict';

[...document.getElementsByClassName('terminology')].forEach($terminology => {
    const horizontalMargin = 20;

    const topMargin = document
        .getElementsByClassName('site-header')[0]
        .clientHeight;

    const terminology = $terminology.innerText;

    const debug = message => {
        console.debug(`Terminology tooltip (${terminology}): ${message}`);
    }

    const $tooltip = $terminology.querySelector('.terminology-tooltip');

    $terminology.addEventListener('mouseenter', () => {
        let tooltipRect = $tooltip.getBoundingClientRect();

        if (tooltipRect.top < topMargin) {
            debug("doesn't fit on top -> moving to bottom");
            $tooltip.classList.add('below');
        }

        let horizontalMove = 0;

        if (tooltipRect.left < horizontalMargin) {
            debug("doesn't fit on the left edge -> moving right");
            horizontalMove = Math.abs(tooltipRect.left) + horizontalMargin;
        } else if (tooltipRect.right + horizontalMargin > window.innerWidth) {
            debug("doesn't fit on the right edge -> moving left");
            horizontalMove = window.innerWidth - tooltipRect.right - horizontalMargin;
        }

        $tooltip.style.setProperty('--horizontal-move', `${horizontalMove}px`);
    });

    $terminology.addEventListener('mouseleave', () => {
        // reset
        $tooltip.style.setProperty('--horizontal-move', '0px');
        $tooltip.classList.remove('below');
    });
});

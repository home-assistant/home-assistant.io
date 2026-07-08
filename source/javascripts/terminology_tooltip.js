'use strict';

[...document.getElementsByClassName('terminology')].forEach(terminology => {
    const horizontalMargin = 20;
    const verticalGap = 8;

    const topMargin = document
        .getElementsByClassName('site-header')[0]
        .clientHeight;

    const tooltip = terminology.querySelector('.terminology-tooltip');

    terminology.addEventListener('mouseenter', () => {
        const termRect = terminology.getBoundingClientRect();

        // Position tooltip above the term using fixed positioning
        const tooltipWidth = tooltip.offsetWidth || 250;
        let top = termRect.top - verticalGap;
        let left = termRect.left + (termRect.width / 2) - (tooltipWidth / 2);

        // Check if it fits above, otherwise show below
        tooltip.classList.remove('below');
        tooltip.style.top = '';
        tooltip.style.left = '';

        // Temporarily show to measure
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        tooltip.style.display = 'block';
        tooltip.style.top = '0px';
        tooltip.style.left = left + 'px';

        const tooltipHeight = tooltip.offsetHeight;

        if (top - tooltipHeight < topMargin) {
            // Doesn't fit above, show below
            tooltip.classList.add('below');
            top = termRect.bottom + verticalGap;
        } else {
            top = top - tooltipHeight;
        }

        // Clamp horizontal position
        if (left < horizontalMargin) {
            left = horizontalMargin;
        } else if (left + tooltipWidth > window.innerWidth - horizontalMargin) {
            left = window.innerWidth - tooltipWidth - horizontalMargin;
        }

        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.style.visibility = '';
        tooltip.style.opacity = '';
        tooltip.style.display = '';
    });

    terminology.addEventListener('mouseleave', () => {
        tooltip.style.top = '';
        tooltip.style.left = '';
        tooltip.classList.remove('below');
    });
});

import { ZBT2Animations } from "animations";
import { ConnectHeader } from "header";

// A flag to ensure animations are only initialized once.
let animationsLoaded = false;

// --- Initial Setup ---

// Initialize other page components.
new ConnectHeader();

// A simple utility to hide the canvas for debugging purposes.
if (window.location.search.includes("hide")) {
    document.querySelectorAll(".animation-wrapper canvas").forEach(canvas => {
        canvas.style.display = "none";
    });
}

// --- Additional Page Animations (Not part of the render animation) ---
const featuresEntry = new ZBT2Animations("section#features");

featuresEntry.onEnter(() => {
    featuresEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 1);
});

featuresEntry.onLeave(() => {
    featuresEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 0);
});

featuresEntry.checkInViewOnLoad();

const configCards = document.querySelector("section#plug-and-play .config-cards");
const configCardItems = configCards.querySelectorAll('.config-card');

// Use IntersectionObserver to trigger animation when top center enters viewport
if (configCards) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only fire once
                configCardItems.forEach((configCardItem, index) => {
                    setTimeout(() => {
                        configCardItem.style.setProperty("--enter", 1);
                    }, 400 * index);
                });
                observer.disconnect();
            }
        });
    }, {
        root: null,
        threshold: 0.5,
        rootMargin: "0px 0px -20% 0px" // Top center
    });
    observer.observe(configCards);
}

const longRange = document.querySelector("section#long-range svg.range-waves");
const devices = document.querySelectorAll("section#long-range .devices .device");

// Use IntersectionObserver to trigger animation when the top of the element is 20% into the viewport
if (longRange) {
    const observer1 = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only fire once
                longRange.style.setProperty("--enter", 1);
                devices.forEach(d => {
                    setTimeout(() => {
                        d.style.opacity = 1;
                    }, 500 + Math.floor(Math.random() * 1000));
                });
                obs.disconnect();
            }
        });
    }, {
        root: null,
        threshold: 0, // trigger as soon as it enters the adjusted root area
        // Shrink the root rectangle from the top by 20% of the viewport height so
        // intersection occurs when the element's top has moved 20% into view.
        rootMargin: "-50% 0px 0px 0px"
    });
    observer1.observe(longRange);
}

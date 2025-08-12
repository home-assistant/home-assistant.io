import { ZWA2RenderAnimation } from "./render-animations.js"; // Adjust path if needed
import { ZWA2Animations } from "animations";
import { ConnectHeader } from "header";

// A flag to ensure animations are only initialized once.
let animationsLoaded = false;

// let smoother = ScrollSmoother.create({
//   smooth: 2, 
//   effects: true
// });

/**
 * Checks the screen width and initializes the animations if the screen is
 * large enough and they haven't been loaded yet.
 */
function maybeLoadAnimations() {
    // Only run on larger screens to save resources on mobile.
    if (window.innerWidth >= 1024 && !animationsLoaded) {
        animationsLoaded = true;
        // No need to remove the event listener, as the flag prevents re-initialization.

        // --- Scene 1 Configuration ---
        const scene1Sections = [
            // The hero section autoplays from frame 0 to 186, then the user
            // can scroll-animate it from frame 186 to 246.
            //{ selector: "#hero", start: 186, end: 246, autoplay: { start: 0, end: 186, duration: 1200 } },
            { selector: "#hero", start: 0, end: 246 },
            { selector: "#features", start: 246, end: 314 },
            { selector: "#chipset", start: 314, end: 386 },
            // The last section just holds the final frame.
            { selector: "#long-range", start: 386, end: 386 }
        ];
        const scene1TotalFrames = scene1Sections[scene1Sections.length - 1].end;
        new ZWA2RenderAnimation("scene1", "canvas.render-scroller#scene-one", scene1Sections, scene1TotalFrames);

        // --- Scene 2 Configuration ---
        const scene2Sections = [
            // 0 - 60
            // 65 - 125
            // 130 - 190
            { selector: "#built-for-home-assistant", start: 63, end: 135 },
            { selector: "#plug-and-play", start: 135, end: 201 },
            { selector: "#buy", start: 201, end: 201 }
        ];
        const scene2TotalFrames = scene2Sections[scene2Sections.length - 1].end;
        new ZWA2RenderAnimation("scene2", "canvas.render-scroller#scene-two", scene2Sections, scene2TotalFrames);
    }
}

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
const featuresEntry = new ZWA2Animations("section#features");

featuresEntry.onEnter(() => {
    featuresEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 1);
});

featuresEntry.onLeave(() => {
    featuresEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 0);
});

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

// Use IntersectionObserver to trigger animation when top center enters viewport
if (longRange) {
    const observer1 = new IntersectionObserver((entries, observer1) => {
        entries.forEach(entry => {
            console.log(0);
            if (entry.isIntersecting) {
                console.log(1);
                // Only fire once
                longRange.style.setProperty("--enter", 1);
                [...devices].forEach(d => {
                    setTimeout(() => {
                        d.style.opacity = 1;
                    }, 500 + (Math.floor(Math.random() * 1000)));
                })
                observer1.disconnect();
            }
        });
    }, {
        root: null,
        threshold: 0.5,
        rootMargin: "0px 0px 5% 0px" // Top center
    });
    observer1.observe(longRange);
}

// --- Event Listeners ---

// Attempt to load animations on initial page load.
window.addEventListener('DOMContentLoaded', () => {
    maybeLoadAnimations();
    featuresEntry.checkInViewOnLoad();
});
// Also check on resize, in case the user rotates a tablet or resizes a browser window.
window.addEventListener('resize', maybeLoadAnimations);

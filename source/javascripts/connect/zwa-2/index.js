import { ZWA2RenderAnimation } from "./render-animations.js"; // Adjust path if needed
import { ZWA2Animations } from "animations";
import { ConnectHeader } from "header";
import { Simon } from "simon";

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
        const scene1 = new ZWA2RenderAnimation("scene1", "canvas.render-scroller#scene-one", scene1Sections, scene1TotalFrames);
        scene1.start();

        // Deferred Scene 2 loading via IntersectionObserver
        const scene2Sections = [
            { selector: "#built-for-home-assistant", start: 63, end: 135 },
            { selector: "#plug-and-play", start: 135, end: 201 },
            { selector: "#buy", start: 201, end: 201 }
        ];
        const scene2TotalFrames = scene2Sections[scene2Sections.length - 1].end;
        const scene2 = new ZWA2RenderAnimation("scene2", "canvas.render-scroller#scene-two", scene2Sections, scene2TotalFrames);
        const initScene2 = () => {
            if (initScene2._done) return; // idempotent
            initScene2._done = true;
            scene2.start();
        };

        const scene2Canvas = document.querySelector('#built-for-home-assistant');
        if (scene2Canvas) {
            // Trigger when the top of scene-two canvas reaches the bottom edge of the viewport
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        initScene2();
                        obs.disconnect();
                    }
                });
            }, {
                root: null,
                threshold: 0,
                rootMargin: '0px 0px -100% 0px' // shrink root bottom by 100% viewport height
            });
            observer.observe(scene2Canvas);
        } else {
            // Fallback: if canvas not found yet, retry on next frame
            requestAnimationFrame(() => {
                const retryCanvas = document.querySelector('canvas.render-scroller#scene-two');
                if (retryCanvas) {
                    const observer = new IntersectionObserver((entries, obs) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                initScene2();
                                obs.disconnect();
                            }
                        });
                    }, {
                        root: null,
                        threshold: 0,
                        rootMargin: '0px 0px -100% 0px'
                    });
                    observer.observe(retryCanvas);
                }
            });
        }
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

// --- Event Listeners ---

// Attempt to load animations on initial page load.

maybeLoadAnimations();
document.addEventListener('DOMContentLoaded', () => {
    let simon = new Simon(document.querySelectorAll("section#long-range .devices .device:not(.device--sprinkler)"));
    maybeLoadAnimations();
    featuresEntry.checkInViewOnLoad();
    console.log("Repeat after me. Let's see how *long* you can last. -Darren");
});
// Also check on resize, in case the user rotates a tablet or resizes a browser window.
window.addEventListener('resize', maybeLoadAnimations);

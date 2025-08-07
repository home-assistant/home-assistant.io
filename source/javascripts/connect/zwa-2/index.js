import { ZWA2RenderAnimation } from "./render-animations.js"; // Adjust path if needed
import { ZWA2Animations } from "animations";
import { ConnectHeader } from "header";

// A flag to ensure animations are only initialized once.
let animationsLoaded = false;

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
            { selector: "#hero", start: 0, end: 246, autoplay: { start: 0, end: 186, duration: 1200 } },
            { selector: "#overview", start: 246, end: 314 },
            { selector: "#chipset", start: 314, end: 379 },
            // The last section just holds the final frame.
            { selector: "#long-range", start: 379, end: 379 }
        ];
        const scene1TotalFrames = scene1Sections[scene1Sections.length - 1].end;
        new ZWA2RenderAnimation("scene1-final", "canvas.render-scroller#scene-one", scene1Sections, scene1TotalFrames);

        // --- Scene 2 Configuration ---
        const scene2Sections = [
          // 0 - 60
          // 65 - 125
          // 130 - 190
            { selector: "#built-for-home-assistant", start: 0, end: 125 },
            { selector: "#plug-and-play", start: 130, end: 190 },
            { selector: "#buy", start: 190, end: 190 }
        ];
        const scene2TotalFrames = scene2Sections[scene2Sections.length - 1].end;
        new ZWA2RenderAnimation("scene2-final", "canvas.render-scroller#scene-two", scene2Sections, scene2TotalFrames);
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
const overviewEntry = new ZWA2Animations("section#overview");
window.sceneOneOverviewEntry = overviewEntry; // Expose for debugging

overviewEntry.onEnter(() => {
    overviewEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 1);
});

overviewEntry.onLeave(() => {
    overviewEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 0);
});


// --- Event Listeners ---

// Attempt to load animations on initial page load.
window.addEventListener('DOMContentLoaded', maybeLoadAnimations);
// Also check on resize, in case the user rotates a tablet or resizes a browser window.
window.addEventListener('resize', maybeLoadAnimations);

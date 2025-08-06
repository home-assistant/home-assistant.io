import { ZWA2RenderAnimation } from "render-animations";
import { ZWA2Animations } from "animations";
import { ConnectHeader } from "header";

let animationsLoaded = false;

maybeLoadAnimations();

window.addEventListener('resize', maybeLoadAnimations);

function maybeLoadAnimations() {
  if (screen.width >= 1024 && !animationsLoaded) {
    animationsLoaded = true;
    window.removeEventListener('resize', maybeLoadAnimations);
    //new ZWA2RenderAnimation("scene1-final", "canvas.render-scroller#scene-one", ".animation-wrapper", 379);

    const sections = [
      //{ selector: "#hero", start: 0, end: 186 },
      { selector: "#hero", start: 186, end: 246, autoplay: { start: 0, end: 186, duration: 1000 } },
      //{ selector: "#overview", start: 187, end: 246 },
      { selector: "#overview", start: 247, end: 314 },
      //{ selector: "#chipset", start: 247, end: 314 },
      { selector: "#chipset", start: 315, end: 379 },
      //{ selector: "#long-range", start: 315, end: 379 }
      { selector: "#long-range", start: 379, end: 379 }
    ];
    new ZWA2RenderAnimation("scene1-final", "canvas.render-scroller#scene-one", sections, 379);
  }
}


//new ZWA2RenderAnimation("scene2", "canvas.render-scroller#scene-two", ".animation-wrapper", 554);
new ConnectHeader();

// if ?hide, display none on animation-wrapper
if (window.location.search.includes("hide")) {
  document.querySelector(".animation-wrapper canvas").style.display = "none";
}

const overviewEntry = new ZWA2Animations("section#overview");
window.overviewEntry = overviewEntry; // Make it available globally for debugging
overviewEntry.onEnter(() => {
  overviewEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 1);
});
overviewEntry.onLeave(() => {
  overviewEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 0);
});


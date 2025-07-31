import { ZWA2RenderAnimation } from "render-animations";
import { ZWA2Animations } from "animations";
import { ConnectHeader } from "header";

new ZWA2RenderAnimation("scene1", "canvas.render-scroller#scene-one", ".animation-wrapper", 554);
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
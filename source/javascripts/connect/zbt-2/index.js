import { ZBT2Animations } from "animations";
import { ConnectHeader } from "header";

// Initialize other page components.
new ConnectHeader();

const featuresEntry = new ZBT2Animations("section#features");

featuresEntry.onEnter(() => {
    featuresEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", -1);
});

featuresEntry.onLeave(() => {
    featuresEntry.el.querySelector(".waves-wrapper svg").style.setProperty("--enter", 0);
});

featuresEntry.checkInViewOnLoad();
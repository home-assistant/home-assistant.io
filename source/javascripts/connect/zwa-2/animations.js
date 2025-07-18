export class ZWA2Animations {
    // Use ScrollTrigger and create callbacks onEnter and onLeave so I can control the animation.
    // gsap has already been imported in the main script.
    enterCallback = null;
    leaveCallback = null;
    el = null;

    constructor(sectionSelector) {
        this.section = document.querySelector(sectionSelector);
        if (!this.section) return;
        this.el = this.section;
        this.setupScrollTrigger();
    }

    setupScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: this.section,
            start: "top-=75%",
            end: "bottom",
            // markers
            markers: true,
            onEnter: () => {
                if (this.enterCallback) {
                    this.enterCallback();
                }
            },
            onLeave: () => {
                if (this.leaveCallback) {
                    this.leaveCallback();
                }
            },  
            onEnterBack: () => {
                if (this.enterCallback) {
                    this.enterCallback();
                }
            },
            onLeaveBack: () => {
                if (this.leaveCallback) {
                    this.leaveCallback();
                }
            },
        });
    }
    onEnter(callback){
        this.enterCallback = callback;
    }
    onLeave(callback){
        this.leaveCallback = callback;
    }
}
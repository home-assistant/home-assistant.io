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
            start: "top=50%",
            end: "bottom",
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
    checkInViewOnLoad() {
        if (!this.el) return;
        const rect = this.el.getBoundingClientRect();
        const inView =
            rect.top < window.innerHeight &&
            rect.bottom > 0;
        if (inView && this.enterCallback) {
            this.enterCallback();
        }
    }
}
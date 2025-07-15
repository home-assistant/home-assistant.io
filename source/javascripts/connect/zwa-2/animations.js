export const ZWA2Animations = {
    frameCount: 403,
    images: [],
    airpods: { frame: 0 },
    canvas: null,
    context: null,

    currentFrame(index) {
        return `/connect/zwa-2/video-frames/hero-${(index + 1).toString().padStart(3, '0')}.webp`;
    },

    loadImages() {
        for (let i = 0; i < this.frameCount; i++) {
            const img = new Image();
            img.src = this.currentFrame(i);
            this.images.push(img);
        }
    },

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // always put the image in the center of the canvas. Stretch (cover) to fit if needed
        const img = this.images[this.airpods.frame];
        const aspectRatio = img.width / img.height;
        const canvasAspectRatio = this.canvas.width / this.canvas.height;
        let drawWidth, drawHeight;
        if (canvasAspectRatio > aspectRatio) {
            drawWidth = this.canvas.width;
            drawHeight = this.canvas.width / aspectRatio;
        } else {
            drawHeight = this.canvas.height;
            drawWidth = this.canvas.height * aspectRatio;
        }
        const x = (this.canvas.width - drawWidth) / 2;
        const y = (this.canvas.height - drawHeight) / 2;
        this.context.drawImage(img, x, y, drawWidth, drawHeight);
    },

    setupAnimation() {
        gsap.to(this.airpods, {
            frame: this.frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: document.querySelector(".animation-wrapper"),
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
            onUpdate: this.render.bind(this)
        });
    },

    init() {
        console.clear();
        this.canvas = document.querySelector("canvas.render-scroller#scene1")
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.loadImages();
        this.setupAnimation();
        this.images[0].onload = this.render.bind(this);
    }
}
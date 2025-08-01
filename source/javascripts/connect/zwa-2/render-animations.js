/**
 * Using FFMPEG, we can convert 3D rendered video frames into a sequence of images.
 * ffmpeg -c:v libvpx-vp9 -i {file.webm} -vf 'scale=1920:1080' -lossless 1 -c:v libwebp -y {output_dir}/frame-%03d.webp
 * 
 * Alternatively, use the script `process.sh` to automate the conversion.
 * e.g. `/workspaces/home-assistant.io/source/connect/zwa-2/source-video/process.sh ./hero.webm ../video-frames/hero`
 */

export class ZWA2RenderAnimation {
    frameCount = null;
    images = [];
    meta = { frame: 0 };
    canvas = null;
    context = null;
    trigger = null;
    filename = null;

    currentFrame(index) {
        return `/connect/zwa-2/video-frames/${this.filename}/${(index + 1).toString().padStart(3, '0')}.webp`;
    }

    loadImages() {
        for (let i = 0; i < this.frameCount; i++) {
            const img = new Image();
            img.src = this.currentFrame(i);
            this.images.push(img);
        }
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // always put the image in the center of the canvas. Stretch (cover) to fit if needed
        const img = this.images[this.meta.frame];
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
    }

    setupAnimation() {
        // Debugging for GSAP ScrollTrigger
        if (window.ScrollTrigger && window.ScrollTrigger.defaults) {
            window.ScrollTrigger.defaults({
                markers: true // Show start/end markers for debugging
            });
        }
        gsap.to(this.meta, {
            frame: this.frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: document.querySelector(this.trigger),
                start: "top top",
                end: "bottom bottom",
                scrub: .5,
                markers: true,
            },
            onUpdate: this.render.bind(this)
        });
    }

    constructor(filename, elem, trigger, frames) {
        this.trigger = trigger;
        this.filename = filename;
        this.frameCount = frames;
        this.canvas = document.querySelector(elem);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.loadImages();
        this.images[0].onload = () => {
            this.setupAnimation();
        };
    }

    // Removed playInitialFrames; no initial animation needed
}
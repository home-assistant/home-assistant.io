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
        this.canvas = document.querySelector(elem)
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.loadImages();
        let initialAnimationDone = false;
        let playTimeout = null;
        let scrollHandler = () => {
            if (!initialAnimationDone) {
                // Calculate the frame based on current scroll position
                const triggerElem = document.querySelector(this.trigger);
                const rect = triggerElem.getBoundingClientRect();
                const scrollTop = window.scrollY || window.pageYOffset;
                const elemTop = rect.top + scrollTop;
                const elemHeight = triggerElem.offsetHeight;
                const scrollPos = window.scrollY || window.pageYOffset;
                const progress = Math.min(Math.max((scrollPos - elemTop) / (elemHeight - window.innerHeight), 0), 1);
                const frame = Math.round(progress * (this.frameCount - 1));
                this.meta.frame = frame;
                this.render();
                initialAnimationDone = true;
                window.removeEventListener('scroll', scrollHandler);
                if (playTimeout) clearTimeout(playTimeout);
                this._stopInitialAnimation = true;
                this.setupAnimation();
            }
        };
        this.images[0].onload = () => {
            window.addEventListener('scroll', scrollHandler);
            this.playInitialFrames(150, 24, () => {
                if (!initialAnimationDone) {
                    initialAnimationDone = true;
                    window.removeEventListener('scroll', scrollHandler);
                    this.setupAnimation();
                }
            }, (timeoutId) => { playTimeout = timeoutId; }, () => this._stopInitialAnimation);
        };
    }

    playInitialFrames(frameLimit = 50, fps = 24, onComplete, onTimeout, shouldStop) {
        let frame = 0;
        const totalFrames = Math.min(frameLimit, this.frameCount);
        const interval = 10 / fps;
        const play = () => {
            if (shouldStop && shouldStop()) return;
            this.meta.frame = frame;
            this.render();
            frame++;
            if (frame < totalFrames) {
                const timeoutId = setTimeout(play, interval);
                if (onTimeout) onTimeout(timeoutId);
            } else {
                if (typeof onComplete === 'function') onComplete();
            }
        };
        play();
    }
}
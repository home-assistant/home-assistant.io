/**
 * Using FFMPEG, we can convert 3D rendered video frames into a sequence of images.
 * ffmpeg -c:v libvpx-vp9 -i {file.webm} -vf 'scale=1920:1080' -lossless 1 -c:v libwebp -y {output_dir}/frame-%03d.webp
 * 
 * Alternatively, use the script `process.sh` to automate the conversion.
 * e.g. `/workspaces/home-assistant.io/source/connect/zwa-2/source-video/process.sh ./hero.webm ../video-frames/hero`
 */

export class ZWA2RenderAnimation {
    frameCount = null;
    images = []; // sparse array: only buffered frames get Image objects
    meta = { frame: 0 }; // current frame metadata
    canvas = null;
    context = null;
    filename = null;
    sections = [];
    activeSection = 0;
    bufferBackward = 50; // frames to keep behind current
    bufferForward = 50;  // frames to keep ahead of current
    loadingFrames = new Set(); // track frames currently loading
    frameGap = 5; // Controls staggered frame loading order (1 = sequential). Change after instantiation if desired.
    smoothingFactor = 0.18; // LERP factor for scroll smoothing (0..1)
    targetFrame = 0; // desired frame from scroll
    _smoothingRaf = null;
    animatingScroll = false;

    currentFrame(index) {
        return `/connect/zwa-2/video-frames/${this.filename}/${(Math.floor(index + 1)).toString().padStart(3, '0')}.webp`;
    }

    /**
     * Ensure a single frame is loaded (idempotent / deduped).
     */
    ensureFrameLoaded(index) {
        if (index < 0 || index >= this.frameCount) return;
        if (this.images[index] && this.images[index].complete) return;
        if (this.loadingFrames.has(index)) return;
        this.loadingFrames.add(index);
        const img = new Image();
        img.fetchPriority = 'high'; // prioritize loading for smooth scroll animation
        img.src = this.currentFrame(index);
        img._frameIndex = index;
        img.onload = () => {
            this.loadingFrames.delete(index);
            // Re-render if this is the current frame
            if (this.meta.frame === index) {
                this.render();
            }
        };
        this.images[index] = img;
    }

    /**
     * Ensure buffer of frames around current frame are loaded.
     * Optionally skew forward (e.g., during autoplay) by passing forwardExtra.
     */
    ensureBufferLoaded(current, forwardExtra = 0) {
        const start = Math.max(0, current - this.bufferBackward);
        const end = Math.min(this.frameCount - 1, current + this.bufferForward + forwardExtra);
        const needsLoad = [];
        for (let i = start; i <= end; i++) {
            if (!(this.images[i] && this.images[i].complete) && !this.loadingFrames.has(i)) {
                needsLoad.push(i);
            }
        }
        if (!needsLoad.length) return;
        if (this.frameGap > 1) {
            const ordered = [];
            for (let offset = 0; offset < this.frameGap; offset++) {
                for (let f = start + offset; f <= end; f += this.frameGap) {
                    if (needsLoad.includes(f)) ordered.push(f);
                }
            }
            ordered.forEach(f => this.ensureFrameLoaded(f));
        } else {
            needsLoad.forEach(f => this.ensureFrameLoaded(f));
        }
    }

    /**
     * Initial image loading. Only load initial frame and its buffer.
     * If autoplayRange provided and current frame inside, we skew forward prefetch.
     */
    async loadImages(initialFrame, autoplayRange, onReady) {
        this.ensureFrameLoaded(initialFrame);
        // If we are going to autoplay, bias forward prefetch (no await needed)
        const forwardExtra = (autoplayRange && initialFrame >= autoplayRange.start && initialFrame <= autoplayRange.end) ? 20 : 0;
        this.ensureBufferLoaded(initialFrame, forwardExtra);
        if (onReady) onReady();
        this.render();
    }

    render() {
        if (!this.context) return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const frameIndex = Math.max(0, Math.min(this.frameCount - 1, Math.round(this.meta.frame)));
        let img = this.images[frameIndex];
        if (!img || !img.complete) {
            let closestImg = null;
            for (let offset = 1; offset < this.frameCount; offset++) {
                const prevIndex = frameIndex - offset;
                const nextIndex = frameIndex + offset;
                const prevImg = prevIndex >= 0 ? this.images[prevIndex] : null;
                const nextImg = nextIndex < this.frameCount ? this.images[nextIndex] : null;
                const prevReady = prevImg && prevImg.complete;
                const nextReady = nextImg && nextImg.complete;
                if (prevReady || nextReady) {
                    closestImg = nextReady ? nextImg : prevImg;
                    break;
                }
            }
            if (closestImg) img = closestImg; else img = this.images.find(im => im && im.complete) || null;
        }
        if (!img || !img.complete) return;
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

    setupSectionAnimations(initialFrame) {
        const autoplaySection = this.sections.find(s => s.autoplay);
        let autoplayActive = false;
        let autoplayEnd = autoplaySection?.autoplay?.end ?? null;
        let autoplayDuration = autoplaySection?.autoplay?.duration ?? 2000; // ms
        let autoplayRequest = null;
        let autoplayStartTime = null;
        const autoplayStart = autoplaySection?.autoplay?.start;

        const startAutoplay = () => {
            if (!autoplaySection) return;
            autoplayActive = true;
            autoplayStartTime = performance.now();
            this.meta.frame = autoplayStart;
            this.ensureBufferLoaded(this.meta.frame, 30); // prefetch ahead for smoothness
            this.render();
            autoplayRequest = requestAnimationFrame(autoplayStep);
        };

        const autoplayStep = (now) => {
            if (!autoplayActive) return;
            const elapsed = now - autoplayStartTime;
            const progress = Math.min(1, elapsed / autoplayDuration);
            const frame = Math.round(autoplayStart + progress * (autoplayEnd - autoplayStart));
            this.meta.frame = frame;
            this.ensureBufferLoaded(frame, 30);
            const status = this.computeBufferStatus(frame);
            this.render();
            if (progress < 1) {
                autoplayRequest = requestAnimationFrame(autoplayStep);
            } else {
                autoplayActive = false;
            }
        };

        const interruptAutoplay = () => {
            if (autoplayActive) {
                autoplayActive = false;
                if (autoplayRequest) cancelAnimationFrame(autoplayRequest);
            }
        };

        const wrapper = this.sections.length > 0 ? document.querySelector(this.sections[0].selector)?.closest('.animation-wrapper') : null;
        const triggerElem = wrapper || document.body;

        const getSectionData = () => this.sections.map(section => {
            const el = document.querySelector(section.selector);
            const top = el?.offsetTop || 0;
            const height = el?.offsetHeight || 0;
            return { ...section, el, top, height };
        });

        let sectionData = getSectionData();

        const computeFrameForScroll = (scrollY) => {
            let prev = sectionData[0];
            let next = sectionData[sectionData.length - 1];
            for (let i = 0; i < sectionData.length - 1; i++) {
                if (scrollY >= sectionData[i].top && scrollY < sectionData[i + 1].top) {
                    prev = sectionData[i];
                    next = sectionData[i + 1];
                    break;
                }
            }
            if (scrollY < sectionData[0].top) prev = next = sectionData[0];
            if (scrollY >= sectionData[sectionData.length - 1].top) prev = next = sectionData[sectionData.length - 1];
            let progress = 0;
            if (prev !== next) {
                progress = (scrollY - prev.top) / (next.top - prev.top);
                progress = Math.min(1, Math.max(0, progress));
            }
            return Math.floor(Math.round(prev.start + progress * (prev.end - prev.start)));
        };

        const handleScrollUpdate = () => {
            sectionData = getSectionData();
            interruptAutoplay();
            const baseOffset = (triggerElem === document.body ? 0 : triggerElem.getBoundingClientRect().top + window.scrollY);
            const scrollY = window.scrollY - baseOffset;
            const targetFrame = computeFrameForScroll(scrollY);
            if (targetFrame !== this.targetFrame) {
                this.targetFrame = targetFrame;
                this.ensureBufferLoaded(targetFrame);
                if (!this.animatingScroll) this.startScrollSmoothing();
            }
        };

        if (window.ScrollTrigger && window.ScrollTrigger.create) {
            window.ScrollTrigger.create({
                trigger: triggerElem,
                start: "top top",
                end: "bottom bottom",
                onUpdate: handleScrollUpdate,
            });
        } else {
            window.addEventListener('scroll', handleScrollUpdate, { passive: true });
        }

        this.meta.frame = initialFrame;
        this.targetFrame = initialFrame;
        this.ensureBufferLoaded(initialFrame);
        const initStatus = this.computeBufferStatus(initialFrame);
        this.render();

        window.addEventListener('resize', () => {
            sectionData = getSectionData();
            if (window.ScrollTrigger && window.ScrollTrigger.refresh) {
                window.ScrollTrigger.refresh();
            }
            this.ensureBufferLoaded(this.meta.frame);
        });

        if (autoplaySection && window.scrollY < 5) {
            startAutoplay();
        }
        if (window.ScrollTrigger && window.ScrollTrigger.refresh) {
            window.ScrollTrigger.refresh();
        }
        // Ensure initial scroll-derived target is set if user did not start at top.
        handleScrollUpdate();
    }

    computeBufferStatus(frame) {
        const maxAhead = Math.min(this.frameCount - 1, frame + this.bufferForward);
        const maxBehind = Math.max(0, frame - this.bufferBackward);
        let aheadLoaded = 0;
        for (let i = frame + 1; i <= maxAhead; i++) {
            const img = this.images[i];
            if (img && img.complete) aheadLoaded++; else break;
        }
        let behindLoaded = 0;
        for (let i = frame - 1; i >= maxBehind; i--) {
            const img = this.images[i];
            if (img && img.complete) behindLoaded++; else break;
        }
        return {
            aheadLoaded,
            behindLoaded,
            aheadRemaining: this.bufferForward - aheadLoaded,
            behindRemaining: this.bufferBackward - behindLoaded
        };
    }

    /**
     * @param {string} filename - The base filename for frames
     * @param {string} elem - Canvas selector
     * @param {Array} sections - Array of { selector, start, end } objects
     * @param {number} frames - Total frame count
     */
    constructor(filename, elem, sections, frames) {
        this.filename = filename;
        this.frameCount = frames;
        this.sections = sections;
        this.canvas = document.querySelector(elem);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        // Determine initial frame (first section start or 0)
        this._initialFrame = (sections[0] && typeof sections[0].start === 'number') ? sections[0].start : 0;
        this.meta.frame = this._initialFrame;
        this.targetFrame = this._initialFrame;
        // Load only the very first frame (no buffers / listeners yet)
        this.ensureFrameLoaded(this._initialFrame);
        this.render();
        this._started = false; // idempotent start flag
    }

    start() {
        document.addEventListener('scroll', this.doStart.bind(this), { once: true, passive: true });
        // all the other events, touchstart, mousemove, etc.
        document.addEventListener('touchmove', this.doStart.bind(this), { once: true, passive: true });
        document.addEventListener('touchstart', this.doStart.bind(this), { once: true, passive: true });
        document.addEventListener('mousemove', this.doStart.bind(this), { once: true, passive: true });
    }

    doStart() {
        if (this._started) return; // idempotent
        this._started = true;
        const autoplaySection = this.sections.find(s => s.autoplay);
        const autoplayRange = autoplaySection ? { start: autoplaySection.autoplay.start, end: autoplaySection.autoplay.end } : null;
        // Load remaining buffer & then set up scroll/section animations
        this.loadImages(this._initialFrame, autoplayRange, () => {
            this.setupSectionAnimations(this._initialFrame);
        });
    }

    startScrollSmoothing() {
        this.animatingScroll = true;
        const step = () => {
            const diff = this.targetFrame - this.meta.frame;
            if (Math.abs(diff) < 0.02) {
                this.meta.frame = this.targetFrame;
                this.animatingScroll = false;
                this.render();
                return;
            }
            this.meta.frame += diff * this.smoothingFactor;
            this.ensureBufferLoaded(Math.round(this.meta.frame));
            this.render();
            this._smoothingRaf = requestAnimationFrame(step);
        };
        step();
    }
}
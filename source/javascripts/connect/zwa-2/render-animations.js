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
    filename = null;
    sections = [];
    activeSection = 0;

    currentFrame(index) {
        return `/connect/zwa-2/video-frames/${this.filename}/${(index + 1).toString().padStart(3, '0')}.webp`;
    }

    async loadImages(onFirstLoaded, autoplayRange) {
        // Preallocate image array
        this.images = new Array(this.frameCount);

        // Helper to load a single image as a Promise
        const loadImageAsync = (index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = this.currentFrame(index);
                img._frameIndex = index;
                img.onload = () => {
                    // If the loaded frame is the current frame, re-render
                    if (this.meta.frame === index) {
                        this.render();
                    }
                    resolve(img);
                };
                this.images[index] = img;
            });
        };

        // Prioritize loading of autoplay frames
        let autoplayPromises = [];
        if (autoplayRange && typeof autoplayRange.start === 'number' && typeof autoplayRange.end === 'number') {
            for (let i = autoplayRange.start; i <= autoplayRange.end; i++) {
                autoplayPromises.push(loadImageAsync(i));
            }
        }
        // Wait for all autoplay frames to load before starting animation
        await Promise.all(autoplayPromises);
        if (onFirstLoaded) onFirstLoaded();
        this.render();

        // Load the rest of the frames in parallel (excluding already loaded)
        const restPromises = [];
        for (let i = 0; i < this.frameCount; i++) {
            if (!autoplayRange || i < autoplayRange.start || i > autoplayRange.end) {
                restPromises.push(loadImageAsync(i));
            }
        }
        Promise.all(restPromises);
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Use the correct frame for the current section
        let frame = this.meta.frame;
        // Clamp frame to valid range
        frame = Math.max(0, Math.min(this.frameCount - 1, frame));
        let img = this.images[frame];
        // If the frame is not loaded, use the previous loaded frame
        let fallbackFrame = frame;
        while ((!img || !img.complete) && fallbackFrame > 0) {
            fallbackFrame--;
            img = this.images[fallbackFrame];
        }
        // If still not loaded, use frame 0
        if (!img || !img.complete) {
            img = this.images[0];
        }
        if (!img) return; // nothing to draw
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

    setupSectionAnimations() {
        // Autoplay logic
        const autoplaySection = this.sections.find(s => s.autoplay);
        let autoplayActive = false;
        let autoplayFrame = autoplaySection?.autoplay?.start ?? null;
        let autoplayEnd = autoplaySection?.autoplay?.end ?? null;
        let autoplayDuration = autoplaySection?.autoplay?.duration ?? 2000; // ms
        let autoplayRequest = null;
        let autoplayStartTime = null;

        const startAutoplay = () => {
            if (!autoplaySection) return;
            autoplayActive = true;
            autoplayFrame = autoplaySection.autoplay.start;
            autoplayStartTime = performance.now();
            this.meta.frame = autoplayFrame;
            this.render();
            autoplayRequest = requestAnimationFrame(autoplayStep);
        };

        const autoplayStep = (now) => {
            if (!autoplayActive) return;
            const elapsed = now - autoplayStartTime;
            const totalFrames = autoplayEnd - autoplayFrame;
            const progress = Math.min(1, elapsed / autoplayDuration);
            const frame = Math.round(autoplaySection.autoplay.start + progress * (autoplayEnd - autoplaySection.autoplay.start));
            this.meta.frame = frame;
            this.render();
            if (progress < 1) {
                autoplayRequest = requestAnimationFrame(autoplayStep);
            } else {
                autoplayActive = false;
            }
        };

        // Interrupt autoplay on scroll and prioritize scroll frame loading
        const interruptAutoplay = () => {
            if (autoplayActive) {
                autoplayActive = false;
                if (autoplayRequest) cancelAnimationFrame(autoplayRequest);
                // Prioritize loading the current scroll frame if not loaded
                const frameToLoad = this.meta.frame;
                if (!this.images[frameToLoad] || !this.images[frameToLoad].complete) {
                    // Load the frame immediately
                    const img = new Image();
                    img.src = this.currentFrame(frameToLoad);
                    img._frameIndex = frameToLoad;
                    img.onload = () => {
                        if (this.meta.frame === frameToLoad) {
                            this.render();
                        }
                    };
                    this.images[frameToLoad] = img;
                }
            }
        };
        // Remove previous triggers if any
        if (window.ScrollTrigger && window.ScrollTrigger.getAll) {
            //window.ScrollTrigger.getAll().forEach(t => t.kill());
        }

        // Find the wrapper that contains all sections
        const wrapper = this.sections.length > 0 ? document.querySelector(this.sections[0].selector).closest('.animation-wrapper') : null;
        const triggerElem = wrapper || document.body;

        // Helper to recalculate section tops
        const getSectionData = () => this.sections.map(section => {
            const el = document.querySelector(section.selector);
            const top = el.offsetTop;
            const height = el.offsetHeight;
            return {
                ...section,
                el,
                top,
                height
            };
        });

        let sectionData = getSectionData();

        // Set up a single ScrollTrigger for the wrapper
        gsap.to(this.meta, {
            frame: this.frameCount - 1,
            ease: "none",
            scrollTrigger: {
                trigger: triggerElem,
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
                markers: true,
                onUpdate: self => {
                    sectionData = getSectionData();
                    interruptAutoplay();
                    const scrollY = window.scrollY - (triggerElem === document.body ? 0 : triggerElem.getBoundingClientRect().top + window.scrollY);
                    let prev = sectionData[0];
                    let next = sectionData[sectionData.length - 1];
                    for (let i = 0; i < sectionData.length - 1; i++) {
                        if (scrollY >= sectionData[i].top && scrollY < sectionData[i + 1].top) {
                            prev = sectionData[i];
                            next = sectionData[i + 1];
                            break;
                        }
                    }
                    if (scrollY < sectionData[0].top) {
                        prev = next = sectionData[0];
                    }
                    if (scrollY >= sectionData[sectionData.length - 1].top) {
                        prev = next = sectionData[sectionData.length - 1];
                    }
                    let progress = 0;
                    if (prev !== next) {
                        progress = (scrollY - prev.top) / (next.top - prev.top);
                        progress = Math.min(1, Math.max(0, progress));
                    }
                    const frame = Math.round(prev.start + progress * (prev.end - prev.start));
                    this.meta.frame = frame;
                    console.log(frame, sectionData[0].top, progress);
                    this.render();
                }
            },
        });

        // Listen for resize events to update sectionData and ScrollTrigger
        window.addEventListener('resize', () => {
            sectionData = getSectionData();
            if (window.ScrollTrigger && window.ScrollTrigger.refresh) {
                window.ScrollTrigger.refresh();
            }
        });

        // Initial render
        if (autoplaySection) {
            startAutoplay();
        } else {
            this.meta.frame = this.sections[0]?.start || 0;
            this.render();
        }
        if (window.ScrollTrigger && window.ScrollTrigger.refresh) {
            window.ScrollTrigger.refresh();
        }
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
        // Use async/await to ensure autoplay frames load before setup
        const autoplaySection = sections.find(s => s.autoplay);
        const autoplayRange = autoplaySection ? { start: autoplaySection.autoplay.start, end: autoplaySection.autoplay.end } : null;
        (async () => {
            await this.loadImages(() => {
                this.setupSectionAnimations();
            }, autoplayRange);
        })();
    }
}
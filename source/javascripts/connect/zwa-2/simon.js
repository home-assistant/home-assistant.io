export class Simon {
    // Pads: array of HTMLElements
    constructor(pads, options = {}) {
        if (!pads || !pads.length) throw new Error('Simon requires an array of pad elements');
        this.pads = Array.from(pads);
        this.level = 0;
        this.sequence = [];
        this.userProgress = 0;
        this.started = false;
        this.unlocked = false; // becomes true after each pad has been clicked at least once
        this.uniquePadClicks = new Set();
        this.highlightClass = options.highlightClass || 'simon-active';
        this.playbackDelay = options.playbackDelay || 300; // ms per pad highlight
        this.interPadDelay = options.interPadDelay || 200; // delay between pads during playback
        this.startDelay = options.startDelay || 500; // delay before first sequence playback
        this.onLevelChange = options.onLevelChange || function () { };
        this.onFail = options.onFail || function () { };
        this.onUnlock = options.onUnlock || function () { };
        this.onStart = options.onStart || function () { };

        // Web Audio
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = 0.1;
        this.masterGain.connect(this.audioCtx.destination);

        // Assign a stable unique random frequency to each pad
        this.padFrequencies = new Map();
        const usedFreqs = new Set();
        this.pads.forEach((pad, idx) => {
            let freq;
            let attempts = 0;
            do {
                freq = Simon.randomFrequency();
                attempts += 1;
            } while (usedFreqs.has(freq) && attempts < 50);

            if (usedFreqs.has(freq)) {
                // Fallback: deterministic spacing to guarantee uniqueness
                const min = 220;
                const max = 880;
                const span = max - min;
                freq = min + (span / (this.pads.length + 1)) * (idx + 1);
                freq = Math.round(freq * 100) / 100;
                while (usedFreqs.has(freq)) {
                    freq = Math.round((freq + 1) * 100) / 100; // tiny nudge until unique
                }
            }

            usedFreqs.add(freq);
            this.padFrequencies.set(pad, freq);
        });

        // Bind handlers
        this._boundPadHandler = (e) => this._handlePadClick(e.currentTarget);

        // Attach listeners
        this.pads.forEach((pad) => {
            pad.addEventListener('click', this._boundPadHandler);
            pad.style.cursor = 'pointer';
        });
    }

    static randomFrequency() {
        // Choose from musical-ish scale spread
        const min = 220; // A3
        const max = 880; // A5
        return Math.round((Math.random() * (max - min) + min) * 100) / 100;
    }

    _unlockCheck(pad) {
        if (this.unlocked) return;
        this.uniquePadClicks.add(pad);
        if (this.uniquePadClicks.size === this.pads.length) {
            this.unlocked = true;
            this.onUnlock();
            // Auto start after short delay
            setTimeout(() => this.start(), 400);
        }
    }

    start() {
        if (this.started || !this.unlocked) return;
        this.started = true;
        this.level = 0;
        this.sequence = [];
        this.onStart();
        this._nextLevel();
    }

    reset(full = false) {
        this.userProgress = 0;
        if (full) {
            this.started = false;
            this.level = 0;
            this.sequence = [];
            this.unlocked = false;
            this.uniquePadClicks.clear();
        }
    }

    _nextLevel() {
        this.level += 1;
        // Append a random pad to sequence, ensuring it is not the same as the previous one
        let pad;
        const last = this.sequence[this.sequence.length - 1];
        if (this.pads.length === 1) {
            pad = this.pads[0]; // Edge case: only one pad available
        } else {
            do {
                pad = this.pads[Math.floor(Math.random() * this.pads.length)];
            } while (last && pad === last);
        }
        this.sequence.push(pad);
        this.userProgress = 0;
        console.log(`[Simon] Level ${this.level}`);
        this.onLevelChange(this.level);
        setTimeout(() => this._playSequence(), this.startDelay);
    }

    async _playSequence() {
        this.acceptingInput = false;
        for (let i = 0; i < this.sequence.length; i++) {
            const pad = this.sequence[i];
            this._highlightPad(pad);
            await Simon.sleep(this.playbackDelay);
            this._unhighlightPad(pad);
            await Simon.sleep(this.interPadDelay);
        }
        this.acceptingInput = true;
    }

    _handlePadClick(pad) {
        // Always progress unlock until game started
        this._unlockCheck(pad);
        if (!this.started || !this.acceptingInput) return;

        const expectedPad = this.sequence[this.userProgress];
        this._flashAndTone(pad, 200);

        if (pad === expectedPad) {
            this.userProgress += 1;
            if (this.userProgress === this.sequence.length) {
                // Level complete
                this.acceptingInput = false;
                setTimeout(() => this._nextLevel(), 600);
            }
        } else {
            // Failure: simple feedback, restart from level 1 after short delay
            this.onFail(this.level);
            console.warn(`[Simon] Oops, you lost on level ${this.level}. Let's try again!`);
            this.acceptingInput = false;
            this._errorTone();
            setTimeout(() => {
                this.level = 0;
                this.sequence = [];
                this._nextLevel();
            }, 1200);
        }
    }

    _highlightPad(pad) {
        pad.classList.add(this.highlightClass);
        this._playToneForPad(pad, this.playbackDelay - 50);
    }

    _unhighlightPad(pad) {
        pad.classList.remove(this.highlightClass);
    }

    _flashAndTone(pad, duration) {
        pad.classList.add(this.highlightClass);
        this._playToneForPad(pad, duration - 30);
        setTimeout(() => this._unhighlightPad(pad), duration);
    }

    _playToneForPad(pad, duration) {
        const freq = this.padFrequencies.get(pad) || 440;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(this.masterGain);
        const now = this.audioCtx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + 0.01);
        gain.gain.linearRampToValueAtTime(0, now + duration / 1000);
        osc.start(now);
        osc.stop(now + duration / 1000 + 0.02);
    }

    _errorTone() {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(55, this.audioCtx.currentTime + 1);
        gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.5, this.audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 1.05);
    }

    destroy() {
        this.pads.forEach((pad) => pad.removeEventListener('click', this._boundPadHandler));
        if (this.audioCtx) this.audioCtx.close();
    }

    static sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }
}
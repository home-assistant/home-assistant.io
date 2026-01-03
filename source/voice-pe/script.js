// if scroll is greater than 100px, add class to body
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('scroll', checkIsScrolling);
    registerUserInteractionEvents();
    checkIsScrolling();
    addBodyLoaded();
    scrollIfFragment();
    registerNiceSelect();
    registerProductFeatureToggles();
    registerProductRotateButton();
    registerTimeline();
    registerETargets();
    registerFeatureImagePreload();
    registerControlsCableEntry();
    registerCarousels();
    registerVideoModal();
    registerBurgerIcon();
    registerCycleLocalCloud();
    registerLanguageSelectChange();
    registerFeatureCycle();
    registerFaqItems();
    registerLazySections();
});

function addBodyLoaded() {
    document.body.classList.add('js-ready');
    document.documentElement.style.scrollPaddingTop = '80px';
}

let languageSelect = null;
function registerNiceSelect() {
    languageSelect = NiceSelect.bind(document.querySelector("select#language-select"), { searchable: true });
}

function scrollIfFragment() {
    if (!window.location.hash) return;

    if (window.location.hash.startsWith('#faq-')) return;

    let elem = document.querySelector(window.location.hash);
    if (!elem) return;

    elem.scrollIntoView({ behavior: 'smooth' });
}

function registerUserInteractionEvents() {
    // on mousemove, touchmove, scroll
    document.addEventListener('mousemove', userInteract, { passive: true, once: true });
    document.addEventListener('touchmove', userInteract, { passive: true, once: true });
    document.addEventListener('scroll', userInteract, { passive: true, once: true });

    document.querySelectorAll('.nav-logo').forEach(logo => {
        logo.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, { passive: true });
    });

    // load any video[data-src] elements that are in view
    const lazyVideos = document.querySelectorAll('video[data-src]');
    if (lazyVideos) {
        lazyVideos.forEach(video => {
            if (video.getBoundingClientRect().top < window.innerHeight) {
                video.setAttribute('src', video.getAttribute('data-src'));
                video.removeAttribute('data-src');
            }
        });
    }
}

let interacted = false;
function userInteract() {
    if (interacted) return;
    interacted = true;

    const lazyVideos = document.querySelectorAll('video[data-src]');
    if (lazyVideos) {
        lazyVideos.forEach(video => {
            video.setAttribute('src', video.getAttribute('data-src'));
            video.removeAttribute('data-src');
        });
    }
}

let isPinned = false;
function checkIsScrolling() {
    let header = document.querySelector('.vpe-nav');
    if (window.scrollY > 80 && !isPinned) {
        header.classList.add('pinned');
        isPinned = true;
    } else if (window.scrollY <= 80 && isPinned) {
        header.classList.remove('pinned');
        isPinned = false;
    }
}

function registerProductFeatureToggles() {
    const buttons = document.querySelectorAll('#features .product-toggles .feature-toggle');
    if (!buttons) return;

    const elem = document.querySelector('#features .product');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // if active, remove class 
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                elem.setAttribute('data-feature', '');
                return;
            }

            // remove active class from all buttons
            buttons.forEach(b => b.classList.remove('active'));

            // add active class to clicked button
            button.classList.add('active');

            // set data-feature attribute to product
            elem.setAttribute('data-feature', button.getAttribute('data-feature'));
        });
    });
}

let eDepsloaded = false;
let eAudio;
let eDone = false;
function registerETargets() {
    document.querySelectorAll('.etarget').forEach(elem => {
        elem.addEventListener('click', function () {
            elem.classList.add('active');
            checkETargets();
        });
    });

    setTimeout(() => {
        if (eDone || eDepsloaded) return;
        console.log(decodeURIComponent(escape(atob('Tm8gZWFzdGVyIGVnZ3MgdG8gZmluZCBoZXJlIPCfmYo='))));
    }, 10000);
}

function checkETargets() {
    if (eDone) return;
    const targets = document.querySelectorAll('.etarget');
    const total = targets.length;
    let active = [...targets].filter(target => target.classList.contains('active')).length;

    if (active > 3 && !eDepsloaded) {
        eDepsloaded = true;
        console.log(decodeURIComponent(escape(atob('SGV5ISBTdG9wIGNsaWNraW5nIHRob3NlIGJ1dHRvbnMg8J+kqg=='))));
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js';
        document.body.appendChild(script);

        // audio
        eAudio = document.createElement('audio');
        eAudio.src = '/images/voice-pe/vpe-sound.mp3';
        eAudio.autoplay = false;
        eAudio.loop = false;
        eAudio.volume = .5;
        document.body.appendChild(eAudio);
    }

    if (active === total) {
        eDone = true;
        console.log(decodeURIComponent(escape(atob('QWxyaWdodCwgSSBsaWVkLCB0aGVyZSB3YXMgYW4gZWFzdGVyIGVnZy4uLiDwn5iF'))));
        confetti({ particleCount: 100, spread: 100, scalar: 1.5, startVelocity: 80, ticks: 100, angle: 50, origin: { y: 1, x: 0 }, colors: ["#00AEF8"] });
        setTimeout(() => {
            console.log(decodeURIComponent(escape(atob('QnV0IGNhbiB5b3UgZmluZCBhbm90aGVyIG9uZSBpbiBvdXIgVm9pY2UgUHJldmlldyBFZGl0aW9uPyDwn5iP'))));
            confetti({ particleCount: 100, spread: 100, scalar: 1.5, startVelocity: 80, ticks: 100, angle: 125, origin: { y: 1, x: 1 }, colors: ["#DB582E"] });
        }, 500);
        setTimeout(() => {
            console.log(decodeURIComponent(escape(atob('R29vZCBsdWNrIQ=='))));
            eAudio.play();
        }, 920);
        setTimeout(() => {
            console.log(decodeURIComponent(escape(atob('LURhcnJlbg=='))));
            confetti({ particleCount: 1000, spread: 360, scalar: 1.5, startVelocity: 150, ticks: 100, angle: 90, origin: { y: 1, x: .5 }, colors: ["#00AEF8", "#DB582E", "#16F3BE"] });
        }, 1000);
    }
}

function registerProductRotateButton() {
    const button = document.querySelector('#features .product .button');
    if (!button) return;

    const elem = document.querySelector('#features .product');

    button.addEventListener('click', function () {
        // toggle data-side between left and right
        elem.setAttribute('data-side', elem.getAttribute('data-side') === 'left' ? 'right' : 'left');

        // get first button on side
        const firstButton = elem.querySelector('.feature-toggle[data-side="' + elem.getAttribute('data-side') + '"]');
        if (firstButton) {
            // remove active class from all buttons
            elem.querySelectorAll('.product-toggles .feature-toggle').forEach(b => b.classList.remove('active'));

            // add active class to first button
            firstButton.classList.add('active');

            // set data-feature attribute to product
            elem.setAttribute('data-feature', firstButton.getAttribute('data-feature'));
        }
    });
}

function registerTimeline() {
    const timeline = document.querySelector('#timeline');
    if (!timeline) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timeline.setAttribute('data-event', '2');
            }
        });
    }, {
        threshold: .25
    });

    observer.observe(timeline);
}

function registerFeatureImagePreload() {
    // add intersection observer to #product-features. Only execute once
    const features = document.querySelector('#features');
    if (!features) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();

                preloadImage('/images/voice-pe/features/left-desktop.webp');
                preloadImage('/images/voice-pe/features/left-mobile.webp');
            }
        });
    }, {
        threshold: .25
    });

    observer.observe(features);
}

function registerControlsCableEntry() {
    // add intersection observer to #product-features. Only execute once
    const controls = document.querySelector('#controls');
    if (!controls) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();
                // remove loading="lazy" from all images
                controls.querySelectorAll('img').forEach(img => img.removeAttribute('loading'));
                controls.style.setProperty('--draw-cable', 1);
                setTimeout(() => {
                    registerControlCycle();
                }, 1000);
            }
        });
    }, {
        threshold: .5
    });

    observer.observe(controls);
}

function preloadImage(url) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;

    document.head.appendChild(link);
}

function registerControlCycle() {
    const controlsWrapper = document.querySelector('#controls');
    if (!controlsWrapper) return;

    const innerControlsWrapper = controlsWrapper.querySelector('.controls');
    if (!innerControlsWrapper) return

    const controls = innerControlsWrapper.querySelectorAll('.control');
    if (!controls) return;

    let currentIndex = 1;
    controlsWrapper.setAttribute('data-index', currentIndex);
    controls[currentIndex - 1].classList.add('last');
    // set data-index on controlsWrapper 
    setInterval(() => {
        currentIndex = currentIndex === controls.length ? 1 : currentIndex + 1;
        innerControlsWrapper.setAttribute('data-index', currentIndex);
        controlsWrapper.setAttribute('data-index', 0);
        setTimeout(() => {
            controls.forEach(control => control.classList.remove('last'));
            controls[currentIndex - 1].classList.add('last');
            controlsWrapper.setAttribute('data-index', currentIndex);
        }, 1000);
    }, 4000);

}

function registerCarousels() {
    // add intersection observer to #product-features. Only execute once
    const carousels = document.querySelectorAll('.carousel-images');
    if (!carousels) return;

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.slide');
        if (!slides) return;

        const controls = carousel.querySelector('.controls');
        if (controls) {
            controls.innerHTML = '<span></span>'.repeat(slides.length);
        }

        // allow controls to be clicked
        if (controls) {
            const controlSpans = controls.querySelectorAll('span');
            controlSpans.forEach((span, index) => {
                span.addEventListener('click', function () {
                    resetCarousel(carousel, index);
                });
            });
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    // set css variable for
                    resetCarousel(carousel);
                }
            });
        }, {
            threshold: .5
        });

        observer.observe(carousel);
    });
}

let carouselInterval = null;
function resetCarousel(carousel, slideIndex = 0) {
    clearInterval(carouselInterval);
    const slides = carousel.querySelectorAll('.slide');
    if (!slides) return;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    carousel.setAttribute('data-slide', slideIndex);

    carouselInterval = setInterval(() => {
        const currentIndex = parseInt(carousel.getAttribute('data-slide'));
        const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        carousel.setAttribute('data-slide', nextIndex);
    }, 2500);
}


function registerVideoModal() {
    const video = document.querySelector('.timeline-content .video');
    if (!video) return;


    const modal = document.querySelector('.video-modal');
    if (!modal) return;

    const previewVideoElem = video.querySelector('video');
    const modalVideoElem = modal.querySelector('video');

    const modalClose = modal.querySelector('.close');
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            handleVideoModalClose(previewVideoElem, modal, modalVideoElem);
        });
    }

    video.addEventListener('click', function () {
        handleVideoModalOpen(previewVideoElem, modal, modalVideoElem);
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            handleVideoModalClose(previewVideoElem, modal, modalVideoElem);
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            handleVideoModalClose(previewVideoElem, modal, modalVideoElem);
        }
    });
}

function handleVideoModalOpen(previewVideoElem, modal, modalVideoElem) {
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    document.documentElement.style.overflow = "hidden";
    previewVideoElem.pause();
    modalVideoElem.controls = true;
    modalVideoElem.currentTime = 0;
    modalVideoElem.muted = false;
    modalVideoElem.play();
}
function handleVideoModalClose(previewVideoElem, modal, modalVideoElem) {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    document.documentElement.style.overflow = "";
    modalVideoElem.controls = false;
    modalVideoElem.pause();
    previewVideoElem.play();
}

function registerBurgerIcon() {
    const burger = document.querySelector('.burger');
    if (!burger) return;

    const nav = document.querySelector('.vpe-nav');
    if (!nav) return;

    burger.addEventListener('click', function () {
        nav.classList.toggle('mobile-open');
    });

    // if any of the burger links are clicked, close the nav
    const links = nav.querySelectorAll('a');
    if (!links) return;

    links.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('mobile-open');
        });
    });
}

function registerCycleLocalCloud() {
    // add intersection observer to #product-features. Only execute once
    const sides = document.querySelector('#local-cloud .sides');
    if (!sides) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();
                // set css variable for
                let lastSide = 'cloud';
                let interval = null;
                interval = setInterval(() => {
                    // toggle between data-side="local" and data-side="cloud"
                    sides.setAttribute('data-side', '');
                    setTimeout(() => {
                        lastSide = lastSide === 'local' ? 'cloud' : 'local';
                        sides.setAttribute('data-side', lastSide);
                    }, 500);
                }, 5000);

                // if hover on left side, set to local
                sides.querySelector('.side.local').addEventListener('mouseenter', function () {
                    clearInterval(interval);
                    sides.setAttribute('data-side', 'local');
                });

                // if hover on right side, set to cloud
                sides.querySelector('.side.cloud').addEventListener('mouseenter', function () {
                    clearInterval(interval);
                    sides.setAttribute('data-side', 'cloud');
                });
            }
        });
    }, {
        threshold: .5
    });

    observer.observe(sides);
}

function registerLanguageSelectChange() {
    const browserLocale = navigator.language || navigator.userLanguage;

    updateLanguageSupports(browserLocale);

    document.querySelector('#language-select').addEventListener('change', function (e) {
        updateLanguageSupports(e.target.value);
    });
}

function updateLanguageSupports(locale = null) {
    let data = {
        "en-US": [3, 3],
        "es-ES": [3, 3],
        "pt-BR": [3, 3],
        "pt-PT": [2, 2],
        "de-DE": [3, 3],
        "de-CH": [0, 2],
        "it-IT": [2, 2],
        "ru-RU": [2, 2],
        "ja-JP": [0, 0],
        "tr-TR": [0, 1],
        "ko-KR": [0, 1],
        "fr-FR": [0, 3],
        "ca-ES": [0, 3],
        "pl-PL": [0, 3],
        "nl-BE": [0, 3],
        "nl-NL": [0, 3],
        "id-ID": [0, 1],
        "zh-HK": [0, 2],
        "zh-CN": [0, 1],
        "ms-MY": [0, 1],
        "sv-SE": [0, 2],
        "uk-UA": [0, 2],
        "th-TH": [0, 1],
        "vi-VN": [0, 1],
        "fi-FI": [0, 3],
        "no-NO": [0, 0],
        "gl-ES": [0, 2],
        "ar-JO": [0, 2],
        "ur-IN": [0, 0],
        "el-GR": [0, 1],
        "ro-RO": [0, 3],
        "da-DK": [0, 2],
        "ta-IN": [0, 0],
        "hr-HR": [0, 3],
        "mk-MK": [0, 0],
        "sk-SK": [0, 1],
        "he-IL": [0, 2],
        "sr-RS": [0, 1],
        "hu-HU": [0, 3],
        "bg-BG": [0, 2],
        "cs-CZ": [0, 1],
        "bs-BA": [0, 0],
        "sl-SI": [0, 2],
        "az-AZ": [0, 0],
        "et-EE": [0, 1],
        "lv-LV": [0, 1],
        "af-ZA": [0, 0],
        "cy-GB": [0, 0],
        "fa-IR": [0, 1],
        "lt-LT": [0, 1],
        "jv-ID": [0, 0],
        "sw-KE": [0, 0],
        "sw-TZ": [0, 0],
        "is-IS": [0, 1],
        "mt-MT": [0, 0],
        "ps-AF": [0, 0],
        "mr-IN": [0, 0],
        "bn-IN": [0, 0],
        "lb-LU": [0, 0],
        "hi-IN": [0, 0],
        "gu-IN": [0, 0],
        "km-KH": [0, 0],
        "ne-NP": [0, 0],
        "lo-LA": [0, 0],
        "te-IN": [0, 1],
        "kn-IN": [0, 0],
        "ml-IN": [0, 1],
        "kk-KZ": [0, 0],
        "so-SO": [0, 0],
        "uz-UZ": [0, 0],
        "ka-GE": [0, 1],
        "my-MM": [0, 0],
        "mn-MN": [0, 0],
        "hy-AM": [0, 0],
        "am-ET": [0, 0],
        "nb-NO": [0, 3],
        "eu-ES": [0, 1],
        "fil-PH": [0, 0],
        "ga-IE": [0, 0],
        "si-LK": [0, 0],
        "sq-AL": [0, 0],
        "su-ID": [0, 0],
        "wuu-CN": [0, 0],
        "yue-CN": [0, 0],
        "zu-ZA": [0, 0]
    };

    let elems = document.querySelectorAll('.supported-cards .supported-card');
    if (!elems) return;

    let supports = data[locale];
    let foundLocale = locale;
    if (!supports) {
        Object.keys(data).forEach(key => {
            if (key.split('-')[0] === locale.split('-')[0]) {
                supports = data[key];
                foundLocale = key;
            }
        });
    }
    if (!supports) return;

    document.querySelector('#language-select').value = foundLocale;
    languageSelect.update();

    elems.forEach(elem => elem.setAttribute('data-state', '-1'));

    elems.forEach((elem, index) => {
        // set data-state to the value of the value
        elem.setAttribute('data-state', supports[index]);
    });

}

function registerFeatureCycle() {
    const featuresElem = document.querySelector('#features');
    const rotateBtn = document.querySelector('#features .button');
    const features = document.querySelectorAll('#features .feature-toggle');

    let interval = null;
    rotateBtn.addEventListener('click', function () {
        if (interval) {
            clearInterval(interval);
            interval = null;
            return;
        }
    });
    features.forEach((feature, index) => {
        feature.addEventListener('click', function () {
            if (interval) {
                clearInterval(interval);
                interval = null;
                return;
            }
        });
    });

    let availableStates = [
        ["microphones", "right"],
        ["case", "right"],
        ["mute", "right"],
        ["speaker", "right"],
        ["controls", "left"],
        ["led-ring", "left"],
        ["audio-jack", "left"]
    ]

    let currentIndex = 0;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();
                // set css variable for
                interval = setInterval(() => {
                    currentIndex = currentIndex === availableStates.length - 1 ? 0 : currentIndex + 1;
                    let state = availableStates[currentIndex];
                    document.querySelector('#features .product').setAttribute('data-feature', state[0]);
                    document.querySelector('#features .product').setAttribute('data-side', state[1]);
                    document.querySelectorAll('#features .product-toggles .feature-toggle').forEach(feature => {
                        feature.classList.remove('active');
                    });
                    document.querySelector('#features .product-toggles .feature-toggle[data-feature="' + state[0] + '"]').classList.add('active');
                }, 5000);
            }
        });
    }, {
        threshold: .5
    });

    observer.observe(featuresElem);
}

function registerFaqItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems) return;

    faqItems.forEach(faqItem => {
        let header = faqItem.querySelector('.faq-item-heading');
        header.addEventListener('click', function () {
            faqItem.classList.toggle('active');
        });
    });

    //  if url contains id of faq item, open it
    faqItems.forEach(faqItem => {
        if (!faqItem.id) return;

        if (window.location.hash === '#' + faqItem.id) {
            faqItem.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                faqItem.classList.add('active');
            }, 1000);
        }

        document.querySelectorAll('a[href="#' + faqItem.id + '"]').forEach(link => {
            link.addEventListener('click', function () {
                faqItem.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    faqItem.classList.add('active');
                }, 1000);
            });
        });
    });

}

function showBuyDialog() {
    buyDialog.style.display = "flex";
    document.documentElement.style.overflow = "hidden";
}

function closeDialog() {
    buyDialog.style.display = "none";
    document.documentElement.style.overflow = "";
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function registerLazySections() {
    // for each section, register an intersection observer at 0.0. If it is intersecting, disconnect. Then, make any data-src images load
    const sections = document.querySelectorAll('.vpe-main section');
    if (!sections) return;

    sections.forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    loadLazyImages(section);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '80px'
        });

        observer.observe(section);
    });
}

function loadLazyImages(section) {
    const lazyImages = section.querySelectorAll('img[data-src]');
    if (!lazyImages) return;

    lazyImages.forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
    });

    let lazyBackgrounds = section.querySelectorAll('[data-bg-image-lazy]');
    if (!lazyBackgrounds) return;

    lazyBackgrounds.forEach(lazyBackground => {
        // remove the attribute
        lazyBackground.removeAttribute('data-bg-image-lazy');
    });
}
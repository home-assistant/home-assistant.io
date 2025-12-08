let observer;

function createObserver(elements) {

    let options = {
        threshold: [.3, .9],
    };

    observer = new IntersectionObserver(handleIntersect, options);
    elements.forEach((el) => {
        observer.observe(el);
    });
}

function handleIntersect(entries, _observer) {
    entries.forEach((entry) => {
        const threshold = entry.target.dataset.threshold || 0;
        if (entry.intersectionRatio >= Number(threshold)) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}

const expandRegion = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const continent = tz.replace( /^(Asia|America|Australia|Europe)\/.*$/, '$1' );

    if ( continent != tz ) {
      document.querySelector( `#dist_${continent.toLowerCase()}` ).open = true;
    }
  } catch ( ev ) {
    // Ignore...
  }
};

window.addEventListener(
    "load",
    () => {
        const elements = document.querySelectorAll(".animate-in");

        if ("IntersectionObserver" in window) {
            createObserver(elements);
        } else {
            elements.forEach((el) => {
                el.classList.add("show");
            });
        }

        const faqLinks = document.querySelectorAll(".faq-link");
        faqLinks.forEach((link) =>
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const container = link.nextElementSibling;
                const icon = link.querySelector(".faq-icon");
                if (container.classList.contains("open")) {
                    container.classList.remove("open");
                    icon.classList.remove("open");
                } else {
                    container.classList.add("open");
                    icon.classList.add("open");
                }
            })
        );

        const wrappernav = document.querySelector(".wrappernav");
        if (document.documentElement.scrollTop > 68) {
            wrappernav.classList.add("scrolled");
        }
        window.addEventListener(
            "scroll",
            () => {
                if (document.documentElement.scrollTop > 68) {
                    wrappernav.classList.add("scrolled");
                } else {
                    wrappernav.classList.remove("scrolled");
                }
            },
            { passive: true }
        );

        expandRegion();
    },
    false
);

const menuMobileBtn = document.getElementById("open-mobile-menu");
const mobileMenu = document.querySelector(".w-nav-overlay");
const mobileMenuLinks = document.querySelectorAll(".w-nav-overlay a");

menuMobileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
        menuMobileBtn.classList.remove("open");
    } else {
        mobileMenu.classList.add("open");
        menuMobileBtn.classList.add("open");
    }
});

mobileMenuLinks.forEach((link) =>
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuMobileBtn.classList.remove("open");
    })
);

const rendering = document.querySelector(".exploded-view-rendered");
rendering.addEventListener("animationend", () => {
    rendering.style.opacity = 1;
    observer.unobserve(rendering.parentElement);
    rendering.parentElement.classList.add("show");
    document.querySelectorAll(".exploded-part").forEach((part) => {
        part.remove();
    });
}, {once: true});
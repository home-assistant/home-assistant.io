(function () {
  "use strict";

  const imageSelector = "article.page img, article.post img";
  const lightboxVersion = "5.4.4";
  const lightboxImagePath = `/javascripts/photoswipe/photoswipe.esm.min.js?v=${lightboxVersion}`;
  const lightboxUiPath = `/javascripts/photoswipe/photoswipe-lightbox.esm.min.js?v=${lightboxVersion}`;
  const minDisplayWidth = 160;
  const minDisplayHeight = 100;
  const minNaturalSize = 300;
  const maxZoomedImageWidth = 3000;
  const secondaryZoomScale = 2;
  const maxZoomScale = 3;

  const brandLogoSelector = [
    ".brand-logo-container",
    ".brand-logo",
    ".company-logo",
    ".image-brand",
    ".logos",
    ".logo-wrap-ticker",
    ".nav-logo",
    ".ha-buy-dialog-distributor-logo",
    "[class*='brand-logo']",
    "[class*='company-logo']",
    "[class*='partner-logo']",
  ].join(", ");

  let lightboxPromise;

  function getImageSource(image) {
    return image.currentSrc || image.src || image.getAttribute("src") || "";
  }

  function getImagePath(image) {
    const src = getImageSource(image);

    try {
      return new URL(src, window.location.href).pathname.toLowerCase();
    } catch (_err) {
      return src.toLowerCase();
    }
  }

  function isSmallInlineImage(image) {
    const rect = image.getBoundingClientRect();
    const naturalWidth = image.naturalWidth || Number(image.getAttribute("width"));
    const naturalHeight = image.naturalHeight || Number(image.getAttribute("height"));

    if (rect.width >= minDisplayWidth && rect.height >= minDisplayHeight) {
      return false;
    }

    if (naturalWidth >= minNaturalSize || naturalHeight >= minNaturalSize) {
      return false;
    }

    return true;
  }

  function isBrandLogoImage(image) {
    const src = getImageSource(image).toLowerCase();
    const path = getImagePath(image);
    const alt = (image.getAttribute("alt") || "").toLowerCase();

    return Boolean(
      image.matches(brandLogoSelector) ||
      image.closest(brandLogoSelector) ||
      src.includes("brands.home-assistant.io") ||
      path.includes("/images/supported_brands/") ||
      path.includes("/logos/") ||
      /(?:^|[-_/])(logo|logos|brand|brands|wordmark)(?:[-_.\/]|$)/i.test(
        path
      ) ||
      /\blogo(s)?\b|\bwordmark\b/.test(alt)
    );
  }

  function isEligibleImage(image) {
    const src = getImageSource(image);

    return Boolean(
      src &&
      image.naturalWidth &&
      image.naturalHeight &&
      !image.closest("a, button") &&
      !image.closest(".no-lightbox, [data-no-lightbox]") &&
      !src.match(/\.svg(?:$|[?#])/i) &&
      !isBrandLogoImage(image) &&
      !isSmallInlineImage(image)
    );
  }

  function makeImageInteractive(image) {
    if (!isEligibleImage(image) || image.dataset.lightboxImage === "true") {
      return;
    }

    const alt = image.getAttribute("alt");
    image.dataset.lightboxImage = "true";
    image.setAttribute("role", "button");
    image.setAttribute("aria-haspopup", "dialog");
    image.setAttribute(
      "aria-label",
      alt ? `Open image: ${alt}` : "Open image"
    );

    if (!image.hasAttribute("tabindex")) {
      image.tabIndex = 0;
    }

    image.addEventListener("click", handleImageClick);
    image.addEventListener("keydown", handleImageKeydown);
  }

  function prepareImages() {
    document.querySelectorAll(imageSelector).forEach((image) => {
      if (image.complete) {
        makeImageInteractive(image);
        return;
      }

      image.addEventListener("load", () => makeImageInteractive(image), {
        once: true,
      });
    });
  }

  function getInteractiveImages() {
    return Array.from(
      document.querySelectorAll("img[data-lightbox-image='true']")
    );
  }

  function getLightboxItems(images) {
    return images.map((image) => ({
      src: getImageSource(image),
      srcset: image.getAttribute("srcset") || undefined,
      width: image.naturalWidth,
      height: image.naturalHeight,
      msrc: getImageSource(image),
      alt: image.getAttribute("alt") || "",
      element: image,
    }));
  }

  function getZoomLevel(zoomLevelObject, scale) {
    const imageWidth = zoomLevelObject.elementSize.x;
    const cappedScale = imageWidth
      ? Math.min(scale, maxZoomedImageWidth / imageWidth)
      : scale;

    return Math.max(zoomLevelObject.fit, cappedScale);
  }

  function resetLightboxPromise(error) {
    lightboxPromise = undefined;
    throw error;
  }

  function importPhotoSwipe() {
    return import(lightboxImagePath).catch(resetLightboxPromise);
  }

  function getLightbox() {
    if (!lightboxPromise) {
      lightboxPromise = import(lightboxUiPath)
        .then((module) => {
          const PhotoSwipeLightbox = module.default;
          const prefersReducedMotion =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          const lightbox = new PhotoSwipeLightbox({
            pswpModule: importPhotoSwipe,
            bgOpacity: 0.88,
            closeTitle: "Close image viewer",
            zoomTitle: "Zoom image",
            arrowPrevTitle: "Previous image",
            arrowNextTitle: "Next image",
            errorMsg: "The image could not be loaded.",
            trapFocus: true,
            returnFocus: true,
            ...(prefersReducedMotion
              ? {
                  showHideAnimationType: "none",
                  showAnimationDuration: 0,
                  hideAnimationDuration: 0,
                  zoomAnimationDuration: 0,
                }
              : {}),
            secondaryZoomLevel: (zoomLevelObject) =>
              getZoomLevel(zoomLevelObject, secondaryZoomScale),
            maxZoomLevel: (zoomLevelObject) =>
              getZoomLevel(zoomLevelObject, maxZoomScale),
            imageClickAction: "zoom",
            tapAction: "toggle-controls",
            doubleTapAction: "zoom",
          });

          lightbox.on("uiRegister", () => {
            lightbox.pswp.element.setAttribute("aria-label", "Image viewer");
          });

          return lightbox;
        })
        .catch(resetLightboxPromise);
    }

    return lightboxPromise;
  }

  function getInitialPoint(event) {
    if (event.clientX || event.clientY) {
      return {
        x: event.clientX,
        y: event.clientY,
      };
    }

    return null;
  }

  function openImage(image, event) {
    const images = getInteractiveImages();
    const index = images.indexOf(image);

    if (index === -1) {
      return;
    }

    event.preventDefault();

    getLightbox().then((lightbox) => {
      lightbox.loadAndOpen(
        index,
        getLightboxItems(images),
        getInitialPoint(event)
      );
    });
  }

  function handleImageClick(event) {
    openImage(event.currentTarget, event);
  }

  function handleImageKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    openImage(event.currentTarget, event);
  }

  prepareImages();
})();

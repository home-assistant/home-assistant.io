// Starts the live card demos of source/_includes/dashboard/demo.html.
//
// The script of the Home Assistant demo loads with the page, see
// source/_includes/javascripts/scripts.html. Each demo keeps its height with a
// placeholder until it is in view, then adds its cards from its template, so
// animations, like the needle of a gauge, play where they can be seen.
// See https://contributors.home-assistant.io/frontend/custom-ui/demo/
(() => {
  const SECTION_COLUMNS = 12;

  const figures = document.querySelectorAll("figure.dashboard-demo.pending");

  if (figures.length === 0) {
    return;
  }

  // Shows the screenshot of the demo instead of its cards, when it has one.
  const showFallback = (figure) => {
    if (figure.querySelector(".dashboard-demo-fallback")) {
      figure.classList.add("show-fallback");
    }
  };

  // Every element in a card, through the shadow roots of its elements.
  const deepElements = (root) =>
    [...root.querySelectorAll("*")].flatMap((element) =>
      element.shadowRoot
        ? [element, ...deepElements(element.shadowRoot)]
        : [element]
    );

  // Waits until the elements of a card have finished rendering. Rendering
  // can add elements, like the features of a tile card, so wait until no
  // new ones turn up.
  const settle = async (root) => {
    let count = -1;

    for (let round = 0; round < 10; round++) {
      const elements = deepElements(root).filter(
        (element) => element.updateComplete
      );

      if (elements.length === count) {
        return;
      }
      count = elements.length;
      await Promise.all(elements.map((element) => element.updateComplete));
    }
  };

  // A card or card feature the released demo doesn't know yet, like one new
  // in the next release, renders as an error card. A card feature that needs
  // something the released demo can't give it yet renders nothing.
  const cannotShow = (root) =>
    deepElements(root).some(
      (element) =>
        element.localName === "hui-error-card" ||
        (element.localName === "hui-card-feature" &&
          element.getBoundingClientRect().height === 0)
    );

  const checkErrors = async (figure, cards) => {
    for (const card of cards) {
      if (!card.shadowRoot) {
        continue;
      }
      await settle(card.shadowRoot);
      if (cannotShow(card.shadowRoot)) {
        showFallback(figure);
        return;
      }
    }
  };

  // Each card sets the columns it takes in a section as `--column-size`.
  // When all cards fit in one row, the section narrows to that row, so the
  // row sits in the middle.
  const fitSection = (section, cards) => {
    const columns = [...cards]
      .filter((card) => !card.hidden)
      .map((card) =>
        card.hasAttribute("full-width")
          ? SECTION_COLUMNS
          : Number(card.style.getPropertyValue("--column-size")) ||
            SECTION_COLUMNS
      );
    const total = columns.reduce((sum, column) => sum + column, 0);

    section.style.setProperty(
      "--columns",
      String(Math.min(Math.max(total, 1), SECTION_COLUMNS))
    );
  };

  // Adds the cards of the demo to the page, and follows their size. A card
  // sets its size each time it has rendered, so check it then.
  const activate = (figure) => {
    const template = figure.querySelector("template.dashboard-demo-template");

    template.replaceWith(template.content.cloneNode(true));
    figure.classList.remove("pending");

    const section = figure.querySelector(".dashboard-demo-section");
    const cards = section.querySelectorAll(":scope > ha-embed-card");
    const hasFallback = Boolean(
      figure.querySelector(".dashboard-demo-fallback")
    );
    const check = () => {
      fitSection(section, cards);
      if (hasFallback) {
        checkErrors(figure, cards);
      }
    };
    const cardObserver = new MutationObserver(check);

    for (const card of cards) {
      cardObserver.observe(card, {
        attributes: true,
        attributeFilter: ["style", "hidden", "full-width"],
      });
    }
    check();
  };

  // The script of the demo tells the page when it fails to load.
  const showAllFallbacks = () => figures.forEach(showFallback);

  if (window.dashboardDemoFailed) {
    showAllFallbacks();
    return;
  }
  document.addEventListener("dashboard-demo-failed", showAllFallbacks, {
    once: true,
  });

  const demoReady = customElements.whenDefined("ha-embed-card");

  // Starts each demo once it is in view.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        observer.unobserve(entry.target);
        demoReady.then(() => activate(entry.target));
      }
    },
    { threshold: 0.25 }
  );

  for (const figure of figures) {
    observer.observe(figure);
  }
})();

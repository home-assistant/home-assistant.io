// Starts the live demos of source/_includes/dashboard/demo.html: cards, or a
// section, view or dashboard.
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
  // sets its size each time it has rendered. A section, view or dashboard
  // lays out its own cards.
  const activate = (figure) => {
    const template = figure.querySelector("template.dashboard-demo-template");

    template.replaceWith(template.content.cloneNode(true));
    figure.classList.remove("pending");

    // A view renders once it has its configuration and cards, so the figure
    // keeps the height of its placeholder until the view has a height.
    if (figure.dataset.kind === "view") {
      const content = figure.querySelector(".dashboard-demo-content");
      const viewObserver = new ResizeObserver(() => {
        if (content.getBoundingClientRect().height > 0) {
          figure.classList.add("rendered");
          viewObserver.disconnect();
        }
      });

      viewObserver.observe(content);
    }

    const section = figure.querySelector(".dashboard-demo-section");

    if (!section) {
      return;
    }

    const cards = section.querySelectorAll(":scope > ha-embed-card");
    const cardObserver = new MutationObserver(() =>
      fitSection(section, cards)
    );

    for (const card of cards) {
      cardObserver.observe(card, {
        attributes: true,
        attributeFilter: ["style", "hidden", "full-width"],
      });
    }
    fitSection(section, cards);
  };

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

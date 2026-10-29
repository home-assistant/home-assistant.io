const dialog = document.querySelector("[data-asset-generator-dialog]");
const openButtons = document.querySelectorAll("[data-asset-generator-open]");
const loadingEl = document.querySelector("[data-asset-generator-loading]");

if (dialog) {
  let generator = null;
  let loading = null;

  async function loadGenerator() {
    if (generator) return generator;
    if (!loading) {
      const version = dialog.dataset.assetGeneratorVersion || "";
      loading = import(`./app.js${version ? `?${version}` : ""}`)
        .then(async (module) => {
          await module.init(dialog);
          generator = module;
          if (loadingEl) loadingEl.hidden = true;
          return module;
        })
        .catch((err) => {
          console.error("Could not load the asset generator", err);
          if (loadingEl) {
            loadingEl.textContent = "The generator could not be loaded. Please reload the page.";
          }
          loading = null;
          throw err;
        });
    }
    return loading;
  }

  function setHash(on) {
    if (!dialog.id) return;
    const linked = location.hash === `#${dialog.id}`;
    if (on === linked) return;
    history.replaceState(null, "", on ? `#${dialog.id}` : location.pathname + location.search);
  }

  async function openDialog() {
    if (dialog.open) return;
    dialog.showModal();
    setHash(true);
    document.documentElement.classList.add("has-open-dialog");
    try {
      const module = await loadGenerator();

      module.refresh();
    } catch {
    }
  }

  for (const button of openButtons) {
    button.addEventListener("click", openDialog);
  }

  dialog.querySelector("[data-asset-generator-close]")
    ?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    setHash(false);
    document.documentElement.classList.remove("has-open-dialog");
  });

  function openIfLinked() {
    if (dialog.id && location.hash === `#${dialog.id}` && !dialog.open) openDialog();
  }

  openIfLinked();
  window.addEventListener("hashchange", openIfLinked);
}

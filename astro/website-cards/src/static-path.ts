// Imported before anything else, because some modules read the static path
// while they load. The bundle's public path is resolved at runtime from the
// entry script's URL, and the static assets sit next to it.
declare let __webpack_public_path__: string;

(globalThis as any).__HA_WEBSITE_CARDS_STATIC__ =
  `${__webpack_public_path__}../static/`;

// Renders the community meetups on a Leaflet map. Both the events and
// Leaflet itself are already on the page: the events as a build-time JSON
// blob, Leaflet from the CDN script tags on the community page.
//
// The events come from two Luma calendars (see the meetups_data task in the
// Rakefile): the regular Home Assistant meetups and the Open Home Foundation
// Community Day. Each calendar gets its own marker colour and layer, so the
// filter above the map can show one or both.
(function () {
  const mapContainer = document.getElementById("meetup-map");
  const eventsDataEl = document.getElementById("meetup-map-events");
  const filter = document.querySelector("[data-map-filter]");

  if (!mapContainer || !eventsDataEl || typeof L === "undefined") {
    return;
  }

  const CALENDARS = ["home-assistant-meetups", "ohf-community-day"];

  // Anything longer than this is not an address line but a note from the
  // host (directions, parking tips), so it is left out of the place line.
  const MAX_ADDRESS_LINE_LENGTH = 80;

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const events = JSON.parse(eventsDataEl.textContent).map((event) => {
    const address = Array.isArray(event.address) ? event.address : [];
    // The first line is the venue and becomes the title, so the place line
    // uses the last two lines, never repeating the title on its own.
    const place = address
      .slice(1)
      .filter((line) => line.length <= MAX_ADDRESS_LINE_LENGTH)
      .slice(-2);

    return {
      calendar: CALENDARS.includes(event.calendar) ? event.calendar : CALENDARS[0],
      title: address[0] || event.summary,
      starts: timeFormatter.format(new Date(event.start)),
      location: place.length > 0 ? place.join(", ") : null,
      url: event.url,
      lat: event.latitude,
      lng: event.longitude,
    };
  });

  const map = L.map(mapContainer, {
    // Added manually below, positioned bottom-right instead of Leaflet's
    // default top-left.
    zoomControl: false,
    gestureHandling: true,
    // Without this, dragging far enough lets you pan into a repeated copy
    // of the world - the tile layer wraps by default, but markers only
    // ever render at their real coordinates, so the repeated copy looks
    // empty. maxBoundsViscosity: 1 makes this a hard stop rather than a
    // rubber-band overshoot.
    maxBounds: [
      [-90, -180],
      [90, 180],
    ],
    maxBoundsViscosity: 1.0,
    // Fractional zoom levels, so the world can be scaled to exactly fill
    // the container (see worldZoom) instead of snapping to a whole level
    // that leaves grey bands at the edges.
    zoomSnap: 0,
    center: [20, 0],
    zoom: 2,
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);

  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    // Stops the tile layer itself from rendering repeated copies of the
    // world at low zoom levels, independent of the panning limit above.
    noWrap: true,
  }).addTo(map);

  const markerIcons = Object.fromEntries(
    CALENDARS.map((calendar) => [
      calendar,
      L.divIcon({
        className: `map-marker ${calendar}`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    ])
  );

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function createDetailList(pairs) {
    const dl = document.createElement("dl");
    for (const [term, description] of pairs) {
      const row = document.createElement("div");

      const dt = document.createElement("dt");
      dt.className = slugify(term);
      const dtLabel = document.createElement("span");
      dtLabel.textContent = term;
      dt.appendChild(dtLabel);

      const dd = document.createElement("dd");
      dd.textContent = description;

      row.append(dt, dd);
      dl.appendChild(row);
    }
    return dl;
  }

  function buildPopupContent(event) {
    const wrapper = document.createElement("div");
    wrapper.className = "event-popup";

    const title = document.createElement("h4");
    title.textContent = event.title;
    wrapper.appendChild(title);

    wrapper.appendChild(
      createDetailList([
        ["Starts", event.starts],
        ["Location", event.location || "Register for details"],
      ])
    );

    const link = document.createElement("a");
    link.className = "button secondary";
    link.href = event.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Join the event";
    wrapper.appendChild(link);

    return wrapper;
  }

  // One layer group per calendar, so the filter can add or remove a whole
  // calendar at once. The coordinates are kept alongside to fit the view to
  // whatever is currently shown.
  const layers = Object.fromEntries(CALENDARS.map((calendar) => [calendar, L.layerGroup().addTo(map)]));
  const coordinates = Object.fromEntries(CALENDARS.map((calendar) => [calendar, []]));

  for (const event of events) {
    // Some events come back from the API with no coordinates at all - a
    // few of them are missing lat/lng outright (undefined, not NaN), so
    // Number.isNaN() alone doesn't catch them and L.marker() throws.
    if (
      typeof event.lat !== "number" ||
      typeof event.lng !== "number" ||
      Number.isNaN(event.lat) ||
      Number.isNaN(event.lng)
    ) {
      continue;
    }

    const marker = L.marker([event.lat, event.lng], { icon: markerIcons[event.calendar] });
    marker.bindPopup(buildPopupContent(event));
    // "Active" = its popup is open - kept highlighted even once the pointer
    // leaves the marker for the popup content (see .map-marker.is-active).
    marker.on("popupopen", () => marker.getElement()?.classList.add("is-active"));
    marker.on("popupclose", () => marker.getElement()?.classList.remove("is-active"));
    marker.addTo(layers[event.calendar]);
    coordinates[event.calendar].push([event.lat, event.lng]);
  }

  let shownCalendars = CALENDARS;

  function visibleBounds() {
    return shownCalendars.flatMap((calendar) => coordinates[calendar]);
  }

  // Zoom at which the world covers the container's longest side. Used as
  // the minimum zoom, so the tiles always fill the box: a few very remote
  // markers may sit just outside the initial view, but they stay reachable
  // by panning.
  function worldZoom() {
    const size = Math.max(mapContainer.clientWidth, mapContainer.clientHeight);
    return Math.max(0, Math.log2(size / 256));
  }

  function fitToEvents() {
    const bounds = visibleBounds();
    if (bounds.length === 0) return;

    map.invalidateSize({ pan: false });
    map.setMinZoom(worldZoom());
    // Upcoming meetups are often clustered in one region, which on its own
    // would fit to a street-level zoom. The cap keeps the view at roughly
    // continent scale so the markers still read as places on a world map.
    map.fitBounds(bounds, { padding: [16, 16], animate: false, maxZoom: 3 });
  }

  function applyFilter(value) {
    shownCalendars = CALENDARS.includes(value) ? [value] : CALENDARS;
    map.closePopup();
    for (const calendar of CALENDARS) {
      if (shownCalendars.includes(calendar)) {
        layers[calendar].addTo(map);
      } else {
        layers[calendar].remove();
      }
    }
    fitToEvents();
  }

  if (filter) {
    filter.addEventListener("change", (changeEvent) => {
      if (changeEvent.target.name === "map-filter") {
        applyFilter(changeEvent.target.value);
      }
    });
    // Browsers restore the last picked radio on reload, so start from
    // whatever is checked rather than assuming "all".
    const checked = filter.querySelector("input[name='map-filter']:checked");
    if (checked && checked.value !== "all") {
      applyFilter(checked.value);
    }
  }

  let revealed = false;
  let revealTimer;

  function reveal() {
    if (revealed) return;
    revealed = true;
    clearTimeout(revealTimer);
    fitToEvents();
    mapContainer.classList.remove("is-loading");
  }

  revealTimer = setTimeout(reveal, 2000);
  tiles.on("load", reveal);

  new ResizeObserver(() => {
    if (revealed || visibleBounds().length === 0) {
      map.invalidateSize();
      map.setMinZoom(worldZoom());
    } else {
      fitToEvents();
    }
  }).observe(mapContainer);
})();

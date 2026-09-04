// Renders the community meetups on a Leaflet map. Both the events and
// Leaflet itself are already on the page: the events as a build-time JSON
// blob, Leaflet from the CDN script tags on the community page.
(function () {
  const mapContainer = document.getElementById("meetup-map");
  const eventsDataEl = document.getElementById("meetup-map-events");

  if (!mapContainer || !eventsDataEl || typeof L === "undefined") {
    return;
  }

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
    const address = (event.address || []).map((line) => line.trim()).filter(Boolean);
    // The first line is the venue and becomes the title, so the place line
    // uses the last two lines, never repeating the title on its own.
    const place = address.slice(Math.max(1, address.length - 2));

    return {
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
    // Events span close to the full width of the world, so fitBounds()
    // zooms out quite far just to fit that - on a tall portrait container
    // (mobile), the resulting view doesn't reach the container's own top/
    // bottom edges, leaving grey bands above and below a horizontal strip
    // of tiles. A floor on how far out it can go trades a few very remote
    // markers being just outside the initial view (still reachable by
    // panning) for the map actually filling its box.
    minZoom: 2,
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

  const markerIcon = L.divIcon({
    className: "map-marker",
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

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

  const bounds = [];
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

    const marker = L.marker([event.lat, event.lng], { icon: markerIcon }).addTo(map);
    marker.bindPopup(buildPopupContent(event));
    // "Active" = its popup is open - kept highlighted even once the pointer
    // leaves the marker for the popup content (see .map-marker.is-active).
    marker.on("popupopen", () => marker.getElement()?.classList.add("is-active"));
    marker.on("popupclose", () => marker.getElement()?.classList.remove("is-active"));
    bounds.push([event.lat, event.lng]);
  }

  function fitToEvents() {
    if (bounds.length === 0) return;

    map.invalidateSize({ pan: false });
    // Upcoming meetups are often clustered in one region, which on its own
    // would fit to a street-level zoom. The cap keeps the view at roughly
    // continent scale so the markers still read as places on a world map.
    map.fitBounds(bounds, { padding: [16, 16], animate: false, maxZoom: 3 });
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
    if (revealed || bounds.length === 0) {
      map.invalidateSize();
    } else {
      fitToEvents();
    }
  }).observe(mapContainer);
})();

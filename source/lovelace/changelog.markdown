---
layout: page
title: "Lovelace Changelog"
description: "Changelog of the Lovelace UI."
date: 2018-08-31 13:06 +02:00
sidebar: true
comments: false
sharing: true
footer: true
---
## {% linkable_title Changes in 0.85.1 %}
- 🔧 Fix removal of `resources` on save in Raw Config Editor
- 🔧 Auto-gen correctly converts weblink entities to [weblink row]
- 🔧 The [weblink row] opens links in new tabs

## {% linkable_title Changes in 0.85.0 %}
- 📣 [map card]: New config `geo_location_sources`
- 📣 [alarm panel card]: Hide keypad if `code_format` attribute is not "Number"
- 📣 [alarm panel card]: Hide code input field if `code_format` attribute is not set
- 📣 UI Editor for [picture card]
- 📣 UI Editor for [weather forecast card]
- 📣 UI Editor for [plant status card]
- 📣 UI Editor for [media control card]
- 📣 UI Editor for [iframe card]
- 📣 UI Editor for [sensor card]
- 📣 UI Editor for [shopping list card]
- 📣 UI Editor for [light card]
- 📣 UI Editor for [gauge card]
- 📣 UI Editor for [markdown card]
- 📣 UI Editor for [alarm panel card]
- 📣 UI Editor for [thermostat card]
- 📣 UI Editor for [entity button card]
- 📣 UI Editor for [map card]
- 🔧 [thermostat card] Step logic updated to match more-info behavior
- 🔧 [weather forecast card] Proper RTL support
- 🔧 [thermostat card] Set minimum height of card
- 🔧 Fix incorrect state display being cached
- 🔧 Fix `service-button` element `service_data` usage
- 🔧 Fix `picture-elements` element positioning to account for card title
- 🔧 Fix undefined [plant status card]/[weather forecast card]


## {% linkable_title Changes in 0.84.0 %}

### Breaking Changes
- ⚠️ [views]: Renamed `id` to `path`
- ⚠️ `sensor_data`: `entity` is no longer passed as `entity_id` to service call and must be explicitly set
- ⚠️ [sensor card]: Removed configs `height`, `line_color` and `line_width`
- ⚠️ [gauge card]: Renamed config `title` to `name`
- ⚠️ [alarm panel card]: Renamed config `title` to `name`
- ⚠️ [glance card]: `tap_action` and `hold_action` configurations changed. See docs.
- ⚠️ [entity button card]: `tap_action` and `hold_action` configurations changed. See docs.
- ⚠️ [picture card]: `tap_action` and `hold_action` configurations changed. See docs.
- ⚠️ [picture elements card]: `tap_action` and `hold_action` configurations for elements changed. See docs.
- ⚠️ [picture entity card]: `tap_action` and `hold_action` configurations changed. See docs.
- ⚠️ [picture glance card]: `tap_action` and `hold_action` configurations changed. See docs.

### All Changes
- 📣 [weather forecast card]: New config `name`
- 📣 [thermostat card]: New config `name`
- 📣 [plant status card]: New config `name`
- 📣 [entities card]: Alert entity rows are now displayed as toggles
- 📣 [picture elements card]: Added `state_image` and `camera_image`
- 📣 Ability to generate a Lovelace config if not present using available entities
- 📣 UI Editor now in Beta with support for adding/removing views/cards
- 🔧 [map card]: Fix `aspect_ratio`
- 🔧 Fix Tap/Hold actions on Windows 10 machines with touchscreens

## {% linkable_title Changes in 0.83.0 %}
- ❤️ New card type: `shopping-list`

## {% linkable_title Changes in 0.82.0 %}
- 📣 New card type: `light` ❤️
- 📣 Alpha release of UI Editor
- 📣 [entities card]: can be themed
- 📣 [gauge card]: can be themed
- 📣 [light card]: can be themed
- 📣 [thermostat card]: can be themed
- 🔧 `!secret` and `!include` usage restored for manual editing, but are not supported with the UI editor

## {% linkable_title Changes in 0.81.0 %}
- ❤️ New card type: `alarm-panel`
- ❤️ New card type: `thermostat`
- ❤️ New card type: `entity-button`
- 📣 [glance card]: can be themed
- 📣 [glance card]: define columns within
- 📣 [entity button card]: can be themed
- 📣 Long press is now supported
- 📣 Update to allow the use of Custom UI. If you run into issues please disable Custom UI and test before reporting them. If the issue goes away without Custom UI please report this to the Custom UI developer as this is not officially supported.

## {% linkable_title Changes in 0.80.0 %}
- ❤️ New card type: `sensor`
- ❤️ New card type: `gauge`

## {% linkable_title Changes in 0.77.0 %}
- ❤️ New notification drawer

## {% linkable_title Changes in 0.75.0 %}

### Breaking changes
- ⚠️ [glance card]: `turn-on` replaced with `call-service`

### All changes
- 📣 Add support for CSS imports
- ❤️ New card type: `conditional-card` (Drop your [entity filter card] hacks)
- 📣 [picture glance card]: Add support for custom icons
- 📣 [picture entity card]: Supports hiding name and/or state
- 📣 [glance card]: `turn-on` replaced with `call-service`
- 📣 [glance card]: Allow selectively empty names
- 📣 [picture elements card]: `state-label` now supports prefix and suffix
- 📣 [entities card]: Row dividers
- 📣 [entities card] and [glance card]: Custom icons support
- 📣 [entities card]: Add call service support to the rows
- 🔧 [entities card]: Climate entities row available again
- 🔧 [entities card]: Automation and vacuum are again toggleable
- 🔧 [entities card]: Weblinks now work
- 🔧 [entities card]: Groups as toggleable entities fix
- 🔧 [entities card]: Fixed toggleable state when entity unavailable
- 🔧 [entities card]: Fix header toggle for entity objects
- 🔧 [history graph card]: Fix cache of image between views

## {% linkable_title Changes in 0.74.0 %}
- 📣 [Lovelace card gallery](https://home-assistant-lovelace-gallery.netlify.com/)
- 🔧 Async communication improvements

### Views
- 📣 Allow views with badges and no cards
- 📣 Add basic support for `badges` like in old view style
- 🔧 Custom cards now work with `panel: true`

### Cards
- 📣 [picture elements card]: Allow custom elements including custom cards
- 📣 [entities card]: Separate row entity elements, and add `secondary_info`
- 📣 [glance card]: Make column width configurable
- 📣 [glance card]: Entity `tap_action` can now be `toggle` and `turn-on` besides the default of showing the more info dialog
- 📣 [glance card]: Support added to hide `name` or `state`
- 📣 [history graph card]: Support added to override entity names
- 📣 [picture glance card]: Support added to open the more info dialog for cameras and media players.
- 📣 [picture elements card]: Support new element type `image`
- 📣 [picture elements card]: Support new element type `service-icon`
- 🔧 [entity filter card]: Fix edge cases that could make it crash ([supports this new use case](https://github.com/home-assistant/ui-schema/issues/82))
- 🔧 [picture glance card]: Fix crash when the state of entity was unavailable
- 🔧 [picture glance card]: Use custom off states
- 🔧 [picture glance card]: Fixed to work again with [entity filter card]
- 🔧 Removed `text-transform: capitalize;` from card heading

## {% linkable_title Changes in 0.73.1 %}

- 📣 Setting Lovelace as default now updates `Overview` button to point to `/lovelace`
- 📣 Allow setting background styles (global and per view)

### Cards

- ❤️ New card type: `map` that allows showing `device_tracker` entities on a map card
- 📣 [entities card] card now support `type: custom:state-card-custom` for the entities list

## {% linkable_title Changes in 0.73.0 %}

### Views

- 📣 New button to show unused entities in Lovelace

## {% linkable_title Changes in 0.73.0b4 %}

### Cards

- 📣 [picture entity card] allow hiding of infobar using `show_info: false`
- 📣 [picture entity card] now supports `tap_action` parameter allowing you to switch from `on`/`off` to `more-info-dialog`
- 📣 [picture glance card] now supports `navigation_path`
- ⚠️ [picture entity card] renamed `title` to `name`
- ⚠️ [picture elements card] renamed `path` to `navigation_path`
- ⚠️ `camera-preview` card removed, features added to [picture entity card] and [picture glance card]

## {% linkable_title Changes in 0.73.0b3 %}

### Views

- 📣 Added panel mode for a view to use the 1st card to fill the whole screen

### Cards

- ❤️ New card: `picture` for triggering navigation and services
- 📣 [picture elements card] now supports `navigation` type
- 📣 [picture entity card] now supports `camera_image`
- 📣 [picture glance card] now supports `camera_image`
- 📣 [picture glance card] now supports `state_image` and `entity` like [picture entity card]
- 📣 [entity filter card] now supports custom name for entities like `glance` and [entities card]
- ⚠️ [entities card] and `glance` custom titles now use `name` not `title`
- ⚠️ [entity filter card] now uses [entities card] as a static list to filter state against
- ⚠️ [entity filter card] uses `state_filter` array instead of `filter` object
- ⚠️ [entity filter card] no longer allows to show all entities or a full domain
- 🔧 Fix wrapping and padding for `service-button` in [picture elements card]

## {% linkable_title Changes in 0.73.0b1 %}

### Cards

- ⚠️ `column` renamed to `vertical-stack`
- ⚠️ `row` renamed to `horizontal-stack`
- ⚠️ [picture elements card] renamed `state-badge` to `state-icon`
- ⚠️ [picture elements card] renamed `state-text` to `state-label`
- ⚠️ [picture elements card] moved/renamed `service.data` to `service_data`
- 📣 [picture elements card] new `state-badge` using `ha-state-label-badge`
- 📣 [picture elements card] combined `service.domain` and `service.server` into `service`
- 📣 [entities card] allow custom title just like `glance`
- 📣 [entity filter card] allow auto-hide if empty using `show_empty: false`
- 🔧 Fix card size calculation `horizontal-stack`/`vertical-stack`

## {% linkable_title Changes in 0.73.0b0 %}

- 📣 New feature to allow Lovelace to be default for `/`

### Views

- 📣 Now views have deep-links: `/lovelace/3` will link to the tab with id `3`
- ⚠️ `name` renamed `title` to match cards setup
- ⚠️ `tab_icon` renamed `icon` for simplicity

### Cards

- ❤️ New card: [picture elements card]
- ❤️ New card: `column`
- ❤️ New card: `row`
- 📣 `glance` allow custom title for entities - rename your entity only in this card
- 📣 [entities card] toggle button in a header can now be hidden using `show_header_toggle: false`
- ⚠️ `entity-picture` renamed [picture entity card] to be consistent with [picture glance card]
- ⚠️ [entity filter card] removed `card_config` and made `card` property an object
- 🔧 Fix use of groups in [picture entity card]
- 🔧 Fix the title in `glance` to avoid overlapping

## {% linkable_title Changes in 0.72.1 %}

### Cards

- 🐞 Bug introduced in `glance` card - titles now overlap
- ❤️ New card: `iframe`

## {% linkable_title Changes in 0.72 %}

- ❤️ Initial release of the Lovelace UI

[views]: /lovelace/views/
[alarm panel card]: /lovelace/alarm-panel/
[conditional card]: /lovelace/conditional/
[entities card]: /lovelace/entities/
[entity button card]: /lovelace/entity-button/
[entity filter card]: /lovelace/entity-filter/
[gauge card]: /lovelace/gauge/
[glance card]: /lovelace/glance/
[history graph card]: /lovelace/history-graph/
[horizontal stack card]: /lovelace/horizontal-stack/
[iframe card]: /lovelace/iframe/
[light card]: /lovelace/light/
[map card]: /lovelace/map/
[markdown card]: /lovelace/markdown/
[media control card]: /lovelace/media-control/
[picture elements card]: /lovelace/picture-elements/
[picture entity card]: /lovelace/picture-entity/
[picture glance card]: /lovelace/picture-glance/
[picture card]: /lovelace/picture/
[plant status card]: /lovelace/plant-status/
[sensor card]: /lovelace/sensor/
[shopping list card]: /lovelace/shopping-list/
[thermostat card]: /lovelace/thermostat/
[vertical stack card]: /lovelace/vertical-stack/
[weather forecast card]: /lovelace/weather-forecast/

[weblink row]: /lovelace/entities/#weblink

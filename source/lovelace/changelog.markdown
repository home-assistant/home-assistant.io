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
## {% linkable_title Changes in 0.80.0 %}
- 📣 New card type: `sensor` ❤️
- 📣 New card type: `gauge` ❤️

## {% linkable_title Changes in 0.77.0 %}
- 📣 New notification drawer ❤️

## {% linkable_title Changes in 0.75.0 %}

### Breaking changes 
- 📣 [glance card]: `turn-on` replaced with `call-service`

### All changes
- 📣 Add support for CSS imports ❤️
- 📣 New card type: `conditional-card` ❤️ - Drop your [entity filter card] hacks
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
- ❤️ [Lovelace card gallery](https://home-assistant-lovelace-gallery.netlify.com/)
- 🔧 Async communication improvements

### Views
- 📣 Allow views with badges and no cards

### Cards
- 📣 [picture elements card]: Allow custom elements including custom cards
- 📣 [entities card]: Separate row entity elements, and add `secondary_info` ❤️
- 📣 [glance card]: Make column width configurable
- 🔧 [picture glance card]: Use custom off states
- 🔧 [picture glance card]: Fixed to work again with [entity filter card]
- 🔧 Removed `text-transform: capitalize;` from card heading

## {% linkable_title Changes in 0.74.0b0 %}

### Views
- Add basic support for `badges` like in old view style
- Custom cards now work with `panel: true`

### Cards
- 📣 [glance card]: Entity `tap_action` can now be `toggle` and `turn-on` besides the default of showing the more info dialog
- 📣 [glance card]: Support added to hide `name` or `state`
- 📣 [history graph card]: Support added to override entity names
- 📣 [picture glance card]: Support added to open the more info dialog for cameras and media players.
- 📣 [picture elements card]: Support new element type `image`
- 📣 [picture elements card]: Support new element type `service-icon`
- 🔧 [entity filter card]: Fix edge cases that could make it crash ([supports this new use case](https://github.com/home-assistant/ui-schema/issues/82))
- 🔧 [picture glance card]: Fix crash when the state of entity was unavailable

## {% linkable_title Changes in 0.73.1 %}

- Setting Lovelace as default now updates `Overview` button to point to `/lovelace`
- Allow setting background styles (global and per view)

### Cards

- 📣 New card: `map` that allows showing `device_tracker` entities on a map card
- 📣 [entities card] card now support `type: custom:state-card-custom` for the entities list

## {% linkable_title Changes in 0.73.0 %}

### Views

- 📣 New button to show unused entities in Lovelace

## {% linkable_title Changes in 0.73.0b5 %}

- 🏁 Only minor fixes in this release

## {% linkable_title Changes in 0.73.0b4 %}

### Cards

- 📣 [picture entity card] allow hiding of infobar using `show_info: false`
- 📣 [picture entity card] now supports `tap_action` parameter allowing you to switch from `on`/`off` to `more-info-dialog`
- 📣 [picture glance card] now supports `navigation_path`
- [picture entity card] renamed `title` to `name`
- [picture elements card] renamed `path` to `navigation_path`
- ‼️ `camera-preview` card removed, features added to [picture entity card] and [picture glance card]

## {% linkable_title Changes in 0.73.0b3 %}

### Views

- 📣 Added panel mode for a view to use the 1st card to fill the whole screen

### Cards

- 📣 New card: `picture` for triggering navigation and services
- 📣 [picture elements card] now supports `navigation` type
- 📣 [picture entity card] now supports `camera_image`
- 📣 [picture glance card] now supports `camera_image`
- 📣 [picture glance card] now supports `state_image` and `entity` like [picture entity card]
- 📣 [entity filter card] now supports custom name for entities like `glance` and [entities card]
- [entities card] and `glance` custom titles now use `name` not `title`
- [entity filter card] now uses [entities card] as a static list to filter state against
- [entity filter card] uses `state_filter` array instead of `filter` object
- 🔧 Fix wrapping and padding for `service-button` in [picture elements card]
- ‼️ [entity filter card] no longer allows to show all entities or a full domain

## {% linkable_title Changes in 0.73.0b2 %}

- :zap: Went by too fast :zap:

## {% linkable_title Changes in 0.73.0b1 %}

### Cards

- `column` renamed to `vertical-stack`
- `row` renamed to `horizontal-stack`
- [picture elements card] new `state-badge` using `ha-state-label-badge`
- [picture elements card] renamed `state-badge` to `state-icon`
- [picture elements card] renamed `state-text` to `state-label`
- [picture elements card] moved/renamed `service.data` to `service_data`
- [picture elements card] combined `service.domain` and `service.server` into `service`
- 📣 [entities card] allow custom title just like `glance`
- 📣 [entity filter card] allow auto-hide if empty using `show_empty: false`
- 🔧 Fix card size calculation `horizontal-stack`/`vertical-stack` 

## {% linkable_title Changes in 0.73.0b0 %}

- 📣 New feature to allow Lovelace to be default for `/`

### Views

- 📣 Now views have deep-links: `/lovelace/3` will link to the tab with id `3`
- `name` renamed `title` to match cards setup
- `tab_icon` renamed `icon` for simplicity

### Cards

- 📣 New card: [picture elements card]
- 📣 New card: `column`
- 📣 New card: `row`
- 📣 `glance` allow custom title for entities - rename your entity only in this card
- 📣 [entities card] toggle button in a header can now be hidden using `show_header_toggle: false`
- `entity-picture` renamed [picture entity card] to be consistent with [picture glance card]
- [entity filter card] removed `card_config` and made `card` property an object
- 🔧 Fix use of groups in [picture entity card]
- 🔧 Fix the title in `glance` to avoid overlapping

## {% linkable_title Changes in 0.72.1 %}

### Cards

- 🐞 Bug introduced in `glance` card - titles now overlap
- 📣 New card: `iframe`

## {% linkable_title Changes in 0.72 %}

- Initial release of the Lovelace UI

[glance card]: /lovelace/glance/
[history graph card]: /lovelace/history-graph/
[picture glance card]: /lovelace/picture-glance/
[picture elements card]: /lovelace/picture-elements/
[picture entity card]: /lovelace/picture-entity/
[entity filter card]: /lovelace/entity-filter/
[entities card]: /lovelace/entities/

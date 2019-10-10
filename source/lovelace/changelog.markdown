---
title: "Lovelace Changelog"
description: "Changelog of the Lovelace UI."
---
## Changes in 0.100.0
- 📣 [picture glance card]: New config `tap_action` and `hold_action` for `entities` (#3807) @iantrich
- 📣 [entities card]: New config `image` for `entities` (#3832) @iantrich
- 📣 [entity filter card]: Support for operators in `state_filter` and individual `state_filter` option for `entitites` (#3692) @iantrich
- 📣 [light card]: New config `icon` (#3771) @iantrich
- 📣 [picture entity card]: UI Editor (#3708) @iantrich
- 📣 [picture glance card]: UI Editor (#3709) @iantrich
- 📣 [history graph card]: UI Editor (#3782) @iantrich
- 📣 Add support for panels to cast (#3796) @bramkragten
- 📣 Allow for user text selection (Android Chrome not supported) (#3605) @iantrich
- 📣 add `state_filter` to picture cards (#3791) @iantrich
- 📣 Add a setting for vibration (#3813) @bramkragten
- 📣 Switch paper-toggle-button to mwc-switch (#3683) @iantrich
- 📣 New Action `url` (#3773) @iantrich
- 🔧 [map card]: Align background with tiles (#3858) @bramkragten
- 🔧 [map card]: Fix dark switch for map card editor (#3856) @bramkragten
- 🔧 [views]: Guard for null badges (#3841) @bramkragten

## Changes in 0.99.0
- 📣 [glance card]: New config `show_last_changed` for `entities`
- 📣 [glance card]: New config `image` for `entities`
- 📣 [views]: New config `image` for `badges`
- 📣 [views]: New config `icon` for `badges`
- 📣 [views]: New config `name` for `badges`
- 📣 Unused entities: Rewritten into a table view
- 📣 Unused entities: Add entities to Lovelace cards
- 📣 Lovelace background settings moved to theme `--lovelace-background`
- 📣 Haptic feedback support added
- 📣 Vibrate support added
- 📣 MDI icons updated to [4.3.95](https://cdn.materialdesignicons.com/4.3.95/)
- ⚠️ Only allow admins to edit UI config
- 🔧 [alarm panel card]: Handle keyboard input
- 🔧 [alarm panel card]: Show `friendly_name` if set
- 🔧 [entities card]: Properly show "unavailable" timestamps
- 🔧 [entity filter card]: Throttle updates for performance
- 🔧 [light card]: Replace jQuery sliders
- 🔧 [light card]: Move brightness below icon
- 🔧 [map card]: Update preview when config changes
- 🔧 [markdown card]: Don't allow SVG by default
- 🔧 Filter null badges
- 🔧 Render an overlay on light cards when the light is unavailable
- 🔧 Break long strings in notifications

## Changes in 0.88.0
- 📣 Disable toast notifications for successful operations ([#2700](https://github.com/home-assistant/home-assistant-polymer/pull/2822))
- 📣 Color Picker: Toggleable between segmented and continuous ([#2806](https://github.com/home-assistant/home-assistant-polymer/pull/2806))
- 📣 Theming: New CSS card style `ha-card-box-shadow` ([#2855](https://github.com/home-assistant/home-assistant-polymer/pull/2855))
- 🔧 Fix login issue on Firefox ([#2860](https://github.com/home-assistant/home-assistant-polymer/pull/2860))
- 🔧 [light card]: Fix click events ([#2850](https://github.com/home-assistant/home-assistant-polymer/pull/2850))

## Changes in 0.87.0
- 📣 MDI icons updated to [3.3.92](https://cdn.materialdesignicons.com/3.3.92/)
- 📣 Theming: New CSS card style `ha-card-border-radius`
- 📣 Theming: New CSS card style `ha-card-background`
- 📣 New system-health card in dev-info
- 📣 UI Editor: YAML syntax support
- 📣 UI Editor: Line numbers
- 📣 UI Editor: Now supports columns on wide screens
- 📣 Notifications: Indicator updated to show count of pending notifications
- 📣 [thermostat card]: more-info button added
- 📣 [light card]: more-info button added
- 🔧 [thermostat card]: Fix slider
- 🔧 Groups are now togglable

## Changes in 0.86.0
- 📣 Lovelace is now the default UI for Home Assistant!
- 📣 New Lovelace [demos](https://demo.home-assistant.io/#/lovelace/0) page
- 🔧 [thermostat card]: Fix sizing
- 🔧 [gauge card]: Fix sizing
- 🔧 [iframe card]: Fix card size


## Changes in 0.85.1
- 🔧 UI Editor: Fix removal of `resources` on save
- 🔧 Auto-gen correctly converts weblink entities to [weblink row]
- 🔧 The [weblink row] opens links in new tabs

## Changes in 0.85.0
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


## Changes in 0.84.0

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

## Changes in 0.83.0
- ❤️ New card type: `shopping-list`

## Changes in 0.82.0
- 📣 New card type: `light` ❤️
- 📣 Alpha release of UI Editor
- 📣 [entities card]: can be themed
- 📣 [gauge card]: can be themed
- 📣 [light card]: can be themed
- 📣 [thermostat card]: can be themed
- 🔧 `!secret` and `!include` usage restored for manual editing, but are not supported with the UI editor

## Changes in 0.81.0
- ❤️ New card type: `alarm-panel`
- ❤️ New card type: `thermostat`
- ❤️ New card type: `entity-button`
- 📣 [glance card]: can be themed
- 📣 [glance card]: define columns within
- 📣 [entity button card]: can be themed
- 📣 Long press is now supported
- 📣 Update to allow the use of Custom UI. If you run into issues please disable Custom UI and test before reporting them. If the issue goes away without Custom UI please report this to the Custom UI developer as this is not officially supported.

## Changes in 0.80.0
- ❤️ New card type: `sensor`
- ❤️ New card type: `gauge`

## Changes in 0.77.0
- ❤️ New notification drawer

## Changes in 0.75.0

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

## Changes in 0.74.0
- 📣 [Lovelace card gallery](https://www.awesome-ha.com/)
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

## Changes in 0.73.1

- 📣 Setting Lovelace as default now updates `Overview` button to point to `/lovelace`
- 📣 Allow setting background styles (global and per view)

### Cards

- ❤️ New card type: `map` that allows showing `device_tracker` entities on a map card
- 📣 [entities card] card now support `type: custom:state-card-custom` for the entities list

## Changes in 0.73.0

### Views

- 📣 New button to show unused entities in Lovelace

## Changes in 0.73.0b4

### Cards

- 📣 [picture entity card] allow hiding of infobar using `show_info: false`
- 📣 [picture entity card] now supports `tap_action` parameter allowing you to switch from `on`/`off` to `more-info-dialog`
- 📣 [picture glance card] now supports `navigation_path`
- ⚠️ [picture entity card] renamed `title` to `name`
- ⚠️ [picture elements card] renamed `path` to `navigation_path`
- ⚠️ `camera-preview` card removed, features added to [picture entity card] and [picture glance card]

## Changes in 0.73.0b3

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

## Changes in 0.73.0b1

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

## Changes in 0.73.0b0

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

## Changes in 0.72.1

### Cards

- 🐞 Bug introduced in `glance` card - titles now overlap
- ❤️ New card: `iframe`

## Changes in 0.72

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

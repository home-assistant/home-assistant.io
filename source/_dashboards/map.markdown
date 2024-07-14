---
type: card
title: "Map card"
sidebar_label: Map
description: "The map card that allows you to display entities on a map"
related:
  - docs: /dashboards/dashboards/#map-dashboard
    title: Map dashboard
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The map card that allows you to display entities on a map. This card is used on the [Map dashboard](/dashboards/dashboards/#map-dashboard), which is one of the default dashboards.

<p class='img'>
<img src='/images/dashboards/map_card.png' alt='Screenshot of the map card'>
Screenshot of the map card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`map`"
  type: string
entities:
  required: true
  description: List of entity IDs or `entity` objects (see below). Either this or the `geo_location_sources` configuration option is required.
  type: list
geo_location_sources:
  required: true
  description: List of geolocation sources. All current entities with that source will be displayed on the map. See [Geolocation](/integrations/geo_location/) platform for valid sources. Set to `all` to use all available sources. Either this or the `entities` configuration option is required.
  type: list
auto_fit:
  required: false
  description: The map will follow moving `entities` by adjusting the viewport of the map each time an entity is updated. 
  type: boolean
  default: false
fit_zones:
  required: false
  description: Whether the map should consider the zones in the list of specified entities when fitting its viewport.
  type: boolean
  default: false
title:
  required: false
  description: The card title.
  type: string
aspect_ratio:
  required: false
  description: 'Forces the height of the image to be a ratio of the width. Valid formats: Height percentage value (`23%`) or ratio expressed with colon or "x" separator (`16:9` or `16x9`). For a ratio, the second element can be omitted and will default to "1" (`1.78` equals `1.78:1`).'
  type: string
default_zoom:
  required: false
  description: The default zoom level of the map.
  type: integer
  default: 14 (or whatever zoom level is required to fit all visible markers)
theme_mode:
  required: false
  description: 'Override the theme to force the map to display in either a light mode (`theme_mode: light`) or a dark mode (`theme_mode: dark`). Default (`theme_mode: auto`) will follow the theme settings.'
  type: string
  default: 'auto'
hours_to_show:
  required: false
  description: Shows a path of previous locations. Hours to show as path on the map.
  type: integer
  default: 0
{% endconfiguration %}

{% important %}
Only entities that have latitude and longitude attributes will be displayed on the map.
{% endimportant %}

{% note %}
The `default_zoom` value will be ignored if it is set higher than the current zoom level
after fitting all visible entity markers in the map window. In other words, this can only
be used to zoom the map _out_ by default.
{% endnote %}

## Options for entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configuration.

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Replace the default label for the marker.
  type: string
label_mode:
  required: false
  default: name
  description: When set to `state`, renders the entity's state as the label for the map marker instead of the entity's name. This option doesn't apply to [zone](/integrations/zone/) entities because they don't use a label but an icon.
  type: string
focus:
  required: false
  default: true
  description: When set to `false`, this entity will not be considered for determining the default zoom or fit of the map.
  type: boolean
{% endconfiguration %}

## Examples

```yaml
type: map
aspect_ratio: 16:9
default_zoom: 8
auto_fit: true
entities:
  - device_tracker.demo_paulus
  - zone.home
```

```yaml
type: map
geo_location_sources:
  - nsw_rural_fire_service_feed
entities:
  - zone.home
```

```yaml
type: map
entities:
  - device_tracker.demo_paulus
  - entity: sensor.gas_station_gas_price
    label_mode: state
    focus: false
hours_to_show: 48
```


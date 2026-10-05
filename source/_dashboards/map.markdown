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
  - docs: /docs/configuration/basic/#editing-the-home-information
    title: Edit your home location
  - docs: /getting-started/presence-detection/
    title: Getting started tutorial on presence detection
---

The map card allows you to display your home zone, entities, and other predefined zones on a map. This card is used on the [Map dashboard](/dashboards/dashboards/#map-dashboard), which is one of the default dashboards.

The two buttons below the zoom controls let you manage the markers and map viewport:

- **Toggle grouping** enables or disables clustering of nearby markers.
- **Reset focus** adjusts the map view to fit the displayed entities.

## Overview in a panel view

When the map card is in a [panel view](/dashboards/panel/), such as on the [Map dashboard](/dashboards/dashboards/#map-dashboard), it also shows an overview next to the map. The overview can show these tabs:

- **People**: the people in your home and where they are.
- **Devices**: the devices on the map that have a location.
- **Zones**: your zones, with the number of people in each zone.

On the **People** tab, the map shows people. On the **Devices** tab, it shows devices. Zones and other entities with a location are always shown.

Select an item to see its details and its **Activity** of the last 24 hours:

- For a person or a device, the activity shows its changes, such as arriving at or leaving a zone.
- For a zone, the activity shows the people who arrived or left.

To open the more-info dialog of the item, select its name at the top of the details.

## Adding the map card to a dashboard

1. In the top right of the screen, select **Edit dashboard** {% icon "mdi:pencil" %}.
   - If this is your first time editing a dashboard, the **Edit dashboard** dialog appears.
     - By editing the dashboard, you are taking over control of this dashboard.
     - This means that it is no longer automatically updated when new dashboard elements become available.
     - Once you've taken control, you can't set this dashboard to update automatically anymore. However, you can create a new default dashboard.
     - To continue, in the dialog, select **Menu** {% icon "mdi:dots-vertical" %}, then select **Take control**.
2. [Add the map card](/dashboards/cards/#adding-cards-to-your-dashboard) to your dashboard.
   - If the card is in a [sections view](/dashboards/sections/), you can resize it on the **Layout** tab. In other view types, the **Layout** tab is not shown. For more information, refer to [resizing a card](/dashboards/cards/#resizing-a-card).
3. By default, you see the house {% icon "mdi:house" %} icon on your map. It represents your [home zone](/integrations/zone/#about-the-home-zone).
   - To change the location of your home, you need to [edit your home's location in the home information](/docs/configuration/basic/#editing-the-home-information).
4. To learn how to show additional zones on your map, follow the steps on [adding a new zone](/integrations/zone/#adding-a-new-zone-or-editing-zones).
5. To show other elements on the map, add entities or geolocation sources:
   - To add an entity, under **Entities**, select **Add entity**. The list shows only entities that have a location, such as a mobile phone with the companion app.
   - To add a geolocation source, under **Geolocation sources**, select **Source**.
   - For more information about presence detection, refer to the [getting started tutorial on presence detection](/getting-started/presence-detection/).
6. Optional: To change how the map looks, expand **Appearance**. For example, select a **Map style** or a **Theme mode**.
   - To see a trace of the past locations of your entities, enter the number of hours under **Hours to show**.
   - For a description of all settings, refer to [Card settings](#card-settings).
7. Select **Save**.

## Card settings

The settings are listed in the order in which they appear in the card editor. For more details about a setting, refer to its YAML option in the [YAML configuration](#yaml-configuration) section.

{% configuration_basic %}
Title:
  description: "The title of the card (`title`)."
Appearance:
  description: Expand this section to change how the map looks.
  keys:
    Aspect ratio:
      description: "The height of the map compared to its width (`aspect_ratio`)."
    Default zoom:
      description: "The zoom level of the map when it opens (`default_zoom`)."
    Theme mode:
      description: "**Auto**, **Light**, or **Dark** (`theme_mode`). **Auto** follows your theme."
    Map style:
      description: "The look of the map: **Default**, **Colorful**, **Natural**, **Muted**, **Gray**, or **Toner** (`map_style`). Each style has a light and a dark version. The **Theme mode** decides which version is shown."
    Hours to show:
      description: "Shows the path of the previous locations of your entities for the given number of hours (`hours_to_show`)."
    Scale ruler:
      description: "Shows a ruler with the current scale of the map (`scale_ruler`)."
    Auto fit:
      description: "Moves the map to follow your entities each time they change location (`auto_fit`)."
    Fit zones:
      description: "Includes the zones in your list of entities when fitting the map (`fit_zones`)."
    Cluster markers:
      description: "Groups nearby markers into one marker (`cluster`)."
Show all:
  description: "Automatically adds all entities with coordinates to the map (`show_all`)."
Entities:
  description: "The entities to show on the map (`entities`). To add an entity, select **Add entity**. To change the settings of an entity, select **Edit** {% icon "mdi:pencil" %} next to it. To remove it, select **Delete** {% icon "mdi:close" %}. To change the order, drag it by {% icon "mdi:drag-horizontal-variant" %}."
  keys:
    Entity:
      description: "The entity to show (`entity`)."
    Name:
      description: "Replaces the default label of the marker (`name`)."
    Color:
      description: "The color of the marker and of the path of previous locations (`color`). Select one of the theme colors, or enter a hex color code, for example, `#93c47d`, and select **Custom color**. Not available for zones."
    Label mode:
      description: "What the marker shows: **Name**, **State**, **Attribute**, or **Icon** (`label_mode`). Not available for zones."
    Attribute:
      description: "The attribute to show when **Label mode** is set to **Attribute** (`attribute`). Not available for zones."
    Unit:
      description: "The unit to show after the attribute value (`unit`). Not available for zones."
    Focus:
      description: "Includes this entity when fitting the map (`focus`)."
Geolocation sources:
  description: "The [geolocation](/integrations/geo_location/) sources whose entities you want to show (`geo_location_sources`). To add a source, select **Source**, then select the source."
Entity visibility conditions:
  description: "Shows the entities only when all conditions are met (`conditions`). For more information, refer to [conditions options](#conditions-options)."
{% endconfiguration_basic %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`map`"
  type: string
entities:
  required: false
  description: List of entity IDs or `entity` objects (see [below](#options-for-entities)). Either this, `show_all`, or the `geo_location_sources` configuration option is required.
  type: list
geo_location_sources:
  required: false
  description: List of geolocation sources or `source` objects (see [below](#options-for-geolocation-sources)). All current entities with that source will be displayed on the map. See [Geolocation](/integrations/geo_location/) platform for valid sources. Set to `all` to use all available sources. Either this, `show_all`, or the `entities` configuration option is required.
  type: list
show_all:
  required: false
  description: Automatically add all entities with coordinates to the map card. (Default behavior of Map panel)
  type: boolean
  default: false
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
  description: The default zoom level of the map. Use a lower number to zoom out and a higher number to zoom in.
  type: integer
  default: 14 (or whatever zoom level is required to fit all visible markers)
scale_ruler:
  required: false
  description: Shows a ruler that indicates the current scale of the map.
  type: boolean
  default: false
theme_mode:
  required: false
  description: 'Override the theme to force the map to display in either a light mode (`theme_mode: light`) or a dark mode (`theme_mode: dark`). Default (`theme_mode: auto`) will follow the theme settings. The theme mode also decides whether the light or the dark version of the `map_style` is shown.'
  type: string
  default: 'auto'
map_style:
  required: false
  description: 'The style of the map: `default`, `colorful`, `natural`, `muted`, `gray`, or `toner`. To adjust a style, use a map instead of a style name. See [options for a custom map style](#options-for-a-custom-map-style).'
  type: [string, map]
  default: default
hours_to_show:
  required: false
  description: Shows a path of previous locations. Hours to show as path on the map.
  type: integer
  default: 0
cluster:
  required: false
  description: 'When set to `false`, the map will not cluster the markers. This is useful when you want to see all markers at once, but it may cause performance issues with a large number of markers.'
  type: boolean
  default: true
conditions:
  required: false
  description: List of conditions to check for entity visibility. See [description](#conditions-options).
  type: list
{% endconfiguration %}

{% important %}
Only entities that have latitude and longitude attributes will be displayed on the map.
{% endimportant %}

{% note %}
The `default_zoom` value will be ignored if it is set higher than the current zoom level
after fitting all visible entity markers in the map window. In other words, this can only
be used to zoom the map _out_ by default.
{% endnote %}

## Conditions options

You can specify one or more `conditions`, in which case every selected entity will be tested against each condition and shown if it passes every condition. See [available conditions](/dashboards/conditional/#conditions-options). For conditions which accept an `entity` id, this will be automatically set to the entity being tested.

### Examples

Map all locatable entities, except hiding those that have a state of `home`.

```yaml
type: map
auto_fit: true
show_all: true
conditions:
  - condition: state
    state_not: home
```

## Options for a custom map style

If you define `map_style` as a map instead of a style name, you can start from one of the styles and adjust it. Only the options listed here are documented.

{% configuration %}
base:
  required: false
  description: "The style to start from: `default`, `colorful`, `natural`, `muted`, `gray`, or `toner`."
  type: string
  default: default
colors:
  required: false
  description: "Colors for parts of the map, such as `water`, `land`, `natureWood`, `building`, or `roadStreet`. The colors you set replace only these parts. The rest of the style stays as it is. If you don't set `colors_dark`, these colors are used in both the light and the dark version of the map."
  type: map
colors_dark:
  required: false
  description: "Colors for the dark version of the map. If set, the dark version uses `colors_dark` instead of `colors`. The two are not merged, so add every color you want to change on the dark map to `colors_dark`."
  type: map
recolor:
  required: false
  description: "Adjustments for all colors of the style, such as `saturate` (from `-1` for grayscale to `1` for twice the saturation), `rotate_hue` (in degrees), `brightness`, `contrast`, `gamma`, or `invert_brightness`."
  type: map
{% endconfiguration %}

The following example starts from the **Muted** style, changes the color of water, and uses a darker water color on the dark version of the map.

```yaml
type: map
show_all: true
map_style:
  base: muted
  colors:
    water: "#9ec9e2"
  colors_dark:
    water: "#1f3a5f"
```

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
color:
  required: false
  description: "The color of the marker and of the path of previous locations. Use a theme color: `primary`, `accent`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `light-grey`, `grey`, `dark-grey`, `blue-grey`, `black`, or `white`. Theme colors follow your theme. You can also use a hex color code, for example, `#93c47d`. If not set, a color is picked for each entity. This option doesn't apply to [zone](/integrations/zone/) entities."
  type: string
label_mode:
  required: false
  default: name
  description: When set to `icon`, renders the entity's icon in the marker instead of text. When set to `state` or `attribute`, renders the entity's state or attribute as the label for the map marker instead of the entity's name. This option doesn't apply to [zone](/integrations/zone/) entities because they don't use a label but an icon.
  type: string
attribute:
  required: false
  description: An entity's attribute when `label_mode` set to `attribute`.
  type: string
unit:
  required: false
  description: A unit for a value of an attribute when `label_mode` set to `attribute`.
  type: string
focus:
  required: false
  default: true
  description: When set to `false`, this entity will not be considered for determining the default zoom or fit of the map.
  type: boolean
{% endconfiguration %}

## Options for geolocation sources

If you define geolocation sources as objects instead of strings (by adding `source:` before the ID), you can add more customization and configuration.

{% configuration %}
source:
  required: true
  description: Name of a geolocation source, or `all`.
  type: string
label_mode:
  required: false
  default: name
  description: When set to `icon`, renders the entity's icon in the marker instead of text. When set to `state` or `attribute`, renders the entity's state or attribute as the label for the map marker instead of the entity's name.
  type: string
attribute:
  required: false
  description: An entity's attribute when `label_mode` set to `attribute`.
  type: string
unit:
  required: false
  description: A unit for a value of an attribute when `label_mode` set to `attribute`.
  type: string
focus:
  required: false
  default: true
  description: When set to `false`, the entities of this source will not be considered for determining the default zoom or fit of the map.
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
  - source: gdacs
    focus: false
entities:
  - zone.home
```

The `sensor.gas_station_gas_price` entity in the following example is a placeholder. Replace it with an existing entity that has numeric `latitude` and `longitude` attributes.

```yaml
type: map
entities:
  - device_tracker.demo_paulus
  - entity: sensor.gas_station_gas_price
    label_mode: state
    focus: false
hours_to_show: 48
```

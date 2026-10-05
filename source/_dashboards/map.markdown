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

The map card shows your home zone, your other zones, and entities with a location on a map. This card is used on the [Map dashboard](/dashboards/dashboards/#map-dashboard), which is one of the default dashboards.

On the map, each entity is shown as a marker: a small circle with its picture, icon, name, or state. Below the zoom buttons, two more buttons help you find your way on the map:

- **Toggle grouping** {% icon "mdi:google-circles-communities" %} combines markers that are close together into one bubble. The bubble shows up to three of the markers and the number of other markers in the group. Select the button again to show each marker separately. While markers are not grouped, the button shows {% icon "mdi:dots-hexagon" %}.
- **Reset focus** {% icon "mdi:image-filter-center-focus" %} moves and zooms the map so that you can see all its entities again.

## People, devices, and zones in a panel view

When the map card is in a [panel view](/dashboards/panel/), such as on the [Map dashboard](/dashboards/dashboards/#map-dashboard), it also shows the **People**, **Devices**, and **Zones** tabs on top of the map, if the card shows at least one person, device, or zone. On a phone, they are at the bottom of the screen. The tabs show the following:

- **People**: the people in your home and where they are.
- **Devices**: the devices on the map that have a location.
- **Zones**: your zones, with the number of people in each zone.

People and devices are only shown on the map while their tab is selected. Zones and other entities with a location are always shown. Passive zones are not shown in a panel view.

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
   - To add an entity, under **Entities**, select **Add entity**. The list shows only entities that have a location, such as a phone with the [Home Assistant Companion app](https://companion.home-assistant.io/).
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
      description: "The look of the map: **Default**, **Colorful**, **Natural**, **Muted**, **Gray**, or **Toner** (`map_style`). Each style has a light and a dark version. The **Theme mode** decides which version is shown. On devices that can't show the detailed map, such as some older tablets, a simpler map is shown, and the map style has no effect. To adjust a style further, for example its colors, use YAML. For more information, refer to [options for a custom map style](#options-for-a-custom-map-style)."
    Hours to show:
      description: "Shows the path of the previous locations of your entities for the given number of hours (`hours_to_show`)."
    Scale ruler:
      description: "Shows a ruler with the current scale of the map (`scale_ruler`)."
    Auto fit:
      description: "Moves and zooms the map each time your entities change location, so that you can always see all of them (`auto_fit`)."
    Fit zones:
      description: "Also keeps the zones in your list of entities in view when the map moves and zooms to show your entities (`fit_zones`)."
    Cluster markers:
      description: "Combines markers that are close together into one bubble (`cluster`)."
Show all:
  description: "Automatically adds all entities with a location to the map (`show_all`). If you turn this on, remove the entities and geolocation sources you added, because they can't be combined with **Show all**."
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
      description: "Keeps this entity in view when the map moves and zooms to show your entities (`focus`)."
Geolocation sources:
  description: "The [geolocation](/integrations/geo_location/) sources whose entities you want to show (`geo_location_sources`). To add a source, select **Source**, then select the source."
Entity visibility conditions:
  description: "Shows the entities only when all conditions are met (`conditions`). For more information, refer to [conditions options](#conditions-options)."
{% endconfiguration_basic %}

## YAML configuration

The following YAML options are available when you use YAML mode or prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`map`"
  type: string
entities:
  required: false
  description: List of entity IDs or entities with their own settings. For more information, refer to [options for entities](#options-for-entities). Either this, `show_all`, or the `geo_location_sources` configuration option is required.
  type: list
geo_location_sources:
  required: false
  description: List of geolocation sources or sources with their own settings. For more information, refer to [options for geolocation sources](#options-for-geolocation-sources). Shows all current entities of these sources. For valid sources, refer to the [Geolocation](/integrations/geo_location/) integration. Set to `all` to use all available sources. Either this, `show_all`, or the `entities` configuration option is required.
  type: list
show_all:
  required: false
  description: Automatically adds all entities with a location to the map. The [Map dashboard](/dashboards/dashboards/#map-dashboard) uses this setting. Can't be combined with `entities` or `geo_location_sources`. If you use one of them together with `show_all`, the card shows an error.
  type: boolean
  default: false
auto_fit:
  required: false
  description: Moves and zooms the map each time your entities change location, so that you can always see all of them.
  type: boolean
  default: false
fit_zones:
  required: false
  description: Also keeps the zones in your list of `entities` in view when the map moves and zooms to show your entities.
  type: boolean
  default: false
title:
  required: false
  description: The card title.
  type: string
aspect_ratio:
  required: false
  description: 'Sets the height of the map compared to its width. Use a percentage of the width (`23%`) or a ratio with a colon or an "x" (`16:9` or `16x9`). If you leave out the second number of a ratio, it is `1` (`1.78` equals `1.78:1`).'
  type: string
default_zoom:
  required: false
  description: The zoom level of the map when it opens. Use a lower number to zoom out and a higher number to zoom in. When the map moves and zooms to show all your entities, it never zooms in further than this level.
  type: integer
  default: 14
scale_ruler:
  required: false
  description: Shows a ruler that indicates the current scale of the map.
  type: boolean
  default: false
theme_mode:
  required: false
  description: 'Shows the map in light mode (`light`), dark mode (`dark`), or following your theme (`auto`). The theme mode also decides whether the light or the dark version of the `map_style` is shown.'
  type: string
  default: 'auto'
map_style:
  required: false
  description: 'The style of the map: `default`, `colorful`, `natural`, `muted`, `gray`, or `toner`. To adjust a style, use a map instead of a style name. For more information, refer to [options for a custom map style](#options-for-a-custom-map-style). On devices that can''t show the detailed map, such as some older tablets, a simpler map is shown, and `map_style` has no effect.'
  type: [string, map]
  default: default
hours_to_show:
  required: false
  description: Shows the path of the previous locations of your entities for the given number of hours.
  type: integer
  default: 0
cluster:
  required: false
  description: 'When set to `false`, markers that are close together are not combined into one bubble. This is useful when you want to see all markers at once. With a large number of markers, the map can respond more slowly.'
  type: boolean
  default: true
conditions:
  required: false
  description: List of conditions to check for entity visibility. For more information, refer to [conditions options](#conditions-options).
  type: list
{% endconfiguration %}

{% note %}
Only entities that have a location, with `latitude` and `longitude` attributes, are shown on the map.
{% endnote %}

## Conditions options

With `conditions`, each entity is only shown when it meets all conditions. For the available conditions, refer to [conditions options of the conditional card](/dashboards/conditional/#conditions-options). In conditions that use an `entity`, the entity ID is filled in automatically with each entity on the map.

### Example

The following example shows all entities with a location, except the ones whose state is `home`.

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
  description: "Colors for parts of the map, such as `water`, `land`, `natureWood`, `building`, or `roadStreet`. For all names, refer to [map color names](#map-color-names). The colors you set replace only these parts. The rest of the style stays as it is. If you don't set `colors_dark`, these colors are used in both the light and the dark version of the map."
  type: map
colors_dark:
  required: false
  description: "Colors for the dark version of the map. If set, the dark version uses `colors_dark` instead of `colors`. The two are not merged, so add every color you want to change on the dark map to `colors_dark`."
  type: map
recolor:
  required: false
  description: "Adjustments for all colors of the style, such as `saturate` (from `-1` for grayscale to `1` for twice the saturation), `rotate_hue` (in degrees), `brightness`, `contrast`, `gamma`, or `invert_brightness`. To mix a color into the whole style, use `tint` or `blend`, each with a `color` and an `amount`."
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

### Map color names

You can use the following names under `colors` and `colors_dark`:

- Land and water: `background`, `land`, `water`, `glacier`
- Nature: `natureWood`, `natureGrass`, `naturePark`, `natureLeisure`, `natureAgriculture`, `natureWetland`, `natureSand`, `natureRock`
- Areas and sites: `areaResidential`, `areaCommercial`, `areaIndustrial`, `areaWaste`, `areaBurial`, `siteParking`, `siteSports`
- Buildings: `building`, `buildingBg`
- Roads: `roadStreet`, `roadStreetBg`, `roadTrunk`, `roadTrunkBg`, `roadMotorway`, `roadMotorwayBg`
- Transit and paths: `transitRail`, `transitSubway`, `transitCycle`, `transitFoot`
- Boundaries: `boundary`, `boundaryDisputed`
- Labels: `label`, `labelHalo`, `labelWater`, `labelSymbol`, `labelPoi`, `labelShield`, `labelHousenumber`

Names ending in `Bg` set the outline color of that part, for example the edge of a road.

## Options for entities

To change the settings of a single entity, write it as `- entity: ENTITY_ID` with its settings below it, instead of only the entity ID.

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Replaces the default label of the marker.
  type: string
color:
  required: false
  description: "The color of the marker and of the path of previous locations. Use a theme color: `primary`, `accent`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `light-grey`, `grey`, `dark-grey`, `blue-grey`, `black`, or `white`. Theme colors follow your theme. You can also use a hex color code, for example, `#93c47d`. If not set, a color is picked for each entity. For a [zone](/integrations/zone/), the color is used for the zone and its marker, except for passive zones. The card editor doesn't offer this option for zones, and it removes the `color` of a zone when you edit that zone in the editor."
  type: string
label_mode:
  required: false
  default: name
  description: When set to `icon`, the marker shows the entity's icon instead of text. When set to `state` or `attribute`, the marker shows the entity's state or attribute instead of the entity's name. This option doesn't apply to [zone](/integrations/zone/) entities because they show an icon instead of a label.
  type: string
attribute:
  required: false
  description: The attribute to show when `label_mode` is set to `attribute`.
  type: string
unit:
  required: false
  description: The unit to show after the attribute value when `label_mode` is set to `attribute`.
  type: string
focus:
  required: false
  default: true
  description: When set to `false`, this entity is not kept in view when the map moves and zooms to show your entities.
  type: boolean
{% endconfiguration %}

## Options for geolocation sources

To change the settings of a single geolocation source, write it as `- source: SOURCE_NAME` with its settings below it, instead of only the source name.

{% configuration %}
source:
  required: true
  description: Name of a geolocation source, or `all`.
  type: string
label_mode:
  required: false
  default: name
  description: When set to `icon`, the marker shows the entity's icon instead of text. When set to `state` or `attribute`, the marker shows the entity's state or attribute instead of the entity's name.
  type: string
attribute:
  required: false
  description: The attribute to show when `label_mode` is set to `attribute`.
  type: string
unit:
  required: false
  description: The unit to show after the attribute value when `label_mode` is set to `attribute`.
  type: string
focus:
  required: false
  default: true
  description: When set to `false`, the entities of this source are not kept in view when the map moves and zooms to show your entities.
  type: boolean
{% endconfiguration %}

## Examples

The following example shows a person's phone and the home zone. The map follows the phone when it moves.

```yaml
type: map
aspect_ratio: 16:9
default_zoom: 8
auto_fit: true
entities:
  - device_tracker.demo_paulus
  - zone.home
```

The following example shows the entities of two geolocation sources and the home zone. The map does not move to keep the entities of the `gdacs` source in view.

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

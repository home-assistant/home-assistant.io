---
type: card
title: "Area card"
sidebar_label: Area
description: "The area card gives control of your entities in a specified area."
related:
  - docs: /dashboards/cards/
    title: Dashboard cards
  - docs: /dashboards/dashboards/#areas-dashboard
    title: Areas dashboard
  - docs: /docs/organizing/areas/
    title: About areas
---

The area card lets you control and monitor an individual {% term area %}.

<p class='img'>
  <img src='/images/dashboards/area-cards.png' alt='Screenshot of the area cards'>
  Screenshot of the area cards.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

Buttons will appear on the card for the {% term entities %} in the area including fan, light, and switch. A motion sensor icon will appear in the top left if a motion sensor is in the area and if motion is detected by the motion sensor.

If a camera is added to the {% term area %} you can show the camera feed instead of the area picture.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`area`"
  type: string
area:
  required: true
  description: ID of the `area`.
  type: string
color:
  required: false
  description: Set the color for the icon and the hover/focus state. It accepts [color token](/dashboards/area/#available-colors) or hex color code.
  type: string
display_type:
  required: false
  description: Defines the card's display style. Options include `compact` (a minimal layout), `icon` (shows an area icon), `picture` (displays an image of the area), or `camera` (shows the live camera feed).
  type: string
  default: "picture"
camera_view:
  required: false
  description: 'If showing a camera, `live` will show the live view if `stream` is enabled.'
  default: auto
  type: string
aspect_ratio:
  required: false
  description: 'Forces the height of the image to be a ratio of the width. Valid formats: Height percentage value (`23%`) or ratio expressed with colon or "x" separator (`16:9` or `16x9`). For a ratio, the second element can be omitted and will default to "1" (`1.78` equals `1.78:1`).'
  default: "16:9"
  type: string
navigation_path:
  required: false
  description: link to view. For more information about views, see the [view documentation](/dashboards/views/)
  type: string
alert_classes:
  required: false
  type: list
  default: "moisture, motion"
  description: A list of binary sensor device classes which will populate alert icons in the card when the state is on. If the display type is set to `compact`, only the first alert icon will be displayed.
sensor_classes:
  required: false
  type: list
  default: "temperature, humidity"
  description: A list of sensor device classes which will display their averaged sensor readings for the area.
features:
  required: false
  description: Additional widgets to control entities in the area. See [available features](/dashboards/features).
  type: list
features_position:
  required: false
  description: Position of the features on the area card. Can be `bottom` or `inline`. Only the first feature will be displayed when the option is set to `inline`.
  type: string
  default: bottom
exclude_entities:
  required: false
  description: A list of entities that will be excluded from the card. It will affect sensor_classes, alert_classes, and features.
  type: list
{% endconfiguration %}

### Example

Basic example:

```yaml
type: area
area: bedroom
```

Complex example

```yaml
type: area
area: bedroom
display_type: picture
navigation_path: my_bedroom
sensor_classes:
  - temperature
  - humidity
alert_classes:
  - moisture
  - motion
features:
  - type: area-controls
```

## Available colors

The following colors are available to colorize the area card: `primary`, `accent`, `disabled`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black`, `white`, or any hex color code (for example, `#93c47d`).

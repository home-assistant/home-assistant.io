---
type: card
title: "Area card"
sidebar_label: Area
description: "The area card gives control of your entities in a specified area."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The area card lets you control and monitor an individual {% term area %}.

<p class='img'>
  <img src='/images/dashboards/area-card.png' alt='Screenshot of the area card'>
  Screenshot of the area card.
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
show_camera: 
  required: false
  description: Changes the area picture to a live feed of the camera set for the area.
  type: boolean
  default: false
camera_view:
  required: false
  description: 'If showing a camera, "live" will show the live view if `stream` is enabled.'
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
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
alert_classes:
  required: false
  type: list
  default: "moisture, motion"
  description: A list of binary sensor device classes which will populate alert icons in the card when the state is on.
sensor_classes:
  required: false
  type: list
  default: "temperature, humidity"
  description: A list of sensor device classes which will display their averaged sensor readings for the area. 
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
navigation_path: my_bedroom
show_camera: true
theme: green
```
